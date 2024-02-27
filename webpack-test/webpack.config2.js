const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 访问内置的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");  //css文件单独打包出来
module.exports = {
  mode: "development",
  entry:{
    main:"./src/index.js",
    ohter: "./src/util.js"
  },  
  output: {
    filename: "[name][hash:6].js",
    path: path.resolve(__dirname, "build"),
    chunkFilename: '[id].js',
    // assetModuleFilename: 'images/[hash].[ext]',
    // clean: true  //==new CleanWebpackPlugin(),
    clean:{
      // dry: true,
      keep: /ignored/,
    },
    compareBeforeEmit: true  //当在磁盘中已经存在有相同内容的文件时，webpack 将不会写入输出文件。
  },
  resolve: {
    alias:{
      "@": path.resolve(__dirname,"src")
    },
    extensions: [".ts", ".tsx", ".js", ".vue", ".scss"],
  },
  devServer:{
    port: 444,
    static: "src"
  },
  devtool: 'inline-source-map',
  module:{
    rules:[
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            // 当前的css所在的文件相对于打包后的根路径dist的相对路径
            // publicPath: '../'
            // esModule: false,
        }
          },
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        // use: {
        //   loader:"file-loader",
        //   options: {
        //     name: "[name].[ext]",
        //     outputPath:"img"
        //   },
        // },
        type: 'asset/resource',
        generator:{
          filename: 'img/[hash].[ext]'
        }
        
      },
    ],
  },
  plugins:[
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new MiniCssExtractPlugin({
      filename: "./css/[name][hash].css",
      // chunkFilename: "[id].css",
      // publicPath: "./"
    }),
  ],
  optimization:{
    // runtimeChunk: 'single',
  }
}