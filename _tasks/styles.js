const utils = require('./utils');
const paths = require('../_assets/gulp_config/paths');

const autoprefixer = require('autoprefixer');
const cleancss = require('gulp-clean-css');
const gulp = require('gulp');
const gutil = require('gulp-util');
const postcss = require('gulp-postcss');

// Uses Sass compiler to process styles, adds vendor prefixes, minifies, then
// outputs file to the appropriate location.
const mainStyleDests = [
  paths.jekyllCssFiles,
  paths.siteCssFiles,
  paths.siteStyleGuide
];
const buildStylesMain = () => {
  return utils.buildStyles('/main.scss', mainStyleDests);
};
gulp.task('build:styles:main', gulp.parallel(buildStylesMain));

// Processes critical CSS, to be included in head.html.
const criticalStyleDests = ['_includes/css'];
const buildStylesCritical = () => {
  return utils.buildStyles('/critical*.scss', criticalStyleDests);
};
gulp.task('build:styles:critical', gulp.parallel(buildStylesCritical));

// Copies any other CSS files to the assets directory, to be used by pages/posts
// that specify custom CSS files.
const buildStylesOther = () => {
  return gulp.src([paths.sassFiles + '/*.css'])
    .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
    .pipe(cleancss())
    .pipe(gulp.dest(paths.jekyllCssFiles))
    .pipe(gulp.dest(paths.siteCssFiles))
    .on('error', gutil.log);
};
gulp.task('build:styles:css', gulp.parallel(buildStylesOther));

// Builds all site styles.
gulp.task('build:styles', gulp.parallel(
  buildStylesMain,
  buildStylesCritical,
  buildStylesOther
));
