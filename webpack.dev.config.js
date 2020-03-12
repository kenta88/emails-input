const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    "emails-input": "./src/index.ts"
  },
  output: {
    publicPath: "/",
    libraryTarget: 'window',
    library: 'EmailsInput',
    filename: "[name].dev.js"
  },
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].dev.css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      templateParameters: {
        commitHash: 'dev',
      },
      template: path.join(__dirname, "./src/html-template.ejs")
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        use: ["babel-loader"],
        include: [path.resolve(__dirname, "./src")]
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/",
              hmr: true
            }
          },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".ts"]
  }
};
