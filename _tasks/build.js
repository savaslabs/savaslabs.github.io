const gulp = require('gulp');
const utils = require('./utils');

// Runs the jekyll build command.
const buildJekyll = () => {
  return utils.runCommand('bundle exec jekyll build --config _config.yml');
};
gulp.task('build:jekyll', gulp.parallel(buildJekyll));

// Runs the jekyll build command using the test config file.
const buildJekyllTest = () => {
  return utils.runCommand('bundle exec jekyll build --future --config _config.yml,_config.test.yml');
};
gulp.task('build:jekyll:test', gulp.parallel(buildJekyllTest));

// Runs the jekyll build command using the test and local config files.
const buildJekyllLocal = () => {
  return utils.runCommand('bundle exec jekyll build --future --config _config.yml,_config.test.yml,_config.dev.yml');
};
gulp.task('build:jekyll:local', gulp.parallel(buildJekyllLocal));
