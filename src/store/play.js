import router from '@/router'
import apiGames from '@/api/games'
import apiLevels from '@/api/levels'
import apiQuestTypes from '@/api/quest_types'

const play = {
  state: {
    game: null,
    levels: [],
    quest_types: [],
    questions: [],
    players: []
  },
  mutations: {},
  actions: {
    'clear-game': function ({ state }) {
      state.game = null
      state.questions = []
      state.players = []
    },
    'play-game': async function ({ state, commit }, params) {
      try {
        var response = {}
        response = await apiLevels.getAll()
        state.levels = response.levels
        response = await apiQuestTypes.getAll()
        state.quest_types = response.quest_types
        response = await apiGames.getDetails({ game_id: params.game_id })
        state.game = response.game
        response = await apiGames.getQuestions({ game_id: params.game_id })
        state.questions = response.questions
        router.push('/play')
      } catch (err) {
        console.log(err)
        commit('SHOW_SNACKBAR', {
          status: 'error',
          message: err.message
        })
      }
    },
    'play-question': function ({ state }, params) {
      if (state.questions.length > 0) {
        apiGames.setCurrentQuestion({
          game_id: state.game.id,
          question_id: params.question_id
        }).then(response => {
          state.game = response.game
        })
      }
    },
    'play-reveal-answer': function ({ commit }) {
      commit('SHOW_MONITOR_REVEAL_ANSWER')
    }
  },
  getters: {
    getPlayGame: (state) => () => {
      return state.game
    },
    getPlayLevels: (state) => () => {
      return state.levels
    },
    getPlayQuestTypes: (state) => () => {
      return state.quest_types
    },
    getPlayQuestions: (state) => () => {
        return state.questions
    },
    getPlayCurrentQuestion: (state) => () => {
      for (let question of state.questions) {
        if (question.id == state.game.current_question_id) {
          return question
        }
      }
      return null
    },
    getPlayCurrentQuestionChoices: (state) => () => {
      for (let question of state.questions) {
        if (question.id == state.game.current_question_id) {
          return question.choices
        }
      }
      return []
    },
    hasPlayGame: (state) => () => {
      return state.game && state.game.id > 0
    },
    hasPlayCurrentQuestion: (state) => () => {
      return state.game.current_question_id > 0
    }
  }
}

export default play
