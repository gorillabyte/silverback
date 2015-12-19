'use strict';

var gulp = require('gulp');
var g = require('gulp-load-plugins')();
var del = require('del');
var browserify = require('browserify');
var tsify = require('tsify');
var Server = require('karma').Server;
var source = require('vinyl-source-stream');
var pkg = require("./package.json");
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
    releasePath: './lib',
    srcFiles: './src/**/*.ts',
    outputJsFiles: './js/**/*.js',
    testFiles: './test/**/*.ts',

    typings: './typings/',
    appTsReferences: './typings/silverback.d.ts',
    releaseFile: 'silverback.min.js',

    options: {
        browserify: {
            entries: './src/index.ts',
            extensions: ['.ts'],
            debug: true
        },
        tsify: {
            target: 'es5',
            removeComments: true
        }
    }
};

/**
 * Generates the silverback.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('refs', function () {
    var target = gulp.src(CONFIG.appTsReferences);
    var sources = gulp.src([CONFIG.outputJsFiles], { read: false });
    return target.pipe(g.inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="..' + filepath.slice(0, -3) + '.d.ts' + '" />';
        }
    })).pipe(gulp.dest(CONFIG.typings));
});

/**
 * Generates and bundles the silverback.min.js file
 */
gulp.task('dist', function () {
    var b = browserify(CONFIG.options.browserify)
        .plugin(tsify, CONFIG.options.tsify);

    return b.bundle()
        .on('error', function (err) {
            console.log(err.message);
        })
        .pipe(source(CONFIG.releaseFile))
        .pipe(g.buffer())
        .pipe(g.sourcemaps.init({loadMaps: true}))
        .pipe(g.uglify()).on('error', g.util.log)
        .pipe(g.header(banner, { pkg: pkg }))
        .pipe(g.sourcemaps.write('.'))
        .pipe(gulp.dest(CONFIG.releasePath));
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
    var tsProject = g.typescript.createProject('tsconfig.json', {sortOutput: true});
    var tsResult = gulp.src([CONFIG.srcFiles])
        .pipe(g.sourcemaps.init())
        .pipe(g.typescript(tsProject));

    tsResult.dts.pipe(gulp.dest(CONFIG.tsOutputPath));

    return tsResult.js
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
    del(typeScriptGenFiles, cb);
});

/**
 * This task watches for file changes and recompile.
 */
gulp.task('watch', function () {
    WATCH = true;
    gulp.watch([CONFIG.srcFiles], ['ts']);
});

/**
 * This task runs the test cases using karma.
 */
gulp.task('test', function (done) {
    return new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});


gulp.task('default', ['lint', 'ts']);