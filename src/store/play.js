import router from '@/router'
import apiGames from '@/api/games'
import apiLevels from '@/api/levels'
import apiQuestTypes from '@/api/quest_types'

const play = {
  state: {
    game: undefined,
    levels: [],
    quest_types: [],
    questions: [],
    choicesShown: 0,
    players: []
  },
  mutations: {},
  actions: {
    'clear-game': function ({ state }) {
      state.game = undefined
      state.questions = []
      state.question = {
        order: 0
      }
      state.choices = []
      state.players = []
    },
    'play-game': async function ({ state, commit, dispatch }, params) {
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
        dispatch('clear-game')
        console.log(err)
        commit('SHOW_SNACKBAR', {
          status: 'error',
          message: err.message
        })
      }
    },
    'play-next-question': function ({ state }) {
      for (let question of state.questions) {
        if (question.id > state.game.current_question_id) {
          apiGames.setCurrentQuestion({
            game_id: state.game.id,
            question_id: question.id
          }).then(response => {
            state.choicesShown = 0
            state.game = response.game
          })
          break
        }
      }
    },
    'play-choice-show': function ({ state }) {
      if (state.choicesShown < 4) {
        state.choicesShown++
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
          for (let level of state.levels) {
            if (question.level_id == level.id) {
              question.level = level
            }
          }
          for (let type of state.quest_types) {
            if (question.type_id == type.id) {
              question.type = type
            }
          }
          return question
        }
      }
      return null
    },
    getPlayCurrentChoices: (state) => () => {
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
