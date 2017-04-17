import webpack from 'webpack'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-build-notifier'
import eslintFriendlyFormatter from 'eslint-friendly-formatter'
import chalk from 'chalk'
import autoprefixer from 'autoprefixer'
import cssgrace from 'cssgrace'

import { entry, alias, provide, envConfig } from './config'

const postcssPlugin = function () {
  return [
    autoprefixer({
      browsers: ['> 5%', 'last 2 versions', 'IE >= 8']
    })
  ]
}

export default {
  context: `${process.cwd()}/src`,
  // devtool: false,
  devtool: 'cheap-module-eval-source-map',
  // devtool: 'eval-source-map',
  // devtool: 'source-map',
  entry,
  output: {
    path: `${process.cwd()}/dist`,
    publicPath: envConfig.publicPath,
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        cache: true,
        formatter: eslintFriendlyFormatter
      }
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: ['react-hot-loader', 'babel-loader?cacheDirectory=true']
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: false
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: postcssPlugin
          }
        }
      ]
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: false
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: postcssPlugin
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: false
          }
        }
      ]
    }, {
      test: /\.(png|jpe?g|gif|woff|woff2|ttf|eot|svg|swf)$/,
      loader: 'file-loader',
      options: {
          name: '[name].[ext]'
      }
    }]
  },
  plugins: [
    new ProgressBarPlugin({
      format: `${chalk.bold('[:bar]')} ${chalk.cyan.bold(':percent (:elapseds)')} :msg`,
      clear: true,
      summary: false,
      summaryContent: false,
      customSummary (buildTime) {
        process.stdout.write(`=====${chalk.green.bold(`[ built in ${buildTime} ]`)}=====`)
      }
    }),
    // https://github.com/RoccoC/webpack-build-notifier
    new WebpackNotifierPlugin({
      title: '开发服务器',
      logo: 'global/img/screen_logo.jpg',
      successSound: 'Submarine',
      failureSound: 'Glass',
      suppressSuccess: true
    }),

    new webpack.ProvidePlugin(provide),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      __DEV__: true,
      __PROD__: false
    }),
    // https://github.com/glenjamin/webpack-hot-middleware
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: Infinity // 不需要抽取公共代码到这个文件中
    })
  ]
}
