<template>
  <div id="biblequiz-play-question">

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
        <v-card-text>
          <div class="subtitle">
            Reference: {{question.reference}}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn plain color="primary" @click="nextQuestion">Next Question</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-else>
      <v-card>
        <v-card-title>
          Game not started or finished
        </v-card-title>
        <v-card-actions>
          <v-btn plain color="primary" @click="startQuestion">Start</v-btn>
        </v-card-actions>
      </v-card>
    </div>

  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'view-play-question',
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
    }
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
