<template>
  <div id="biblequiz-questions">

    <div class="title my-5">
      Game #{{ game.id }} {{ game.title }} - {{ game.date | formatDate }}
    </div>

    <v-card>
      <v-card-title>
        Questions
      </v-card-title>
      <v-data-table :headers="headers" :items="questions" :loading="loadingItems">
        <template v-slot:item.date="{ item }">
          {{ item.date | formatDate }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn text small color="primary"
            @click="editQuestion(item)">
            <v-icon left>mdi-pencil</v-icon>
            Edit
          </v-btn>
        </template>
      </v-data-table>
      <v-card-actions>
        <v-btn plain color="primary" @click="newQuestion">New</v-btn>
      </v-card-actions>
    </v-card>

    <!-- Question details dialog -->
    <v-dialog v-model="form.show" persistent max-width="360">
      <v-card>
        <v-card-title>
          Question
        </v-card-title>
        <v-card-text>
          <v-form v-model="form.valid" @submit.prevent="saveQuestion">

            <v-select label="Level"
              :items="levels"
              v-model="form.data.level_id"
              required>
            </v-select>
            <v-date-picker
              v-model="form.data.date"
              full-width show-adjacent-months>
            </v-date-picker>

            <v-alert v-if="form.message != ''" dense>
              {{ form.message }}
            </v-alert>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="!form.valid" @click="saveQuestion">
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
import apiQuestions from '@/api/questions'

export default {
  name: 'view-questions-list',
  props: {
    game_id: {
      type: String
    }
  },
  data: () => ({
    loadingItems: false,
    headers: [
      {
        text: 'Question',
        value: 'question'
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
    game: {},
    levels: [],
    quest_types: [],
    questions: [],
    form: {
      data: {
        active: 0,
        game_id: 0,
        level_id: 0,
        type_id: 0,
        question: '',
        score: 1
      },
      show: false,
      valid: false,
      submitting: false,
      message: '',
      success: false
    },
  }),
  mounted () {
    this.getQuestions()
  },
  methods: {
    getQuestions: function () {
      this.loadingItems = true
      apiQuestions.getGameQuestions({ game_id: this.game_id })
        .then(response => {
          this.game = response.game
          this.levels = response.levels
          this.quest_types = response.quest_types
          this.questions = response.questions
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loadingItems = false
        })
    },
    newQuestion: function () {
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
    editQuestion: function (game) {
      this.form.submitting = false
      this.form.message = ''
      this.form.success = false
      this.form.data = game
      this.form.data.date = moment(game.date).format('YYYY-MM-DD')
      this.form.show = true
    },
    saveQuestion: function () {
      this.form.submitting = true
      this.form.message = ''
      apiQuestions.saveQuestion(this.form.data)
        .then(data => {
          if (!data.err) {
            this.form.show = false
            this.getQuestions()
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
