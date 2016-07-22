'use strict';

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {

  devtool: 'inline-source-map',

  entry: {},

  output: {},

  module: {

    loaders: [
      {
        test: /\.css$/,
        loader: 'null'
      }, 
      {
        test: /\.scss$/, 
        loader: 'null'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'null'
      } 
    ],

    postLoaders: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /\.spec\.js$/
        ],
        loader: 'isparta-instrumenter'
      }
    ]
  }

});
