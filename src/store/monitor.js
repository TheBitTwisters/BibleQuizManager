const monitor = {
  state: {
    game: false,
    question: false,
    answer: false
  },
  mutations: {
    SET_MONITOR_GAME (state, on) {
      state.game = on
    },
    SET_MONITOR_QUESTION (state, on) {
      state.question = on
    },
    SET_MONITOR_ANSWER (state, on) {
      state.answer = on
    }
  },
  actions: {
    'monitor-game': ({ commit, getters }, on) => {
      if (on) {
        if (getters.hasPlayGame()) {
          commit('SET_MONITOR_GAME', true)
        }
      } else {
        commit('SET_MONITOR_GAME', false)
      }
      commit('SET_MONITOR_QUESTION', false)
      commit('SET_MONITOR_ANSWER', false)
    },
    'monitor-question': ({ commit, getters }, on) => {
      if (on && getters.hasPlayGame() && getters.hasPlayCurrentQuestion()) {
        commit('SET_MONITOR_GAME', true)
        commit('SET_MONITOR_QUESTION', true)
      } else {
        commit('SET_MONITOR_QUESTION', false)
        commit('SET_MONITOR_ANSWER', false)
        commit('SET_PLAY_CHOICES_SHOWN', 0)
      }
      commit('SET_MONITOR_ANSWER', false)
    },
    'monitor-answer': ({ commit }, on) => {
      commit('SET_MONITOR_ANSWER', on)
    }
  }
}

export default monitor
