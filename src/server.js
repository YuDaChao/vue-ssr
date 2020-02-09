import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    
    router.push(context.url)
    
    router.onReady(() => {
      context.meta = app.$meta()
      resolve(app)
    })
  })
}