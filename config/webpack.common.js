'use strict';

const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');

module.exports = {

	entry: {
	    'app': './src/app/app.js'
	},

	module: {
		loaders: [
			{
		      test: /\.js$/,
		      loader: 'babel',
		      exclude: /node_modules/
		    }, 
		    {
		      test: /\.css$/,
		      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
			}, 
			{
			  test: /\.scss$/, 
			  loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap!postcss')
			}, 
			{
		      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
			  loader: 'file'
			}, 
			{
			  test: /\.html$/,
			  loader: 'raw'
			}
	    ]
	},

    plugins : [
		new HtmlWebpackPlugin({
	        template: './src/index.html',
	        inject: 'body'
	    }),

	    new OccurenceOrderPlugin(true),
	    
    ],

    postcss: [
	    autoprefixer({
	      browsers: ['last 2 version']
	    })
	]	

};