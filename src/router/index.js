import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewLogin from '@/views/Login'
import ViewDashboard from '@/views/Dashboard'
import ViewGames from '@/views/Games'
import ViewQuestions from '@/views/Questions'

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
    path: '/games',
    name: 'Games',
    component: ViewGames
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
