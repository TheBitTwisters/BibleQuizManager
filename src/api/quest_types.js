import axios from '@/plugins/axios'
import store from '@/store'

const getAll = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: '/quest-types',
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

const saveQuestType = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: params.id ? 'put' : 'post',
      url: `/quest-types/${params.id ? params.id : 'save'}`,
      data: {
        quest_type: params
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
  saveQuestType
}
