<template>
  <v-row>

    <v-col>
      <v-card class="mb-3">
        <v-card-title>
          Game Details
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div>{{ game.title }}</div>
          <div>{{ game.date | formatDate }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn text
            @click="toggleMonitorGame">
            <span v-if="!monitorGame">Show Game</span>
            <span v-else>Hide Game</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col>
      <v-card class="mb-3" v-if="game.current_question_id > 0">
        <v-card-title>
          Current Question #{{ question.order }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div>{{ question.level.name }}</div>
          <div>{{ question.type.name }}</div>
          <div>{{ question.score }} PTS</div>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="!isCurrentQuestionLast" text @click="nextQuestion">
            Next question
          </v-btn>
          <v-btn v-else text @click="formFinalScore.show = true">
            Finish Game
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="mb-3" v-if="game.current_question_id == 0">
        <v-card-actions>
          <v-btn text @click="nextQuestion">
            Start question
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-dialog v-model="formFinalScore.show" max-width="480">
      <v-card>

        <v-card-title>
          Save game score
        </v-card-title>

        <v-data-table :headers="formFinalScore.headers" :items="finalScore"
          :items-per-page="-1"
          :hide-default-footer="true">
          <template v-slot:item.score="{ item }">
            <v-text-field v-model="item.score" hide-details></v-text-field>
          </template>
        </v-data-table>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text
            @click="submitFinalScore">
            Submit scores
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

  </v-row>
</template>

<script>
export default {
  name: 'view-play-panel',
  computed: {
    monitorGame: function () {
      return this.$store.state.monitor.game
    },
    game: function () {
      return this.$store.getters.getPlayGame()
    },
    question: function () {
      return this.$store.getters.getPlayCurrentQuestion()
    },
    isCurrentQuestionLast: function () {
      var questions = this.$store.getters.getPlayQuestions()
      if (questions.length > 0) {
        var lastQuestion = questions[questions.length - 1]
        return lastQuestion.id == this.question.id
      }
      return false
    },
    finalScore: function () {
      var groups = []
      for (let player of this.$store.getters.getPlayAttendance()) {
        for (let score of this.$store.getters.getPlayScores()) {
          if (player.id == score.player_id) {
            var group = {
              id: player.group_id,
              name: player.name,
              score: score.score
            }
            groups.push(group)
          }
        }
      }
      return groups
    }
  },
  data: () => ({
    formFinalScore: {
      headers: [
        {
          text: 'Group',
          value: 'name',
          width: '30%'
        },
        {
          text: 'Score',
          value: 'score',
          width: '20%'
        }
      ],
      show: false
    }
  }),
  methods: {
    nextQuestion: function () {
      this.$store.dispatch('play-next-question')
    },
    toggleMonitorGame: function () {
      this.$store.dispatch('monitor-game', !this.monitorGame)
    },
    submitFinalScore: function () {
      this.$store.dispatch('play-finish-game', { groups: this.finalScore })
    }
  }
}
</script>
