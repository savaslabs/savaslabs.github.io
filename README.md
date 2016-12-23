[![Build Status](https://travis-ci.org/savaslabs/savaslabs.github.io.svg?branch=source)](https://travis-ci.org/savaslabs/savaslabs.github.io)

This is the website for [Savas Labs](http://savaslabs.com).

The site is built using Jekyll and Gulp.

TODO: add info about image optimization/processing.

### Installation

1. Make sure [Bundler](http://bundler.io) and [Jekyll](http://jekyllrb.com/docs/installation/) are installed.
   * `gem install bundler`
   * `gem install jekyll`
2. Clone the repo (default branch is `source`; do not use master.)
3. Run `bundle install` (or `bundle install --path vendor/bundle` if preferred)
4. Make sure [node.js and npm](https://docs.npmjs.com/getting-started/installing-node) are installed. For npm, you should be running at least major version 3.
   * To update npm to the latest version, run `npm install npm@latest -g`
5. Install gulp globally.
   * `npm install -g gulp`
6. Make sure [ImageMagick](http://www.imagemagick.org/script/index.php) is installed.
   * `brew install imagemagick` should work on OSX
7. Run `npm install` to install node modules. This takes a few minutes.

### Local development

To serve the site, run `gulp serve`. If you do not have Gulp installed locally
then you can install it globally via `npm install -g gulp`. This uses the test
and dev config files for local development.

If needed, run `npm install` to install any modules that were added since you last served the site.

Thanks to `gulp.watch` and Browsersync, any changes you make will trigger Gulp
to either regenerate the Jekyll site and automatically refresh your browser or,
if they're changes to CSS or images, inject the updated file(s) so a refresh
isn't needed. It's pretty cool!

You can toggle some options in the gulpfile:

- In the `serve` task, change `ghostMode` to `true` if you want to mirror clicks,
reloads, etc. across browsers. Useful for testing, hard on performance.
- In the `serve` task, change `open` to `false` if you don't want Browsersync to
automatically open a browser window for you when you serve the site.
- TODO: allow devs to use the `--drafts` tag to show works in progress. For now
you can update the build command in the `build:jekyll:local` task to include the
`--drafts` tag.

### Git workflow

Because we're using Travis to build the site and push to master, which is then
deployed by Github Pages, the master branch contains the generated `_site`
directory. The main development branch you should pull from and open pull
requests against is `source`.

### Tests

To run the tests:

`$ bash _scripts/run-tests.sh`

### Writing blog posts

#### Headings

Your post title (stored in the post's front matter) will be an H1. Your
top-level headings should be H2's (##), then H3's (###), etc.

#### Images

You can include a featured image in the front matter using the `featured_image`
and `featured_image_alt` keys. This will work for our site and for Drupal Planet.
Please try to do this for every post!

Your image should be 1474px wide. Blog images should be placed in
`_/assets/img/blog`, but you should only include `/blog/[filename].jpg` in the
front matter of your post.

Lastly, please include `featured_image_width` and `featured_image_height` in
pixels to satisfy Google's structured data requirements.

### Syntax Highlighting

Since updating to Jekyll 3.0.2 which uses Kramdown/Rouge, to use syntax
highlighting in a post you just need to use backticks (similar to GitHub or
Slack highlighting).

Special tips:

1. You can include the language name after the first set of backticks with no
space e.g. ```bash
2. The syntax block must be proceeded and followed by blank lines.
3. For php you must including an opening php tag to get proper highlighting.
4. To display raw Liquid code, you'll need to wrap your code in {% raw %} and
{% endraw %} tags.

### Tags

To add a new tag, complete the following:

1. Add the tag to _data/tags.yml.
2. Add a new markdown file for the tag in blog/tag. This creates a page for posts with that tag.
3. Add the tag to the front matter of your post.

### Comments

Comments are handled by a Dockerized instance of [Squabble](https://github.com/savaslabs/squabble). Please refer to that repositories README for notes on usage, and to the [wiki page](https://pm.savaslabs.com/projects/savaslabs/wiki/Squabble) for production deployment information.

### Staging site

We have a password protected [staging site](http://blabs.savasdev.com)!
Among other use cases, it can be used to share a site update with the team that
we don't yet want to make available to the public.

The staging site lives on the savasdev.com server.

If you would like to add your private repo to stage your code feel free

```bash
www@savasdev:~/blabs.savasdev.com/site$ git remote -v
origin git@bitbucket.org:illmasterc/savas-labs-website.git (fetch)
origin git@bitbucket.org:illmasterc/savas-labs-website.git (push)
upstream git@github.com:savaslabs/savaslabs.github.io.git (fetch)
upstream git@github.com:savaslabs/savaslabs.github.io.git (push)
```

The site is served from `/home/www/blabs.savasdev.com/site/_site` which can
be rebuilt by issuing `jekyll build` from within `/home/www/blabs.savasdev.com/site`
