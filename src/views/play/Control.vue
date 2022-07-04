<template>
  <div id="biblequiz-play">

    <div class="title my-5">
      Playing Game #{{ game.id }} {{ game.title }} - {{ game.date | formatDate }}
    </div>

    <v-row>
      <v-col lg="6">
        <CurrentQuestion/>
      </v-col>
      <v-col lg="3">
        <Scores :game_id="game.id"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import store from '@/store'
import CurrentQuestion from './CurrentQuestion'
import Scores from './Scores'

export default {
  name: 'view-play',
  props: {
    game_id: {
      type: String
    }
  },
  components: {
    CurrentQuestion,
    Scores
  },
  computed: {
    game: () => store.getters.getPlayGame()
  },
  beforeMount () {
    store.dispatch('play-game', { game_id: this.game_id })
  },
  methods: {
  }
}
</script>
