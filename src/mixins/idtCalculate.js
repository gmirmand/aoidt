import Vue from 'vue'
import idtCalculate from '../helpers/idtCalculate'

Vue.mixin({
  methods: {
    IDTCalculate(importance, duration, time) {
      return idtCalculate(importance, duration, time)
    }
  },
})
