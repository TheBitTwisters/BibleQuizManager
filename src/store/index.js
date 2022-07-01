import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import ModSession from './session'
import ModPlay from './play'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  modules: {
    session: ModSession,
    play: ModPlay
  },
  plugins: [
    vuexLocal.plugin
  ],
})
