<template>
  <v-list class="d-flex flex-column flex-start fill-height py-0" style="background: black;">
    <v-divider style="border-width: thick; border-color: black;"></v-divider>
    <div v-for="answer in answers" :key="answer.attendance_id">
      <template>
        <v-list-item class="px-3 white">
          <v-list-item-content
            class="py-0 font-weight-bold"
            style="font-size: 5vh; line-height: 1; width: 20%;">
            {{ getPlayerName(answer.attendance_id) }}
          </v-list-item-content>
          <v-list-item-action
            class="align-center my-1 mr-0 justify-end"
            style="font-size: 5vh; line-height: 1; width: 80%; justify-content: flex-start !important;">
            {{ answer.answer }}
          </v-list-item-action>
        </v-list-item>
        <v-divider style="border-width: thick; border-color: black;"></v-divider>
      </template>
    </div>
  </v-list>
</template>

<script>
import apiQuestions from '@/api/questions'

export default {
  name: 'view-monitor-players-answers',
  computed: {
    question: function () {
      return this.$store.getters.getPlayCurrentQuestion()
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
      apiQuestions.getSubmittedAnswers({ question_id: this.question.id })
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
