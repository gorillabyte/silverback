module.exports = function(config) {
    config.set({

        // testing framework to use
        frameworks: ['jasmine'],

        // test results reporter to use
        reporters: ['spec', 'coverage'],

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // list of files / patterns to load in the browser
        files: [
            'js/test/**/*.js'
        ],

        // level of logging: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_WARN,

        // create coverage report
        coverageReporter: {
            type: 'html',
            dir: './coverage/'
        },

        // enable or disable colors in the output (reporters and logs).
        colors: true
    });
};
