global.Promise = require('bluebird');
const path = require('path');
const webpack = require('webpack');
const zlib = require('zlib');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    main: './src/web/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
    globalObject: 'this'
  },
  resolve: {
    fallback: {
      'fs': false,
      'os': false,
      'path': false
    }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/utils/sw.js',
      swDest: 'sw.js'
    }),
    new CompressionPlugin({
      filename: '[name][ext].br',
      algorithm: 'brotliCompress',
      test: /\.js$|css$/,
      exclude: 'server.js',
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11
        }
      },
      // threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './public/img/logo.svg', to: 'img/logo.svg' },
        { from: './public/img/spinner.gif', to: 'img/spinner.gif' },
        { from: './public/manifest.json', to: 'manifest.json' },
        { from: './public/locale', to: 'locale' },
        { from: './public/robots.txt', to: 'robots.txt' },
        { from: './public/img/manifest-icons', to: 'img/manifest-icons' },
        { from: './src/server/server.prod.js', to: 'server.js' }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })],
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        include: [ path.join(__dirname, 'src') ],
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
        }
        ]
      },
      {
        test: /\.gif$/,
        use: [ {
          loader: 'file-loader',
          options: {
            outputPath: 'img/',
            name: '[name].[ext]',
            emitFile: true
          }
        }
        ]
      } ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
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
    }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      })],
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
  }
};
