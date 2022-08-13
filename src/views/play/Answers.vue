<template>
  <v-card>

    <v-card-title>
      Answers
      <v-spacer></v-spacer>
      <v-btn icon @click="getAnswers">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="checkAnswers">
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text @click="saveScores">Save scores</v-btn>
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
  computed: {
    question: function () {
      return this.$store.getters.getPlayCurrentQuestion()
    }
  },
  data: () => ({
    headers: [
      {
        text: 'Player',
        value: 'name'
      },
      {
        text: 'Answer',
        value: 'answer',
      },
      {
        text: 'Score',
        value: 'score',
      }
    ],
    answers: [],
    savingScores: false
  }),
  mounted () {
    this.getAnswers()
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
        await apiQuestions.lock({ question_id: this.question.id })
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
