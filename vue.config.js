module.exports = {
  publicPath: '/svel-need-for-drive/',
  css: {
    loaderOptions: {
        sass: {
          additionalData: `@import "~@/styles/_variables.scss";`
        }
    }
  }
}