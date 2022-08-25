<template>
  <v-card>
    <v-card-title>
      {{ monitorGame ? 'Scores' : 'Total Scores' }}
    </v-card-title>
    <v-list>
      <div v-for="(score, index) in scores" :key="score.name">
        <template v-if="index < 10">
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-icon>
              {{ index + 1 }}<sup>{{ index + 1 | formatOrdinalOnly }}</sup>
            </v-list-item-icon>
            <v-list-item-content>
              {{ getPlayerName(score.player_id) }}
            </v-list-item-content>
            <v-list-item-action>
              {{ score.score || 0 }}
            </v-list-item-action>
          </v-list-item>
        </template>
      </div>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'view-monitor-scores',
  computed: {
    monitorGame: function () {
      return this.$store.state.monitor.game
    },
    scores: function () {
      return this.$store.getters.getPlayScores()
    }
  },
  mounted () {
    this.$store.dispatch('play-refresh-scores')
  },
  methods: {
    getPlayerName: function (player_id) {
      for (let player of this.$store.getters.getPlayAttendance()) {
        if (player_id == player.id) {
          return player.name
        }
      }
      return '-'
    }
  }
}
</script>
