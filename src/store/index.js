import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  strict: debug,
  state: {
    tip: ''
  },
  getters: {
    tip: state => state.tip
  },
  mutations: {
    SET_TIP (state, data) {
      state.tip = data
    }
  },
  actions: {

  },
  modules: {
    user
  }
})

export default store
