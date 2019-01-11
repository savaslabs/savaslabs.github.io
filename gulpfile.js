const paths = require('./_assets/gulp_config/paths');
const utils = require('./_tasks/utils');

const browserSync = require('browser-sync').create();
const gulp = require('gulp');

const HubRegistry = require('gulp-hub');
const hub = new HubRegistry(['_tasks/*.js']);
gulp.registry(hub);

/**
 * Task: build
 *
 * Build the site anew. Assumes images are cached by Travis.
 */
gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('build:scripts', 'build:images', 'build:styles', 'build:fonts'),
  'styleguide',
  'build:jekyll'
));

/**
 * Task: build:test
 *
 * Builds the site anew using test config.
 */
gulp.task('build:test', gulp.series(
  'clean',
  gulp.parallel('build:scripts', 'build:images', 'build:styles', 'build:fonts'),
  'styleguide',
  'build:jekyll:test'
));

/**
 * Task: build:local
 *
 * Builds the site anew using test and local config.
 */
gulp.task('build:local', gulp.series(
  'clean',
  gulp.parallel('build:scripts', 'build:images', 'build:styles', 'build:fonts'),
  'styleguide',
  'build:jekyll:local'
));

/**
 * Task: default
 *
 * Builds the site anew.
 */
gulp.task('default', gulp.parallel('build'));

/**
 * Task: build:scripts:watch
 *
 * Special task for building scripts then reloading via BrowserSync.
 */
gulp.task('build:scripts:watch', gulp.series(
  'build:scripts:dev',
  'build:jekyll:local',
  utils.reload
));

/**
 * Task: build:jekyll:watch
 *
 * Special task for building the site then reloading via BrowserSync.
 */
gulp.task('build:jekyll:watch', gulp.series('build:jekyll:local', utils.reload));

/**
 * Static server + watching files.
 *
 * Note: passing anything besides hard-coded literal paths with globs doesn't
 * seem to work with gulp.watch().
 */
const serve = () => {
  browserSync.init({
    server: paths.siteDir,
    ghostMode: false, // Toggle to mirror clicks, reloads etc. (performance)
    logFileChanges: true,
    logLevel: 'debug',
    open: true // Toggle to automatically open page when starting.
  });

  // Watch site settings.
  gulp.watch(['_config*.yml'], gulp.parallel('build:jekyll:watch'));

  // Watch .scss files; changes are piped to browserSync.
  // Ignore style guide SCSS.
  // Rebuild the style guide to catch updates to component markup.
  gulp.watch(
    ['_assets/styles/**/*.scss', '!_assets/styles/scss/07-styleguide/**/*', '!_assets/styles/styleguide.scss'],
    gulp.parallel('build:styles', 'build:styleguide')
  );

  // Watch .js files.
  gulp.watch(['_assets/js/**/*.js', '_comments-app/app/**/*'], gulp.parallel('build:scripts:watch'));

  // Watch comment app files.
  gulp.watch('_comments-app/**/*', gulp.parallel('build:scripts:watch'));

  // Watch image files; changes are piped to browserSync.
  gulp.watch('_assets/img/**/*', gulp.parallel('build:images'));

  // Watch posts.
  gulp.watch('_posts/**/*.+(md|markdown|MD)', gulp.parallel('build:jekyll:watch'));

  // Watch HTML and markdown files.
  gulp.watch(['**/*.+(html|md|markdown|MD)', '!_site/**/*.*', '!_styleguide_assets/**/*.*', '!_assets/styles/*.md'], gulp.parallel('build:jekyll:watch'));

  // Watch RSS feed XML files.
  gulp.watch('**.xml', gulp.parallel('build:jekyll:watch'));

  // Watch data files.
  gulp.watch('_data/**.*+(yml|yaml|csv|json)', gulp.parallel('build:jekyll:watch'));

  // Watch favicon.png.
  gulp.watch('favicon.png', gulp.parallel('build:jekyll:watch'));

  // Watch style guide SCSS.
  gulp.watch(['_assets/styles/styleguide.scss', '_assets/styles/scss/07-styleguide/**/*.scss'], gulp.parallel('build:styles:styleguide'));

  // Watch style guide HTML.
  gulp.watch(['_styleguide_assets/*.html', '_assets/styles/*.md'], gulp.parallel('build:styleguide', 'build:jekyll:watch'));
};

/**
 * Task: serve
 *
 * Runs the watch task without rebuilding the site.
 */
gulp.task('serve', gulp.parallel(serve));

/**
 * Task: serve:rebuild
 *
 * Runs the watch task and rebuilds the site.
 */
gulp.task('serve:rebuild', gulp.series('build:local', serve));
