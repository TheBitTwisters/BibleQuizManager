import router from '@/router'
import apiGames from '@/api/games'
import apiLevels from '@/api/levels'
import apiQuestTypes from '@/api/quest_types'
import apiQuestions from '@/api/questions'
import apiPlayers from '@/api/players'

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
    'play-game': function ({ state }, params) {
      apiLevels.getAll().then(response => {
        state.levels = response.levels
      })
      apiQuestTypes.getAll().then(response => {
        state.quest_types = response.quest_types
      })
      apiQuestions.getGameQuestions({ game_id: params.game_id })
        .then(response => {
          state.game = response.game
          state.questions = response.questions
          apiPlayers.getAttendance({ game_id: response.game.id }).then(response => {
            state.players = response.players
          })
          router.push('/play')
        })
    },
    'play-question': function ({ state }, params) {
      if (state.questions.length > 0) {
        apiGames.setGameQuestion({
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
      return state.game.id > 0
    },
    hasPlayCurrentQuestion: (state) => () => {
      return state.game.current_question_id > 0
    }
  }
}

export default play
