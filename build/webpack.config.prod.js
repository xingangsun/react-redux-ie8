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

import Es5to3WebpackPlugin from 'es5to3-webpack-plugin'

import { entry, alias, provide, envName, envConfig, upload as uploadConfig } from './config'

const postcssPlugin = function () {
  return [
    autoprefixer({
      browsers: ['> 5%', 'last 2 versions', 'IE >= 8']
    })
  ]
}

export default {
  context: `${process.cwd()}/src`,
  devtool: false,
  entry,
  output: {
    path: `${process.cwd()}/dist`,
    publicPath: envConfig.publicPath,
    filename: '[name].js',
    chunkFilename: '[id]_[chunkhash:7].js' // 非入口文件的命名规则
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
      use: ['babel-loader?cacheDirectory=true']
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
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
      })
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
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
      })
    }, {
      test: /\.(png|jpe?g|gif|woff|woff2|ttf|eot|svg|swf)$/,
      loader: 'file-loader',
      options: {
          name: '[name]_[hash:7].[ext]'
      }
    }/*, {
      enforce: 'post',
      test: /\.jsx?$/,
      loader: 'es3ify-loader'
    }*/]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new Es5to3WebpackPlugin({
      test: /\.jsx?$/
    }),
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
      title: '打包完成',
      logo: 'global/img/screen_logo.jpg',
      successSound: 'Submarine',
      failureSound: 'Glass',
      suppressSuccess: true
    }),

    new webpack.ProvidePlugin(provide),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __DEV__: false,
      __PROD__: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: Infinity // 不需要抽取公共代码到这个文件中
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),

    // https://github.com/mishoo/UglifyJS2/blob/master/README.md
    // IE8 issues: https://github.com/SamHwang1990/blog/issues/6
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_console: true
    //   },
    //   output: {
    //     // for IE8, keep keyword default -> "default"
    //     keep_quoted_props: true,
    //     comments: false
    //   },
    //   sourceMap: false
    // }),

    new CleanWebpackPlugin(['dist', 'zip'], {
      root: `${process.cwd()}`,
      verbose: false
    }),
    // https://github.com/kevlened/copy-webpack-plugin
    new CopyWebpackPlugin([{
      context: 'global/module',
      from: 'es5-shim-sham.js', //relative (to CopyWebpackPlugin context option)
      to: '' //relative (to Webpack output path)
    }]),

    // https://github.com/erikdesjardins/zip-webpack-plugin
    new ZipWebpackPlugin({
      path: '../zip', //relative (to Webpack output path)
      filename: `${uploadConfig.project}.zip`
    }),
  ]
}
