const webpackConfig = require('./webpack.config.js');

module.exports = function setKarmaConfig(config) {
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
        webpack: webpackConfig,
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
