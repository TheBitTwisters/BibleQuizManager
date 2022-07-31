<template>
  <div id="biblequiz-play">

    <v-row>
      <v-col md="3">
        <Players/>
      </v-col>
      <v-col md="6" lg="7">
        <Questions/>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import Questions from './Questions'
import Players from './Players'

export default {
  name: 'view-play',
  components: {
    Questions,
    Players
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
