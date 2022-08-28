<template>
  <v-card>

    <v-card-title>
      Players ({{ scores.length }})
    </v-card-title>

    <v-divider></v-divider>

    <v-data-table :headers="headers" :items="scores"
      :items-per-page="-1"
      :hide-default-footer="true">
      <template v-slot:item.order="{ index }">
        {{ index + 1 }}<sup>{{ index + 1 | formatOrdinalOnly }}</sup>
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

export default {
  name: 'view-play-scores',
  components: {
    Attendance
  },
  computed: {
    game: function () {
      return this.$store.getters.getPlayGame()
    },
    scores: function () {
      return this.$store.getters.getPlayScores()
    }
  },
  data: () => ({
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
    formAttendance: {
      show: false
    }
  }),
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
