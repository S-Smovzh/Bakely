const path = require('path');
const webpack = require('webpack');

global.Promise = require('bluebird');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const SERVER_PATH = (argv.mode === 'production') ?
    './src/server/server.prod.js' :
    './src/server/server.dev.js';

  return ({
    entry: {
      server: SERVER_PATH
    },
    mode: 'production',
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].js',
      globalObject: 'this'
    },
    node: {
      __dirname: false,
      __filename: false
    },
    target: 'node',
    externals: [ nodeExternals() ],
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser'
      }),
      new webpack.ProgressPlugin()],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: [
            path.join(__dirname, 'src')
          ],
          use: {
            loader: 'babel-loader'
          }
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
  });
};
