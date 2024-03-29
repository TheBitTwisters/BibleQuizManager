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

const getPlayers = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `/games/${params.game_id}/players`,
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
const modifyPlayersPass = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `/games/${params.game_id}/players/modify`,
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

const getScores = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `/games/${params.game_id}/scores`,
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

const addPlayer = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `/games/${params.game_id}/player`,
      data: params,
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

const create = (params) => {
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

const update = (params) => {
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
  getPlayers,
  modifyPlayersPass,
  getScores,
  setCurrentQuestion,
  addPlayer,
  create,
  update
}
