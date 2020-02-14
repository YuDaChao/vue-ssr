import Vue from 'vue'
import Meta from 'vue-meta'
import createRouter from './router'
import createStore from './store'

import './assets/styles/index.less'

import App from './app.vue'
import Notification from './views/component/notification'

Vue.use(Meta)
Vue.use(Notification)

export default () => {
  const router = createRouter()
  const store = createStore()
  
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, store, router }
}