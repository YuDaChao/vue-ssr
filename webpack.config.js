const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'

const baseConfig = {
  mode: 'development',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
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
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024, // 小于1024字节 编译成base64
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html')
    })
  ]
}

if (devMode) {
  baseConfig.module.rules.push({
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
  })
  baseConfig.devServer = {
    publicPath: '/',
    hot: true
  }
} else {
  baseConfig.mode = 'production'
  baseConfig.optimization = {
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
  }
  baseConfig.module.rules.push({
    test: /\.less$/,
    use: [{
      loader: MiniCssExtractPlugin.loader
    },
      'css-loader',
      'postcss-loader',
      'less-loader'
    ]
  })
  baseConfig.plugins.push(...[
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new OptimizeCssAssetsPlugin({})
  ])
}

module.exports = baseConfig
