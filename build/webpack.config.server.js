const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const baseConfig = require('./webpack.config.base')


// 开发环境
let config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../src/server.js'),
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../server-build')
  },
  devtool: 'source-map',
  // 不打包dependencies中的依赖
  externals: Object.keys(require('../package').dependencies),
  module: {
    rules: [
      {
        test: /\.less$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[path][name]__[local]--[hash:base64:5]',
                  },
                  importLoaders: 2,
                  localsConvention: 'camelCase'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'less-loader'
            ]
          },
          {
            use: [
              'vue-style-loader',
              'css-loader',
              'postcss-loader',
              'less-loader'
            ]
          }
        ],
      }
    ]
  },
  plugins: [
    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件。
    // 默认文件名为 `vue-ssr-server-bundle.json`
    new VueServerPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    })
  ]
})

module.exports = config
