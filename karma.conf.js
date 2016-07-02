module.exports = function(config) {
    config.set({

        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
            'src/**/*.spec.ts'
        ],
        exclude: [
            'src/**/*.bench.ts'
        ],
        preprocessors: {
            'src/**/*.ts': ['webpack', 'sourcemap', 'coverage'],
            'src/**/*.spec.ts': ['webpack', 'sourcemap']
        },
        reporters: ['spec', 'coverage'],
        port: 9876,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        concurrency: Infinity,
        plugins: [ 'karma-*' ],
        client: {
            captureConsole: true,
            mocha: {
                reporter: 'spec',
                ui: 'bdd'
            }
        },
        webpack: {
            resolve: {
                cache: false,
                root: __dirname,
                extensions: ['','.ts','.js']
            },
            devtool: 'source-map',
            module: {
                loaders: [{
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader?presets[]=es2015!ts-loader'
                }, {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015']
                    }
                }],
                postLoaders: [
                    {
                        test: /\.(js|ts)$/,
                        loader: 'istanbul-instrumenter-loader',
                        exclude: [ /(test|node_modules)\// ]
                    }
                ]
            },
            stats: { colors: true, reasons: true },
            debug: false
        },
        webpackMiddleware: { noInfo: true },

        coverageReporter: {
            dir: './coverage/',
            reporters:[
                {type: 'html', subdir: 'html'},
                {type: 'lcov', subdir: '.'},
                {type: 'text', subdir: '.', file: 'text.txt'},
                {type: 'text-summary', subdir: '.', file: 'text-summary.txt'}
            ]
        },

        colors: true
    });
};
