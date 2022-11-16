<template>
  <v-card>

    <v-card-title>
      <v-btn icon @click="getAnswers">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      Answers <span>({{answers.length}})</span>
      <v-btn text :disabled="!question.locked_at"
        @click="toggleMonitorPlayerAnswers">
        <span v-if="!monitorPlayerAnswers">Show</span>
        <span v-else>Hide</span>
      </v-btn>
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

    <v-data-table :headers="headers" :items="players"
      :loading="savingScores"
      :items-per-page="-1"
      :hide-default-footer="true">
      <template v-slot:item.answer="{ item }">
        {{ getPlayerAnswer(item.id) }}
      </template>
      <template v-slot:item.score="{ item }">
        <v-text-field
          :value="getPlayerScore(item.id)"
          @change="setPlayerScore(item.id, $event)"
          hide-details>
        </v-text-field>
      </template>
    </v-data-table>

  </v-card>
</template>

<script>
export default {
  name: 'view-play-answers',
  props: {
    question: {
      type: Object
    }
  },
  computed: {
    players: function () {
      return this.$store.getters.getPlayAttendance()
    },
    currentGameQuestion: function () {
      return this.$store.getters.getPlayCurrentQuestion()
    },
    monitorPlayerAnswers: function () {
      return this.$store.state.monitor.playerAnswers
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
    question: function (n, o) {
      if (o.id != n.id) {
        this.getAnswers()
      }
    }
  },
  methods: {
    getAnswers: function () {
      if (this.loopingRequest != null) {
        clearInterval(this.loopingRequest)
      }
      if (!this.question.locked_at) {
        this.loopingRequest = setInterval(this.getAnswers, 1000)
        console.log('looping')
      }
      this.$api.question.getSubmittedAnswers(this.question.id)
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
          await this.$api.answer.saveScore(answer.id, answer.score)
        }
        this.$store.dispatch('play-refresh-scores')
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
    getPlayerAnswer: function (player_id) {
      for (let answer of this.answers) {
        if (answer.attendance_id == player_id) {
          return answer.answer
        }
      }
      return ''
    },
    getPlayerScore: function (player_id) {
      for (let answer of this.answers) {
        if (answer.attendance_id == player_id) {
          return answer.score
        }
      }
      return 0
    },
    setPlayerScore: function (player_id, score) {
      for (let answer of this.answers) {
        if (answer.attendance_id == player_id) {
          answer.score = score
        }
      }
      return 0
    },
    toggleMonitorPlayerAnswers: function () {
      this.$store.dispatch('monitor-player-answers', !this.monitorPlayerAnswers)
    },
  }
}
</script>
