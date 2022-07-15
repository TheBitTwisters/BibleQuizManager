import axios from '@/plugins/axios'
import store from '@/store'

const create = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/choices/',
      data: {
        choice: params
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
      url: `/choices/${params.choice_id}`,
      data: {
        choice: params
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
  create,
  update
}
