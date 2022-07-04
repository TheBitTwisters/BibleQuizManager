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
    players: [],
    monitor: {
      question: {
        show: false,
        choices: false,
        reveal: false
      }
    }
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
    },
    HIDE_MONITOR_QUESTION (state) {
      state.monitor.question.show = false
      state.monitor.question.choices = false
      state.monitor.question.reveal = false
    },
    SHOW_MONITOR_QUESTION (state) {
      state.monitor.question.show = true
    },
    SHOW_MONITOR_QUESTION_CHOICES (state) {
      state.monitor.question.choices = true
    },
    SHOW_MONITOR_REVEAL_ANSWER (state) {
      state.monitor.question.choices = false
      state.monitor.question.reveal = true
    },
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
          commit('SHOW_MONITOR_QUESTION')
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
    shouldMonitorShowQuestion: (state) => () => {
      return state.monitor.question.show
    },
    shouldMonitorShowQuestionChoices: (state) => () => {
      return state.monitor.question.choices
    },
    shouldMonitorRevealAnswer: (state) => () => {
      return state.monitor.question.reveal
    }
  }
}

export default session
