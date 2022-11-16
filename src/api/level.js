import store from '@/store'

export default axios => ({

  getAll () {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: '/levels',
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

  create (level) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: '/levels',
        data: {
          level: level
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

  update (level) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `/levels/${level.id}`,
        data: {
          level: level
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
