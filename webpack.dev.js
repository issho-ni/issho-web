const merge = require("webpack-merge")
const path = require("path")
const webpack = require("webpack")
const common = require("./webpack.common")

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: process.env.PORT || 9000,
    https: {
      cert: process.env.TLS_CERT || path.join(__dirname, "localhost+2.pem"),
      key: process.env.TLS_KEY || path.join(__dirname, "localhost+2-key.pem"),
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
})
