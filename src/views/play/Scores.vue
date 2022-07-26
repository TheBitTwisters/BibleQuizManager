<template>
  <div id="biblequiz-play-scores">

    <v-card>
      <v-card-title>
        Scores
      </v-card-title>
      <v-data-table :headers="headers"
        :items="scores" :loading="loadingScores">
        <template v-slot:item.player_id="{ item }">
          {{ getPlayerByID(item.player_id).fullname }}
        </template>
      </v-data-table>
    </v-card>

  </div>
</template>

<script>
import store from '@/store'
import apiGames from '@/api/games'

export default {
  name: 'view-play-scores',
  computed: {
    game: () => store.state.play.game
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
      },
      {
        text: 'Answer',
        value: 'answer'
      }
    ],
    scores: [],
    answers: []
  }),
  mounted () {
    this.getScores()
    this.checkAnswers()
  },
  methods: {
    getScores: function () {
      this.loadingScores = true
      apiGames.getScores({ game_id: this.game.id })
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
