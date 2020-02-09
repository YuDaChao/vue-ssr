import Vue from 'vue'

import store from './store'
import createRouter from './router'
import createRouterInterceptor from './router/router.interceptor'

import App from './app.vue'

import './assets/styles/index.less'

const router = createRouter()

createRouterInterceptor(router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
