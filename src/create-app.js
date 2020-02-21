import Vue from 'vue'
import Meta from 'vue-meta'
import createRouter from './router'
import createStore from './store'

import './assets/styles/index.less'

import App from './app.vue'
import Notification from './views/component/notification'
import Tabs from './views/component/tabs/tabs.vue'
import Tab from './views/component/tabs/tab.vue'

Vue.use(Meta)
Vue.use(Notification)
Vue.component(Tabs.name, Tabs)
Vue.component(Tab.name, Tab)

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