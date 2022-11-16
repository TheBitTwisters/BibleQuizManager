import store from '@/store'

export default axios => ({

  create (choice) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: '/choices/',
        data: {
          choice: choice
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

  update (choice) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `/choices/${choice.id}`,
        data: {
          choice: choice
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

  delete (choice) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: `/choices/${choice.id}`,
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
