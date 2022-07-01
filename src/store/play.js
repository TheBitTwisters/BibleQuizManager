import apiGames from '@/api/games'
import apiLevels from '@/api/levels'
import apiQuestTypes from '@/api/quest_types'
import apiQuestions from '@/api/questions'

const session = {
  state: {
    game: {},
    levels: [],
    quest_types: [],
    questions: [],
    players: []
  },
  mutations: {
    SET_PLAY_GAME (state, game) {
      state.game = game || {
        id: 0,
        title: '',
        date: '',
        current_question_id: -1
      }
    },
    SET_PLAY_LEVELS (state, levels) {
      state.levels = levels || []
    },
    SET_PLAY_QUEST_TYPES (state, quest_types) {
      state.quest_types = quest_types || []
    },
    SET_PLAY_QUESTIONS (state, questions) {
      state.questions = questions || []
    },
    SET_PLAY_ATTENDANCE (state, players) {
      state.players = players || []
    }
  },
  actions: {
    'play-game': function ({ commit }, params) {
      apiLevels.getAll().then(response => {
        commit('SET_PLAY_LEVELS', response.levels)
      })
      apiQuestTypes.getAll().then(response => {
        commit('SET_PLAY_QUEST_TYPES', response.quest_types)
      })
      apiQuestions.getGameQuestions({ game_id: params.game_id })
        .then(response => {
          commit('SET_PLAY_GAME', response.game)
          commit('SET_PLAY_QUESTIONS', response.questions)
        })
    },
    'play-start-question': function ({ commit, state }) {
      if (state.questions.length > 0) {
        apiGames.setGameQuestion({
          game_id: state.game.id,
          question_id: state.questions[0].id
        }).then(response => {
          commit('SET_PLAY_GAME', response.game)
        })
      }
    },
    'play-next-question': function ({ commit, state }, params) {
      apiGames.setGameQuestion({
        game_id: state.game.id,
        question_id: params.question_id
      }).then(response => {
        commit('SET_PLAY_GAME', response.game)
      })
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
    getPlayCurrentQuestion: (state) => () => {
      for (let question of state.questions) {
        if (question.id == state.game.current_question_id) {
          return question
        }
      }
      return null
    }
  }
}

export default session
