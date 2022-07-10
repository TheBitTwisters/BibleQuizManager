<template>
  <div id="biblequiz-play">

    <div class="title my-5">
      Playing Game #{{ game.id }} "{{ game.title }}" - {{ game.date | formatDate }}
    </div>

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
import store from '@/store'
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
    game: () => store.state.play.game
  },
  mounted () {
    store.commit('SET_APP_DRAWER', false)
  },
  methods: {
  }
}
</script>
