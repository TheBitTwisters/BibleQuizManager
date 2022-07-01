import axios from '@/plugins/axios'
import store from '@/store'

const getAllGamesScores = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: '/scores/all',
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

const getGameScores = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: '/scores/game',
      data: {
        game_id: params.game_id
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
  getAllGamesScores,
  getGameScores
}
