const paths = require('../_assets/gulp_config/paths');

const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const gutil = require('gulp-util');
const rename = require('gulp-rename');

// Places Font Awesome fonts in the proper location.
const buildFontAwesome = () => {
  return gulp.src(paths.fontFiles + '/font-awesome/**.*')
    .pipe(rename(function (path) {
      path.dirname = '';
    }))
    .pipe(gulp.dest(paths.jekyllFontFiles))
    .pipe(browserSync.stream())
    .on('error', gutil.log);
};
gulp.task('fontawesome', gulp.parallel(buildFontAwesome));

// Copies fonts.
gulp.task('build:fonts', gulp.parallel(buildFontAwesome));
