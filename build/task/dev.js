/**
 * 开发模式入口
 */
import express from 'express'
import ip from 'ip'
import chalk from 'chalk'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import httpProxyMiddleware from 'http-proxy-middleware'

import serverMiddleware from '../plugins/server.middleware'
import config from '../../config'
import { nohot } from '../config'
import webpackConfigDev from '../webpack.config.dev'
import webpackConfigProd from '../webpack.config.prod'

let webpackConfig = webpackConfigDev
if (nohot) { // IE8兼容测试
  webpackConfig = webpackConfigProd
  webpackConfig.plugins.splice(webpackConfig.plugins.findIndex((p) => p instanceof webpack.optimize.UglifyJsPlugin), 1)
  webpackConfig.plugins.splice(webpackConfig.plugins.findIndex((p) => p instanceof webpack.optimize.DedupePlugin), 1) // Note: Don’t use it in watch mode. Only for production builds.
} else { // 热刷新
  const hotclient = ['webpack-hot-middleware/client?noInfo=true&reload=true']
  const entry = webpackConfig.entry
  Object.keys(entry).forEach(name => {
    const value = entry[name]
    if (Array.isArray(value)) {
      value.unshift(...hotclient)
    } else {
      entry[name] = [...hotclient, value]
    }
  })
}
// console.log(entry)

const webpackCompiler = webpack(webpackConfig)
const devMiddleware = webpackDevMiddleware(webpackCompiler, {
  serverSideRender: true,
  publicPath: webpackCompiler.options.output.publicPath,
  noInfo: true,
  quiet: false,
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    children: false
  }
})
const hotMiddleware = webpackHotMiddleware(webpackCompiler, {
  log: false
})

const devServer = express()

// devServer.use(connectHistoryApiFallback({ verbose: false }))
devServer.use(devMiddleware)
devServer.use(hotMiddleware)
devServer.use(serverMiddleware)
devServer.use('/global', express.static('src/global'));
// 代理API，可以在config/mine.js中修改成你想要的代理目标
devServer.use('/', httpProxyMiddleware({
  logLevel: 'silent',
  proxyTimeout: 60000,
  target: config.proxyTarget,
  changeOrigin: true,
  cookieDomainRewrite: {
    '*': ip.address()
  }
}))

devServer.listen(config.devServerPort, function () {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  console.log(`dev${nohot && 'nohot' || ''}-server at ${chalk.magenta.underline(`http://${ip.address()}:${this.address().port}`)}`)
})
