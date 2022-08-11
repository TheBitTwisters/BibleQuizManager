<template>
  <div>

    <v-card class="mb-3">
      <v-card-title>
        Game
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div>{{ game.title }}</div>
        <div>{{ game.date | formatDate }}</div>
      </v-card-text>
    </v-card>

    <v-card class="mb-3">
      <v-card-title>
        Current Question
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div>#{{ question.order }} - {{ question.level.name }} | {{ question.type.name }}</div>
        <div>{{ question.score }} PTS</div>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="nextQuestion">
          Next question
        </v-btn>
      </v-card-actions>
    </v-card>

  </div>
</template>

<script>
export default {
  name: 'view-play-panel',
  computed: {
    game: function () {
      return this.$store.getters.getPlayGame()
    },
    question: function () {
      return this.$store.getters.getPlayCurrentQuestion()
    }
  },
  methods: {
    nextQuestion: function () {
      this.$store.dispatch('play-next-question')
    }
  }
}
</script>
