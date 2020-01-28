module.exports = () => {
  return {
    // 开启 CSS Modules
    modules: true,
    // 自定义生成的类名
    cssModules: {
      localIdentName: '[path]--[name]--[hash:base64:8]',
      camelCase: true
    }
  }
}
