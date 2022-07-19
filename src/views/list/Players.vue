<template>
  <div id="biblequiz-players">

    <v-card class="mb-5">
      <v-card-title>
        Players
      </v-card-title>
      <v-data-table :headers="headers" :items="players"
        :loading="loadingItems"
        :items-per-page="-1"
        :hide-default-footer="false">
        <template v-slot:item.fullname="{ item }">
          {{ item.first_name + ' ' + item.last_name }}
        </template>
        <template v-slot:item.joined_at="{ item }">
          {{ item.joined_at | formatDate }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn text small color="primary"
            @click="editPlayer(item)">
            <v-icon left>mdi-pencil</v-icon>
            Edit
          </v-btn>
        </template>
      </v-data-table>
      <v-card-actions>
        <v-btn plain color="primary" @click="newPlayer">New Player</v-btn>
      </v-card-actions>
    </v-card>

    <!-- Player details dialog -->
    <v-dialog v-model="form.show" persistent max-width="360">
      <v-card>
        <v-card-title>
          Player
        </v-card-title>
        <v-card-text>
          <v-form v-model="form.valid" @submit.prevent="savePlayer">

            <v-text-field label="Name"
              v-model="form.data.name"
              outlined required counter maxlength="64">
            </v-text-field>
            <v-text-field label="Last name"
              v-model="form.data.last_name"
              outlined required counter maxlength="32">
            </v-text-field>
            <v-text-field label="First name"
              v-model="form.data.first_name"
              outlined required counter maxlength="32">
            </v-text-field>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="!form.valid" @click="savePlayer">
            Save
          </v-btn>
          <v-btn @click="form.show = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import store from '@/store'
import apiPlayers from '@/api/players'

export default {
  name: 'view-players-list',
  data: () => ({
    loadingItems: false,
    headers: [
      {
        text: 'Name',
        value: 'name'
      },
      {
        text: 'Fullname',
        value: 'fullname'
      },
      {
        text: 'Date joined',
        value: 'joined_at',
      },
      {
        text: 'Actions',
        value: 'actions'
      }
    ],
    players: [],
    form: {
      data: {
        id: 0,
        name: '',
        last_name: '',
        first_name: ''
      },
      show: false,
      valid: false,
      submitting: false,
      success: false
    },
  }),
  mounted () {
    this.getPlayers()
  },
  methods: {
    getPlayers: function () {
      this.loadingItems = true
      apiPlayers.getAll()
        .then(response => {
          this.players = response.players
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loadingItems = false
        })
    },
    newPlayer: function () {
      this.form.submitting = false
      this.form.success = false
      this.form.data = {
        id: 0,
        name: '',
        last_name: '',
        first_name: ''
      }
      this.form.show = true
    },
    editPlayer: function (player) {
      this.form.submitting = false
      this.form.success = false
      this.form.data = {
        id: player.id,
        name: player.name,
        last_name: player.last_name,
        first_name: player.first_name
      }
      this.form.show = true
    },
    savePlayer: async function () {
      this.form.submitting = true
      try {
        var response = {}
        if (this.form.data.id > 0) {
          response = await apiPlayers.update({
            player_id: this.form.data.id,
            name: this.form.data.name,
            last_name: this.form.data.last_name,
            first_name: this.form.data.first_name
          })
        } else {
          response = await apiPlayers.create(this.form.data)
        }
        store.commit('SHOW_SNACKBAR', {
          status: 'success',
          message: response.message
        })
        this.form.data.id = response.player.id
        if (!response.err) {
          this.form.show = false
          this.getPlayers()
        }
      } catch(err) {
        console.log(err)
        store.commit('SHOW_SNACKBAR', {
          status: 'error',
          message: err.message
        })
      } finally {
        this.form.submitting = false
      }
    }
  }
}
</script>
