import axios from '@/plugins/axios'
import store from '@/store'

const getAll = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: '/games',
      headers: {
        'Authorization': store.getters.getSessionToken()
      }
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      if (err.response.data) {
        reject(err.response.data)
      }
      reject(err)
    })
  })
}

const getDetails = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: '/games/' + params.game_id,
      headers: {
        'Authorization': store.getters.getSessionToken()
      }
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      if (err.response.data) {
        reject(err.response.data)
      }
      reject(err)
    })
  })
}

const getQuestions = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `/games/${params.game_id}/questions`,
      headers: {
        'Authorization': store.getters.getSessionToken()
      }
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      if (err.response.data) {
        reject(err.response.data)
      }
      reject(err)
    })
  })
}

const setCurrentQuestion = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `/games/${params.game_id}/question`,
      data: {
        question_id: params.question_id
      },
      headers: {
        'Authorization': store.getters.getSessionToken()
      }
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      if (err.response.data) {
        reject(err.response.data)
      }
      reject(err)
    })
  })
}

const createGame = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/games',
      data: {
        game: params
      },
      headers: {
        'Authorization': store.getters.getSessionToken()
      }
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      if (err.response.data) {
        reject(err.response.data)
      }
      reject(err)
    })
  })
}

const updateGame = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `/games/${params.game_id}`,
      data: {
        game: params.game
      },
      headers: {
        'Authorization': store.getters.getSessionToken()
      }
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      if (err.response.data) {
        reject(err.response.data)
      }
      reject(err)
    })
  })
}

export default {
  getAll,
  getDetails,
  getQuestions,
  setCurrentQuestion,
  createGame,
  updateGame
}
