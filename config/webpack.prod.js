'use strict';

const webpackMerge = require('webpack-merge'); 
const commonConfig = require('./webpack.common.js');

const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {

 
  debug: false,
  devtool: 'source-map',

  output: {

    path: helpers.root('dist'),
    publicPath: '',
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js'

  },

  plugins: [

    new DedupePlugin(),

    new UglifyJsPlugin({
      beautify: false, 
      mangle: { screw_ie8 : true },
      compress: { screw_ie8: true },
      comments: false 
    }),

    new NoErrorsPlugin(),

    new CopyWebpackPlugin([{
      from: helpers.root('/src/assets')
    }]),

    new ExtractTextPlugin('[name].[hash].css')

  ]

});
