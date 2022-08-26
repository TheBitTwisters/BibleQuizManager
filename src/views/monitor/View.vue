<template>
  <div id="biblequiz-monitor" class="fill-height" style="width: 100%;">

    <Question v-if="showQuestion"/>
    <Gamescores v-else-if="showGame"/>
    <Totalscores v-else/>

  </div>
</template>

<script>
import Question from './Question'
import Gamescores from './Gamescores'
import Totalscores from './Totalscores'

export default {
  name: 'view-monitor',
  components: {
    Question,
    Gamescores,
    Totalscores
  },
  computed: {
    showGame: function () {
      return this.$store.state.monitor.game
    },
    showQuestion: function () {
      return this.$store.state.monitor.question
    }
  }
}
</script>

<style>
</style>
