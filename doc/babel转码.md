# babel转码

* .babelrc配置参考[文档](http://babeljs.io/docs/usage/babelrc/)。  
	1.[presets](http://babeljs.io/docs/plugins/#presets)执行顺序与配置先后顺序相反。使用[preset-env](http://babeljs.io/docs/plugins/preset-env/)不仅可以转码es6/7/8等，而且还可以根据配置决定使用哪些插件转码。[注意要使用loose模式](http://2ality.com/2015/12/babel6-loose-mode.html)。使用[stage-0](https://tc39.github.io/process-document/)可以转码那些没有被标准(如ES6/ES2015)采纳的语法。使用[react](http://babeljs.io/docs/plugins/preset-react/)转码react语法。  
	2.使用[transform-runtime](http://babeljs.io/docs/plugins/transform-runtime/)插件可以按需转换你的代码，避免全局修改。但是transform-runtime不能实现实例方法(如`"foobar".includes("foo")`)的转码，你可以全局polyfill那些不能转码的实例方法。可以参考[core-js文档](https://github.com/zloirock/core-js)。
	3.`"comments": false`可以禁止输出转码注释。

* 该.babelrc文件配置也供构建任务的代码使用[babel-cli](http://babeljs.io/docs/usage/cli/)。
