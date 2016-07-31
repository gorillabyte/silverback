var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, './src/index.ts'),
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, './lib'),
        filename: 'silverback.js',
        publicPath: './lib/',
        library: 'silverback',
        libraryTarget: 'commonjs2'
    },
    node : {
        fs: 'empty'
    },
    isparta: {
        embedSource: true,
        noAutoWrap: true,
        babel: {
            presets: ['es2015-webpack', 'stage-2']
        }
    },
    module: {
        loaders: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            loader: 'babel!ts-loader'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }],
        postLoaders: [{
            test: /\.(js|ts)$/,
            loader: 'istanbul-instrumenter',
            exclude: /(test|node_modules)\//
        }]
    },
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js'],
        modulesDirectories: ['node_modules', 'src']
    }
};
