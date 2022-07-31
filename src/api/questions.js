import axios from '@/plugins/axios'
import store from '@/store'

const create = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/questions/',
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

const update = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `/questions/${params.question_id}`,
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

const lock = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `/questions/${params.question_id}/lock`,
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
  create,
  update,
  lock
}
