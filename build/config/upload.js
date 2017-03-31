/**
 * 发布上传配置
 */
export default {
  project: 'iwjw-pc',
  description: '本文件是自动化上传的配置文件，versionType为Enum(0,1,2)。0是指自动管理版本号，1是指手动管理版本号，2是根据manifest文件管理',
  versionType: 0,
  api: {
    uploadSuffix: '/resource/uploadAuto.do',
    openAutoSuffix: '/resource/openAuto.do',
    versionSuffix: '/resource/getResourceVersion.do'
  },
  serverEnv: {
    test: {
      serverUrl: 'http://192.168.1.75',
      projectId: '32'
    },
    beta: {
      serverUrl: 'http://121.41.34.206:8150',
      projectId: '21'
    }
  },
  zipFilePath: `${process.cwd()}/zip/iwjw-pc.zip`,
  // ftp deploy
  ftp: {
    host: '121.40.69.179',
    user: 'staticuser',
    password: 'KS94X7EoS4Ik82dH'
  }
}
