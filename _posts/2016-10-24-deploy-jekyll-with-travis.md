---
layout: post
title: Deploying Jekyll to Github Pages with Travis and Gulp
date: 2016-10-24
author: Anne Tomasevich
tags: jekyll travis
summary: |
  A step-by-step guide to how we deploy our gulpified Jekyll site to GitHub
  Pages using Travis, opening the door for us to use Jekyll Plugins.
---

Since our company's inception, we at Savas Labs have used [Jekyll](https://jekyllrb.com/) to build our company website and [GitHub Pages](https://pages.github.com/) to host it with great success. Jekyll is a powerful tool out of the box, and it's hard to imagine a simpler hosting strategy than GitHub Pages, which only requires a [specifically named branch](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/) and a [single settings update](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#enabling-github-pages-to-publish-your-site-from-master-or-gh-pages) to get your site live for free.

One well-known (and completely understandable) limitation of this workflow: any Jekyll plugins not [whitelisted by GitHub Pages](https://pages.github.com/versions/) will be disabled when GitHub Pages builds the site, since `jekyll build` is run with the `--safe` tag. Many solutions exist to get around this, and when we decided to start using Jekyll plugins on our site we opted to use [Travis CI](https://travis-ci.org/) to build our site and push the compiled site to our `master` branch, to then be launched via GitHub Pages. To complicate matters, we recently starting building our site with gulp, which introduced another layer of dependencies to the mix.

## Basic Workflow

Our site was already using Travis CI to run our test suite on pull requests and
merges to the `master` branch. You can learn about setting up Travis in their
[docs](https://docs.travis-ci.com/).

Previously, Travis would build the site and run our tests, then we would merge
branches into `master`, triggering GitHub Pages to rebuild and deploy our site.
But we want to build our site before it gets to GitHub Pages to ensure our
Jekyll Plugins are included. In our new workflow:

1. We'll create a new default branch so the `master` branch can be cleared
out and used by Travis.
2. When this new branch is updated (i.e. a pull request is merged), Travis will
build the site.
3. Using a GitHub token for authorization, Travis will commit the `_site`
directory to the `master` branch, then push the `master` branch.
4. This will trigger GitHub Pages to deploy our pre-built site.

### Create a new default branch

We created a new branch off `master` called `source` and set it to the default
branch on GitHub. Each time the deploy process is run, we'll have Travis delete
the files on the `master` branch, then commit the entire compiled `_site`
directory. This will ensure that all changes (including deletions) are captured.

### Set up a GitHub token for Travis

To give Travis the authority to commit and push to our repository, we generated
a personal access token by visiting the
[settings page](https://github.com/settings/tokens) on GitHub and generating a
new token. We used a bot account that has access to our repo to avoid needing to
use one of our personal accounts.

![Generating a personal access token in GitHub]({{ site.url }}/assets/img/blog/github-token.jpg)

We'll need to use the access token and the account's email address in our
deployment script, so to keep those items out of version control we used
`travis encrypt`:

```bash
$ travis encrypt GH_TOKEN=<token> --add env.global
$ travis encrypt GH_EMAIL=<email> --add env.global
```

This adds encrypted versions of these sensitive items to `travis.yml`:

```yaml
env:
  global:
  - secure: [big long encrypted thing]
  - secure: [and another]
```

With that, we can use the `GH_TOKEN` and `GH_EMAIL` variables in our
deployment script.

### Configure deployment

Next we added the following to our `travis.yml` file:

```yaml
# Keep Travis from testing `master` branch
branches:
  except:
  - master

# Deployment config
deploy:
  provider: script
  script: "./_scripts/build.sh"
  skip_cleanup: false
  on:
    branch: source
```

We don't want Travis running our tests on the `master` branch anymore since it
only contains the compiled site, and only want Travis to run the
deployment script on the `source` branch. We're also telling Travis which script
to run on deployment, and to destroy the site after the test script is run with our
`config.test.yml` file so the deployment script can rebuild the site with our
default `config.yml` file. Check out the [full travis.yml file here](https://github.com/savaslabs/savaslabs.github.io/blob/95bb1d70790acf4c33b7c121e2ff462af5096d73/.travis.yml).

That version of `travis.yml` worked for us when we were using `jekyll build` to
compile the site, but things got trickier when we started using gulp. We had to
set the proper versions of npm and node.js, and ensure that our ruby gems were
installed properly. Here's all the travis config we needed to get things
running with gulp:

```yaml
# travis.yml

language: node_js
sudo: required
script:
  - ./_scripts/run-tests.sh
branches:
  except:
  - master
node_js:
 - '6.1'
before_install:
  - if [[ `npm -v` != 3* ]]; then npm i -g npm@3; fi
  - rvm install 2.1
  - rvm use 2.1
  - . $HOME/.nvm/nvm.sh && nvm install 6.1 && nvm use 6.1
  - gem install bundler
  - bundle check || bundle install
env:
  global:
  - NOKOGIRI_USE_SYSTEM_LIBRARIES=true
  - secure: [stuff]
  - secure: [more stuff]
deploy:
  provider: script
  script: "./_scripts/build.sh"
  skip_cleanup: false
  on:
    branch: source
```

### The deployment script

When the `source` branch is updated and our tests pass, the deployment script is
executed.

```sh
#!/bin/bash

# Enable error reporting to the console.
set -e

# Install bundles if needed.
bundle check || bundle install

# NPM install if needed.
. $HOME/.nvm/nvm.sh && nvm install 6.1 && nvm use 6.1
npm install

# Build the site.
gulp

# Checkout `master` and remove everything
git clone https://${GH_TOKEN}@github.com/savaslabs/savaslabs.github.io.git ../savaslabs.github.io.master
cd ../savaslabs.github.io.master
git checkout master
rm -rf *

# Copy generated HTML site from source branch in original repo.
# Now the `master` branch will contain only the contents of the _site directory.
cp -R ../savaslabs.github.io/_site/* .

# Make sure we have the updated .travis.yml file so tests won't run on master.
cp ../savaslabs.github.io/.travis.yml .
git config user.email ${GH_EMAIL}
git config user.name "savas-bot"

# Commit and push generated content to `master` branch.
git status
git add -A .
git status
git commit -a -m "Travis #$TRAVIS_BUILD_NUMBER"
git push --quiet origin `master` > /dev/null 2>&1
```

Some important notes:

- Make sure the script file is executable!
- The last line ensures that our encrypted token won't end up in git logs

## Deployment and debugging

Merging this code into `source` was the easiest way for us to test if our new process worked
— scary, right? Fortunately, if the build script failed (and it did several
times until we could get the npm and node versions correct and the ruby gems
installing properly) nothing got pushed to `master` so nothing was deployed,
meaning no downtime on our site. We also used
[Teleconsole](https://www.teleconsole.com/) to debug from inside the Travis
environment.

To do this, we commented out the `git push` line and added the following to
`build.sh`:

```sh
curl https://www.teleconsole.com/get.sh | sh
teleconsole
```

This printed a session ID in the Travis CI output. With a couple of commands, we
could enter the session from our local machines:

```bash
# Install teleconsole
$ curl https://www.teleconsole.com/get.sh | sh

# Join session
$ teleconsole join [session ID]
```

Being able to look around and run commands within the Travis environment was
hugely helpful!

## Future work

We'd like to implement some improvements on this process in the future:

- With our current setup, we can't deploy when our tests are failing.
- Managing ruby and node dependencies has proven difficult across our team and
within the Travis environment. We've considered Dockerizing our site but that's
a subject for another post!

## Resources

We'd like to give credit to these helpful posts, which we adapted for our site:

- [From Evgeny Shepelyuk's blog](http://eshepelyuk.github.io/2014/10/28/automate-github-pages-travisci.html)
- [From Mel Lota's blog](http://mlota.github.io/2015/11/23/automating-deployment-github-pages-jekyll-travis.html)