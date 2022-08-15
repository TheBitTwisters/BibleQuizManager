<template>
  <v-card>

    <v-card-title>
      Monitor
    </v-card-title>

    <v-divider></v-divider>
    <v-list>

      <v-list-item @click="toggleMonitorGame">
        <template v-slot:default>
          <v-list-item-content class="pl-2">
            <v-list-item-title>Game</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon v-if="monitorGame">
              mdi-checkbox-marked
            </v-icon>
            <v-icon v-else>
              mdi-checkbox-blank-outline
            </v-icon>
          </v-list-item-action>
        </template>
      </v-list-item>

      <v-list-item @click="toggleMonitorQuestion">
        <template v-slot:default>
          <v-list-item-content class="pl-2">
            <v-list-item-title>Question</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon v-if="monitorQuestion">
              mdi-checkbox-marked
            </v-icon>
            <v-icon v-else>
              mdi-checkbox-blank-outline
            </v-icon>
          </v-list-item-action>
        </template>
      </v-list-item>

      <v-list-item @click="toggleMonitorAnswer">
        <template v-slot:default>
          <v-list-item-content class="pl-2">
            <v-list-item-title>Reveal answer</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon v-if="monitorQuestion">
              mdi-checkbox-marked
            </v-icon>
            <v-icon v-else>
              mdi-checkbox-blank-outline
            </v-icon>
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list>

  </v-card>
</template>

<script>
export default {
  name: 'view-play-monitor',
  computed: {
    monitorGame: function () {
      return this.$store.state.monitor.game
    },
    monitorQuestion: function () {
      return this.$store.state.monitor.question
    },
    monitorChoices: function () {
      return this.$store.state.monitor.choices
    },
    monitorAnswer: function () {
      return this.$store.state.monitor.answer
    }
  },
  methods: {
    toggleMonitorGame: function () {
      this.$store.dispatch('monitor-game', !this.monitorGame)
    },
    toggleMonitorQuestion: function () {
      this.$store.dispatch('monitor-question', !this.monitorQuestion)
    },
    toggleMonitorChoices: function () {
      this.$store.dispatch('monitor-choices', !this.monitorChoices)
    },
    toggleMonitorAnswer: function () {
      this.$store.dispatch('monitor-answer', !this.monitorAnswer)
    }
  }
}
</script>
