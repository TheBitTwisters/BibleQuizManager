<template>
  <div id="biblequiz-play-question-board">

    <div v-if="question">
      <v-card>
        <v-card-title>
          <span>Question #{{question.row_number}}</span>
          <v-spacer></v-spacer>
          <span>{{level.name}} | {{questType.name}}</span>
        </v-card-title>
        <v-card-text>
          <div class="headline">
            {{question.question}}
          </div>
        </v-card-text>
        <v-card-text class="text-center" v-if="revealAnswer">
          <div class="d-inline-block success title white--text rounded px-5">
            {{answer}}
          </div>
          <div class="subtitle">
            Reference: {{question.reference}}
          </div>
        </v-card-text>
        <v-list>
          <div v-for="choice of choices" :key="choice.id">
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-title class="d-flex font-weight-bold title">
                <span>{{ choice.value }}</span>
              </v-list-item-title>
            </v-list-item>
          </div>
        </v-list>
      </v-card>
    </div>

  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'view-play-question-board',
  computed: {
    question: () => store.getters.getPlayCurrentQuestion(),
    level: function () {
      for (let level of store.getters.getPlayLevels()) {
        if (this.question && this.question.level_id == level.id) {
          return level
        }
      }
      return {}
    },
    questType: function () {
      for (let type of store.getters.getPlayQuestTypes()) {
        if (this.question && this.question.type_id == type.id) {
          return type
        }
      }
      return {}
    },
    choices: () => store.getters.getPlayCurrentQuestionChoices(),
    answer: function () {
      for (let choice of this.choices) {
        if (choice.is_answer) {
          return choice.value
        }
      }
      return ''
    },
    showQuestionChoices: () => store.getters.shouldMonitorShowQuestionChoices(),
    revealAnswer: () => store.getters.shouldMonitorRevealAnswer()
  },
  data: () => ({
  }),
  mounted () {},
  methods: {
    nextQuestion: function () {
      var isNext = false
      for (let question of store.state.questions) {
        if (isNext) {
          store.dispatch('play-next-question', {
            question_id: question.id
          })
          break
        }
        if (question.id == this.question.id) {
          isNext = true
        }
      }
    },
    startQuestion: function () {
      store.dispatch('play-start-question')
    }
  }
}
</script>
