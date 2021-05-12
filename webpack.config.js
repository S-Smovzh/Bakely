const path = require('path');
const webpack = require('webpack');

global.Promise = require('bluebird');
// eslint-disable-next-line no-unused-vars
// const publicPath = 'http://localhost:3000/';
// eslint-disable-next-line no-unused-vars
// const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

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


const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'

  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  resolve: {
    fallback: {
      'fs': false,
      'os': false,
      'path': false
    }
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        include: [ path.resolve(__dirname, 'src') ],
        exclude: [ path.resolve(__dirname, 'node_modules') ],
        loader: 'babel-loader'
      },
      {
        test: /\.css|scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          } ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
        use: [ 'file-loader' ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [ new TerserPlugin({
      include: /\.min\.js$/,
      terserOptions: {
        ecma: undefined,
        parse: {},
        compress: {},
        mangle: true,
        module: false,
        output: null,
        format: null,
        toplevel: false,
        nameCache: null,
        ie8: false,
        // eslint-disable-next-line camelcase
        keep_classnames: undefined,
        // eslint-disable-next-line camelcase
        keep_fnames: false,
        safari10: false
      }
    }) ],
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new DuplicatePackageCheckerPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new LoadablePlugin(),
    // new BundleAnalyzerPlugin(),
    // new webpack.optimize.OccurrenceOrderPlugin(true),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
    new CompressionPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: './public/img/logo.svg', to: 'img/logo.svg' },
        { from: './public/img/spinner.gif', to: 'img/spinner.gif' },
        { from: './public/manifest.json', to: 'manifest.json' }
      ]
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' })],
  devServer: {
    contentBase: [ path.join(__dirname, 'dist') ],
    compress: true,
    port: 3000,
    watchContentBase: true,
    progress: true,
    historyApiFallback: true
  }
};
