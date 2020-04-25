import Vue from 'vue'
import remainDays from "../helpers/remainDays";

Vue.mixin({
  methods: {
    remainDays(date) {
      return remainDays(date)
    }
  },
})
