import store from '@/store'

export default axios => ({

  getSubmittedAnswers (question_id) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `/questions/${question_id}/answers`,
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

  lock (question_id) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `/questions/${question_id}/lock`,
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

  create (question) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: '/questions/',
        data: {
          question: question
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

  update (question) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `/questions/${question.id}`,
        data: {
          question: question
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
