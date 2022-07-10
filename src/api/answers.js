import axios from '@/plugins/axios'
import store from '@/store'

const checkAnswers = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/answers/check',
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

export default {
  checkAnswers
}
