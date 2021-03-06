const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// const createVueLoaderOptions = require('./vue-loader-options')


const baseConfig = {
  mode: process.env.NODE_ENV || 'production',
  target: 'web',
  entry: path.join(__dirname, '../src/client.js'),
  output: {
    publicPath: 'http://localhost:8080/public/',
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: createVueLoaderOptions() // 在这里配置貌似不生效
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024, // 小于1024字节 编译成base64
              name: 'images/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin()
  ]
}

module.exports = baseConfig
