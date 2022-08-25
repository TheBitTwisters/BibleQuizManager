<template>
  <div>

    <div class="d-flex align-center mb-3">
      Questions
      <v-spacer></v-spacer>
      <v-btn text
        :disabled="questionStep === 1"
        @click="questionStep--">
        <v-icon>mdi-chevron-left</v-icon>
        Prev
      </v-btn>
      <v-btn text
        :disabled="questionStep === questions.length"
        @click="questionStep++">
        Next
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>

    <v-card class="mb-3">
      <v-window v-model="questionStep">
        <v-window-item v-for="(quest, index) of questions" :key="index" :value="index + 1">

            <v-card-text class="d-flex align-center">
              <v-chip label>Question #{{quest.order}}</v-chip>
              <v-spacer></v-spacer>
              <v-chip class="mx-1" label>{{ getLevelByID(quest.level_id).name }}</v-chip>
              <v-chip class="mx-1" label>{{ getQuestTypeByID(quest.type_id).name }}</v-chip>
              <v-chip class="mx-1" label>{{ quest.score }}PTS</v-chip>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col md="8">
                  <div class="text-h4">
                    {{ quest.question }}
                  </div>
                </v-col>
                <v-col md="4">
                  <v-list dense>
                    <v-subheader>Choices / Answer</v-subheader>
                    <div v-for="choice in quest.choices" :key="choice.id">
                      <v-list-item>
                        <v-list-item-icon class="mr-0" v-if="quest.choices.length == 4">
                          {{ choice.label }}
                        </v-list-item-icon>
                        <v-list-item-content>
                          {{ quest.choices.length == 2 ? choice.label : choice.value }}
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                  </v-list>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn text
                @click="toggleMonitorQuestion">
                <span v-if="!monitorQuestion">Show Question</span>
                <span v-else>Hide Question</span>
              </v-btn>
              <v-btn v-if="quest.choices.length == 4"
                text @click="showMultipleChoice">
                Show choices ({{choicesShown}})
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn :disabled="quest.locked_at != null"
                text @click="lockQuestion">
                Lock question
              </v-btn>
              <v-btn :disabled="!canRevealAnswer"
                text @click="toggleMonitorAnswer">
                <span v-if="!monitorAnswer">Reveal answer</span>
                <span v-else>Hide answer</span>
              </v-btn>
            </v-card-actions>

        </v-window-item>
      </v-window>
    </v-card>

    <Answers :question="currentViewingQuestion"/>
  </div>
</template>

<script>
import apiQuestions from '@/api/questions'
import Answers from './Answers'

export default {
  name: 'view-play-questions',
  components: {
    Answers
  },
  data: () => ({
    questionStep: 1,
    currentQuestionID: 0
  }),
  computed: {
    monitorQuestion: function () {
      return this.$store.state.monitor.question
    },
    monitorAnswer: function () {
      return this.$store.state.monitor.answer
    },
    game: function () {
      return this.$store.getters.getPlayGame()
    },
    questions: function () {
      return this.$store.getters.getPlayQuestions()
    },
    currentViewingQuestion: function () {
      return this.questions[this.questionStep - 1]
    },
    isMultipleChoice: function () {
      return this.currentViewingQuestion.choices.length == 4
    },
    isTrueOrFalse: function () {
      return this.currentViewingQuestion.choices.length == 2
    },
    isIdentification: function () {
      return this.currentViewingQuestion.choices.length == 1
    },
    choicesShown: function () {
      return this.$store.getters.getPlayChoicesShown()
    },
    canRevealAnswer: function () {
      if (this.currentViewingQuestion.locked_at) {
        if (this.monitorQuestion) {
          if (this.isMultipleChoice) {
            return this.choicesShown == 4
          } else {
            return true
          }
        }
      }
      return false
    }
  },
  watch: {
    game: function (g) {
      if (g.current_question_id != this.currentQuestionID) {
        this.loadCurrentQuestion()
      }
    }
  },
  mounted () {
    this.loadCurrentQuestion()
  },
  methods: {
    loadCurrentQuestion: function () {
      this.currentQuestionID = this.game.current_question_id
      if (this.currentQuestionID > 0) {
        var ctr = 1
        for (var question of this.questions) {
          if (question.id == this.currentQuestionID) {
            this.questionStep = ctr
            break
          }
          ctr++
        }
      }
    },
    getLevelByID: function (level_id) {
      for (let level of this.$store.getters.getPlayLevels()) {
        if (level_id == level.id) {
          return level
        }
      }
      return { name: '' }
    },
    getQuestTypeByID: function (type_id) {
      for (let type of this.$store.getters.getPlayQuestTypes()) {
        if (type_id == type.id) {
          return type
        }
      }
      return { name: '' }
    },
    toggleMonitorQuestion: function () {
      this.$store.dispatch('monitor-question', !this.monitorQuestion)
    },
    showMultipleChoice: function () {
      this.$store.dispatch('play-choice-show')
    },
    lockQuestion: function () {
      apiQuestions.lock({ question_id: this.currentViewingQuestion.id })
        .then(data => {
          this.$store.commit('SET_PLAY_QUESTION_LOCK', data.question)
        })
    },
    toggleMonitorAnswer: function () {
      this.$store.dispatch('monitor-answer', !this.monitorAnswer)
    }
  }
}
</script>
