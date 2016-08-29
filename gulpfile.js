// Define variables.
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();
var concat       = require('gulp-concat');
var del          = require('del');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var jshint       = require('gulp-jshint');
var minifycss    = require('gulp-minify-css');
var notify       = require('gulp-notify');
var rename       = require('gulp-rename');
var run          = require('gulp-run');
var runSequence  = require('run-sequence');
var sass         = require('gulp-ruby-sass');
var uglify       = require('gulp-uglify');

var paths        = require('./_assets/gulp_config/paths');

// Uses Sass compiler to process styles, adds vendor prefixes, minifies, then
// outputs file to the appropriate locations.
gulp.task('build:styles', function() {
    return sass(paths.sassFiles + '/main.scss', {
        style: 'compressed',
        trace: true,
        loadPath: [paths.sassFiles]
    }).pipe(minifycss())
        .pipe(gulp.dest(paths.siteDir))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});

gulp.task('clean:styles', function(callback) {
    del([paths.siteDir + 'main.css']);
    callback();
});

// Concatenates and uglifies JS files and outputs result to the appropriate
// locations.
gulp.task('build:scripts', function() {
    return gulp.src(paths.jsFilesGlob)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.siteDir))
        .on('error', gutil.log);
});

gulp.task('clean:scripts', function(callback) {
    del([paths.siteDir + 'main.js']);
    callback();
});

// Optimizes and copies image files.
gulp.task('build:images', function() {

    //TODO: optimize images.

    return gulp.src(paths.imageFilesGlob)
        .pipe(gulp.dest(paths.siteImageFiles))
        .pipe(browserSync.stream());
});

gulp.task('clean:images', function(callback) {
    del([paths.siteImageFiles]);
    callback();
});

// Copies fonts.
gulp.task('build:fonts', ['fontawesome']);

// Places Font Awesome fonts in proper location
gulp.task('fontawesome', function() {
    return gulp.src(paths.fontFiles + '/font-awesome/**.*')
        .pipe(rename(function(path) {path.dirname = '';}))
        .pipe(gulp.dest(paths.siteFontFiles))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});

gulp.task('clean:fonts', function(callback) {
    del([paths.siteFontFiles]);
    callback();
});

// Runs jekyll build command.
gulp.task('build:jekyll', function() {
    var shellCommand = 'bundle exec jekyll build --config _config.yml';

    return gulp.src(paths.jekyllDir)
        .pipe(run(shellCommand))
        .on('error', gutil.log);
});

// Deletes the entire _site directory.
gulp.task('clean', function(callback) {
    del([paths.siteDir]);
    callback();
});

// Builds site anew. Pass the --drafts flag to enable including drafts.
gulp.task('build', function(callback) {
    runSequence('clean',
        'build:jekyll',
        ['build:scripts', 'build:images', 'build:styles', 'build:fonts'],
        callback);
});

// Default Task: builds site.
gulp.task('default', ['build']);

// Special tasks for building and then reloading BrowserSync.
gulp.task('build:jekyll:watch', ['build:jekyll'], function(callback) {
    browserSync.reload();
    callback();
});

gulp.task('build:scripts:watch', ['build:scripts'], function(callback) {
    browserSync.reload();
    callback();
});

// Updates Ruby gems
gulp.task('update:bundle', function() {
    return gulp.src('')
        .pipe(run('bundle install'))
        .pipe(run('bundle update'))
        .pipe(notify({ message: 'Bundle Update Complete' }))
        .on('error', gutil.log);
});