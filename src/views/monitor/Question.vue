<template>
  <div id="biblequiz-monitor-question" class="d-flex flex-column fill-height white--text">

    <div class="black d-flex align-center headline mb-3 pa-3" style="height: 10%;">
      <span>Question #{{question.order}}</span>
      <v-spacer></v-spacer>
      <span>{{level.name}} | {{questType.name}}</span>
      <v-spacer></v-spacer>
      <span>{{question.score}} PTS</span>
    </div>

    <div class="teal d-flex align-center justify-center pa-3 text-center" :style="{ fontSize: '9vh', height: questionHeight }">
      {{ question.question }}
    </div>
    <div class="black--text pa-1 d-flex align-center justify-center" style="height: 5%; font-size: 3vh">
      Reference: {{question.reference}}
    </div>

    <div class="black d-flex flex-wrap pa-2" :style="{ height: choicesHeight, fontSize: '6vh', lineHeight: '1.25em' }">
      <template v-for="(choice, index) of choices">
        <div :key="choice.id" v-if="isTrueOrFalse || (isMultipleChoice && choicesShown > index) || (isIdentification && showAnswer)"
          :style="{
            flex: '1 0 calc(50% - 8px - 8px)',
            maxWidth: 'calc(50% - 8px - 8px)',
            maxHeight: '50%',
            justifyContent: isMultipleChoice ? 'start' : 'center',
            backgroundColor: showAnswer && choice.is_answer == 1 ? 'lime !important' : 'white'
          }"
          class="white black--text ma-2 d-flex align-center">
          <span class="font-weight-bold px-3">{{ choice.label }}{{ isMultipleChoice ? '.':'' }}</span>
          <span>{{ choice.value }}</span>
        </div>
      </template>
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
    isMultipleChoice: function () {
      return this.choices.length == 4
    },
    isTrueOrFalse: function () {
      return this.choices.length == 2
    },
    isIdentification: function () {
      return this.choices.length == 1
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
      return this.$store.getters.getPlayCurrentChoices()
    },
    choicesShown: function () {
      return this.$store.getters.getPlayChoicesShown()
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
      if (this.isMultipleChoice) {
        return '55%'
      }
      if (this.isTrueOrFalse) {
        return '70%'
      }
      return '75%'
    },
    choicesHeight: function () {
      if (this.isMultipleChoice) {
        return '35%'
      }
      if (this.isTrueOrFalse) {
        return '20%'
      }
      return '15%'
    },
    showAnswer: function () {
      return this.$store.state.monitor.answer
    }
  },
  data: () => ({
  }),
  mounted () {},
  methods: {
  }
}
</script>
