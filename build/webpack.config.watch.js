import webpack from 'webpack'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-build-notifier'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ZipWebpackPlugin from 'zip-webpack-plugin'
import eslintFriendlyFormatter from 'eslint-friendly-formatter'
import chalk from 'chalk'
import autoprefixer from 'autoprefixer'
import cssgrace from 'cssgrace'
import postcssClean from 'postcss-clean'

import { entry, alias, provide, envName, envConfig, upload as uploadConfig } from './config'

export default {
  context: `${process.cwd()}/src`,
  watch: true,
  // devtool: false,
  devtool: 'cheap-module-eval-source-map',
  // devtool: 'eval-source-map',
  // devtool: 'source-map'
  entry,
  output: {
    path: `${process.cwd()}/dist`,
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[id].js' // 非入口文件的命名规则
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias
  },
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'eslint'
    }],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(['css', 'postcss'])
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(['css', 'postcss', 'sass'])
    }, {
      test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
      loader: 'file',
      query: {
        name: '[name]_[hash:7].[ext]'
      }
    }]
  },
  postcss: [
    autoprefixer({
      browsers: ['> 5%', 'last 2 versions', 'IE >= 8']
    }),
    cssgrace
  ],
  eslint: {
    cache: true,
    ignore: true,
    formatter: eslintFriendlyFormatter
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
    new WebpackNotifierPlugin({
      title: '编译',
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

    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: Infinity // 不需要抽取公共代码到这个文件中
    }),
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    }),

    new CleanWebpackPlugin(['dist'], {
      root: `${process.cwd()}`,
      verbose: false
    }),
    // https://github.com/kevlened/copy-webpack-plugin
    new CopyWebpackPlugin([{
      context: 'global/module',
      from: 'es5-shim-sham.js', //relative (to CopyWebpackPlugin context option)
      to: '' //relative (to Webpack output path)
    }])
  ]
}
