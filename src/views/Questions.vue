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
        <template v-slot:item.level_id="{ item }">
          {{ getLevelByID(item.level_id) }}
        </template>
        <template v-slot:item.type_id="{ item }">
          {{ getQuestTypeByID(item.type_id) }}
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
    <v-dialog v-model="form.show" persistent max-width="640">
      <v-card>
        <v-card-title>
          Question
        </v-card-title>
        <v-card-text>
          <v-form v-model="form.valid" @submit.prevent="saveQuestion">

            <v-select label="Level"
              :items="levels" item-text="name" item-value="id"
              v-model="form.data.level_id"
              @change="changeLevel"
              outlined required>
            </v-select>
            <v-select label="Question Type"
              :items="quest_types" item-text="name" item-value="id"
              v-model="form.data.type_id"
              @change="changeQuestType"
              outlined required>
            </v-select>
            <v-text-field label="Score"
              v-model="form.data.score"
              type="number"
              outlined required>
            </v-text-field>
            <v-textarea label="Question"
              v-model="form.data.question"
              outlined required auto-grow counter maxlength="65535">
            </v-textarea>
            <v-text-field label="Reference"
              v-model="form.data.reference"
              outlined required counter maxlength="255">
            </v-text-field>

            <label>Choices / Answer</label>
            <v-radio-group
              v-model="form.data.answer">
              <v-row v-for="choice of form.data.choices" :key="choice.num" class="mx-0" align="center">
                <v-radio
                  :value="choice.num"
                  hide-details
                ></v-radio>
                <v-text-field
                  v-model="choice.value">
                </v-text-field>
              </v-row>
            </v-radio-group>

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
import apiLevels from '@/api/levels'
import apiQuestTypes from '@/api/quest_types'
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
        text: '#',
        value: 'row_number'
      },
      {
        text: 'Question',
        value: 'question'
      },
      {
        text: 'Level',
        value: 'level_id',
      },
      {
        text: 'Question Type',
        value: 'type_id',
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
        id: 0,
        active: 0,
        game_id: 0,
        level_id: 0,
        type_id: 0,
        question: '',
        score: 1,
        choices: [],
        answer: -1
      },
      show: false,
      valid: false,
      submitting: false,
      message: '',
      success: false
    },
  }),
  mounted () {
    this.getLevels()
    this.getQuestTypes()
    this.getQuestions()
  },
  methods: {
    getLevels: function () {
      this.loadingItems = true
      apiLevels.getAll()
        .then(response => {
          this.levels = response.levels
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loadingItems = false
        })
    },
    getLevelByID: function (level_id) {
      for (let level of this.levels) {
        if (level.id == level_id) {
          return level.name
        }
      }
      return ''
    },
    getQuestTypes: function () {
      this.loadingItems = true
      apiQuestTypes.getAll()
        .then(response => {
          this.quest_types = response.quest_types
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loadingItems = false
        })
    },
    getQuestTypeByID: function (type_id) {
      for (let quest_type of this.quest_types) {
        if (quest_type.id == type_id) {
          return quest_type.name
        }
      }
      return ''
    },
    getQuestions: function () {
      this.loadingItems = true
      apiQuestions.getGameQuestions({ game_id: this.game_id })
        .then(response => {
          this.game = response.game
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
        id: 0,
        active: 1,
        game_id: this.game_id,
        level_id:0,
        type_id: 0,
        score: 0,
        question: '',
        reference: '',
        choices: [],
        answer: -1
      }
      this.form.show = true
    },
    editQuestion: function (question) {
      this.form.submitting = false
      this.form.message = ''
      this.form.success = false
      this.form.data = question
      var i = 0
      for (let choice of this.form.data.choices) {
        choice.num = i
        if (choice.is_answer == 1) {
          this.form.data.answer = i
        }
        i++
      }
      this.form.show = true
    },
    saveQuestion: function () {
      this.form.submitting = true
      this.form.message = ''
      var data = {
        id: this.form.data.id,
        active: this.form.data.active,
        game_id: this.game_id,
        level_id: this.form.data.level_id,
        type_id: this.form.data.type_id,
        score: this.form.data.score,
        question: this.form.data.question,
        reference: this.form.data.reference,
        choices: []
      }
      for (let choice of this.form.data.choices) {
        data.choices.push({
          value: choice.value,
          is_answer: this.form.data.answer == choice.num ? 1 : 0
        })
      }
      apiQuestions.saveQuestion(data)
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
    },
    changeLevel: function (level_id) {
      for (let level of this.levels) {
        if (level.id == level_id) {
          this.form.data.score = level.score
        }
      }
    },
    changeQuestType: function (type_id) {
      for (let type of this.quest_types) {
        if (type.id == type_id) {
          this.form.data.choices = []
          for (let i = 0; i < type.choices_count; i++) {
            this.form.data.choices.push({
              num: i,
              value: '',
              is_answer: 0
            })
          }
        }
      }
    }
  }
}
</script>
