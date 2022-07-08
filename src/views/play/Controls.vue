<template>
  <div id="biblequiz-play-controls">

    <v-card>
      <v-card-title>
        Monitor Controls
      </v-card-title>
      <v-card-text>
        <v-divider></v-divider>
        <v-switch label="Show Scores"
          :input-value="monitorScores"
          @click="toggleMonitorScores"
          inset>
        </v-switch>
        <v-divider></v-divider>
        <v-switch label="Show Game"
          :input-value="monitorGame"
          @click="toggleMonitorGame"
          inset>
        </v-switch>
        <v-divider></v-divider>
        <v-switch label="Show Question"
          :input-value="monitorQuestion"
          @click="toggleMonitorQuestion"
          inset>
        </v-switch>
        <v-divider></v-divider>
        <v-switch label="Show Choices"
          :input-value="monitorChoices"
          @click="toggleMonitorChoices"
          inset>
        </v-switch>
        <v-divider></v-divider>
        <v-switch label="Show Answer"
          :input-value="monitorAnswer"
          @click="toggleMonitorAnswer"
          inset>
        </v-switch>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'view-play-controls',
  computed: {
    monitorScores: () => store.state.monitor.scores,
    monitorGame: () => store.state.monitor.game,
    monitorQuestion: () => store.state.monitor.question,
    monitorChoices: () => store.state.monitor.choices,
    monitorAnswer: () => store.state.monitor.answer
  },
  methods: {
    toggleMonitorScores: function () {
      store.dispatch('monitor-scores', !this.monitorScores)
    },
    toggleMonitorGame: function () {
      store.dispatch('monitor-game', !this.monitorGame)
    },
    toggleMonitorQuestion: function () {
      store.dispatch('monitor-question', !this.monitorQuestion)
    },
    toggleMonitorChoices: function () {
      store.dispatch('monitor-choices', !this.monitorChoices)
    },
    toggleMonitorAnswer: function () {
      store.dispatch('monitor-answer', !this.monitorAnswer)
    }
  }
}
</script>
