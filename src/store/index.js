import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    startedAt: '',
    expiresIn: 0,
    manager: {
      id: 0,
      name: '',
      current_game_id: 0
    }
  },
  mutations: {
    SET_SESSION_MANAGER (state, manager) {
      state.manager = manager || {
        id: 0,
        name: '',
        current_game_id: 0
      }
    },
    SET_SESSION (state, session) {
      state.startedAt = moment().valueOf()
      state.token = session.token || ''
      state.expiresIn = session.expiresIn || 0
    }
  },
  actions: {
    'session-login': function ({ commit }, params) {
      commit('SET_SESSION', params.session)
      commit('SET_SESSION_MANAGER', params.manager)
      commit('SET_APP_DRAWER', true)
      router.push({ name: 'Dashboard' })
    },
    'session-logout': function ({ commit }) {
      commit('SET_SESSION', {})
      commit('SET_ACCESS', {})
      commit('SET_SESSION_USER', {})
      router.push({ name: 'Login' })
    }
  },
  modules: {
  }
})
