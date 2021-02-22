
module.exports = {
  // 基本路径
  publicPath:  process.env.NODE_ENV === 'production'
  ? '/pagetest/'
  : './',  // 可以设置成相对路径，这样所有的资源都会被链接为相对路径，打出来的包可以被部署在任意路径
}
