import store from '@/store'

export default axios => ({

  getTotalScores () {
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
  },

  setGroupGameScore (game_id, group_id, score) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `/scores/${game_id}/${group_id}`,
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
