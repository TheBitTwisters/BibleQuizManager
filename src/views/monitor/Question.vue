<template>
  <div id="biblequiz-monitor-question" class="d-flex flex-column fill-height white--text">

    <div class="black d-flex align-center headline mb-3 pa-3" style="height: 10%;">
      <span>Question #{{question.order}}</span>
      <v-spacer></v-spacer>
      <span>{{level.name}} | {{questType.name}}</span>
      <v-spacer></v-spacer>
      <span>{{question.score}} PTS</span>
    </div>

    <div class="teal d-flex align-center justify-center pa-3" :style="{ fontSize: '9vh', height: questionHeight }">
      {{ question.question }}
    </div>
    <div class="black--text pa-1 d-flex align-center justify-center" style="height: 5%; font-size: 3vh">
      Reference: {{question.reference}}
    </div>

    <div class="black d-flex flex-wrap pa-2" :style="{ height: choicesHeight, fontSize: '7vh' }">
      <div v-for="choice of choices" :key="choice.id" style="flex: 1 0 calc(50% - 8px - 8px);" class="white black--text ma-2 d-flex align-center">
        <span class="font-weight-bold px-3">{{ choice.label }}{{ choices.length == 4 && choice.label.length > 0 ? '.':'' }}</span>
        <span>{{ choice.value }}</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'view-play-question-board',
  computed: {
    question: function () {
      return this.$store.getters.getPlayCurrentQuestion()
    },
    level: function () {
      for (let level of this.$store.getters.getPlayLevels()) {
        if (this.question && this.question.level_id == level.id) {
          return level
        }
      }
      return {}
    },
    questType: function () {
      for (let type of this.$store.getters.getPlayQuestTypes()) {
        if (this.question && this.question.type_id == type.id) {
          return type
        }
      }
      return {}
    },
    choices: function () {
      return this.$store.getters.getPlayCurrentQuestionChoices()
    },
    answer: function () {
      for (let choice of this.choices) {
        if (choice.is_answer) {
          return choice.value
        }
      }
      return ''
    },
    questionHeight: function () {
      if (this.choices.length == 4) {
        return '55%'
      }
      if (this.choices.length == 2) {
        return '70%'
      }
      return '75%'
    },
    choicesHeight: function () {
      if (this.choices.length == 4) {
        return '35%'
      }
      if (this.choices.length == 2) {
        return '20%'
      }
      return '15%'
    }
  },
  data: () => ({
  }),
  mounted () {},
  methods: {
  }
}
</script>
