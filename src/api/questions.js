import axios from '@/plugins/axios'
import store from '@/store'

const getGameQuestions = (params) => {
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

const saveGame = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: params.id ? 'put' : 'post',
      url: `/games/${params.id ? params.id : 'save'}`,
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

export default {
  getGameQuestions,
  saveGame
}
