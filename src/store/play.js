import router from '@/router'
import apiGames from '@/api/games'
import apiLevels from '@/api/levels'
import apiQuestTypes from '@/api/quest_types'
import apiScores from '@/api/scores'

const play = {
  state: {
    game: undefined,
    levels: [],
    quest_types: [],
    questions: [],
    choicesShown: 0,
    players: [],
    scores: []
  },
  mutations: {
    SET_PLAY_GAME (state, game) {
      state.game = game
    },
    SET_PLAY_ATTENDANCE (state, players) {
      state.players = players
    },
    SET_PLAY_QUESTIONS (state, questions) {
      state.questions = questions
    },
    SET_PLAY_QUESTION_LOCK (state, question) {
      for (let quest of state.questions) {
        if (quest.id == question.id) {
          quest.locked_at = question.locked_at || undefined
          break
        }
      }
    },
    SET_PLAY_CHOICES_SHOWN (state, shown) {
      state.choicesShown = shown
    },
    SET_PLAY_SCORES (state, scores) {
      state.scores = scores
    },
  },
  actions: {
    'clear-game': function ({ commit }) {
      commit('SET_PLAY_GAME', undefined)
      commit('SET_PLAY_ATTENDANCE', [])
      commit('SET_PLAY_CHOICES_SHOWN', 0)
      commit('SET_PLAY_QUESTIONS', [])
      commit('SET_PLAY_ATTENDANCE', [])
      commit('SET_PLAY_SCORES', [])
    },
    'play-game': async function ({ state, commit, dispatch }, params) {
      try {
        var response = {}
        response = await apiLevels.getAll()
        state.levels = response.levels
        response = await apiQuestTypes.getAll()
        state.quest_types = response.quest_types
        response = await apiGames.getDetails({ game_id: params.game_id })
        commit('SET_PLAY_GAME', response.game)
        response = await apiGames.getQuestions({ game_id: params.game_id })
        commit('SET_PLAY_QUESTIONS', response.questions)
        response = await apiGames.getPlayers({ game_id: params.game_id })
        commit('SET_PLAY_ATTENDANCE', response.players)
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
    'play-next-question': async function ({ state, commit, dispatch }) {
      for (let question of state.questions) {
        if (question.id > state.game.current_question_id) {
          try {
            var response = await apiGames.setCurrentQuestion({
              game_id: state.game.id,
              question_id: question.id
            })
            dispatch('monitor-question', false)
            commit('SET_MONITOR_ANSWER', false)
            commit('SET_PLAY_CHOICES_SHOWN', 0)
            commit('SET_PLAY_GAME', response.game)
          } catch (err) {
            console.log(err)
            commit('SHOW_SNACKBAR', {
              status: 'error',
              message: err.message
            })
          }
          break
        }
      }
    },
    'play-choice-show': function ({ state, commit }) {
      if (state.game.current_question_id > 0 && state.choicesShown < 4) {
        commit('SET_PLAY_CHOICES_SHOWN', state.choicesShown + 1)
      }
    },
    'play-reveal-answer': function ({ commit }) {
      commit('SET_MONITOR_ANSWER', true)
    },
    'play-refresh-scores': function ({ state, commit }) {
      apiGames.getScores({ game_id: state.game.id })
        .then(response => {
          commit('SET_PLAY_SCORES', response.scores)
        }).catch(err => {
          console.log(err)
        })
    },
    'play-finish-game': async function ({ state, commit }, params) {
      try {
        for (let group of params.groups) {
          await apiScores.setGroupGameScore({
            game_id: state.game.id,
            group_id: group.id,
            score: group.score
          })
        }
        var response = await apiGames.setCurrentQuestion({
          game_id: state.game.id,
          question_id: -1
        })
        commit('SET_PLAY_GAME', response.game)
        commit('SHOW_SNACKBAR', {
          status: 'success',
          message: 'Gamescores saved'
        })
      } catch (err) {
        console.log(err)
        commit('SHOW_SNACKBAR', {
          status: 'error',
          message: 'Error saving gamescores'
        })
      }
    }
  },
  getters: {
    getPlayGame: (state) => () => {
      return state.game
    },
    getPlayAttendance: (state) => () => {
      return state.players
    },
    getPlayScores: (state) => () => {
      return state.scores
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
    getPlayQuestionAnswer: (state) => () => {
      for (let question of state.questions) {
        if (question.id == state.game.current_question_id) {
          for (let choice of question.choices) {
            if (choice.is_answer == 1) {
              return choice.label
            }
          }
        }
      }
      return ''
    },
    getPlayChoicesShown: (state) => () => {
      return state.choicesShown
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
