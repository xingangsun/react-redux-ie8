export entry from './entry'
export alias from './alias'
export provide from './provide'
export upload from './upload'
export { envName, nohot, envConfig } from './env'

console.warn = () => {} // 关闭postcss烦人的警告
