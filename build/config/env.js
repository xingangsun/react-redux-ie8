import { argv } from 'yargs'

// 环境：dev|test|beta|prod，默认dev
export const envName = ['test', 'beta', 'prod'].find(e => argv[e]) || 'dev'

// 禁止热刷新，测试IE8兼容性时用
export const nohot = process.argv.includes('nohot')

// 环境配置
export const envConfig = {
  dev: {
    publicPath: '/'
  },
  test: {
    publicPath: ''
  },
  beta: {
    publicPath: ''
  },
  prod: {
    publicPath: ''
  }
}[envName]
