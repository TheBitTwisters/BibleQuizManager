<template>
  <div id="biblequiz-questions">

    <v-banner single-line class="mb-5">
      <span class="text-caption">[Game ID: {{ game.id }}]</span>
      <span>"{{ game.title }}" - {{ game.date | formatDate }}</span>
    </v-banner>

    <v-row>
      <v-col cols="12" :lg="form.show ? 6 : 12">

        <v-card>
          <v-card-title>
            Questions
            <v-spacer></v-spacer>
            <v-btn plain color="primary" @click="newQuestion">New Question</v-btn>
          </v-card-title>
          <v-data-table :headers="headers" :items="questions"
            :loading="loadingItems"
            :items-per-page="-1"
            :hide-default-footer="true">
            <template v-slot:item.passplay="{ item }">
              <v-checkbox :value="item.passplay" dense readonly hide-details>
              </v-checkbox>
            </template>
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
        </v-card>

      </v-col>
      <v-col cols="12" lg="6" v-if="form.show">

        <v-card id="biblequiz-card-question">
          <v-card-title>
            <span v-if="form.data.id > 0">Edit Question</span>
            <span v-else>New Question</span>
            <v-spacer></v-spacer>
            <span v-if="form.data.id > 0" class="text-caption">
              {{`[Database ID: ${form.data.id} ]`}}
            </span>
          </v-card-title>
          <v-card-text>
            <v-form v-model="form.valid" @submit.prevent="saveQuestion">

              <v-row>
                <v-col cols="2">
                  <v-text-field label="Q#"
                    v-model="form.data.order"
                    type="number"
                    outlined required readonly hide-details>
                  </v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-checkbox label="Pass or Play?"
                    hide-details>
                  </v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="4">
                  <v-select label="Level"
                    :items="levels" item-text="name" item-value="id"
                    v-model="form.data.level_id"
                    @change="changeLevel"
                    outlined required hide-details>
                  </v-select>
                </v-col>
                <v-col cols="6" sm="2">
                  <v-text-field label="Score"
                    v-model="form.data.score"
                    type="number"
                    outlined required hide-details>
                  </v-text-field>
                </v-col>
                <v-col cols="6" sm="6">
                  <v-select label="Question Type"
                    :items="quest_types" item-text="name" item-value="id"
                    v-model="form.data.type_id"
                    @change="changeQuestType"
                    outlined required hide-details>
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="8">
                  <v-textarea label="Question"
                    v-model="form.data.question"
                    outlined required auto-grow counter hide-details maxlength="65535">
                  </v-textarea>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-textarea label="Reference"
                    v-model="form.data.reference"
                    outlined required auto-grow counter hide-details maxlength="255">
                  </v-textarea>
                </v-col>
              </v-row>

              <fieldset class="px-2 mt-4">
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
              Close
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
    </v-row>
  </div>
</template>

<script>
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
        value: 'order'
      },
      {
        text: 'Pass or Play',
        value: 'passplay'
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
    question: null,
    form: {
      data: {
        id: 0,
        passplay: 0,
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
        passplay: 0,
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
      } else {
        this.form.data.order = 1
      }
      this.form.show = true
      this.question = null
      this.form.model.answer = ''
      this.$nextTick(() => {
        this.$vuetify.goTo('#biblequiz-card-question')
      })
    },
    editQuestion: function (question) {
      this.form.submitting = false
      this.form.success = false
      this.form.data.id = question.id
      this.form.data.passplay = question.passplay
      this.form.data.level_id = question.level_id,
      this.form.data.type_id = question.type_id,
      this.form.data.order = question.order,
      this.form.data.question = question.question,
      this.form.data.reference = question.reference,
      this.form.data.layout = question.layout,
      this.form.data.score = question.score,
      this.form.data.choices = question.choices
      this.form.show = true
      for (let choice of question.choices) {
        if (choice.is_answer == 1) {
          this.form.model.answer = choice.label
        }
      }
      this.question = question
      this.$nextTick(() => {
        this.$vuetify.goTo('#biblequiz-card-question')
      })
    },
    saveQuestion: async function () {
      this.form.submitting = true
      try {
        var response = {}
        if (this.form.data.id > 0) {
          response = await apiQuestions.update({
            question_id: this.form.data.id,
            passplay: this.form.data.passplay,
            level_id: this.form.data.level_id,
            type_id: this.form.data.type_id,
            order: this.form.data.order,
            question: this.form.data.question,
            reference: this.form.data.reference,
            layout: this.form.data.layout,
            score: this.form.data.score
          })
        } else {
          response = await apiQuestions.create(this.form.data)
        }
        this.$store.commit('SHOW_SNACKBAR', {
          status: 'success',
          message: response.message
        })
        if (this.question != null && this.question.type_id != this.form.data.type_id) {
          for (let choice of this.question.choices) {
            await this.deleteChoice(choice.id)
          }
        }
        this.form.data.id = response.question.id
        await this.saveChoices()
        if (!response.err) {
          this.getData()
        }
      } catch(err) {
        console.log(err)
        if (this.form.data.id > 0) {
          this.saveChoices();
        }
        this.$store.commit('SHOW_SNACKBAR', {
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
              choice_id: choice.id,
              label: choice.label,
              value: choice.value,
              is_answer: this.form.model.answer == choice.label ? 1 : 0
            })
          } else {
            choice.question_id = this.form.data.id
            choice.is_answer = this.form.model.answer == choice.label ? 1 : 0
            response = await apiChoices.create(choice)
          }
          this.$store.commit('SHOW_SNACKBAR', {
            status: 'success',
            message: response.message
          })
          choice.id = response.choice.id
        } catch(err) {
          console.log(err)
          this.$store.commit('SHOW_SNACKBAR', {
            status: 'error',
            message: err.message
          })
        }
      }
    },
    deleteChoice: async function (choice_id) {
      var response = await apiChoices.deleteChoice({ choice_id: choice_id })
      if (!response.err) {
        this.$store.commit('SHOW_SNACKBAR', {
          status: 'success',
          message: response.message
        })
      } else {
        this.$store.commit('SHOW_SNACKBAR', {
          status: 'error',
          message: response.message
        })
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
              id: 0,
              label: '',
              value: '',
              is_answer: 0
            }
            if (this.form.data.id > 0) {
              choice.question_id = this.form.data.id
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
