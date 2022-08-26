<template>
  <div id="biblequiz-monitor-question" class="d-flex flex-column fill-height white--text">

    <div class="black d-flex align-center mb-3 pa-3" style="height: 10%; font-size: 4vh;">
      <span>Question #{{question.order}} {{level.name}}</span>
      <v-spacer></v-spacer>
      <span>{{questType.name}}: {{question.score}} PTS</span>
    </div>

    <div class="teal d-flex align-center justify-center pa-3 text-center" :style="{ fontSize: '9vh', lineHeight: '10vh', height: questionHeight }">
      {{ question.question }}
    </div>
    <div class="black--text pa-1 d-flex align-center justify-center" style="height: 5%; font-size: 3vh">
      <span class="font-italic mx-3">Reference</span>
      <v-icon>mdi-arrow-right</v-icon>
      <span class="font-weight-bold mx-3">{{question.reference}}</span>
    </div>

    <div v-if="isMultipleChoice || isTrueOrFalse"
      class="black d-flex flex-wrap pa-2"
      :style="{ height: choicesHeight, fontSize: '6vh', lineHeight: '1.25em' }">
      <template v-for="(choice, index) of choices">
        <div :key="choice.id" v-if="isTrueOrFalse || (isMultipleChoice && choicesShown > index)"
          :style="{
            flex: '1 0 calc(50% - 8px - 8px)',
            maxWidth: 'calc(50% - 8px - 8px)',
            maxHeight: isMultipleChoice ? '50%' : 'auto',
            justifyContent: isMultipleChoice ? 'start' : 'center',
            backgroundColor: showAnswer && choice.is_answer == 1 ? 'lime !important' : 'white'
          }"
          class="white black--text ma-2 d-flex align-center">
          <span class="font-weight-bold px-3">{{ choice.label }}{{ isMultipleChoice ? '.':'' }}</span>
          <span>{{ choice.value }}</span>
        </div>
      </template>
    </div>
    <div v-else
      class="black d-flex flex-wrap pa-2"
      :style="{ height: choicesHeight, fontSize: '6vh', lineHeight: '1.25em' }">
      <div v-for="choice of choices" :key="choice.id"
        :style="{
          flex: '1 0 calc(50% - 8px - 8px)',
          justifyContent: isMultipleChoice ? 'start' : 'center',
          backgroundColor: showAnswer && choice.is_answer == 1 ? 'lime !important' : 'black'
        }"
        class="black--text ma-2 d-flex align-center">
        <span v-if="isIdentification && showAnswer">{{ choice.value }}</span>
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
        return '75%'
      }
      return '70%'
    },
    choicesHeight: function () {
      if (this.isMultipleChoice) {
        return '35%'
      }
      if (this.isTrueOrFalse) {
        return '15%'
      }
      return '20%'
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
