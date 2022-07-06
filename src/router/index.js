import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewLogin from '@/views/Login'

import ViewGames from '@/views/Games'
import ViewPlayers from '@/views/Players'
import ViewQuestions from '@/views/Questions'

import ViewRules from '@/views/rules/Index'

import ViewDashboard from '@/views/Dashboard'

import ViewPlayControl from '@/views/play/Control'
import ViewPlayMonitor from '@/views/play/Monitor'

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
    path: '/play/:game_id',
    name: 'Play',
    props: true,
    component: ViewPlayControl
  },
  {
    path: '/monitor',
    name: 'PlayMonitor',
    component: ViewPlayMonitor
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
