const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

require('dotenv').config()

module.exports = {
  mode: process.env.NODE_ENV ?? 'development',
  devtool: "eval-source-map",
  entry: ['./src/main.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      }
    ]
  },
  ignoreWarnings: [
    {
      module: /sass-loader/,
    }
  ],
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8000,
  },
}