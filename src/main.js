import Vue from 'vue'
import Home from './views/Home.vue'
import { createProvider } from './vue-apollo'
import VueClipboard from 'vue-clipboard2'

import 'tachyons'

Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  provide: createProvider().provide(),
  render: h => h(Home)
}).$mount('#app')
