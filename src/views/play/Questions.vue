<template>
  <div id="biblequiz-play-questions">

    <v-card>
      <v-window v-model="questionStep">
        <v-window-item v-for="(quest, index) of questions" :key="quest.id" :value="index + 1">
          <v-card-title class="flex-column">
            <div>Question ID:{{quest.id}} #{{quest.row_number}} - {{ quest.score }} pts</div>
            <div>{{ getLevelByID(quest.level_id).name }} | {{ getQuestTypeByID(quest.type_id).name }}</div>
          </v-card-title>
          <v-card-text>
            <div class="text-h4">
              {{ quest.question }}
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-list>
            <template v-for="choice in quest.choices">
              <v-list-item :key="choice.id">
                {{ choice.value }}
              </v-list-item>
              <v-divider :key="choice.id"></v-divider>
            </template>
          </v-list>
        </v-window-item>
      </v-window>
      <v-card-actions>
        <v-btn
          :disabled="questionStep === 1" text
          @click="questionStep--">
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="setQuestion()">
          Set Question
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="questionStep === questions.length"
          color="primary" depressed
          @click="questionStep++">
          Next
        </v-btn>
      </v-card-actions>
    </v-card>

  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'view-play-questions',
  data: () => ({
    questionStep: 1
  }),
  computed: {
    questions: () => store.getters.getPlayQuestions()
  },
  mounted () {},
  methods: {
    getLevelByID: function (level_id) {
      for (let level of store.getters.getPlayLevels()) {
        if (level_id == level.id) {
          return level
        }
      }
      return { name: '' }
    },
    getQuestTypeByID: function (type_id) {
      for (let type of store.getters.getPlayQuestTypes()) {
        if (type_id == type.id) {
          return type
        }
      }
      return { name: '' }
    },
    setQuestion: function () {
      var ctr = 1
      for (var question of this.questions) {
        if (ctr == this.questionStep) {
          store.dispatch('play-question', {
            question_id: question.id
          })
          break
        }
        ctr++
      }
    }
  }
}
</script>
