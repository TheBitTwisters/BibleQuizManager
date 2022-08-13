<template>
  <v-card class="mb-3">
    <v-window v-model="questionStep">
      <v-window-item v-for="(quest, index) of questions" :key="index" :value="index + 1">
        <v-card-title>
          <v-btn text
            :disabled="questionStep === 1"
            @click="questionStep--">
            Prev
          </v-btn>
          <v-spacer></v-spacer>
          <div class="text-center">
            <div>Question #{{quest.order}} - {{ quest.score }} pts</div>
            <div>{{ getLevelByID(quest.level_id).name }} | {{ getQuestTypeByID(quest.type_id).name }}</div>
          </div>
          <v-spacer></v-spacer>
          <v-btn text
            :disabled="questionStep === questions.length"
            @click="questionStep++">
            Next
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div class="text-h4">
            {{ quest.question }}
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-list>
          <div v-for="choice in quest.choices" :key="choice.id">
            <v-list-item>
              <v-list-item-icon>
                {{ choice.label }}
              </v-list-item-icon>
              <v-list-item-content>
                {{ choice.value }}
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-list>
        <v-card-actions>
          <v-btn v-if="quest.choices.length == 4"
            text @click="showMultipleChoice">
            Show choice
          </v-btn>
        </v-card-actions>
      </v-window-item>
    </v-window>
    <v-card-actions>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'view-play-questions',
  data: () => ({
    questionStep: 1,
    currentQuestionID: 0
  }),
  computed: {
    game: function () {
      return this.$store.getters.getPlayGame()
    },
    questions: function () {
      return this.$store.getters.getPlayQuestions()
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
    showMultipleChoice: function () {
      this.$store.dispatch('play-choice-show')
    }
  }
}
</script>
