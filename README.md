# react-redux支持IE8

## 实现

+ react + redux + react-router，每个业务模块是一个单页应用
+ [兼容IE8](/doc/ie8兼容解决方案.md)
+ 热刷新
+ 环境配置，打包，发布
+ ES6+，ESLint

## 使用

* 开发 + 模拟后端

	```
	npm run start
	```

	>1.此命令会启动开发和后端两个服务器，你可以在`config`文件夹中修改你的开发服务器配置  
	2.开发服务器启动后，双击命令行上的链接地址即可在浏览器中打开  
	3.编写`src`目录下的代码保存，浏览器即可热刷新  
	4.编写`bkd`目录下的代码保存，后端服务器可热重启

* 开发  

	npm run dev

* 构建发版

	```
	npm run test
	npm run beta
	npm run prod
	```
* 监听

    ```
    npm run watch
    ```

## 目录结构
react-redux-ie8 项目根目录  
|---bkd [模拟后端](/doc/模拟后端.md)  
|---build [项目构建](/doc/项目构建.md)  
|　　|---config 构建项目用到的配置    
|　　|---task 构建任务入口  
|　　|---webpack.config.dev.js webpack开发配置  
|　　|---webpack.config.prod.js webpack上线配置  
|　　|---webpack.config.watch.js webpack监视配置  
|---config [项目个人配置](/doc/个人环境配置.md)  
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
|　　|　　|---module 其他模块  
|---zip 上线Zip包目录  
|---.babelrc [babel运行时配置](/doc/babel转码.md)  
|---.editorconfig [编辑器配置](/doc/编辑器配置.md)  
|---.eslintignore [eslint忽略配置](/doc/代码风格检查.md)  	
|---.eslintrc.js [eslint运行时配置](/doc/代码风格检查.md)  
|---.gitignore git忽略配置  
|---package.json npm配置  
|---README.md 项目自述  




