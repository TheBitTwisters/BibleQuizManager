<template>
  <div>

    <v-card tile>
      <v-card-text>
        <div class="text-h1">
          Bible Quiz
        </div>
        <div class="text-h5 ml-2">
          San Juan de Valdez SDA Church
        </div>
      </v-card-text>
    </v-card>

    <v-card tile color="teal" v-if="monitorGame">
      <v-card-title class="white--text flex-column align-start">
        <div class="text-h4 pa-5 pb-1">
          {{ game.title }}
        </div>
        <div class="text-h6 pb-5 pl-5">
          {{ game.date | formatDate }}
        </div>
      </v-card-title>
    </v-card>

  </div>
</template>

<script>
export default {
  name: 'view-monitor-title',
  computed: {
    game: function () {
      return this.$store.getters.getPlayGame()
    },
    monitorGame: function () {
      return this.$store.state.monitor.game
    }
  }
}
</script>
