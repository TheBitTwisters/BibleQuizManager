export default axios => ({

  login (name, pin) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: '/auth/manager',
        data: {
          name: name,
          pin: pin
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
