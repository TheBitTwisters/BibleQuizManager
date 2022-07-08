import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import createMultiTabState from 'vuex-multi-tab-state'

import ModApp from './app'
import ModSession from './session'
import ModPlay from './play'
import ModMonitor from './monitor'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  modules: {
    app: ModApp,
    session: ModSession,
    play: ModPlay,
    monitor: ModMonitor
  },
  plugins: [
    vuexLocal.plugin,
    createMultiTabState()
  ],
})
