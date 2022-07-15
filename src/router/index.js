import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewLogin from '@/views/Login'

import ViewGames from '@/views/list/Games'
import ViewPlayers from '@/views/list/Players'
import ViewGameQuestions from '@/views/list/Questions'

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

export default router
