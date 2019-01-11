const gulp = require('gulp');
const gutil = require('gulp-util');
const run = require('gulp-run');

// Runs the jekyll build command.
const buildJekyll = () => {
  const shellCommand = 'bundle exec jekyll build --config _config.yml';

  return gulp.src('.')
    .pipe(run(shellCommand))
    .on('error', gutil.log);
};
gulp.task('build:jekyll', gulp.parallel(buildJekyll));

// Runs the jekyll build command using the test config file.
const buildJekyllTest = () => {
  const shellCommand = 'bundle exec jekyll build --future --config _config.yml,_config.test.yml';

  return gulp.src('.')
    .pipe(run(shellCommand))
    .on('error', gutil.log);
};
gulp.task('build:jekyll:test', gulp.parallel(buildJekyllTest));

// Runs the jekyll build command using the test and local config files.
const buildJekyllLocal = () => {
  const shellCommand = 'bundle exec jekyll build --future --config _config.yml,_config.test.yml,_config.dev.yml';

  return gulp.src('.')
    .pipe(run(shellCommand))
    .on('error', gutil.log);
};
gulp.task('build:jekyll:local', gulp.parallel(buildJekyllLocal));
