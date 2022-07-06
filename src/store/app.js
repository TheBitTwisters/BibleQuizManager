const app = {
  state: {
    drawer: true
  },
  mutations: {
    TOGGLE_APP_DRAWER (state) {
      state.drawer = !state.drawer
    },
    SET_APP_DRAWER (state, drawer) {
      state.drawer = drawer
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
