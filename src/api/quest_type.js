import store from '@/store'

export default axios => ({

  getAll () {
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
  },

  create (type) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: '/quest-types',
        data: {
          quest_type: type
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
  },

  update (type) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `/quest-types/${type.id}`,
        data: {
          quest_type: type
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

})
