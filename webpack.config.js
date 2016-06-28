var path = require("path");

module.exports = {
    entry: path.join(__dirname, './src/index.ts'),
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, './lib'),
        filename: 'silverback.js',
        publicPath: './lib/',
        library: true,
        libraryTarget: 'commonjs'
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: [ /node_modules/, /docs/, /coverage/, /example/ ]
        }]
    },
    resolve: {
        extensions: ['', '.ts'],
        modulesDirectories: ['node_modules']
    }

};
