const path = require('path')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const baseConfig = require('./webpack.config.base')

const devMode = process.env.NODE_ENV !== 'production'

let config = {}

const defaultPlugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '../public/index.html')
  }),
  // 此插件在输出目录中
  // 生成 `vue-ssr-client-manifest.json`。
  new VueClientPlugin()
]

// 开发环境
if (devMode) {
  config = merge(baseConfig, {
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
    devServer: {
      publicPath: '/public/',
      hot: true,
      historyApiFallback: {
        index: '/public/index.html' // 跟路径路径和output.publicPath一致
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      ...defaultPlugins
    ]
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../src/client.js')
    },
    output: {
      publicPath: '/dist/',
      filename: 'js/bundle.[chunkHash:8].js'
    },
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
              use: [{
                loader: MiniCssExtractPlugin.loader
              },
                'css-loader',
                'postcss-loader',
                'less-loader'
              ]
            }
          ],
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1024, // 小于1024字节 编译成base64
                publicPath: 'dist',
                name: 'images/[name].[hash:8].[ext]'
              }
            }
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
