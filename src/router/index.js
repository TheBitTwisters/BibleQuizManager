import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewLogin from '@/views/Login'

import ViewGames from '@/views/list/Games'
import ViewGameQuestions from '@/views/list/Questions'

import ViewGroups from '@/views/list/Groups'
import ViewMembers from '@/views/list/Members'
import ViewRules from '@/views/rules/Index'

import ViewDashboard from '@/views/Dashboard'

import ViewPlay from '@/views/play/View'
import ViewMonitor from '@/views/monitor/View'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: ViewLogin
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: ViewDashboard
  },
  {
    path: '/play',
    name: 'Play',
    component: ViewPlay
  },
  {
    path: '/monitor',
    name: 'Monitor',
    component: ViewMonitor
  },
  {
    path: '/games',
    name: 'Games',
    component: ViewGames
  },
  {
    path: '/groups',
    name: 'Groups',
    component: ViewGroups
  },
  {
    path: '/members',
    name: 'Members',
    component: ViewMembers
  },
  {
    path: '/rules',
    name: 'Rules',
    component: ViewRules
  },
  {
    path: '/game/:game_id/questions',
    name: 'GameQuestions',
    props: true,
    component: ViewGameQuestions
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (store.getters.isSessionActive() && !store.getters.isSessionExpired()) {
    if (to.name === 'Login') {
      next({ name: 'Dashboard' })
    }
  } else {
    if (to.name !== 'Login' && to.name !== 'Register') {
      store.dispatch('session-logout')
      next({ name: 'Login' })
    }
  }
  next()
})

export default router
