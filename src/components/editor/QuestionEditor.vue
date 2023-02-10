<template>
  <v-dialog v-model="showForm" persistent max-width="640">
    <v-card id="biblequiz-card-question">
      <v-card-title>
        <span v-if="question.id > 0">Edit Question</span>
        <span v-else>New Question</span>
        <v-spacer></v-spacer>
        <span v-if="question.id > 0" class="text-caption">
          {{`[Database ID: ${question.id} ]`}}
        </span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" @submit.prevent="saveQuestion">

          <v-row>
            <v-col cols="2">
              <v-text-field label="Q#"
                v-model="question.order"
                type="number"
                outlined required readonly hide-details>
              </v-text-field>
            </v-col>
            <v-col cols="5">
              <v-checkbox label="Pass or Play?"
                v-model="question.passplay">
              </v-checkbox>
            </v-col>
            <v-col cols="5">
              <div v-if="question.passplay" class="d-flex justify-end">
                <v-chip class="mr-2">
                  <v-avatar left>
                    <v-icon>mdi-check</v-icon>
                  </v-avatar>
                  + {{question.score * 3}}
                </v-chip>
                <v-chip>
                  <v-avatar left>
                    <v-icon>mdi-close</v-icon>
                  </v-avatar>
                  - {{question.score * 2}}
                </v-chip>
              </div>
            </v-col>
            <v-col cols="6" sm="4">
              <v-select label="Level"
                :items="levels" item-text="name" item-value="id"
                v-model="question.level_id"
                @change="applyLevel"
                outlined required hide-details>
              </v-select>
            </v-col>
            <v-col cols="6" sm="2">
              <v-text-field label="Score"
                v-model="question.score"
                type="number"
                outlined required hide-details>
              </v-text-field>
            </v-col>
            <v-col cols="6" sm="6">
              <v-select label="Question Type"
                :items="quest_types" item-text="name" item-value="id"
                v-model="question.type_id"
                @change="applyQuestType"
                outlined required hide-details>
              </v-select>
            </v-col>
            <v-col cols="12" sm="8">
              <v-textarea label="Question"
                v-model="question.question"
                outlined required auto-grow counter hide-details maxlength="65535">
              </v-textarea>
            </v-col>
            <v-col cols="12" sm="4">
              <v-textarea label="Reference"
                v-model="question.reference"
                outlined required auto-grow counter hide-details maxlength="255">
              </v-textarea>
            </v-col>
          </v-row>

          <fieldset class="px-2 mt-4">
            <legend>Choices / Answer</legend>
            <v-radio-group v-model="answer" class="mt-0">
              <v-text-field v-for="choice of question.choices" :key="choice.label" v-model="choice.value"
                type="text" hide-details>
                <template v-slot:prepend class="d-flex">
                  <v-radio :label="choice.label" :value="choice.label"></v-radio>
                </template>
              </v-text-field>
            </v-radio-group>
          </fieldset>

          <v-alert v-if="message != ''" dense>
            {{ message }}
          </v-alert>

        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" :disabled="!valid" @click="saveQuestion">
          Save
        </v-btn>
        <v-btn @click="showForm = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import apiQuestions from '@/api/questions'
import apiChoices from '@/api/choices'

export default {
  name: 'QuestionEditor',
  props: {
    levels: {
      type: Array,
      default: () => []
    },
    quest_types: {
      type: Array,
      default: () => []
    },
    question: {
      type: Object
    },
    choices: {
      type: Array,
      default: () => []
    },
    showForm: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => ({
    valid: false,
    submitting: false,
    success: false,
    message: '',
    answer: ''
  }),
  watch: {
    showForm: function (v) {
      if (v) {
        this.applyLevel()
        this.applyQuestType()
      }
    }
  },
  methods: {
    applyLevel: function () {
      if (!this.question.id) {
        for (let level of this.levels) {
          if (level.id == this.question.level_id) {
            this.question.score = level.score
          }
        }
      }
    },
    applyQuestType: function () {
      if (this.choices > 0) {
        for (let choice of this.choices) {
          if (choice.is_answer) {
            this.answer = choice.label
          }
        }
      } else {
        for (let type of this.quest_types) {
          if (type.id == this.question.type_id) {
            this.question.choices = []
            for (let i = 1; i <= type.choices_count; i++) {
              var choice = {
                id: 0,
                label: '',
                value: '',
                is_answer: 0
              }
              if (this.question.id > 0) {
                choice.question_id = this.question.id
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
              this.question.choices.push(choice)
            }
          }
        }
      }
    },
    saveChoices: async function () {
      for (let choice of this.question.choices) {
        try {
          var response = {}
          if (choice.id > 0) {
            response = await apiChoices.update({
              choice_id: choice.id,
              label: choice.label,
              value: choice.value,
              is_answer: this.answer == choice.label ? 1 : 0
            })
          } else {
            choice.question_id = this.question.id
            choice.is_answer = this.answer == choice.label ? 1 : 0
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
    saveQuestion: async function () {
      this.submitting = true
      try {
        var response = {}
        if (this.question.id > 0) {
          response = await apiQuestions.update({
            question_id: this.question.id,
            level_id: this.question.level_id,
            type_id: this.question.type_id,
            order: this.question.order,
            question: this.question.question,
            reference: this.question.reference,
            layout: this.question.layout,
            score: this.question.score
          })
        } else {
          response = await apiQuestions.create(this.question)
        }
        this.$store.commit('SHOW_SNACKBAR', {
          status: 'success',
          message: response.message
        })
        if (this.question != null && this.question.type_id != this.question.type_id) {
          for (let choice of this.question.choices) {
            await this.deleteChoice(choice.id)
          }
        }
        this.question.id = response.question.id
        await this.saveChoices()
        if (!response.err) {
          this.getData()
        }
      } catch(err) {
        console.log(err)
        if (this.question.id > 0) {
          this.saveChoices();
        }
        this.$store.commit('SHOW_SNACKBAR', {
          status: 'error',
          message: err.message
        })
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>
