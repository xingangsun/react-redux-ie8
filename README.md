# react-redux支持IE8

## 实现

+ react + redux + react-router，每个业务模块是一个单页应用
+ 兼容IE8
+ 热刷新
+ 环境配置，打包，发布
+ ES6+，ESLint

## 目录结构
react-redux-ie8 项目根目录  
|---api 模拟API  
|---build 项目构建  
|　　|---config 构建项目用到的配置    
|　　|---task 构建任务入口  
|　　|---webpack.config.dev.js webpack开发配置  
|　　|---webpack.config.prod.js webpack上线配置  
|　　|---webpack.config.watch.js webpack监视配置  
|---config 项目个人配置  
|---dist 打包生成代码目录  
|---src 源代码  
|　　|---demo demo业务源码  
|　　|　　|---components demo业务组件  
|　　|　　|---views demo业务页面  
|　　|　　|---api.js  
|　　|　　|---app.js  
|　　|　　|---main.js demo业务入口  
|　　|---global 全局目录  
|　　|　　|---components 全局组件  
|　　|　　|---iconfont 字体图标  
|　　|　　|---img 全局图片  
|---zip 上线Zip包目录  
|---.babelrc babel运行时配置  
|---.editorconfig 编辑器配置  
|---.eslintignore eslint忽略配置  	
|---.eslintrc.js eslint运行时配置  
|---.gitignore git忽略配置  
|---package.json npm配置
|---README.md 项目自述  




