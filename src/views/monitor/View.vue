<template>
  <div id="biblequiz-monitor" class="fill-height" style="width: 100%;">

    <Question v-if="showQuestion"/>

    <v-row v-else class="fill-height" align="center" justify="center">
      <v-col md="8">
        <Title/>
      </v-col>
      <v-col md="4">
        <Scores/>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import Title from './Title'
import Question from './Question'
import Scores from './Scores'

export default {
  name: 'view-monitor',
  components: {
    Title,
    Question,
    Scores
  },
  computed: {
    currentGame: function () {
      return this.$store.getters.getPlayGame()
    },
    showScores: function () {
      return this.$store.state.monitor.scores
    },
    showGame: function () {
      return this.$store.state.monitor.game
    },
    showQuestion: function () {
      return this.$store.state.monitor.question
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
