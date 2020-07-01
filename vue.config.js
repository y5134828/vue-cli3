const path = require('path');
const webpack = require('webpack');

function resolve (dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (正式环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
   */
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '/web/' : '/',
  // 输出文件目录
  outputDir: 'dist',
  assetsDir: '', // 放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  lintOnSave: true, // 是否在保存的时候检查
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps
    loaderOptions: {}, // css预设器配置项
    modules: false // 启用 CSS modules for all css / pre-processor files.
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
        'assets': resolve('src/assets'),
        'css': resolve('src/assets/css'),
        'images': resolve('src/assets/images'),
        'views': resolve('src/views'),
        'components': resolve('src/components'),
        'api': resolve('src/api'),
        'mixins': resolve('src/mixins'),
        'store': resolve('src/store'),
        'utils': resolve('src/utils')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  },
  chainWebpack: config => {
    if (process.env.use_analyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  devServer: { // 环境配置
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    open: true, // 配置自动启动浏览器
    proxy: { // 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
      '/api/': {
        target: 'https://www.easy-mock.com/mock/5d79e2ffcca0db35d8c3a9b7/basic',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/' // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
      }
    }
  },
  pluginOptions: { // 第三方插件配置
    // ...
  }
}
