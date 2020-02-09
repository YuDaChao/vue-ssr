import createApp from './create-app'

export default content => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    
    router.push(content.url)
    
    router.onReady(() => {
      resolve(app)
    })
  })
}