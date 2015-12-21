module.exports = function(config) {
    config.set({

        // testing framework to use
        frameworks: ['browserify', 'jasmine'],

        // test results reporter to use
        reporters: ['spec', 'coverage'],

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // list of files / patterns to load in the browser
        files: [
            'src/**/*.ts'
        ],

        exclude: [
            'src/**/*.bench.ts'
        ],

        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-browserify',
            'karma-phantomjs-launcher',
            'karma-spec-reporter'
        ],

        // level of logging: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        preprocessors: {
            'src/**/*.ts': ['browserify' ,'coverage'],
            'src/**/*.spec.ts': ['browserify']
        },

        browserify: {
            debug: true,
            transform: [
                require('browserify-istanbul')
            ],
            extensions: ['.js', '.ts'],
            plugin: [
                ['tsify', {target: 'es5'}]
            ]
        },

        // create coverage report
        coverageReporter: {
            dir: './coverage/',
            reporters:[
                {type: 'html', subdir: 'html'},
                {type: 'lcov', subdir: '.'},
                {type: 'text', subdir: '.', file: 'text.txt'},
                {type: 'text-summary', subdir: '.', file: 'text-summary.txt'}
            ]
        },

        // enable or disable colors in the output (reporters and logs).
        colors: true
    });
};
