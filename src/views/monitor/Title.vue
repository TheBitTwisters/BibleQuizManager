<template>
  <div id="view-monitor-title">

    <v-card>
      <v-card-title v-if="monitorGame">
        <div class="title">
          {{ game.title }}
        </div>
      </v-card-title>
      <v-card-subtitle>
        <div class="text-h1">
          Bible Quiz
        </div>
      </v-card-subtitle>
    </v-card>

  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'view-monitor-title',
  computed: {
    game: () => store.getters.getPlayGame(),
    monitorGame: () => store.state.monitor.game
  }
}
</script>
