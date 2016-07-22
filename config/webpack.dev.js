'use strict';

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {

  debug: true,
  devtool: 'cheap-module-source-map',

  output: {

    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'

  },

  devServer : {
    contentBase: helpers.root('/src/assets'),
    stats: 'minimal',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },

  plugins: [
    new ExtractTextPlugin('[name].[hash].css', {disable: true})
  ]

});
