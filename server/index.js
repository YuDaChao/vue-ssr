const Koa = require('koa')

const staticRouter = require('./routes/static')

const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'

app.use(async (ctx, next) => {
  try {
    console.log(`koa request path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = err.message
  }
})

app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

let router

if (isDev) {
  router = require('./routes/dev')
} else {
  router = require('./routes/pro')
}

app.use(router.routes()).use(router.allowedMethods())

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`server is running at http://${HOST}:${PORT}`)
})