const path = require('path')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base')

const defaultPlugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '../public/template.html')
  })
]

// 开发环境
let config = merge(baseConfig, {
  entry: {
    practice: path.join(__dirname, '../practice/index.js')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        oneOf: [
          {
            resourceQuery: /module/i,
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
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'less-loader'
            ]
          }
        ],
      }
    ]
  },
  resolve: {
    alias: {
      vue: path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  devServer: {
    publicPath: '/',
    hot: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    ...defaultPlugins
  ]
})

module.exports = config
