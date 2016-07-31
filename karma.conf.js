process.env.BABEL_ENV = 'test';
const webpackConfig = require('./webpack.config.js');

module.exports = function setKarmaConfig(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'commonjs'],
        files: [
            'src/**/*.spec.ts'
        ],
        exclude: [
            'src/**/*.bench.ts'
        ],
        preprocessors: {
            'src/**/*!(spec|stub).ts': ['webpack', 'sourcemap','commonjs'],
            'src/**/*.spec.ts': ['webpack','sourcemap', 'commonjs']
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
                {type: 'lcov', subdir: '.'},
                {type: 'text', subdir: '.', file: 'text.txt'},
                {type: 'text-summary'}
            ]
        },
        colors: true
    });
};
