import Vue from 'vue'
import Vuex from 'vuex'

import IDTCalculate from "../helpers/idtCalculate";

// UniqId
import uniqid from 'uniqid'

// VueX
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
      state.tasks.sort((a, b) => new Date(a.time) - new Date(b.time))
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(function (task) {
        return task.id !== id;
      });
    }
  },
  actions: {
    addTask(context, payload) {
      context.commit('addTask', {
        id: uniqid(),
        name: payload.name,
        importance: payload.importance,
        duration: payload.duration,
        time: payload.time,
        index: IDTCalculate(payload.importance, payload.duration, payload.time)
      })
    },
    deleteTask(context, id) {
      context.commit('deleteTask', id)
    }
  },
  getters: {
    getTaskAttrSomme: state => (attr) => {
      let Somme = 0;
      state.tasks.forEach(task => {
        Somme += parseInt(task[attr])
      })
      return Somme
    }
  },
  modules: {},
  plugins: [vuexLocal.plugin]
})
