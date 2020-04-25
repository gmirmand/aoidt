import Vue from 'vue'
import Vuex from 'vuex'

import uniqid from 'uniqid'

import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    addTask(state, payload) {
      state.tasks.push(payload);
    }
  },
  actions: {
    addTask(context, payload) {
      context.commit('addTask', {
        id: uniqid(),
        name: payload.name,
        importance: payload.importance,
        duration: payload.duration,
        time: payload.time
      })
    }
  },
  modules: {},
  plugins: [vuexLocal.plugin]
})
