import Vue from 'vue'
import Vuex from 'vuex'

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
        name: payload.name,
        importance: payload.importance,
        duration: payload.duration,
        time: payload.time
      })
    }
  },
  modules: {}
})
