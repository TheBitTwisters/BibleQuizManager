import axios from '@/plugins/axios'
import store from '@/store'

const getGameQuestions = (params) => {
  return new Promise((resolve, reject) => {
    axios.get('/questions/all', {
      params: {
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

const saveQuestion = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: params.id ? 'put' : 'post',
      url: `/questions/${params.id ? params.id : 'save'}`,
      data: {
        question: params
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
  saveQuestion
}
