---
layout: post
title: Our Jekyll Workflow
date: 2016-10-07
author: Anne Tomasevich
tags: performance jekyll javascript css sass front-end-dev
summary: |
  How we improved our company site's performance with a better Jekyll workflow
featured_image: "/blog/test-tubes.jpg"
featured_image_alt: "Test tubes with brightly color liquids inside"
---

It's hard to believe it's been over a year and a half since our site's 
[inaugural blog post](http://localhost:3000/2015/04/01/building-our-site.html)
(written just two months after my career change into web development!) It's been
great fun building our site and adding content thanks to the power and simplicity
of [Jekyll](https://jekyllrb.com/). We recently deployed a series of changes to
optimize our CSS, JS, and images and, in doing so, finally moved away from using
built-in `jekyll` commands to build the site. Instead, we're using
[gulp](http://gulpjs.com/), a task runner (or, as they put so nicely on their
website, a "streaming build system"). In this post I'll go over our motivations
for this change, how we integrated gulp with Jekyll, and the awesome results!

We based a lot of our gulp workflow on 
[this great post](https://robwise.github.io/blog/jekyll-and-gulp) by Rob Wise.
Our workflow also includes separate gulp tasks for building the site locally,
for testing purposes, and for production, as well as some updated gulp plugins,
but I'd definitely recommend his post and you'll see some of his code and
architecture throughout this article.

To see all of our current code, pop over to our
[GitHub repo](https://github.com/savaslabs/savaslabs.github.io).

## Why the changes?

We've wanted to make some improvements to our site's performance for a while,
but our ultimate motivator was our not-so-great Google PageSpeed score.

![Initial Google PageSpeed Insights score for savaslabs.com. Several significant problems exist!]({{ site.url }}/assets/img/blog/pagespeed-insights-initial.jpg)
<span class="caption">Yikes!</span>

Going off of these recommendations and adding a few things of our own, we ended
up with a nice to-do list:

1. Minify our main CSS file, use autoprefixer to add vendor prefixes (since this
will be required for the soon-to-come Bourbon v5.0) and inline CSS that's
critical to above-the-fold content
2. Eliminate render-blocking JS above the fold
3. Optimize images and use the `<picture>` element to serve the
smallest image possible on all screen sizes and resolutions

One thing on the PageSpeed page you won't see on our to-do list is "leverage
browser caching" - we're not going to tackle this just yet since we're using
GitHub Pages to host our site and we don't have control over caching headers. On
a side note, if you have a solution to this problem, please leave us a comment!

From here I'll go over how we set up gulp to work with our Jekyll site, then how
we used gulp to accomplish the tasks above.

## Initial setup

### Changes to Jekyll directory structure

Our fonts, images, scripts, and SCSS files were previously stored in a directory
called `assets`. The `jekyll build` command would copy this directory into the
`_site` folder so the assets within could be included in HTML files and used to
theme the site.

```bash
~/Sites/savaslabs.com/assets $ tree -L 1
.
├── fonts
├── img
├── js
└── styles
```

Since we're going to be processing our assets with gulp instead, we moved the
`assets` directory to `_assets` to indicate that it should be ignored by Jekyll.

Our basic workflow will be to use gulp to process the contents of `_assets`,
outputting them into a git-ignored directory `assets` which will be copied by
Jekyll into the generated `_site` directory. In addition, we will create a `gulp
serve` task using `gulp.watch()` to process assets as they're updated and copy
them directly into the `_site` directory, then push the changes to the Browser
via BrowserSync.

![Diagram of our basic gulp workflow]({{ site.url }}/assets/img/blog/gulp-workflow.svg)

### Changes to Jekyll config

We also needed to make some updates to our Jekyll config:

```yaml
# Delete this since Jekyll is no longer processing sass.
sass:
  sass_dir: assets/styles

# Exclude the following from the Jekyll build process.
# Note: "vendor" is for Travis CI.
exclude: ["vendor",
          "_assets",
          "Gemfile",
          "Gemfile.lock",
          "gulpfile.js",
          "node_modules",
          "package.json"]
 
```

I'd also like to note that we're using a few different config files: our default
`_config.yml`, `_config.test.yml` which uses blank URL and base URL variables so
tests can be run locally, and `_config.dev.yml` which sets variables for our
local [comment server](https://github.com/savaslabs/squabble) for development
purposes. These different config files will come into play as we set up the
gulpfile.

Finally, we updated our `.gitignore` to include the following:

```text
# .gitignore
node_modules
assets
```

`node_modules` will hold all of our node.js dependencies, and `assets` is the
directory that will be generated by gulp and copied by Jekyll into the `_site`
directory. The `assets` directory (no underscore) will hold processed asset
files and we'll only be keeping the unprocessed files (the `_assets` directory)
in version control.

### Paths file

This comes straight from [Rob's post](https://robwise.github.io/blog/jekyll-and-gulp)
and is a great organization technique. In the `_assets` directory, I created a
directory called `gulp_config` to hold `paths.js`, a list of all the paths we'll
need set to javascript variables to be used in the gulpfile. We're going to be
piping a lot of files to and from gulp tasks and they'll need to land in very
specific locations so settings these variables in one place will keep us
consistent.

```js
// paths.js file

var paths = {};

// Directory locations.
paths.assetsDir       = '_assets/';      // The files Gulp will handle.
paths.jekyllDir       = '';              // The files Jekyll will handle.
paths.jekyllAssetsDir = 'assets/';       // The asset files Jekyll will handle.
paths.siteDir         = '_site/';        // The resulting static site.
paths.siteAssetsDir   = '_site/assets/'; // The resulting static site's assets.

// Folder naming conventions.
paths.postFolderName   = '_posts';
paths.draftFolderName  = '_drafts';
paths.fontFolderName   = 'fonts';
paths.imageFolderName  = 'img';
paths.scriptFolderName = 'js';
paths.stylesFolderName = 'styles';

// Asset files locations.
paths.sassFiles   = paths.assetsDir + paths.stylesFolderName;
paths.jsFiles     = paths.assetsDir + paths.scriptFolderName;
paths.imageFiles  = paths.assetsDir + paths.imageFolderName;
paths.fontFiles   = paths.assetsDir + paths.fontFolderName;

// Jekyll files locations.
paths.jekyllPostFiles  = paths.jekyllDir       + paths.postFolderName;
paths.jekyllDraftFiles = paths.jekyllDir       + paths.draftFolderName;
paths.jekyllCssFiles   = paths.jekyllAssetsDir + paths.stylesFolderName;
paths.jekyllJsFiles    = paths.jekyllAssetsDir + paths.scriptFolderName;
paths.jekyllImageFiles = paths.jekyllAssetsDir + paths.imageFolderName;
paths.jekyllFontFiles  = paths.jekyllAssetsDir + paths.fontFolderName;

// Site files locations.
paths.siteCssFiles   = paths.siteAssetsDir + paths.stylesFolderName;
paths.siteJsFiles    = paths.siteAssetsDir + paths.scriptFolderName;
paths.siteImageFiles = paths.siteAssetsDir + paths.imageFolderName;
paths.siteFontFiles  = paths.siteAssetsDir + paths.fontFolderName;

// Glob patterns by file type.
paths.sassPattern     = '/**/*.scss';
paths.jsPattern       = '/**/*.js';
paths.imagePattern    = '/**/*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF)';
paths.markdownPattern = '/**/*.+(md|MD|markdown|MARKDOWN)';
paths.htmlPattern     = '/**/*.html';
paths.xmlPattern      = '/**/*.xml';

// Asset files globs
paths.sassFilesGlob  = paths.sassFiles  + paths.sassPattern;
paths.jsFilesGlob    = paths.jsFiles    + paths.jsPattern;
paths.imageFilesGlob = paths.imageFiles + paths.imagePattern;

// Jekyll files globs
paths.jekyllPostFilesGlob  = paths.jekyllPostFiles  + paths.markdownPattern;
paths.jekyllDraftFilesGlob = paths.jekyllDraftFiles + paths.markdownPattern;
paths.jekyllHtmlFilesGlob  = paths.jekyllDir        + paths.htmlPattern;
paths.jekyllXmlFilesGlob   = paths.jekyllDir        + paths.xmlPattern;
paths.jekyllImageFilesGlob = paths.jekyllImageFiles + paths.imagePattern;

// Site files globs
paths.siteHtmlFilesGlob = paths.siteDir + paths.htmlPattern;

module.exports = paths;
```

Later we'll include this file in our gulpfile so the variables can be accessed.

### Install dependencies

The first requirements are node.js and npm, which you can learn about installing [here](https://docs.npmjs.com/getting-started/installing-node).

Getting gulp set up is a matter of a few commands:

```bash
# Install gulp globally.
$ npm install -g gulp

# Initialize the project, following the prompts
# (most of which can be left blank and filled in later).
$ npm init

# Now that package.json has been created, start adding dependencies.
$ npm install --save-dev gulp

# Create a gulpfile in the root of the repository.
$ touch gulpfile.js
```

### Set variables and include paths

In the gulpfile, we'll start by setting up variables for the gulp plugins we'll
be using and including our paths file.

(P.S. If you're like me, you might find it easier to look at the entire gulpfile
at once - you can view ours [on GitHub](https://github.com/savaslabs/savaslabs.github.io/blob/source/gulpfile.js).)

```js
// gulpfile.js

// Define variables.
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync').create();
var cleancss     = require('gulp-clean-css');
var concat       = require('gulp-concat');
var del          = require('del');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var imagemin     = require('gulp-imagemin');
var jshint       = require('gulp-jshint');
var notify       = require('gulp-notify');
var postcss      = require('gulp-postcss');
var rename       = require('gulp-rename');
var run          = require('gulp-run');
var runSequence  = require('run-sequence');
var sass         = require('gulp-ruby-sass');
var uglify       = require('gulp-uglify');

// Include paths file.
var paths = require('./_assets/gulp_config/paths');
```

Each plugin will need to be installed locally either by copying our
[`packages.json`](https://github.com/savaslabs/savaslabs.github.io/blob/source/package.json)
file and running `npm install`, or by running the following for each
plugin:

```bash
$ npm install --save-dev [plugin-name]
```

This will install the package and add it to your `package.json` file.

## Gulp tasks

Below is an outline of the gulp tasks we'll be writing. From here, I'll go
through each individual task, then the default `gulp` and `gulp serve` commands
that tie the tasks together to build the site or serve it locally.

```
// gulpfile.js

// Process SCSS.
gulp.task('build:styles:main', function() {
  // Compile SCSS, run autoprefixer, and minify CSS.
});

// Create critical CSS file.
gulp.task('build:styles:critical', function() {
  // Compile critical SCSS rules, run autoprefixer, minify CSS, and place in
  // appropriate location so it can be inlined in the HTML head.
});

// Process JS.
gulp.task('build:scripts', function() {
  // Concatenate and uglify JS.
});

// Optimizes images.
gulp.task('build:images', function() {
  // Run imagemin.
});

// Runs jekyll build command.
gulp.task('build:jekyll', function() {
  // Run bundle exec jekyll build with appropriate config file.
});

// Builds site anew.
gulp.task('build', function() {
  // Run all build tasks.
});

// Default Task: builds site.
gulp.task('default', ['build']);

// Serve site and watch files.
gulp.task('serve', ['build'], function() {
  // Watch for changes and run appropriate build tasks when needed.
});
```

### Handle CSS

Jekyll compiles SCSS out of the box, but using gulp to process our SCSS gives us the power to do other useful things like minify our CSS, add vendor prefixes, and direct our critical CSS to the `<head>` element.

#### Process all SCSS

```js
// Uses Sass compiler to process styles, adds vendor prefixes, minifies, then
// outputs file to the appropriate location.
gulp.task('build:styles:main', function() {
    return sass(paths.sassFiles + '/main.scss', {
        style: 'compressed',
        trace: true,
        loadPath: [paths.sassFiles]
    }).pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(cleancss())
        .pipe(gulp.dest(paths.jekyllCssFiles))
        .pipe(gulp.dest(paths.siteCssFiles))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});
```

This task will output `main.css` in `_site/assets/styles`.

Some notes:

- We're including all our SCSS partials in our [main.scss](https://github.com/savaslabs/savaslabs.github.io/blob/source/_assets/styles/main.scss)
file, but you could point to a directory or file glob if needed.
- We're using the [autoprefixer plugin](https://github.com/postcss/autoprefixer) for postcss. We're making heavy use of the Bourbon mixin library which currently handles some autoprefixing, but this will be dropped (hopefully soon!) in Bourbon v5.0 at which time [autoprefixer will be recommended](https://github.com/postcss/autoprefixer).

#### Critical CSS

It's considered a good practice to inline CSS critical to above-the-fold content 
in `<style>` tags in the HTML `<head>` to avoid needing to wait on the server to
load CSS on the initial page load. Identifying critical styles and pulling them
into a single file may seem daunting but there are a 
[number of ways](https://css-tricks.com/authoring-critical-fold-css/#article-header-id-1)
to do this automatically. However, we found the easiest way to consolidate
critical styles for all pages on our site was to follow
[Chris Ferdinandi's method](https://gomakethings.com/inlining-critical-css-for-better-web-performance/)
and separate critical styles into their own Sass partials, then include these
partials in a `critical.scss` file. This took a 
[little refactoring](https://github.com/savaslabs/savaslabs.github.io/commit/53b6d3edbace9ca7a85bd3d3d2e02e88087862b0),
but it certainly didn't hurt to make our Sass files even more modular.

After we created our `critical.scss` file, we added another gulp task to process
it:

```js
// Processes critical CSS, to be included in head.html.
gulp.task('build:styles:critical', function() {
    return sass(paths.sassFiles + '/critical.scss', {
        style: 'compressed',
        trace: true,
        loadPath: [paths.sassFiles]
    }).pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(cleancss())
        .pipe(gulp.dest('_includes'))
        .on('error', gutil.log);
});
```

This outputs a (git-ignored) `critical.css` file into our `_includes` directory.
We added the critical CSS file to our `head.html` template:

```html
{# in head.html #}
<head>
  {% raw %}
  {# Other stuff... #}

  <style>{% include critical.css %}</style>
  {% endraw %}
</head>
```

Next, instead of loading the main CSS file all at once, we used 
[Filament Group's `loadCSS` function](https://github.com/filamentgroup/loadCSS)
to load the main CSS asynchronously (plus our Google fonts):

```html
{# in head.html #}
<head>
  {% raw %}
  {# Other stuff... #}

  <script>
    !function(e){"use strict";var t=function(t,n,r){function o(e){return i.body?e():void setTimeout(function(){o(e)})}function l(){d.addEventListener&&d.removeEventListener("load",l),d.media=r||"all"}var a,i=e.document,d=i.createElement("link");if(n)a=n;else{var s=(i.body||i.getElementsByTagName("head")[0]).childNodes;a=s[s.length-1]}var u=i.styleSheets;d.rel="stylesheet",d.href=t,d.media="only x",o(function(){a.parentNode.insertBefore(d,n?a:a.nextSibling)});var f=function(e){for(var t=d.href,n=u.length;n--;)if(u[n].href===t)return e();setTimeout(function(){f(e)})};return d.addEventListener&&d.addEventListener("load",l),d.onloadcssdefined=f,f(l),d};"undefined"!=typeof exports?exports.loadCSS=t:e.loadCSS=t}("undefined"!=typeof global?global:this),function(e){if(e.loadCSS){var t=loadCSS.relpreload={};if(t.support=function(){try{return e.document.createElement("link").relList.supports("preload")}catch(t){}},t.poly=function(){for(var t=e.document.getElementsByTagName("link"),n=0;n<t.length;n++){var r=t[n];"preload"===r.rel&&"style"===r.getAttribute("as")&&(e.loadCSS(r.href,r),r.rel=null)}},!t.support()){t.poly();var n=e.setInterval(t.poly,300);e.addEventListener&&e.addEventListener("load",function(){e.clearInterval(n)})}}}(this);
    loadCSS('/assets/styles/main.css');
    loadCSS('https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700,400italic,700italic|PT+Serif|Source+Sans+Pro');
  </script>

  <style>{% include critical.css %}</style>
  {% endraw %}
</head>
```

Finally, as a fallback, we're loading the CSS files normally in `<noscript>` tags
in a `scripts.html` template that's included on each page after the footer.

```html
{# in scripts.html #}
<noscript>
  <link href='/assets/styles/main.css' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700,400italic,700italic|PT+Serif|Source+Sans+Pro' rel='stylesheet' type='text/css'>
</noscript>
```

#### Tasks to build all styles and delete all styles

To wrap things up, we have a task to build all styles, and a task to delete all
styles. These will come into play when we set up our main build and serve tasks.

```js
// Build all styles.
gulp.task('build:styles', ['build:styles:main', 'build:styles:critical']);

gulp.task('clean:styles', function(callback) {
    del([paths.jekyllCssFiles + 'main.css',
        paths.siteCssFiles + 'main.css',
        '_includes/critical.css'
    ]);
    callback();
});
```

### Process JS and load it asyncronously

```js
// Concatenates and uglifies global JS files and outputs result to the
// appropriate location.
 gulp.task('build:scripts', function() {
     return gulp.src([
         paths.jsFiles + '/global/lib' + paths.jsPattern,
         paths.jsFiles + '/global/*.js'
     ])
         .pipe(concat('main.js'))
         .pipe(uglify())
         .pipe(gulp.dest(paths.jekyllJsFiles))
         .pipe(gulp.dest(paths.siteJsFiles))
         .on('error', gutil.log);
 });
```

This task outputs `main.js` to `_site/assets/js/main.js`. To avoid delaying the
initial render, we're loading the scripts asyncronously via the `async`
attribute in our `scripts.html` template included on each page after the footer.

```html
{# in scripts.html #}
<script type="text/javascript" src="{{ '/assets/js/main.js' | prepend: site.baseurl | prepend: site.url }}" async></script>
<noscript>
  <link href='/assets/styles/main.css' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700,400italic,700italic|PT+Serif|Source+Sans+Pro' rel='stylesheet' type='text/css'>
</noscript>
```

As before, we also have a task to delete all processed scripts.

```js
gulp.task('clean:scripts', function(callback) {
    del([paths.jekyllJsFiles + 'main.js', paths.siteJsFiles + 'main.js']);
    callback();
});
```

### Process images

We took a few steps to optimize our site's existing images and ensure that
future images could be optimized automatically via gulp and the Jekyll build
process.

#### Manual updates to images

We knocked out some low-hanging fruit by ensuring we were using the proper image
format and the smallest images possible. Google has a [great writeup on image
optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)
I'd highly recommend, but the basic gist is:

- Don't use images if you can use CSS or webfonts
- Choose the right image format:
  - If it's a vector graphic or can be converted to one, use SVG
  - If you need transparency or fine detail, use PNG
  - If you need animation, use GIF
  - Otherwise, use JPEG
- Play around with image quality to find the lowest quality that still looks great
- Your images shouldn't be any larger than the largest they'll display on your
site (keeping in mind this might be 2x for high resolution displays)

On my Mac, I used Sketch to convert some of our images from PNG to JPEG at a
slightly lower quality, to save vector graphics as SVGs when possible, and to
trim images down when they were larger than they needed to be. We also
established these rules as a team for future images to be added to our site.

#### Minify images via gulp

Next, we wrote a gulp task to run our images through the `imagemin` plugin.

```js
// Optimizes and copies image files.
gulp.task('build:images', function() {
    return gulp.src(paths.imageFilesGlob)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.jekyllImageFiles))
        .pipe(gulp.dest(paths.siteImageFiles))
        .pipe(browserSync.stream());
});
```

This task outputs optimized images in `_site/assets/img`.

We also have a task to delete all processed images.

```js
gulp.task('clean:images', function(callback) {
    del([paths.jekyllImageFiles, paths.siteImageFiles]);
    callback();
});
```

#### Jekyll Picture Tag plugin

Between our manual updates and `imagemin`, we cut our image sizes down
drastically! Our final step was to use the Jekyll Picture Tag plugin

### Build and serve tasks

To pull it all together, we have a default task to build the site (creating the
`_site` directory which holds the compiled code that essentially is our site)
and a `serve` task to watch our files and rebuild the appropriate files or the
entire site when those files change.

The default task deletes the site by running the `clean` tasks then runs all the
`build` tasks, then the `jekyll build` command to build the site using our
processed assets.

```js
// Delete _site directory and processed assets.
gulp.task('clean', ['clean:jekyll',
    'clean:fonts',
    'clean:images',
    'clean:scripts',
    'clean:styles']);

// Builds site anew.
gulp.task('build', function(callback) {
    runSequence('clean',
        ['build:scripts', 'build:images', 'build:styles', 'build:fonts'],
        'build:jekyll',
        callback);
});

// Default Task: builds site.
gulp.task('default', ['build']);

```

## The Results

After implementing these changes, our mobile PageSpeed score shot up to 92/100,
with our desktop score at 95/100!

TODO: fill this in with screenshot

To pat myself on the back a little more, I should mention that we were already
doing great in the user experience department.

<img src="/assets/img/blog/pagespeed-insights-user-experience.jpg" class="blog-image-xl" alt="Passing Google PageSpeed Insights user experience items.">

That's grounds for a little celebration in my opinion!

<img src="/assets/img/blog/liz-lemon-self-five.gif" class="blog-image" style="max-width: 300px;" alt="Tina Fey as Liz Lemon giving herself an awesome high five.">


