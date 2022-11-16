import store from '@/store'

export default axios => ({

  saveScore (answer_id, score) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `/answers/${answer_id}/score`,
        data: {
          score: score
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
