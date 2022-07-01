import moment from 'moment'
import router from '@/router'

const session = {
  state: {
    current_question: {},
    game: {},
    questions: [],
    players: []
  },
  mutations: {
    SET_PLAY_GAME (state, game) {
      state.game = game || {
        id: 0,
        title: '',
        date: '',
        current_game_id: 0
      }
    },
    SET_PLAY_QUESTIONS (state, questions) {
      state.questions = questions
    },
    SET_PLAY_ATTENDANCE (state, players) {
      state.players = players
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
      router.push({ name: 'Login' })
    },
  },
  getters: {
    getSessionToken: (state) => () => {
      return state.token
    }
  }
}

export default session
