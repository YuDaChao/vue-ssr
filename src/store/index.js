import Vue from 'vue'
import Vuex from 'vuex'

import * as modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  state: {
    count: 1
  },
  mutations: {}
})