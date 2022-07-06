import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import ModApp from './app'
import ModSession from './session'
import ModPlay from './play'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  modules: {
    app: ModApp,
    session: ModSession,
    play: ModPlay
  },
  plugins: [
    vuexLocal.plugin
  ],
})
