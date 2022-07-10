<template>
  <div id="biblequiz-play-monitor" class="fill-height">
    <v-row class="fill-height secondary" align="center" justify="center">

      <v-col md="7" lg="8">
        <Question v-if="showQuestion"/>
        <Title v-else/>
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
