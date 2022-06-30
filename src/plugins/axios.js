import axios from 'axios'
// import store from '@/store'

const instance = axios.create({
  baseURL: 'http://192.168.68.16:3000/',
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
// instance.interceptors.response.use(
//   (response) => {
//     if (response.data.access) {
//       store.commit('SET_ACCESS', response.data.access)
//     }
//     if (response.data.session) {
//       store.commit('SET_SESSION', response.data.session)
//     }
//     return response
//   }, (err) => {
//       return Promise.reject(err)
//   }
// )

export default instance
