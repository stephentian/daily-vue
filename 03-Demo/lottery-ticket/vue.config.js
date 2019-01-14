module.export = {
  // 项目部署的基础路径
  // 默认 '/'
  // 若部署在 https://www.foobar.com/my-app/
  // 设置 baseUrl: ''my-app'
  // !!! 多页面情况下, 避免使用相对路径
  baseUrl: '/',

  // 输出文件目录
  // 默认 'dist'
  outputDir: 'dist',

  // multi-page 下的配置
  // 默认 undefined
  pages: undefined,

  // 在保存的时候是否检查 ESLint
  eslintOnSave: true,

  // 打包时是否生成 .map 文件
  productionSourceMap: false,

  // css 相关配置
  css: {
    // 是否开启 CSS source map
    sourceMap: false,

    // css 预设器配置项
    loaderOptions: {},

    // 是否启用 CSS modules for all css / pre-processor files
    modules: false
  },
  devServer: {}
}