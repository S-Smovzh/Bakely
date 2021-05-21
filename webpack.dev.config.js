const path = require('path');
const webpack = require('webpack');

global.Promise = require('bluebird');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotenvPlugin = require('dotenv-webpack');

module.exports = {
  entry: {
    main: './src/web/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'web',
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new webpack.ProgressPlugin(),
    new DuplicatePackageCheckerPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    // new BundleAnalyzerPlugin(),
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/utils/sw.js',
      swDest: 'sw.js'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './public/img/logo.svg', to: 'img/logo.svg' },
        { from: './public/img/spinner.gif', to: 'img/spinner.gif' },
        { from: './public/manifest.json', to: 'manifest.json' },
        { from: './public/locale', to: 'locale' },
        { from: './public/img/manifest-icons', to: 'img/manifest-icons' }
      ]
    }),
    new DotenvPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })],
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        include: [
          path.join(__dirname, 'src')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.css|scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          } ],
        sideEffects: true
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [ {
          loader: 'file-loader',
          options: {
            outputPath: 'img/',
            name: '[name].[ext]',
            emitFile: true
          }
        } ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [ {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/',
            name: '[name].[ext]',
            emitFile: true
          }
        } ]
      }
    ]
  },
  stats: 'errors-warnings'
};
