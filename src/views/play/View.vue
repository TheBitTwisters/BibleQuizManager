<template>
  <v-row>
    <v-col md="3">
      <Panel/>
    </v-col>
    <v-col md="6">
      <Questions/>
    </v-col>
    <v-col md="3">
      <Players/>
    </v-col>
  </v-row>
</template>

<script>
import Panel from './Panel'
import Questions from './Questions'
import Players from './Players'

export default {
  name: 'view-play',
  components: {
    Panel,
    Questions,
    Players
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
