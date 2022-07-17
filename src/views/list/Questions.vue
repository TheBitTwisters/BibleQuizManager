<template>
  <div id="biblequiz-questions">

    <div class="title my-5">
      Game #{{ game.id }} {{ game.title }} - {{ game.date | formatDate }}
    </div>

    <v-row>
      <v-col>

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
          <v-card-text>
            Total score to gain:
            <strong>{{ totalScore }}</strong>
          </v-card-text>
          <v-card-actions>
            <v-btn plain color="primary" @click="newQuestion">New Question</v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
      <v-col v-if="form.show">

        <v-card>
          <v-card-title>
            Question
            <v-spacer></v-spacer>
            <span v-if="form.data.id > 0" class="text-caption">
              {{`[Database ID: ${form.data.id} ]`}}
            </span>
          </v-card-title>
          <v-card-text>
            <v-form v-model="form.valid" @submit.prevent="saveQuestion">

              <v-row>
                <v-col cols="2">
                  <v-text-field label="Question #"
                    v-model="form.data.order"
                    type="number"
                    outlined required readonly hide-details>
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-select label="Level"
                    :items="levels" item-text="name" item-value="id"
                    v-model="form.data.level_id"
                    @change="changeLevel"
                    outlined required hide-details>
                  </v-select>
                </v-col>
                <v-col cols="2">
                  <v-text-field label="Score"
                    v-model="form.data.score"
                    type="number"
                    outlined required hide-details>
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-select label="Question Type"
                    :items="quest_types" item-text="name" item-value="id"
                    v-model="form.data.type_id"
                    @change="changeQuestType"
                    outlined required hide-details>
                  </v-select>
                </v-col>
                <v-col cols="8">
                  <v-textarea label="Question"
                    v-model="form.data.question"
                    outlined required auto-grow counter maxlength="65535">
                  </v-textarea>
                </v-col>
                <v-col cols="4">
                  <v-textarea label="Reference"
                    v-model="form.data.reference"
                    outlined required auto-grow counter maxlength="255">
                  </v-textarea>
                </v-col>
              </v-row>

              <fieldset class="px-2">
                <legend>Choices / Answer</legend>
                <v-radio-group v-model="form.model.answer" class="mt-0">
                  <v-text-field v-for="choice of form.data.choices" :key="choice.num" v-model="choice.value"
                    type="text" hide-details>
                    <template v-slot:prepend class="d-flex">
                      <v-radio :label="choice.label" :value="choice.label"></v-radio>
                    </template>
                  </v-text-field>
                </v-radio-group>
              </fieldset>

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

      </v-col>
    </v-row>
  </div>
</template>

<script>
import store from '@/store'
import apiLevels from '@/api/levels'
import apiQuestTypes from '@/api/quest_types'
import apiGames from '@/api/games'
import apiQuestions from '@/api/questions'
import apiChoices from '@/api/choices'

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
        text: 'Score to gain',
        value: 'score',
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
        game_id: 0,
        level_id: 0,
        type_id: 0,
        order: 0,
        question: '',
        reference: '',
        layout: '',
        score: 1,
        choices: []
      },
      model: {
        answer: ''
      },
      show: false,
      valid: false,
      submitting: false,
      success: false
    },
  }),
  computed: {
    totalScore: function () {
      var total = 0
      for (let question of this.questions) {
        total += question.score
      }
      return total
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData: async function () {
      this.loadingItems = true
      try {
        var response = {}
        response = await apiGames.getDetails({ game_id: this.game_id })
        this.game = response.game
        response = await apiLevels.getAll()
        this.levels = response.levels
        response = await apiQuestTypes.getAll()
        this.quest_types = response.quest_types
        response = await apiGames.getQuestions({ game_id: this.game_id })
        this.questions = response.questions
      } catch (err) {
        console.error(err)
      } finally {
        this.loadingItems = false
      }
    },
    getLevelByID: function (level_id) {
      for (let level of this.levels) {
        if (level.id == level_id) {
          return level.name
        }
      }
      return ''
    },
    getQuestTypeByID: function (type_id) {
      for (let quest_type of this.quest_types) {
        if (quest_type.id == type_id) {
          return quest_type.name
        }
      }
      return ''
    },
    newQuestion: function () {
      this.form.submitting = false
      this.form.success = false
      this.form.data = {
        id: 0,
        game_id: this.game_id,
        level_id: 0,
        type_id: 0,
        order: 0,
        question: '',
        reference: '',
        layout: '',
        score: 1,
        choices: []
      }
      if (this.questions.length > 0) {
        var lastQuestion = this.questions[this.questions.length - 1]
        // set next
        this.form.data.order = this.questions.length + 1
        this.form.data.level_id = lastQuestion.level_id
        this.form.data.type_id = lastQuestion.type_id
        this.changeLevel(lastQuestion.level_id)
        this.changeQuestType(lastQuestion.type_id)
      }
      this.form.show = true
    },
    editQuestion: function (question) {
      this.form.submitting = false
      this.form.success = false
      this.form.data.id = question.id
      this.form.data.level_id = question.level_id,
      this.form.data.type_id = question.type_id,
      this.form.data.order = question.order,
      this.form.data.question = question.question,
      this.form.data.reference = question.reference,
      this.form.data.layout = question.layout,
      this.form.data.score = question.score,
      this.form.data.choices = question.choices
      this.form.show = true
    },
    saveQuestion: async function () {
      this.form.submitting = true
      try {
        var response = {}
        if (this.form.data.id > 0) {
          response = await apiQuestions.update({
            question_id: this.form.data.id,
            question: {
              level_id: this.form.data.level_id,
              type_id: this.form.data.type_id,
              order: this.form.data.order,
              question: this.form.data.question,
              reference: this.form.data.reference,
              layout: this.form.data.layout,
              score: this.form.data.score
            }
          })
        } else {
          response = await apiQuestions.create(this.form.data)
        }
        store.commit('SHOW_SNACKBAR', {
          status: 'success',
          message: response.message
        })
        if (!response.err) {
          await this.saveChoices()
          this.form.show = false
          this.getData()
        }
      } catch(err) {
        console.log(err)
        if (this.form.data.id > 0) {
          await this.saveChoices();
        }
        store.commit('SHOW_SNACKBAR', {
          status: 'error',
          message: err.message
        })
      } finally {
        this.form.submitting = false
      }
    },
    saveChoices: async function () {
      for (let choice of this.form.data.choices) {
        try {
          var response = {}
          if (choice.id > 0) {
            response = await apiChoices.update({
              choice_id: this.form.data.id,
              choice: {
                label: choice.label,
                value: choice.value,
                is_answer: this.form.model.answer == choice.row ? 1 : 0
              }
            })
          } else {
            response = await apiChoices.create(choice)
          }
          store.commit('SHOW_SNACKBAR', {
            status: 'success',
            message: response.message
          })
        } catch(err) {
          console.log(err)
          store.commit('SHOW_SNACKBAR', {
            status: 'error',
            message: err.message
          })
        }
      }
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
          for (let i = 1; i <= type.choices_count; i++) {
            var choice = {
              row: i,
              label: '',
              value: '',
              is_answer: 0
            }
            if (type.choices_count == 4) {
              if (i == 1) choice.label = 'A'
              if (i == 2) choice.label = 'B'
              if (i == 3) choice.label = 'C'
              if (i == 4) choice.label = 'D'
            }
            if (type.choices_count == 2) {
              if (i == 1) choice.label = 'True'
              if (i == 2) choice.label = 'False'
            }
            this.form.data.choices.push(choice)
          }
        }
      }
    }
  }
}
</script>
