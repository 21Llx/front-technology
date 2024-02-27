const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: 'production',  //production  development
  entry: {
    main: "./src/indexDoc/index.js"
  },
  output: {
    filename: "[name][hash:6].js",
    chunkFilename: '[id].js',
    path: path.resolve(__dirname, "dist"),
    asyncChunks: true,
    clean: true, // 在生成文件之前清空 output 目录
    // library: 'MyLibrary',
    iife: true
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ]
}