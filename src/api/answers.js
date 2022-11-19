import axios from '@/plugins/axios'
import store from '@/store'

const saveScore = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `/answers/${params.answer_id}/score`,
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
  saveScore
}
