<template>
  <v-card>

    <v-card-title>
      <v-btn icon @click="getAnswers">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      Answers <span>({{answers.length}})</span>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn icon @click="checkAnswers">
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <v-btn text :disabled="!question.locked_at"
        @click="saveScores">
        Save scores
      </v-btn>
    </v-card-title>

    <v-data-table :headers="headers" :items="answers"
      :loading="savingScores"
      :items-per-page="-1"
      :hide-default-footer="true">
      <template v-slot:item.name="{ item }">
        {{ getPlayerByID(item.attendance_id).name }}
      </template>
      <template v-slot:item.score="{ item }">
        <v-text-field v-model="item.score" hide-details></v-text-field>
      </template>
    </v-data-table>

  </v-card>
</template>

<script>
import apiQuestions from '@/api/questions'
import apiAnswers from '@/api/answers'

export default {
  name: 'view-play-answers',
  props: {
    question: {
      type: Object
    }
  },
  computed: {
    currentGameQuestion: function () {
      return this.$store.getters.getPlayCurrentQuestion()
    }
  },
  data: () => ({
    headers: [
      {
        text: 'Player',
        value: 'name',
        width: '30%'
      },
      {
        text: 'Answer',
        value: 'answer'
      },
      {
        text: 'Score',
        value: 'score',
        width: '20%'
      }
    ],
    answers: [],
    savingScores: false,
    loopingRequest: null
  }),
  watch: {
    question: function () {
      if (this.loopingRequest != null) {
        clearInterval(this.loopingRequest)
      }
      if (this.question.locked_at == null &&
          this.currentGameQuestion.id == this.question.id) {
        this.loopingRequest = setInterval(this.getAnswers, 1000)
      } else {
        this.getAnswers()
      }
    }
  },
  methods: {
    getAnswers: function () {
      apiQuestions.getSubmittedAnswers({ question_id: this.question.id })
        .then(response => {
          this.answers = response.answers
        }).catch(err => {
          console.log(err)
        })
    },
    checkAnswers: function () {
      for (let answer of this.answers) {
        if (this.$store.getters.getPlayQuestionAnswer() == answer.answer) {
          answer.score = this.question.score
        }
      }
    },
    saveScores: async function () {
      this.savingScores = true
      try {
        for (let answer of this.answers) {
          await apiAnswers.saveScore({ answer_id: answer.id, score: answer.score })
        }
        this.$store.commit('SHOW_SNACKBAR', {
          status: 'success',
          message: 'Scores saved'
        })
      } catch (err) {
        console.log(err)
        this.$store.commit('SHOW_SNACKBAR', {
          status: 'error',
          message: 'Error saving scores'
        })
      } finally {
        this.savingScores = false
      }
    },
    getPlayerByID: function (player_id) {
      for (let player of this.$store.getters.getPlayAttendance()) {
        if (player.id == player_id) {
          return player
        }
      }
      return { name: 'Player' }
    }
  }
}
</script>
