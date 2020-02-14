import Vue from 'vue'

import createStore from './store'
import createRouter from './router'
import createRouterInterceptor from './router/router.interceptor'

import App from './app.vue'

import Notification from './views/component/notification'

import './assets/styles/index.less'

Vue.use(Notification)

const router = createRouter()
const store = createStore()

createRouterInterceptor(router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
