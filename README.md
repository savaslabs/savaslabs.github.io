[![Build Status](https://travis-ci.org/savaslabs/savaslabs.github.io.svg?branch=source)](https://travis-ci.org/savaslabs/savaslabs.github.io) [![Maintainability](https://api.codeclimate.com/v1/badges/c1e3bbe763eb557e9ad7/maintainability)](https://codeclimate.com/github/savaslabs/savaslabs.github.io/maintainability)

This is the website for [Savas Labs](https://savaslabs.com).

The site is built using Jekyll and Gulp.

## Installation

### Install dependencies

1. [Bundler](http://bundler.io): `gem install bundler`
2. [Jekyll](http://jekyllrb.com/docs/installation/): `gem install jekyll`
3. [node.js and npm](https://docs.npmjs.com/getting-started/installing-node). For npm, you should be running at least major version 3. To update npm to the latest version, run `npm install npm@latest -g`.
4. [Gulp](https://github.com/gulpjs/gulp): `npm install -g gulp`
5. [ImageMagick](http://www.imagemagick.org/script/index.php): `brew install imagemagick`
6. [Proselint](https://github.com/amperser/proselint/): `pip install proselint`
7. [Aspell](http://aspell.net/): `_scripts/aspell.sh`. This script will install and configure Aspell.

### Site setup

1. Clone the repo (default branch is `source`; do not use master.)
2. Run `git config core.hooksPath hooks`. This configures git to use hooks inside the `hooks` directory instead of `.git/hooks`.
3. Run `bundle install` (or `bundle install --path vendor/bundle` if preferred)
4. Run `npm install` to install node modules. This takes a few minutes.

## Local development

Run `npm run serve` to serve the site locally and watch for file
changes. Initially, or anytime you want to rebuild the `_site` directory, you
should run `npm run serve:rebuild`, which will run the local build task before
serving the site.

The `serve` task uses the test and dev config files for local development.

If needed, run `npm install` to install any modules that were added since you
last served the site.

Thanks to `gulp.watch` and BrowserSync, any changes you make will trigger Gulp
to either regenerate the Jekyll site and automatically refresh your browser or,
if they're changes to CSS or images, inject the updated file(s) so a refresh
isn't needed. It's pretty cool!

You can toggle some options in the gulpfile:

- In the `serve` task, change `ghostMode` to `true` if you want to mirror clicks,
reloads, etc. across browsers. Useful for testing, hard on performance.
- In the `serve` task, change `open` to `false` if you don't want BrowserSync to
automatically open a browser window for you when you serve the site.

## Image Optimization

To avoid optimizing images each time the site is built, locally or in Travis,
we're committing optimized images to the `_assets` directory. When you add a
new image, be sure to run `npm run images` to optimize the new image. When
you commit an image, the pre-commit hook will remind you to do this.

## Git workflow

### Branches

Because we're using Travis to build the site and push to master, which is then
deployed by GitHub Pages, the master branch contains the generated `_site`
directory. The main development branch you should pull from and open pull
requests against is `source`.

### Pre-commit hook

The pre-commit hook located in the `hooks` directory does the following on all staged HTML and markdown files:

1. Checks spelling with Aspell
2. Runs markdown-lint (mdl)
3. Runs proselint

To add words to the custom dictionary:

1. Add the words to `savas_wordlist.txt` (one word per line)
2. Run `_scripts/aspell.sh` to update the dictionary.

To ignore the tests and commit (only recommended for proselint errors):

1. Run `git commit --no-verify`

## Tests

To run the tests:

`$ bash _scripts/run-tests.sh`

## Writing blog posts
To ensure writing blog posts is accessible to everyone on our team, we draft blog posts in Google Docs:
1. Make a copy of the Google Doc [template](https://docs.google.com/document/d/1lT9YThBQduRzv6rb3wmlIu2KepoWoG3pgodYgZqy_iQ/edit?usp=sharing), and create the post.
2. Share the draft with reviewers. Reviewers will sign off on content and run the blog post through Grammarly.

**After blog content is finalized**, a developer will follow instructions in [our style guide](https://savaslabs.com/styleguide/blog.html):
1. Convert the Google Doc to markdown.
    - [Docs to Markdown drive add-on](https://gsuite.google.com/marketplace/app/docs_to_markdown/700168918607) is helpful, but formatting must be confirmed manually. 
2. Push branch and create a PR
3. Stage the post
    - `git push origin [branch-name]:stage1` pushes the branch to: [https://stage1--savas-staging.netlify.com](https://stage1--savas-staging.netlify.com)
    - Other options: `stage1`, `stage2`, ... `stage6`
4. After PR approval, merge to `source` to publish the blog post to https://savaslabs.com/blog/

## Comments

Comments are handled by a Dockerized instance of [Squabble](https://github.com/savaslabs/squabble). Please refer to that repositories README for notes on usage, and to the [wiki page](https://pm.savaslabs.com/projects/savaslabs/wiki/Squabble) for production deployment information.
