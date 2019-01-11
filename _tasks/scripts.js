const paths = require('../_assets/gulp_config/paths');

const appendPrepend = require('gulp-append-prepend');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gulp = require('gulp');
const gutil = require('gulp-util');
const run = require('gulp-run');
const uglify = require('gulp-uglify');

// Concatenates and uglifies global JS files and outputs result to the
// appropriate location.
const buildScriptsGlobal = () => {
  return gulp.src([
    paths.jsFiles + '/global/lib' + paths.jsPattern,
    paths.jsFiles + '/global/*.js'
  ])
    .pipe(concat('main.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())

    // Only place in `assets` because Jekyll needs to process the file.
    .pipe(gulp.dest(paths.jekyllJsFiles))
    .on('error', gutil.log);
};
gulp.task('build:scripts:global', gulp.parallel(buildScriptsGlobal));

// Special task for running webpack to compile React code for comments app for
// production.
const buildScriptsWebpack = () => {
  return gulp.src('.')
    .pipe(run('npm run build-comments'));
};
gulp.task('build:scripts:webpack', gulp.parallel(buildScriptsWebpack));

// Special task for running webpack to compile React code for comments app for
// development.
const buildScriptsWebpackDev = () => {
  return gulp.src('.')
    .pipe(run('npm run build-comments-dev'));
};
gulp.task('build:scripts:webpack:dev', gulp.parallel(buildScriptsWebpackDev));

// Copies comments app to the assets directory.
const buildScriptsComments = () => {
  return gulp.src([
    paths.jsFiles + '/comments.js'
  ])
  // We need to add front matter so Jekyll will process variables.
    .pipe(appendPrepend.prependFile('./_assets/gulp_config/front-matter.txt'))

    // Only place in `assets` because Jekyll needs to process the file.
    .pipe(gulp.dest(paths.jekyllJsFiles))
    .on('error', gutil.log);
};
gulp.task('build:scripts:comments', gulp.parallel(buildScriptsComments));

// Concatenates and uglifies leaflet JS files and outputs result to the
// appropriate location.
const buildScriptsLeaflet = () => {
  return gulp.src([
    paths.jsFiles + '/leaflet/leaflet.js',
    paths.jsFiles + '/leaflet/leaflet-providers.js'
  ])
    .pipe(concat('leaflet.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.jekyllJsFiles))
    .pipe(gulp.dest(paths.siteJsFiles))
    .on('error', gutil.log);
};
gulp.task('build:scripts:leaflet', gulp.parallel(buildScriptsLeaflet));

// Builds all scripts.
gulp.task('build:scripts', gulp.series(
  buildScriptsWebpack,
  gulp.parallel(buildScriptsGlobal, buildScriptsComments, buildScriptsLeaflet)
));

// Builds all scripts, running webpack for dev environment.
gulp.task('build:scripts:dev', gulp.series(
  buildScriptsWebpackDev,
  gulp.parallel(buildScriptsGlobal, buildScriptsComments, buildScriptsLeaflet)
));
