module.exports = {
    publicPath: '/ucenter',
    outputDir: 'ucenter',
    assetsDir: 'ucenter',
    indexPath: 'ucenter.html',
    devServer: {
        overlay: {
          warnings: false,
          errors: true
        },
        proxy: {
          '/api': {
            target: 'https://dev.nxtframework.com',
            changeOrigin: true
          },
          '/public_pic': {
            target: 'https://dev.nxtframework.com',
            changeOrigin: true
          }
        }
      },
}