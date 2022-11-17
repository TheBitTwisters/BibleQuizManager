<template>
  <div id="biblequiz-monitor-question" class="d-flex flex-column fill-height white--text">

    <div class="black d-flex align-center mb-3 pa-3" style="height: 10%; font-size: 4vh;">
      <span>Question #{{question.order}} {{level.name}}</span>
      <v-spacer></v-spacer>
      <span>{{questType.name}}: {{question.score}} PTS</span>
    </div>
    <v-list class="d-flex flex-column flex-start justify-center fill-height py-0 teal">
      <v-divider style="border-width: thick; border-color: teal;"></v-divider>
      <div v-for="answer in answers" :key="answer.attendance_id">
        <template>
          <v-list-item class="px-3 white">
            <v-list-item-content
              class="py-0 font-weight-bold"
              style="font-size: 5vh; line-height: 1.35; width: 25%;">
              {{ getPlayerName(answer.attendance_id) }}
            </v-list-item-content>
            <v-list-item-action
              class="align-center my-1 mr-0 justify-end"
              style="font-size: 5vh; line-height: 1; width: 80%; justify-content: flex-start !important;">
              {{ answer.answer }}
            </v-list-item-action>
          </v-list-item>
          <v-divider style="border-width: thick; border-color: teal;"></v-divider>
        </template>
      </div>
    </v-list>

  </div>
</template>

<script>
export default {
  name: 'view-monitor-players-answers',
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
    }
  },
  data: () => ({
    answers: []
  }),
  mounted () {
    this.getAnswers()
  },
  methods: {
    getAnswers: function () {
      this.$api.question.getSubmittedAnswers(this.question.id)
        .then(response => {
          this.answers = response.answers
        }).catch(err => {
          console.log(err)
        })
    },
    getPlayerName: function (player_id) {
      for (let player of this.$store.getters.getPlayAttendance()) {
        if (player_id == player.id) {
          return player.name
        }
      }
      return '-'
    }
  }
}
</script>

<style>
.v-list div:empty {
  display: none;
}
</style>
