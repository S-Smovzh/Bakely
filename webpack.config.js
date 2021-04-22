const path = require('path');
const webpack = require('webpack');
global.Promise = require('bluebird');
const publicPath = 'http://localhost:3000/public/';
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove 'splitChunks' from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled MiniCssExtractPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 *
 */


/*
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
  mode: 'production',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader'
      },
      {
        test: /\.css|scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader',
          {
            loader: "sass-loader",
            options: {
              sourceMap: false
            },
          }],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {test: /\.(png|woff|woff2|eot|ttf|svg)$/, use: ['url-loader?limit=100000']}]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      include: /\.min\.js$/,
      terserOptions: {
        ecma: undefined,
        parse: {},
        compress: {},
        mangle: true,
        module: false,
        // Deprecated
        output: null,
        format: null,
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: false,
      }
    })],
    // splitChunks: {
    //   cacheGroups: {
    //     vendors: {
    //       priority: -10,
    //       test: /[\\/]node_modules[\\/]/
    //     }
    //   },
    //
    //   chunks: 'async',
    //   minChunks: 1,
    //   minSize: 30000,
    //   name: false
    // }
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        }
      }
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    fallback: {
      'path': false,
      'fs': false
    }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new DuplicatePackageCheckerPlugin(),
    // new webpack.optimize.OccurrenceOrderPlugin(true),
    new CompressionPlugin(),
    new HtmlWebpackPlugin({template: './public/index.html'})],
  devServer: {
    contentBase: [path.join(__dirname, 'dist')],
    compress: true,
    port: 3000,
    watchContentBase: true,
    progress: true
  }
};
