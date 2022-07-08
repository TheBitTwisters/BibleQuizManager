<template>
  <div id="biblequiz-play">

    <div class="title my-5">
      Playing Game #{{ game.id }} "{{ game.title }}" - {{ game.date | formatDate }}
    </div>

    <v-row>
      <v-col lg="2">
        <Controls/>
      </v-col>
      <v-col lg="8">
        <CurrentQuestion/>
      </v-col>
      <v-col lg="2">
        <Scores/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import store from '@/store'
import Controls from './Controls'
import CurrentQuestion from './CurrentQuestion'
import Scores from './Scores'

export default {
  name: 'view-play',
  components: {
    Controls,
    CurrentQuestion,
    Scores
  },
  computed: {
    game: () => store.state.play.game
  },
  mounted () {
    store.commit('SET_APP_DRAWER', false)
  },
  methods: {
  }
}
</script>
