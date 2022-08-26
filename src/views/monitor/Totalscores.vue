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

    </v-col>
    <v-col md="6" class="fill-height black">

      <v-list class="d-flex flex-column justify-space-between fill-height py-0" style="background: black;">
        <div v-for="(score, index) in topTenScores" :key="score.name">
          <v-list-item class="px-3 white" :class="getRankColor(index)">
            <v-list-item-icon>
              <v-chip outlined
                class="align-center justify-center font-weight-black"
                style="height: 50px; min-width: 85px; font-size: 3vh;">
                {{ index + 1 }}<sup>{{ index + 1 | formatOrdinalOnly }}</sup>
              </v-chip>
            </v-list-item-icon>
            <v-list-item-content class="py-0 font-weight-bold" style="font-size: 4vh;">
              {{ score.name }}
            </v-list-item-content>
            <v-list-item-action class="align-center my-1 mr-0 justify-end font-weight-black" style="min-width: 64px; font-size: 4.5vh;">
              {{ score.score || 0 }}
            </v-list-item-action>
          </v-list-item>
          <v-divider v-if="index < 9" style="border-width: medium; border-color: black;"></v-divider>
        </div>
      </v-list>

    </v-col>
  </v-row>
</template>

<script>
import apiScores from '@/api/scores'

export default {
  name: 'view-monitor-totalscores',
  computed: {
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
      apiScores.getTotalScores()
        .then(data => {
          this.scores = data.scores
        }).catch(err => {
          console.log(err)
        })
    },
    getPlayerByID: function (player_id) {
      for (let player of this.$store.state.play.players) {
        if (player.id == player_id) {
          return player
        }
      }
      return { name: 'Player' }
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
