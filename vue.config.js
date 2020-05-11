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
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://www.hotcn.xyz/',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         "^/api": ""
  //       }
  //     }
  //   }
  // }
};
