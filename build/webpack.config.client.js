const path = require('path')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const devMode = process.env.NODE_ENV !== 'production'

let config = {}

const defaultPlugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '../public/index.html')
  })
]

// 开发
if (devMode) {
  config = merge(baseConfig, {
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'less-loader'
            }
          ]
        }
      ]
    },
    devServer: {
      publicPath: '/',
      hot: true
    },
    plugins: defaultPlugins
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../src/index.js')
    },
    output: {
      filename: 'js/bundle.[chunkHash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [{
            loader: MiniCssExtractPlugin.loader
          },
            'css-loader',
            'postcss-loader',
            'less-loader'
          ]
        }
      ]
    },
    optimization: {
      minimizer: [ new UglifyJsPlugin({
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        chunkFilter: (chunk) => {
          return true
        }
      })],
      // 找到chunk中的共享模块，取出来生成单独的chunk
      splitChunks: {
        chunks: 'all', // all表示对所有模块生效，async表示抽取异步模块，initial表示对同步模块生效
        cacheGroups: {
          defaultVendors: {
            filename: 'js/[name]/bundle.js'
          },
          commons: { // 抽离第三方插件
            test: /[\\/]node_modules[\\/]/, // 指定node_modules下的第三方包
            name: 'vendors',
            chunks: 'all'
          }
        }
      },
      runtimeChunk: true
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[hash:8].css',
        chunkFilename: '[id].[hash:8].css',
        ignoreOrder: true
      }),
      new OptimizeCssAssetsPlugin({}),
      ...defaultPlugins
    ]
  })
}

module.exports = config
