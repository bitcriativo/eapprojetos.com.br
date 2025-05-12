const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

function getEjsFiles(dir, fileList = [], baseDir = dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getEjsFiles(fullPath, fileList, baseDir);
    } else if (file.endsWith('.ejs')) {
      const relativePath = path.relative(baseDir, fullPath);
      fileList.push(relativePath);
    }
  });
  return fileList;
}

const ejsFiles = getEjsFiles(path.resolve(__dirname, 'src'));

module.exports = {
  mode: process.env.NODE_ENV ?? 'development',
  devtool: "eval-source-map",
  entry: ['./src/main.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'ejs-loader',
            options: {
              esModule: false
            }
          }
        ]
      },
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
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource'
      },
    ]
  },
  ignoreWarnings: [
    {
      module: /sass-loader/,
    }
  ],
  plugins: [
    ...ejsFiles.map(file => new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', file),
      filename: file.replace(/\.ejs$/, '.html'),
      inject: 'body',
      templateParameters: {}
    })),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8000,
    open: true,
    liveReload: true,
    hot: false,
    watchFiles: ['src/**/*'],
  },
};
