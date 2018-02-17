const webpackConfig = require('./webpack.config.js');

webpackConfig.module.rules = [
    {
        test: /\.ts(x?)$/,
        loader: 'babel-loader!ts-loader?silent=true',
        exclude: /node_modules/
    },
    {
        enforce: 'post',
        test: /src\/.+\.ts(x?)$/,
        exclude: /(node_modules|\.spec\.ts$|\.stub\.ts$)/,
        loader: 'istanbul-instrumenter-loader',
        options: {
            esModules: true
        }
    }
];

module.exports = webpackConfig;
