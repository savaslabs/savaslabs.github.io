const utils = require('./utils');
const paths = require('../_assets/gulp_config/paths');

const gulp = require('gulp');
const gutil = require('gulp-util');
const run = require('gulp-run');

// Builds the style guide via the hologram gem.
const buildStyleguide = () => {
  const shellCommand = 'hologram -c hologram_config.yml';

  return gulp.src('.')
    .pipe(run(shellCommand))
    .on('error', gutil.log);
};
gulp.task('build:styleguide', gulp.parallel(buildStyleguide));

// Generates CSS for the style guide.
const styleguideStyleDests = [
  paths.styleGuideAssets,
  'styleguide',
  paths.siteStyleGuide
];
const buildStylesStyleguide = () => {
  return utils.buildStyles('/styleguide.scss', styleguideStyleDests);
};
gulp.task('build:styles:styleguide', gulp.parallel(buildStylesStyleguide));

// Deletes the entire _site/styleguide directory.
const cleanStyleguide = () => {
  return utils.clean(['styleguide', '_site/styleguide']);
};
gulp.task('clean:styleguide', gulp.parallel(cleanStyleguide));

// Creates the style guide within the _site directory.
gulp.task('styleguide', gulp.series(
  cleanStyleguide,
  buildStylesStyleguide,
  buildStyleguide
));
