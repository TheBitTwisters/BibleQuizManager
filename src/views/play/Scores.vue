<template>
  <div id="biblequiz-play-scores">

    <v-card>
      <v-card-title>
        Scores
      </v-card-title>
      <v-list v-if="topTenOnly">
        <div v-for="topScore of topTenScores" :key="topScore.player_id">
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title class="d-flex font-weight-bold title">
              <span>{{ getPlayerByID(topScore.player_id).name }}</span>
              <v-spacer></v-spacer>
              <span>{{ topScore.score }}</span>
            </v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
      <v-data-table v-else :headers="headers"
        :items="scores" :loading="loadingScores">
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
      type: Number
    },
    topTenOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    topTenScores: function () {
      var scores = []
      for (let score of this.scores) {
        if (scores.length > 10) {
          break
        }
        scores.push(score)
      }
      return scores
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
