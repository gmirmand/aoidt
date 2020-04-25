import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './assets/sass/style.scss'

import './assets/fonts/material-design-icons/material-icons.css'

// Match Media
import MQ from 'vue-match-media/src'

Vue.use(MQ)

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
  render: h => h(App),
  mq: {
    xxxs: '(max-width: 20em)', // 320px
    xxs: '(max-width: 23em)', // 360px
    xs: '(max-width: 35em)', // 560px
    s: '(max-width: 48em)', // 768px
    m: '(max-width:50em)', // 800px
    l: '(max-width: 62em)', // 992px
    xl: '(max-width: 75em)', // 1200px
    xxl: '(max-width: 84em)', // 1344px
    xxxl: '(max-width: 96em)', // 1536px
  }
}).$mount('#app')
