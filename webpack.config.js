const path = require('path');

module.exports = {
    entry: path.join(__dirname, './src/index.ts'),
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, './lib'),
        filename: 'silverback.js',
        publicPath: './lib/',
        library: 'Silverback',
        libraryTarget: 'var'
    },
    node : {
        fs: 'empty'
    },
    module: {
        loaders: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            loader: 'babel-loader!ts-loader'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js'],
        modules: ['node_modules', 'src']
    }
};
