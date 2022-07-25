<template>
  <div id="biblequiz-monitor" class="fill-height" style="width: 100%;">

    <Question v-if="showQuestion"/>

    <v-row v-else class="fill-height" align="center" justify="center">
      <v-col md="7" lg="8">
        <Title/>
      </v-col>
      <v-col md="5" lg="4" v-if="showScores">
        <Scores/>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import store from '@/store'
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
    game: () => store.getters.getPlayGame(),
    showScores: () => store.state.monitor.scores,
    showGame: () => store.state.monitor.game,
    showQuestion: () => store.state.monitor.question
  },
  methods: {
  }
}
</script>

<style>
</style>
