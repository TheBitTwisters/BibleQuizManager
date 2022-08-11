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
        href: '/play',
        title: 'Play'
      },
      {
        href: '/groups',
        title: 'Groups'
      },
      {
        href: '/members',
        title: 'Members'
      },
      {
        href: '/rules',
        title: 'Rules'
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
