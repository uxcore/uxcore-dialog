/**
 * @author: vincent
 * @date: 15/5/19
 */
var webpack = require('webpack');

module.exports = {
    entry: {
        simple: './example/simple.jsx',
        inline: './example/inline.jsx',
        standalone: './example/standalone.jsx'
    },
    output: {
        path: './build',
        publicPath: '/assets/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].[id].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader:   'url?limit=10000&minetype=image/svg+xml'
            }
        ]
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
