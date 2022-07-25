<template>
  <div id="biblequiz-play">

    <v-row>
      <v-col md="3">
        <Scores/>
      </v-col>
      <v-col md="6" lg="7">
        <Questions/>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import Questions from './Questions'
import Scores from './Scores'

export default {
  name: 'view-play',
  components: {
    Questions,
    Scores
  },
  mounted () {
    if (!this.$store.getters.hasPlayGame()) {
      this.$router.push('/games')
      this.$store.commit('SHOW_SNACKBAR', {
        status: 'warning',
        message: 'Select a game to play'
      })
    }
  },
  methods: {
  }
}
</script>
