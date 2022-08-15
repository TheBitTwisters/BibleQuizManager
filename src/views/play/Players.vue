<template>
  <v-card>

    <v-card-title>
      Players ({{ players.length }})
    </v-card-title>

    <v-divider></v-divider>

    <v-data-table :headers="headers" :items="scores"
      :loading="loadingScores"
      :items-per-page="-1"
      :hide-default-footer="true">
      <template v-slot:item.order="{ index }">
        {{ index + 1 | formatOrdinal }}
      </template>
      <template v-slot:item.score="{ item }">
        {{ item.score || 0 }}
      </template>
    </v-data-table>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn text @click="formAttendance.show = true">Set Attendance</v-btn>
    </v-card-actions>

    <v-dialog v-model="formAttendance.show" max-width="760">
      <Attendance/>
    </v-dialog>

  </v-card>
</template>

<script>
import Attendance from './Attendance'
import apiGames from '@/api/games'

export default {
  name: 'view-play-scores',
  components: {
    Attendance
  },
  computed: {
    game: function () {
      return this.$store.getters.getPlayGame()
    },
    players: function () {
      return this.$store.getters.getPlayAttendance()
    }
  },
  data: () => ({
    loadingScores: false,
    headers: [
      {
        text: '#',
        value: 'order'
      },
      {
        text: 'Player',
        value: 'name'
      },
      {
        text: 'Score',
        value: 'score',
      }
    ],
    scores: [],
    answers: [],
    formAttendance: {
      show: false
    }
  }),
  mounted () {
    this.getScores()
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
      for (let player of this.players) {
        if (player.id == player_id) {
          return player
        }
      }
      return { name: 'Player' }
    }
  }
}
</script>
