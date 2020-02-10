import 'regenerator-runtime'
import createApp from './create-app'

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  
  router.beforeResolve((to, from, next) => {
    const matchedComponent = router.getMatchedComponents(to)
    const preMatchedComponent = router.getMatchedComponents(from)
    let diffed = false
    const activated = matchedComponent.filter((c, i) => {
      return diffed || (diffed = (preMatchedComponent[i] !== c))
    })
    
    if (!activated.length) {
      return next()
    }
  
    // 加载效果
    
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(() => {
      // 停止加载效果
      next()
    }).catch(next)
    
  })
  app.$mount('#app')
})
