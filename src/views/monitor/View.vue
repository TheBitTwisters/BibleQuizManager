<template>
  <div id="biblequiz-play-monitor">
    <v-responsive :aspect-ratio="16/9">
      <v-row class="fill-height">

        <v-col lg="8">
          <Question v-if="showQuestion"/>
        </v-col>

        <v-col lg="4">
          <Scores v-if="showScores"/>
        </v-col>

      </v-row>
    </v-responsive>
  </div>
</template>

<script>
import store from '@/store'
import Question from './Question'
import Scores from './Scores'

export default {
  name: 'view-monitor',
  components: {
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
