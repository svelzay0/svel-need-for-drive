const path = require("path");

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/svel-need-for-drive/'
    : '/',
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/")
      }
    },
  },
  css: {
    loaderOptions: {
      scss: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, "src/styles/theme/")],
          indentedSyntax: false
        },
        additionalData: `@import "~@/styles/_variables.scss"; @import "~@/styles/theme/index.css";`
      }
    }
  },
  devServer: process.env.NODE_ENV === "production" ? {} : proxy()
}

function proxy() {
  return {
    proxy: {
      "/api": {
        target: "https://api-factory.simbirsoft1.com/api",
        secure: false,
        logLevel: "debug",
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  };
}