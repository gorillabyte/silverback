'use strict';

var gulp = require('gulp');
var g = require('gulp-load-plugins')();
var del = require('del');
var Server = require('karma').Server;
var pkg = require("./package.json");

var PROD = false;
var WATCH = false;

var banner = [
    "/**",
    " * Silverback Game Engine v.<%= pkg.version %> - <%= pkg.description %>",
    " * Copyright (c) 2015 <%= pkg.author %>",
    " *",
    " * This program is free software; you can redistribute it and/or modify",
    " * it under the terms of the GNU General Public License as published by",
    " * the Free Software Foundation; either version 3 of the License, or",
    " * (at your option) any later version.",
    " * ",
    " * Visit http://www.silverbackengine.org for documentation, updates and examples.",
    " */", ""
].join("\n");

var CONFIG = {
    tsOutputPath: './js',
    releasePath: '../lib',
    srcFiles: './src/**/*.ts',
    testFiles: './test/**/*.ts',
    testJsFiles: './js/test/**/*.js',

    typings: './typings/',
    libraryTypeScriptDefinitions: './typings/**/*.ts',
    appTypeScriptReferences: './typings/silverback.d.ts'
};

var OPTS = {
    sortOutput: true,
    source: [CONFIG.srcFiles, CONFIG.testFiles]
};

/**
 * Generates the silverback.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('refs', function () {
    var target = gulp.src(CONFIG.appTypeScriptReferences);
    var sources = gulp.src([CONFIG.srcFiles], { read: false });
    return target.pipe(g.inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="..' + filepath + '" />';
        }
    })).pipe(gulp.dest(CONFIG.typings));
});

gulp.task('dist', function () {
    PROD = true;
    OPTS = {
        sortOutput: true,
        source: [CONFIG.srcFiles],
        out:  CONFIG.releasePath + '/silverback.min.js'
    };
    return gulp.start('ts');
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('lint', function () {
    return gulp.src([CONFIG.srcFiles, CONFIG.testFiles])
        .pipe(g.tslint())
        .pipe(g.tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('ts', function () {
    var tsProject = g.typescript.createProject('tsconfig.json', OPTS);

    var tsResult = gulp.src(OPTS.source)
        .pipe(g.sourcemaps.init())
        .pipe(g.typescript(tsProject));

    g.if(!PROD,tsResult.dts.pipe(gulp.dest(CONFIG.tsOutputPath)));

    return tsResult.js
        .pipe(g.if(PROD, g.uglify().on('error', g.util.log)))
        .pipe(g.if(PROD, g.header(banner, { pkg: pkg })))

        .pipe(g.sourcemaps.write('.'))
        .pipe(gulp.dest(CONFIG.tsOutputPath));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean', function (cb) {
    var typeScriptGenFiles = [
        CONFIG.tsOutputPath + '/**/*.js',
        CONFIG.tsOutputPath + '/**/*.js.map'
    ];

    // delete the files
    del(typeScriptGenFiles, cb);
});

gulp.task('watch', function () {
    WATCH = true;
    gulp.watch([CONFIG.srcFiles, CONFIG.testFiles], ['ts']);
});

/**
 * This task runs the test cases using karma.
 */
gulp.task('test',['ts'], function (done) {
    return new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});


gulp.task('default', ['lint', 'ts']);