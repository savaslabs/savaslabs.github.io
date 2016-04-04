[![Build Status](https://travis-ci.org/savaslabs/savaslabs.github.io.svg?branch=master)](https://travis-ci.org/savaslabs/savaslabs.github.io)

This is the Jekyll-based website for [Savas Labs](http://savaslabs.com).

## Docker

To run locally:

1. [Install Docker](https://docs.docker.com/engine/installation/) (n.b. if you're on a Mac or Windows, you'll want to run with [Docker Toolbox](https://docs.docker.com/engine/installation/mac/))
2. `docker-compose pull` to get the prebuilt image (You only need to do this once)
3. `docker-compose up -d` (`-d` says to detach the process; if desired, you can then view Jekyll's output by running `docker-compose logs`)
4. The site is now running at `http://localhost:4000`
5. Run `docker-compose stop` when you're finished

You can run custom commands like so:

``` bash
$ docker-compose run website --rm jekyll --help # The --rm flag says to remove the container after you run the command.
```

### To build a new image

Run this command:

``` bash
$ docker build -t savas_website .
```

Then upload the image to `hub.docker.com`:

``` bash
$ docker push kostajh/savaslabs.github.io
```

## Tests

To run the tests:

`$ bash _tests/run-tests.sh`

## Writing blog posts

### Headings

Your post title (stored in the post's front matter) will be an H1. Your
top-level headings should be H2's (##), then H3's (###), etc.

### Images

You can include a featured image in the front matter using the `featured_image`
and `featured_image_alt` keys. This will work for our site and for Drupal Planet.
Please try to do this for every post!

## Syntax Highlighting

Since updating to Jekyll 3.0.2 which uses Kramdown/Rouge, to use syntax
highlighting in a post you just need to use backticks (similar to GitHub or
Slack highlighting).

Special tips:

1. You can include the language name after the first set of backticks with no
space e.g. ```bash
2. The syntax block must be proceeded and followed by blank lines.
3. For php you must including an opening php tag to get proper highlighting.

## Tags

To add a new tag, complete the following:

1. Add the tag to _data/tags.yml.
2. Add a new markdown file for the tag in blog/tag. This creates a page for posts with that tag.
3. Add the tag to the front matter of your post.

## Staging site

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
