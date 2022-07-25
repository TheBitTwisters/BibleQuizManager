<template>
  <div id="biblequiz-play">

    <v-row>
      <v-col md="3" lg="2">
        <Controls/>
      </v-col>
      <v-col md="6" lg="7">
        <Questions/>
      </v-col>
      <v-col md="3">
        <Scores/>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Controls from './Controls'
import Questions from './Questions'
import Scores from './Scores'

export default {
  name: 'view-play',
  components: {
    Controls,
    Questions,
    Scores
  },
  computed: {
    game: () => this.$store.state.play.game,
    ...mapGetters([
      'hasPlayGame'
    ])
  },
  mounted () {
    if (!this.hasPlayGame()) {
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
