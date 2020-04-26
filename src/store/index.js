import Vue from 'vue'
import Vuex from 'vuex'

import IDTCalculate from "../helpers/idtCalculate";
import {isThisWeek, sub, isAfter} from 'date-fns'

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
    getTaskAttrSomme: state => attr => {
      let Somme = 0;

      let tasks = state.tasks

      tasks.forEach(task => {
        Somme += parseInt(task[attr])
      })
      return Somme
    },
    getTaskWeekSomme: state => {
      let Somme = 0;

      const yesterday = sub(new Date(), {days: 1})
      let tasks = state.tasks.filter(task => {
        const date = new Date(task.time);
        return isThisWeek(date, {weekStartsOn: 1}) && isAfter(date, yesterday)
      })

      tasks.forEach(task => {
        Somme += parseInt(task.duration)
      })
      return Somme
    }
  },
  modules: {},
  plugins: [vuexLocal.plugin]
})
