module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/svel-need-for-drive/'
    : '/',
  css: {
    loaderOptions: {
        sass: {
          additionalData: `@import "~@/styles/_variables.scss";`
        }
    }
  }
}