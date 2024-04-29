const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].[contenthash].js",
    clean: true,
    assetModuleFilename: "assets/[name]-[contenthash][ext]",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[hash][ext][query]",
        },
      },
      {
        test: /\.(wav|mp3)$/,
        type: "asset/resource",
        generator: {
          filename: "sounds/[name].[hash][ext][query]",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.webmanifest$/i,
        use: "webpack-webmanifest-loader",
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    open: true,
    compress: true,
    port: 8080,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      files: {
        manifest: "./manifest.webmanifest",
      },
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "manifest.webmanifest"),
          to: path.resolve(__dirname, "build", ""),
        },
      ],
    }),
  ],
};
