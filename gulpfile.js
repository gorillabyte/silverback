'use strict';

var gulp = require('gulp');
var g = require('gulp-load-plugins')();
var del = require('del');
var PROD = false;
var WATCH = false;

var CONFIG = {
    tsOutputPath: './js',
    releasePath: '../lib',
    srcFiles: './src/**/*.ts',

    typings: './typings/',
    libraryTypeScriptDefinitions: './typings/**/*.ts',
    appTypeScriptReferences: './typings/silverback.d.ts'
};

var OPTS = {
    sortOutput: true
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
        out: CONFIG.releasePath + '/silverback.min.js'
    };
    return gulp.start('ts');
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('lint', function () {
    return gulp.src(CONFIG.srcFiles).pipe(g.tslint()).pipe(g.tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('ts', function () {
    var tsProject = g.typescript.createProject('tsconfig.json', OPTS);

    var tsResult = gulp.src([CONFIG.srcFiles])
        .pipe(g.sourcemaps.init())
        .pipe(g.typescript(tsProject));

    tsResult.dts.pipe(gulp.dest(CONFIG.tsOutputPath));

    return tsResult.js
        .pipe(g.if(PROD, g.uglify().on('error', g.util.log)))
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
    //g.livereload.listen({ port: '9090' });
    gulp.watch([CONFIG.srcFiles], ['ts']);
});

gulp.task('default', ['lint', 'ts']);