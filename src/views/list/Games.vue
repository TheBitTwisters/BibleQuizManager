<template>
  <div id="biblequiz-games">

    <v-card class="mb-5">
      <v-card-title>
        Games
      </v-card-title>
      <v-data-table :headers="headers" :items="games" :loading="loadingItems">
        <template v-slot:item.date="{ item }">
          {{ item.date | formatDate }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn text small color="primary"
            @click="editGame(item)">
            <v-icon left>mdi-pencil</v-icon>
            Edit
          </v-btn>
          <v-btn text small color="primary"
            :to="`/game/${item.id}/questions`">
            <v-icon left>mdi-pencil</v-icon>
            Questions
          </v-btn>
          <v-btn text small color="primary"
            @click="playGame(item.id)">
            <v-icon left>mdi-play</v-icon>
            Play
          </v-btn>
        </template>
      </v-data-table>
      <v-card-actions>
        <v-btn plain color="primary" @click="newGame">New Game</v-btn>
      </v-card-actions>
    </v-card>

    <!-- Game details dialog -->
    <v-dialog v-model="form.show" persistent max-width="360">
      <v-card>
        <v-card-title>
          Game
        </v-card-title>
        <v-card-text>
          <v-form v-model="form.valid" @submit.prevent="saveGame">

            <v-text-field label="Title"
              v-model="form.data.title"
              outlined required counter maxlength="64">
            </v-text-field>
            <v-date-picker
              v-model="form.data.date"
              full-width show-adjacent-months>
            </v-date-picker>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="!form.valid" @click="saveGame">
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

export default {
  name: 'view-games-list',
  data: () => ({
    loadingItems: false,
    headers: [
      {
        text: 'Title',
        value: 'title'
      },
      {
        text: 'Date',
        value: 'date',
      },
      {
        text: 'Actions',
        value: 'actions'
      }
    ],
    games: [],
    form: {
      data: {
        id: 0,
        title: '',
        date: ''
      },
      show: false,
      valid: false,
      submitting: false,
      success: false
    },
  }),
  mounted () {
    this.getGames()
  },
  methods: {
    getGames: function () {
      this.loadingItems = true
      this.$api.games.getAll()
        .then(response => {
          this.games = response.games
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loadingItems = false
        })
    },
    newGame: function () {
      this.form.submitting = false
      this.form.success = false
      this.form.data = {
        id: 0,
        title: '',
        date: ''
      }
      this.form.show = true
    },
    editGame: function (game) {
      this.form.submitting = false
      this.form.success = false
      this.form.data = {
        id: game.id,
        title: game.title,
        date: game.date
      }
      this.form.data.date = moment(game.date).format('YYYY-MM-DD')
      this.form.show = true
    },
    saveGame: async function () {
      this.form.submitting = true
      try {
        var response = await this.$api.games.update(this.form.data)
        this.$store.commit('SHOW_SNACKBAR', {
          status: 'success',
          message: response.message
        })
        if (!response.err) {
          this.form.show = false
          this.getGames()
        }
      } catch(err) {
        console.log(err)
        this.$store.commit('SHOW_SNACKBAR', {
          status: 'error',
          message: err.message
        })
      } finally {
        this.form.submitting = false
      }
    },
    playGame: function (game_id) {
      this.$store.dispatch('play-game', { game_id: game_id })
    }
  }
}
</script>
