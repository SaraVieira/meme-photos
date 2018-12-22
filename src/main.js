import Vue from 'vue'
import App from './App.vue'
import { createProvider } from './vue-apollo'
import VueClipboard from 'vue-clipboard2'

import 'animate.css'
import 'tachyons'
import router from './router'

Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  provide: createProvider().provide(),
  router,
  render: h => h(App)
}).$mount('#app')
