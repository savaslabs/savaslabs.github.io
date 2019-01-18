const paths = require('../_assets/gulp_config/paths');

const browserSync = require('browser-sync').create();
const cache = require('gulp-cache');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const jpegRecompress = require('imagemin-jpeg-recompress');

// Copies image files.
const buildImages = () => {
  return gulp.src(paths.imageFilesGlob)
    .pipe(gulp.dest(paths.jekyllImageFiles))
    .pipe(gulp.dest(paths.siteImageFiles))
    .pipe(browserSync.stream());
};
gulp.task('build:images', gulp.parallel(buildImages));

// Optimizes image files. Note that this task does not run automatically.
const optimizeImages = () => {
  // We're including imagemin options because we're overriding the default JPEG
  // optimization plugin.
  return gulp.src(paths.imageFilesGlob)
    .pipe(cache(imagemin([
      imagemin.gifsicle(),
      jpegRecompress(),
      imagemin.optipng(),
      imagemin.svgo()
    ])))
    .pipe(gulp.dest(paths.imageFiles));
};
gulp.task('optimize:images', gulp.parallel(optimizeImages));
