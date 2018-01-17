process.env.BABEL_ENV = 'test';
const webpackConfig = require('./webpack.config.karma.js');

module.exports = function setKarmaConfig(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
            { pattern: 'node_modules/babel-polyfill/browser.js', instrument: false },
            'src/**/*.spec.ts'
        ],
        exclude: [
            'src/**/*.bench.ts'
        ],
        preprocessors: {
            'src/**/*!(spec|stub).ts': ['webpack', 'sourcemap',],
            'src/**/*.spec.ts': ['webpack','sourcemap']
        },
        reporters: ['spec', 'coverage-istanbul'],
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
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly', 'text-summary'],
            dir: './coverage/',
            fixWebpackSourcePaths: true,
            skipFilesWithNoCoverage: true,
            'report-config': {
                html: { subdir: 'html'}
            },
        },
        colors: true
    });
};
