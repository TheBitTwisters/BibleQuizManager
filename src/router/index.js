import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewLogin from '@/views/Login'

import ViewGames from '@/views/Games'
import ViewPlayers from '@/views/Players'
import ViewQuestions from '@/views/Questions'

import ViewRules from '@/views/rules/Index'

import ViewDashboard from '@/views/Dashboard'

import ViewPlay from '@/views/play/View'
import ViewMonitor from '@/views/monitor/View'

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
    path: '/players',
    name: 'Players',
    component: ViewPlayers
  },
  {
    path: '/rules',
    name: 'Rules',
    component: ViewRules
  },
  {
    path: '/game/:game_id/questions',
    name: 'Questions',
    props: true,
    component: ViewQuestions
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
