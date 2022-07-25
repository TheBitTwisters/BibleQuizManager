const monitor = {
  state: {
    scores: false,
    game: false,
    question: false,
    choices: false,
    answer: false
  },
  mutations: {
    SET_MONITOR_SCORES (state, on) {
      state.scores = on
    },
    SET_MONITOR_GAME (state, on) {
      state.game = on
    },
    SET_MONITOR_QUESTION (state, on) {
      state.question = on
    },
    SET_MONITOR_CHOICES (state, on) {
      state.choices = on
    },
    SET_MONITOR_ANSWER (state, on) {
      state.answer = on
    }
  },
  actions: {
    'monitor-scores': ({ commit }, on) => {
      commit('SET_MONITOR_SCORES', on)
      if (on) {
        commit('SET_MONITOR_QUESTION', false)
      }
    },
    'monitor-game': ({ commit, getters }, on) => {
      if (on) {
        if (getters.hasPlayGame()) {
          commit('SET_MONITOR_GAME', true)
        }
      } else {
        commit('SET_MONITOR_GAME', false)
      }
      commit('SET_MONITOR_QUESTION', false)
      commit('SET_MONITOR_CHOICES', false)
      commit('SET_MONITOR_ANSWER', false)
    },
    'monitor-question': ({ commit, getters }, on) => {
      if (on && getters.hasPlayGame() && getters.hasPlayCurrentQuestion()) {
        commit('SET_MONITOR_SCORES', false)
        commit('SET_MONITOR_GAME', true)
        commit('SET_MONITOR_QUESTION', true)
      } else {
        commit('SET_MONITOR_QUESTION', false)
      }
      commit('SET_MONITOR_CHOICES', false)
      commit('SET_MONITOR_ANSWER', false)
    },
    'monitor-choices': ({ commit }, on) => {
      commit('SET_MONITOR_GAME', on)
      commit('SET_MONITOR_QUESTION', false)
      commit('SET_MONITOR_CHOICES', false)
      commit('SET_MONITOR_ANSWER', false)
    },
    'monitor-answer': ({ commit }, on) => {
      commit('SET_MONITOR_GAME', on)
      commit('SET_MONITOR_QUESTION', false)
      commit('SET_MONITOR_CHOICES', false)
      commit('SET_MONITOR_ANSWER', false)
    }
  }
}

export default monitor
