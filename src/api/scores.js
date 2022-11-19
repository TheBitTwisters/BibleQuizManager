import axios from '@/plugins/axios'
import store from '@/store'

const getTotalScores = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: '/scores'
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

const setGroupGameScore = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `/scores/${params.game_id}/${params.group_id}`,
      data: {
        score: params.score
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
  getTotalScores,
  setGroupGameScore
}
