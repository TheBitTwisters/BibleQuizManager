const app = {
  state: {
    drawer: true,
    snackbar: {
      show: false,
      message: '',
      timeout: 3000,
      status: 'info'
    }
  },
  mutations: {
    TOGGLE_APP_DRAWER (state) {
      state.drawer = !state.drawer
    },
    SET_APP_DRAWER (state, drawer) {
      state.drawer = drawer
    },
    SHOW_SNACKBAR (state, params) {
      state.snackbar.show = true
      state.snackbar.status = params.status || 'info'
      state.snackbar.message = params.message
    },
    HIDE_SNACKBAR (state) {
      state.snackbar.show = false
      state.snackbar.message = ''
    }
  },
  actions: {},
  getters: {
    isAppDrawerActive: (state) => () => {
      return state.drawer
    }
  }
}

export default app
