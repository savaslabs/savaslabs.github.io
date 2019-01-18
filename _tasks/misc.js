const paths = require('../_assets/gulp_config/paths');

const accessibility = require('gulp-accessibility');
const cache = require('gulp-cache');
const gulp = require('gulp');
const gutil = require('gulp-util');
const notify = require('gulp-notify');
const run = require('gulp-run');

// Updates Ruby gems.
const updateGems = () => {
  return gulp.src('.')
    .pipe(run('bundle install'))
    .pipe(run('bundle update'))
    .pipe(notify({message: 'Bundle Update Complete'}))
    .on('error', gutil.log);
};
gulp.task('update:gems', gulp.parallel(updateGems));

// Clears the gulp cache. Currently this just holds processed images.
gulp.task('cache-clear', gulp.parallel(function (done) {
  return cache.clearAll(done);
}));

/**
 * Runs the accessibility test against WCAG standards.
 *
 * Tests we're ignoring and why:
 *   1. WCAG2A.Principle1.Guideline1_3.1_3_1.H49.I: it's common practice (and,
 *   arguably, more semantic) to use <i> for icons.
 *   2. WCAG2A.Principle1.Guideline1_3.1_3_1.H48: This is throwing a false
 *   positive. We have marked up our menus as unordered lists.
 *   3. WCAG2A.Principle1.Guideline1_3.1_3_1.H49.AlignAttr: Sadly, we must
 *   ignore this test if we are to use our emoji plugin.
 *   4. WCAG2A.Principle1.Guideline1_3.1_3_1.H73.3.NoSummary: We can't use
 *   table summaries in kramdown in our blog posts.
 *   5. WCAG2A.Principle1.Guideline1_3.1_3_1.H39.3.NoCaption: We can't use
 *   table captions in kramdown in our blog posts.
 *   6. WCAG2A.Principle1.Guideline1_3.1_3_1.H42: This throws a lot of false
 *   positives for text that should not be headings.
 *
 * We're also skipping redirect pages like /news/* and /team/*.
 */
const accessibilityTest = () => {
  return gulp.src(paths.htmlTestFiles)
    .pipe(accessibility({
      force: false,
      accessibilityLevel: 'WCAG2A',
      reportLevels: {notice: false, warning: true, error: true},
      ignore: [
        'WCAG2A.Principle1.Guideline1_3.1_3_1.H49.I',
        'WCAG2A.Principle1.Guideline1_3.1_3_1.H48',
        'WCAG2A.Principle1.Guideline1_3.1_3_1.H49.AlignAttr',
        'WCAG2A.Principle1.Guideline1_3.1_3_1.H73.3.NoSummary',
        'WCAG2A.Principle1.Guideline1_3.1_3_1.H39.3.NoCaption',
        'WCAG2A.Principle1.Guideline1_3.1_3_1.H42'
      ]
    }))
    .on('error', gutil.log);
};
gulp.task('accessibility-test', gulp.parallel(accessibilityTest));
