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
        reporters: ['mocha', 'coverage'],
        port: 9876,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        concurrency: Infinity,
        plugins: [ 'karma-*' ],
        client: {
            mocha: { ui: 'bdd' }
        },
        webpack: {
            resolve: {
                cache: false,
                root: __dirname,
                extensions: ['','.ts','.js']
            },
            devtool: 'source-map',
            module: {
                loaders: [
                    {
                        test: /\.ts$/,
                        loader: 'ts-loader',
                        exclude: [ /node_modules/ ]
                    }
                ],
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
