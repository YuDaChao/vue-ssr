const VueServerRenderer = require('vue-server-renderer')
const fs = require('fs')
const path = require('path')
const serverRenderer = require('./server-render')

const handleSSR = async (ctx) => {
  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')
  const clientManifest = require(path.join(__dirname, '../../dist/vue-ssr-client-manifest.json'))
  const bundle = path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json')
  const renderer = VueServerRenderer.createBundleRenderer(
    bundle,
    {
      runInNewContext: false,
      // 手动执行资源注入
      inject: false,
      clientManifest
    }
  )
  await serverRenderer(ctx, renderer, template)
}

module.exports = handleSSR