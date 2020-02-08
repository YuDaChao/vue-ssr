import Vue from 'vue'
import VueRouter from 'vue-router'

import createRouter from './router'

import App from './app.vue'

import './assets/styles/index.less'

Vue.use(VueRouter)

const router = createRouter()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
