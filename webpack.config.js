const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

const commitHash = require("child_process")
  .execSync("git rev-parse --short HEAD")
  .toString()
  .trim();

module.exports = {
  mode: "production",
  entry: {
    "emails-input": "./src/index.ts"
  },
  output: {
    path: __dirname + "/docs",
    libraryTarget: 'var',
    library: 'EmailsInput',
    filename: `[name].${commitHash}.js`
  },
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
            loader: "url-loader",
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // MiniCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({ filename: `[name].${commitHash}.css` }),
    new HtmlWebpackPlugin({
      inject: false,
      templateParameters: {
        commitHash,
        staticBaseUrl: process.env.ENV !== 'LOCAL' ? '/emails-input/docs' : '',
      },
      template: path.join(__dirname, "./src/html-template.ejs")
    })
  ],
  resolve: {
    extensions: ["*", ".js", ".ts"]
  }
};
