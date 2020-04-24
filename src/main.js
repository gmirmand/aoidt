import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// Material design
import VueMaterial from 'vue-material'

// import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import i18n from './i18n'

Vue.use(VueMaterial)
// Vue.use(MdButton)
// Vue.use(MdContent)
// Vue.use(MdTabs)

// change single option
Vue.material.locale.dateFormat = 'dd/MM/yyyy'

// change multiple options
Vue.material = {
  ...Vue.material,
  locale: {
    ...Vue.material.locale,
    dateFormat: 'dd/MM/yyyy',
    firstDayOfAWeek: 1
  }
}


Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
