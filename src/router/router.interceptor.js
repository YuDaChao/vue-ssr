export default (router) => {
  router.beforeEach((to, from, next) => {
    console.log('router beforeEach')
    next()
  })
  router.beforeResolve((to, from , next) => {
    console.log('router beforeResolve')
    next()
  })
  router.afterEach((to, from) => {
    console.log('router afterEach')
  })
}