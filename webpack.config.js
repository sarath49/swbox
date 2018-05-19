const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: {
      main: './src/main.js'
    },  
    devtool: false,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js'
    },
    optimization: {
        splitChunks: {
          chunks: "async",
          minSize: 30000,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
              vendors: {
                  test: /[\\/]node_modules[\\/]/,
                  priority: -10
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
      new CleanWebpackPlugin(['dist']),
      new UglifyJsPlugin({
        test: /\.js($|\?)/i,
        sourceMap: false,
        parallel: true
      }),
      new WorkboxPlugin.InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'sw.js'
      })
    ],
  };
