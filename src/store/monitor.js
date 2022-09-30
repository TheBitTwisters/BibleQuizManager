const monitor = {
  state: {
    game: false,
    question: false,
    answer: false,
    playerAnswers: false
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
    },
    SET_MONITOR_PLAYER_ANSWERS (state, on) {
      state.playerAnswers = on
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
      commit('SET_MONITOR_PLAYER_ANSWERS', false)
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
      commit('SET_MONITOR_PLAYER_ANSWERS', false)
    },
    'monitor-answer': ({ commit }, on) => {
      commit('SET_MONITOR_ANSWER', on)
    },
    'monitor-player-answers': ({ commit }, on) => {
      commit('SET_MONITOR_PLAYER_ANSWERS', on)
    }
  }
}

export default monitor
