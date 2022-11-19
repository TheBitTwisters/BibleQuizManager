import store from '@/store'

export default axios => ({

  getAll () {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: '/games',
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

  getDetails (game_id) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: '/games/' + game_id,
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

  getQuestions (game_id) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `/games/${game_id}/questions`,
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

  getPlayers (game_id) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `/games/${game_id}/players`,
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

  modifyPlayersPass (game_id) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `/games/${game_id}/players/modify`,
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

  getScores (game_id) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `/games/${game_id}/scores`,
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

  setCurrentQuestion (game_id, question_id) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `/games/${game_id}/question`,
        data: {
          question_id: question_id
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

  addPlayer (game_id, player) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `/games/${game_id}/player`,
        data: player,
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

  create (game) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: '/games',
        data: {
          game: game
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

  update (game) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `/games/${game.id}`,
        data: {
          game: game
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
