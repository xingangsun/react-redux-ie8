# react兼容IE8的解决方案。
>一个令人失望的消息：从 React v15 开始，React DOM 将不会再支持 IE8 了。而中国还有超过 18% 的人在使用 IE8。

参考文档[react 项目的一个ie8兼容性问题](http://www.aliued.com/?p=3240)。

1.版本要求

	"react": "~0.14.8",
	"react-dom": "~0.14.8", 
	"react-router": "~2.3.0"

2.在IE8中引入es5-shim，es5-sham。

3.使用es3ify-loader转码，在webpack.optimize.UglifyJsPlugin中配置`keep_quoted_props: true`。

4.[使用webpack版本为1.13.2](https://github.com/SamHwang1990/blog/issues/6)。
