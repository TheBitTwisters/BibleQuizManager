import axios from '@/plugins/axios'
import store from '@/store'

const getAll = () => {
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
}
const getGroups = () => {
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
}

const createGroup = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/players/groups',
      data: {
        group: params
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
const updateGroup = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `/players/groups/${params.id}`,
      data: {
        group: params
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

const createMember = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/players/members',
      data: {
        member: params
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
const updateMember = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `/players/members/${params.member_id}`,
      data: {
        member: params
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
const setMemberGroup = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `/players/members/${params.member_id}/group`,
      data: {
        group_id: params.group_id
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
  getGroups,
  createGroup,
  updateGroup,
  createMember,
  updateMember,
  setMemberGroup
}
