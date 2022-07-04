import axios from 'axios'
import store from '@/store'

const instance = axios.create({
  baseURL: 'http://192.168.68.13:3000/',
  withCredentials: false,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
})

// instance.interceptors.request.use(
//   (request) => {
//     if (store.getters.isSessionActive() && store.getters.isSessionExpired()) {
//       store.dispatch('session_logout')
//     }
//     return request
//   }, (err) => {
//       return Promise.reject(err)
//   }
// )
instance.interceptors.response.use(
  (response) => {
    if (response.data.session) {
      store.commit('SET_SESSION', response.data.session)
    }
    return response
  }, (err) => {
    if (err.code == "ERR_NETWORK" || err.response.status == 403) {
      store.dispatch('session-logout')
    }
    return Promise.reject(err)
  }
)

export default instance
