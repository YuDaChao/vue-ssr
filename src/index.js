import Vue from 'vue'
import VueRouter from 'vue-router'

import createRouter from './router'
import createRouterInterceptor from './router/router.interceptor'

import App from './app.vue'

import './assets/styles/index.less'

Vue.use(VueRouter)

const router = createRouter()

createRouterInterceptor(router)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
