const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/index.js", /// relative path to entry of proj
  output: {
    filename: "main.js", /// name of the output for js
    path: path.resolve(__dirname, "dist"), /// absolute path of the folder
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // without additional settings, it will reference .babelrc
          loader: "babel-loader",
        },
      },
      {
        entry: './src/styles.css',
        test: /\.css$/,
        use: [
          "style-loader", // 2.injects file to dom
          "css-loader", // 1.turns css into js
        ], // the order of the loaders is IMPORTANT!
      },
      {
        test: /\.jpg$/,
        use: ["file-loader"],
      },
    ],
  },
  /// source map is to video the original file as typed
  devtool: "source-map",
  devServer: {
    liveReload: true,
    hot: true,
    port: 9000,
    static: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./template/index.html",
      filename: "index.html",
    }),
  ],
};
