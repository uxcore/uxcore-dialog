/**
 * @author: vincent
 * @date: 15/5/19
 */
var webpack = require('webpack');
var loaders = require('./loader.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        simple: './example/simple.jsx',
        inline: './example/inline.jsx',
        standalone: './example/standalone.jsx'
    },
    output: {
		path: './build',
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].[id].bundle.js'
    },
	plugins: ['index', 'inline', 'simple', 'standalone'].map(function(name){
			return new HtmlWebpackPlugin({
				filename: name + '.html',
	      		template: './example/' + name + '.html'
			});
		}),
    module: {
        loaders: loaders
    },
    externals: {
        'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    debug: true,
    devtool: 'eval',
    devServer: {
        info: true,
        quiet: false,

        stats: {
            colors: true,
            progress: true
        }
    }
};
