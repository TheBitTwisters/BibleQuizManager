<template>
  <div id="biblequiz-play-scores">

    <v-card>
      <v-card-title>
        Scores
      </v-card-title>
      <v-data-table :headers="headers" :items="scores" :loading="loadingScores">
        <template v-slot:item.player_id="{ item }">
          {{ getPlayerByID(item.player_id).name }}
        </template>
      </v-data-table>
    </v-card>

  </div>
</template>

<script>
import store from '@/store'
import apiScores from '@/api/scores'

export default {
  name: 'view-play-scores',
  props: {
    game_id: {
      type: String
    }
  },
  data: () => ({
    loadingScores: false,
    headers: [
      {
        text: 'Player',
        value: 'player_id'
      },
      {
        text: 'Score',
        value: 'score',
      }
    ],
    scores: []
  }),
  mounted () {
    this.getScores()
  },
  methods: {
    getScores: function () {
      this.loadingScores = true
      apiScores.getGameScores({ game_id: this.game_id })
        .then(response => {
          this.scores = response.scores
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loadingScores = false
        })
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
