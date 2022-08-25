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
      <v-card class="mb-3" v-if="question != undefined">
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
          <v-btn text @click="nextQuestion">
            Next question
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="mb-3" v-else>
        <v-card-actions>
          <v-btn text @click="nextQuestion">
            Start question
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

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
    }
  },
  methods: {
    nextQuestion: function () {
      this.$store.dispatch('play-next-question')
    },
    toggleMonitorGame: function () {
      this.$store.dispatch('monitor-game', !this.monitorGame)
    }
  }
}
</script>
