<template>
  <div id="biblequiz-monitor-scores">

    <v-card>
      <v-card-title>
        Scores
      </v-card-title>
      <v-list>
        <div v-for="topScore of topTenScores" :key="topScore.player_id">
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title class="d-flex font-weight-bold title">
              <span>{{ getPlayerByID(topScore.player_id).fullname }}</span>
              <v-spacer></v-spacer>
              <span>{{ topScore.score }}</span>
            </v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
    </v-card>

  </div>
</template>

<script>
import store from '@/store'
import apiGames from '@/api/games'

export default {
  name: 'view-monitor-scores',
  computed: {
    monitorGame: () => store.state.monitor.game,
    game: () => store.getters.getPlayGame(),
    topTenScores: function () {
      var scores = []
      for (let score of this.scores) {
        if (scores.length == 10) {
          break
        }
        scores.push(score)
      }
      return scores
    }
  },
  data: () => ({
    scores: []
  }),
  mounted () {
    this.getScores()
  },
  methods: {
    getScores: async function () {
      try {
        var response = { scores: [] }
        if (this.monitorGame && this.game.id > 0) {
          response = await apiGames.getScores({ game_id: this.game.id })
        } else {
          response = await apiGames.getAllGamesScores()
        }
        this.scores = response.scores
      } catch (err) {
        console.error(err)
      } finally {
        var self = this
        setTimeout(function () {
          self.getScores()
        }, 2500)
      }
    },
    getPlayerByID: function (player_id) {
      for (let player of store.state.play.players) {
        if (player.id == player_id) {
          return player
        }
      }
      return { name: 'Player' }
    }
  }
}
</script>
