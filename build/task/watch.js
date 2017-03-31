/**
 * 监听模式入口
 *
 * 生成未压缩的代码和sourceMap到dist目录
 */
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'

import webpackConfig from '../webpack.config.watch'

webpack(webpackConfig, function (err, stats) {
  if (err) {
    return console.error(err)
  }

  const jsonStats = stats.toJson()
  if(jsonStats.errors.length > 0) {
    return console.error(`\n${jsonStats.errors.toString()}`)
  }
  if(jsonStats.warnings.length > 0) {
    return console.error(`\n${jsonStats.warnings.toString()}`)
  }
})
