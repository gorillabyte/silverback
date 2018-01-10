process.env.BABEL_ENV = 'test';
const webpackConfig = require('./webpack.config.karma.js');

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
        /*coverageReporter: {
            dir: './coverage/',
            reporters:[
                {type: 'lcov', subdir: '.'},
                {type: 'text', subdir: '.', file: 'text.txt'},
                {type: 'text-summary'}
            ]
        },*/
        coverageIstanbulReporter: {

            // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
            reports: ['html', 'lcovonly', 'text-summary'],

            // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
            dir: './coverage/',

            // if using webpack and pre-loaders, work around webpack breaking the source path
            fixWebpackSourcePaths: true,

            // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
            skipFilesWithNoCoverage: true,

            // Most reporters accept additional config options. You can pass these through the `report-config` option
            'report-config': {

                // all options available at: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
                html: {
                    // outputs the report in ./coverage/html
                    subdir: 'html'
                }

            },
        },
        colors: true
    });
};
