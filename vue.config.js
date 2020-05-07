const path = require('path');
const webpack = require('webpack')
module.exports = {
  publicPath: './',
  lintOnSave: false,
  devServer: {
    overlay:{
        warning:false,
        errors:false
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "windows.jQuery":"jquery"
      })
    ]
  },
  chainWebpack: (config) => {
		config.resolve.alias
			.set('@', path.join(__dirname, './src'))
	},
  // proxy: {
  //   '/api': {
  //       // 目标 API 地址
  //       target: 'http://xxx.com:2086',//真实的api地址
  //       // 如果要代理 websockets
  //       // ws: true,
  //       // 将主机标头的原点更改为目标URL
  //       changeOrigin: true,
  //       pathRewrite: {
  //           '^/api': ''
  //       }
  //   }
  // }
};
