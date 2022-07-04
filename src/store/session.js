import moment from 'moment'
import router from '@/router'

const session = {
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
      commit('SET_GAMES', params.games)
      router.push({ name: 'Dashboard' })
    },
    'session-logout': function ({ commit }) {
      commit('SET_SESSION', {})
      commit('SET_SESSION_MANAGER', {})
      if (router.currentRoute.name != 'Login') {
        router.push({ name: 'Login' })
      }
    },
  },
  getters: {
    getSessionToken: (state) => () => {
      return state.token
    }
  }
}

export default session
