<template>
  <div id="biblequiz-play-monitor">

    <div class="title my-5">
      {{ game.title }} - {{ game.date | formatDate }}
    </div>

    <v-row>
      <v-col lg="8">
        <QuestionBoard/>
      </v-col>
      <v-col lg="4">
        <Scores :game_id="game.id" topTenOnly/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import store from '@/store'
import QuestionBoard from './QuestionBoard'
import Scores from './Scores'

export default {
  name: 'view-play-monitor',
  components: {
    QuestionBoard,
    Scores
  },
  computed: {
    game: () => store.getters.getPlayGame(),
    showQuestion: () => store.getters.shouldMonitorShowQuestion()
  },
  methods: {
  }
}
</script>
