const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const env = process.env.NODE_ENV
module.exports = {
  configureWebpack: (config) => {
    if (env !== 'development' || env !== 'test') {
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
        threshold: 10240,
        minRatio: 0.8
      }))
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true, // console
              drop_console: true,
              pure_funcs: ['console.log'] // 移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
    }
  },
  publicPath: './',
  devServer: {
    open: true, // 配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'https://www.medicalhero.fr/api/', // 设置你调用的接口域名和端口号
        // ws: true, // 是否启用websockets
        changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: { '^/api': '/' } // 这里重写路径
      }
    }
    /* -------------------------------------- */
  }
}
