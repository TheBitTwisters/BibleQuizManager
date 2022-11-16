import store from '@/store'

export default axios => ({

  getAll () {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: '/players',
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

  getGroups () {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: '/players/groups',
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

  createGroup (group) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: '/players/groups',
        data: {
          group: group
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

  updateGroup (group) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `/players/groups/${group.id}`,
        data: {
          group: group
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

  createMember (member) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: '/players/members',
        data: {
          member: member
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

  updateMember (member) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `/players/members/${member.id}`,
        data: {
          member: member
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

  setMemberGroup (member_id, group_id) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `/players/members/${member_id}/group`,
        data: {
          group_id: group_id
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
