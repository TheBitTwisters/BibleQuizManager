<template>
  <v-card>

    <v-card-title>
      Panel
    </v-card-title>

    <v-list>
      <v-divider></v-divider>

      <!-- Game details -->
      <v-list-item>
        <v-list-item-icon>
          Game
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ game.title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ game.date | formatDate }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!-- Question details -->
      <v-list-item v-if="question != null">
        <v-list-item-icon>
          Question
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            #{{ question.order }} - {{ question.level.name }} | {{ question.type.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ question.score }} PTS
          </v-list-item-subtitle>
          <v-btn @click="nextQuestion">
            Next question
          </v-btn>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
    </v-list>

  </v-card>
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
