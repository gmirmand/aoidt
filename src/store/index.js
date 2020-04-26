import Vue from 'vue'
import Vuex from 'vuex'

import IDTCalculate from "../helpers/idtCalculate";
import {isThisWeek, sub, isAfter, endOfWeek, isSameDay, subWeeks, isSameWeek} from 'date-fns'
import remainDays from "../helpers/remainDays";

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
      let idAlreadyExist = false;
      state.tasks.forEach((task, index) => {
        if (task.id === payload.id) {
          state.tasks[index] = payload
          idAlreadyExist = true;
        }
      })

      if (!idAlreadyExist) {
        state.tasks.push(payload);
      }
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(function (task) {
        return task.id !== id;
      });
    },
    recalculateIDT(state) {
      state.tasks.forEach(task => {
        task.index = IDTCalculate(task.importance, task.duration, task.time)
      })
    }
  },
  actions: {
    addTask(context, payload) {
      context.commit('addTask', {
        id: payload.id || uniqid(),
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

      const yesterday = sub(new Date(), {days: 1})
      let tasks = state.tasks.filter(task => {
        const date = new Date(task.time);
        return isAfter(date, yesterday)
      })

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
    },
    getTaskWeekAverage: (state, getters) => {
      let remainingDays = remainDays(endOfWeek(new Date(), {weekStartsOn: 1})) + 1

      return getters.getTaskWeekSomme / remainingDays
    },
    getTaskDaySomme: (state) => {
      let Somme = 0;

      let tasks = state.tasks.filter(task => {
        const date = new Date(task.time);
        return isSameDay(date, new Date());
      })

      tasks.forEach(task => {
        Somme += parseInt(task.duration)
      })
      return Somme
    },
    getTaskNextWeekSomme: state => {
      let Somme = 0;
      const nextWeek = subWeeks(new Date(), -1);

      let tasks = state.tasks.filter(task => {
        const date = new Date(task.time);
        return isSameWeek(date, nextWeek, {weekStartsOn: 1})
      })

      tasks.forEach(task => {
        Somme += parseInt(task.duration)
      })
      return Somme
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin]
})
