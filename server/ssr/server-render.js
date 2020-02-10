const ejs = require('ejs')

/**
 *
 * @param ctx
 * @param renderer Renderer实例
 * @param template html模版
 * @returns {Promise<void>}
 */
module.exports = async (ctx, renderer, template) => {
  // 设置请求头
  ctx.headers['Content-Type'] = 'text/html'
  
  const context = { url: ctx.path }
  
  try {
    const appString = await renderer.renderToString(context)
    const {
      title
    } = context.meta.inject()
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text()
    })
    ctx.body = html
  } catch (e) {
  
  }
}