<template>
  <v-row>
    <v-col md="3">
      <Panel/>
      <Monitor/>
    </v-col>
    <v-col md="6">
      <Questions/>
      <Answers/>
    </v-col>
    <v-col md="3">
      <Players/>
    </v-col>
    <v-col cols="12">

    </v-col>
  </v-row>
</template>

<script>
import Panel from './Panel'
import Monitor from './Monitor'
import Questions from './Questions'
import Players from './Players'
import Answers from './Answers'

export default {
  name: 'view-play',
  components: {
    Panel,
    Monitor,
    Questions,
    Players,
    Answers
  },
  computed: {
    game: function () {
      return this.$store.getters.getPlayGame()
    },
    question: function () {
      return this.$store.getters.getPlayCurrentQuestion()
    }
  },
  mounted () {
    this.checkGame()
  },
  methods: {
    checkGame: function () {
      if (!this.$store.getters.hasPlayGame()) {
        this.$router.push('/games')
        this.$store.commit('SHOW_SNACKBAR', {
          status: 'warning',
          message: 'Select a game to play'
        })
      }
    }
  }
}
</script>
