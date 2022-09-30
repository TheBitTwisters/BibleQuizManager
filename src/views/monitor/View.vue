<template>
  <div id="biblequiz-monitor" class="fill-height" style="width: 100%;">

    <PlayerAnswers v-if="showPlayerAnswers"/>
    <Question v-else-if="showQuestion"/>
    <Gamescores v-else-if="showGame"/>
    <Totalscores v-else/>

  </div>
</template>

<script>
import Question from './Question'
import Gamescores from './Gamescores'
import Totalscores from './Totalscores'
import PlayerAnswers from './PlayerAnswers'

export default {
  name: 'view-monitor',
  components: {
    Question,
    Gamescores,
    Totalscores,
    PlayerAnswers
  },
  computed: {
    showGame: function () {
      return this.$store.state.monitor.game
    },
    showQuestion: function () {
      return this.$store.state.monitor.question
    },
    showPlayerAnswers: function () {
      return this.$store.state.monitor.playerAnswers
    }
  }
}
</script>

<style>
</style>
