const path = require('path');
const webpack = require('webpack');

global.Promise = require('bluebird');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/web/indexSSR.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
    globalObject: 'typeof self !== \'undefined\' ? self : \'this\''
  },
  target: 'web',
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new LoadablePlugin(),
    new webpack.ProgressPlugin(),
    new DuplicatePackageCheckerPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    // new BundleAnalyzerPlugin(),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
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
          } ]
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
