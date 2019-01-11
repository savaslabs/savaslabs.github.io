const utils = require('./utils');
const paths = require('../_assets/gulp_config/paths');

const gulp = require('gulp');

// Builds the style guide via the hologram gem.
const buildStyleguide = () => {
  return utils.runCommand('hologram -c hologram_config.yml');
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
