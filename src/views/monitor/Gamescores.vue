<template>
  <v-row class="fill-height mt-0 mr-0" align="center" justify="center">
    <v-col md="6">

      <div class="mb-3">
        <div class="text-h1">
          Bible Quiz
        </div>
        <div class="text-h5 ml-2">
          San Juan de Valdez SDA Church
        </div>
      </div>
      <v-card tile color="teal">
        <v-card-title class="white--text flex-column align-start">
          <div class="pa-5 pb-1" style="font-size: 5vh;">
            {{ game.title }}
          </div>
          <div class="px-5 py-3" style="font-size: 3vh;">
            {{ game.date | formatDate }}
          </div>
        </v-card-title>
      </v-card>

    </v-col>
    <v-col md="6" class="fill-height black">

      <v-list class="d-flex flex-column justify-space-between fill-height py-0" style="background: black;">
        <div v-for="(score, index) in scores" :key="score.name">
          <template v-if="index < 10">
            <v-list-item class="px-3 white" :class="getRankColor(index)">
              <v-list-item-icon class="my-2">
                <v-chip outlined
                  class="align-center justify-center font-weight-black"
                  style="height: 50px; min-width: 85px; font-size: 4vh;">
                  {{ index + 1 }}<sup>{{ index + 1 | formatOrdinalOnly }}</sup>
                </v-chip>
              </v-list-item-icon>
              <v-list-item-content
                class="py-0 font-weight-bold"
                style="font-size: 5vh; line-height: 1.1;">
                {{ score.name }}
              </v-list-item-content>
              <v-list-item-action
                class="align-center my-1 mr-0 justify-end font-weight-black"
                style="min-width: 64px; font-size: 7vh; line-height: 1;">
                {{ score.score || 0 | numeric }}
              </v-list-item-action>
            </v-list-item>
            <v-divider v-if="index < 9" style="border-width: medium; border-color: black;"></v-divider>
          </template>
        </div>
      </v-list>

    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'view-monitor-gamescores',
  computed: {
    game: function () {
      return this.$store.getters.getPlayGame()
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
    },
    getRankColor: function (index) {
      if (index == 0)
        return 'amber'
      else if (index == 1)
        return 'grey lighten-1'
      else if (index == 2)
        return 'brown lighten-3'
      return ''
    }
  }
}
</script>

<style>
.v-list div:empty {
  display: none;
}
</style>
