<template>
  <v-navigation-drawer app fixed v-model="showDrawer">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="font-weight-black">
          Bible Quiz
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <!-- Dashboard urls  -->
    <v-list dense v-if="isSessionActive()">
      <v-list-item v-for="page of pages" :key="page.href" :to="page.href">
        <v-list-item-content>
          <v-list-item-title>{{ page.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-group v-model="showMonitorControls">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Monitor</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list>
          <v-list-item @click="toggleMonitorScores">
            <template v-slot:default>
              <v-list-item-content class="pl-2">
                <v-list-item-title>Scores</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon v-if="monitorScores">
                  mdi-checkbox-marked
                </v-icon>
                <v-icon v-else>
                  mdi-checkbox-blank-outline
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>
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
        </v-list>
      </v-list-group>
    </v-list>

    <v-list dense v-if="!isSessionActive()">
      <v-list-item to="/">
        <v-list-item-content>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import router from '@/router'

export default {
  name: 'component-navdrawer',
  computed: {
    showDrawer: {
      get: () => router.currentRoute.name != 'Monitor' && store.state.app.drawer,
      set: (val) => store.commit('SET_APP_DRAWER', val)
    },
    ...mapGetters([
      'isSessionActive'
    ]),
    monitorScores: () => store.state.monitor.scores,
    monitorGame: () => store.state.monitor.game,
    monitorQuestion: () => store.state.monitor.question,
    monitorChoices: () => store.state.monitor.choices,
    monitorAnswer: () => store.state.monitor.answer
  },
  data: () => ({
    pages: [
      {
        href: '/dashboard',
        title: 'Dashboard'
      },
      {
        href: '/games',
        title: 'Games'
      },
      {
        href: '/players',
        title: 'Players'
      },
      {
        href: '/rules',
        title: 'Rules'
      },
      {
        href: '/play',
        title: 'Play'
      }
    ],
    showMonitorControls: false
  }),
  watch: {
    isAppDrawerActive: (val) => {
      this.showDrawer = val
    }
  },
  methods: {
    toggleMonitorScores: function () {
      store.dispatch('monitor-scores', !this.monitorScores)
    },
    toggleMonitorGame: function () {
      store.dispatch('monitor-game', !this.monitorGame)
    },
    toggleMonitorQuestion: function () {
      store.dispatch('monitor-question', !this.monitorQuestion)
    },
    toggleMonitorChoices: function () {
      store.dispatch('monitor-choices', !this.monitorChoices)
    },
    toggleMonitorAnswer: function () {
      store.dispatch('monitor-answer', !this.monitorAnswer)
    }
  }
}
</script>
