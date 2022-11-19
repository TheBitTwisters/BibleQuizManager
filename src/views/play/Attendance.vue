<template>
  <v-card>
    <v-card-title>
      Attendance
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col md="6">
          <v-data-table :headers="headers" :items="players"
            :items-per-page="-1"
            :hide-default-footer="true"
            disable-sort>
          </v-data-table>
        </v-col>
        <v-col md="6">
          <div>Add player</div>
          <v-form v-model="form.valid" @submit.prevent="saveMemberGroup">

            <v-radio-group v-model="form.data.type" row mandatory>
              <v-radio label="Group" value="group"></v-radio>
              <v-radio label="Individual" value="individual"></v-radio>
            </v-radio-group>
            <v-select :items="playersSelection" label="Select group"
              v-model="form.data.player_id" @change="groupSelected"
              :item-text="form.data.type == 'group' ? 'name':'fullname'" item-value="id"
              outlined required dense>
            </v-select>
            <v-text-field label="Display name"
              v-model="form.data.name"
              dense outlined required counter maxlength="16">
            </v-text-field>
            <v-text-field label="Access name"
              v-model="form.data.pass"
              dense outlined required counter maxlength="16">
            </v-text-field>

            <v-btn :disabled="!form.valid" color="primary" @click="addPlayer">
              Add
            </v-btn>

          </v-form>
        </v-col>
      </v-row>
    </v-card-text>

  </v-card>
</template>

<script>
import apiGames from '@/api/games'
import apiPlayers from '@/api/players'

export default {
  name: 'view-play-attendance',
  computed: {
    game: function () {
      return this.$store.getters.getPlayGame()
    },
    players: function () {
      return this.$store.getters.getPlayAttendance()
    },
    playersSelection: function () {
      switch (this.form.data.type) {
        case 'group':
          return this.groups
        case 'individual':
          return this.members
      }
      return []
    }
  },
  data: () => ({
    loadingPlayers: false,
    headers: [
      {
        text: 'Player',
        value: 'name'
      },
      {
        text: 'Access name',
        value: 'pass',
      }
    ],
    groups: [],
    members: [],
    form: {
      valid: false,
      data: {
        game_id: 0,
        type: 'group',
        player_id: null,
        name: '',
        pass: ''
      }
    }
  }),
  mounted () {
    this.getPlayers()
  },
  methods: {
    getPlayers: function () {
      this.loadingPlayers = true
      apiPlayers.getAll()
        .then(response => {
          this.groups = response.groups
          this.members = response.members
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loadingPlayers = false
        })
    },
    addPlayer: function () {
      if (this.form.data.player_id > 0) {
        this.form.data.game_id = this.game.id
        apiGames.addPlayer(this.form.data)
        .then(response => {
            if (!response.err) {
              this.form.data = {
                game_id: this.game.id,
                type: 'group',
                player_id: null,
                name: '',
                pass: ''
              }
              this.$store.commit('SHOW_SNACKBAR', {
                status: 'success',
                message: response.message
              })
              this.$store.commit('SET_PLAY_ATTENDANCE', response.players)
            }
          }).catch(err => {
            console.log(err)
            this.$store.commit('SHOW_SNACKBAR', {
              status: 'error',
              message: err.message
            })
          })
      }
    },
    groupSelected: function () {
      switch (this.form.data.type) {
        case 'group':
          for (let group of this.groups) {
            if (group.id == this.form.data.player_id) {
              this.form.data.name = group.name
              this.form.data.pass = group.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
            }
          }
          break
        case 'individual':
          for (let member of this.members) {
            if (member.id == this.form.data.player_id) {
              this.form.data.name = member.fullname
              this.form.data.pass = member.fullname.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
            }
          }
          break
      }
    }
  }
}
</script>
