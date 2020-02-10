const path = require('path')
const axios = require('axios')
const fs = require('fs')
const webpack = require('webpack')
// const webpackDevMiddleware = require('koa-webpack-dev-middleware')
// const webpackHotMiddleware = require('koa-webpack-hot-middleware')
const MemoryFs = require('memory-fs')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')

const serverConfig = require('../../build/webpack.config.server')
// const clientConfig = require('../../build/webpack.config.client')

const mfs = new MemoryFs()

const serverCompiler = webpack(serverConfig)
// const clientCompiler = webpack(clientConfig)

serverCompiler.outputFileSystem = mfs
// clientConfig.outputFileSystem = mfs

let bundle
let clientManifest

serverCompiler.watch({}, (err, stats) => {
  if (err) { throw err}
  else {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) return
    const bundlePath = path.join(
      serverConfig.output.path,
      'vue-ssr-server-bundle.json'
    )
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
    console.log('bundle is generated')
  }
})

// clientCompiler.watch({}, (err, stats) => {
//   if (err) { throw err }
//   else {
//     stats = stats.toJson()
//     stats.errors.forEach(err => console.error(err))
//     stats.warnings.forEach(err => console.warn(err))
//     if (stats.errors.length) return
//     const bundlePath = path.join(
//       clientConfig.output.path,
//       'vue-ssr-client-manifest.json'
//     )
//     clientManifest = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
//     console.log('clientManifest is generated')
//   }
// })

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '正在编译中...'
    return
  }
  const { data } = await axios.get('http://localhost:8080/public/vue-ssr-client-manifest.json')
  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    runInNewContext: false,
    // 手动执行资源注入
    inject: false,
    clientManifest: data
  })
  await serverRender(ctx, renderer, template)
}

module.exports = handleSSR