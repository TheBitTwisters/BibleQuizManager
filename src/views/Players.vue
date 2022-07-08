<template>
  <div id="biblequiz-players">

    <v-card class="mb-5">
      <v-card-title>
        Players
      </v-card-title>
      <v-data-table :headers="headers" :items="players"
        :loading="loadingItems"
        items-per-page="-1"
        hide-default-footer="false">
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
            <v-text-field label="Full Name"
              v-model="form.data.fullname"
              outlined required counter maxlength="255">
            </v-text-field>

            <v-alert v-if="form.message != ''" dense>
              {{ form.message }}
            </v-alert>

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
import moment from 'moment'
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
        active: 0,
        name: '',
        fullname: ''
      },
      show: false,
      valid: false,
      submitting: false,
      message: '',
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
      this.form.message = ''
      this.form.success = false
      this.form.data = {
        active: 0,
        title: '',
        date: ''
      }
      this.form.show = true
    },
    editPlayer: function (player) {
      this.form.submitting = false
      this.form.message = ''
      this.form.success = false
      this.form.data = player
      this.form.data.date = moment(player.date).format('YYYY-MM-DD')
      this.form.show = true
    },
    savePlayer: function () {
      this.form.submitting = true
      this.form.message = ''
      apiPlayers.savePlayer(this.form.data)
        .then(data => {
          if (!data.err) {
            this.form.show = false
            this.getPlayers()
          }
        })
        .catch(err => {
          console.log(err)
          this.form.message = err.message
        })
        .finally(() => {
          this.form.submitting = false
        })
    }
  }
}
</script>
