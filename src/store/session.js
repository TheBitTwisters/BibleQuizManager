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
    'session-login': function ({ commit, dispatch }, params) {
      commit('SET_SESSION', params.session)
      commit('SET_SESSION_MANAGER', params.manager)
      commit('SET_GAMES', params.games)
      commit('SET_APP_DRAWER', true)
      dispatch('clear-game')
      router.push({ name: 'Dashboard' })
    },
    'session-logout': function ({ commit, dispatch }) {
      commit('SET_SESSION', {})
      commit('SET_SESSION_MANAGER', {})
      commit('SET_APP_DRAWER', false)
      dispatch('clear-game')
      if (router.currentRoute.name != 'Login') {
        router.push({ name: 'Login' })
      }
    },
    'session-check': function ({ getters, dispatch }) {
      if (getters.isSessionExpired()) {
        dispatch('session-logout')
      }
    }
  },
  getters: {
    isSessionActive: (state) => () => {
      return state.expiresIn > 0 && state.token.length > 0
    },
    isSessionExpired: (state) => () => {
      if (state.expiresIn > 0) {
        var expiration = moment(state.startedAt).add(state.expiresIn, 'seconds')
        return moment().isSameOrAfter(expiration)
      }
      return false
    },
    getSessionToken: (state) => () => {
      return state.token
    }
  }
}

export default session
