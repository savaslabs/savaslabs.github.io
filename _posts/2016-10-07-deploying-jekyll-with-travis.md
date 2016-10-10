---
layout: post
title: Deploying Jekyll to Github Pages with Travis
date: 2016-10-07
author: Anne Tomasevich
tags: performance jekyll javascript css sass front-end-dev best-practices
summary: |
  A step-by-step guide to how we deploy our Jekyll site to Github Pages using
  Travis, opening the door for us to use Jekyll Plugins.
featured_image: "/blog/usability-testing.jpg"
featured_image_alt: "Two people comparing notes while using computers"
---

Since our company's inception, we at Savas Labs have used [Jekyll](https://jekyllrb.com/) to build our company website and [GitHub Pages](https://pages.github.com/) to host it with great success. Jekyll is a powerful tool out of the box, and it's hard to imagine a simpler hosting strategy than GitHub Pages, which only requires a [specifically named branch](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/) and a [single settings update](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#enabling-github-pages-to-publish-your-site-from-master-or-gh-pages) to get your site live for free.

One well-known (and completely understandable) limitation of this workflow: any Jekyll plugins not [whitelisted by GitHub Pages](https://pages.github.com/versions/) will be disabled when GitHub Pages builds the site since `jekyll build` is run with the `--safe` tag. Many solutions exist to get around this, and when we decided to start using Jekyll plugins on our site we opted to use Travis CI to build our site and push the compiled site to our master branch, to then be launched via GitHub Pages.

## Travis CI

Actually, Travis was already set up to build our site since we've long used it for running tests on pull requests and pushes to master. 



## Deploy with Travis

- Post links to articles you used

- Basic workflow:
- Create new default git branch (source)
- Add deploy config to .travis.yml
- Get GH token for GH user bot and add securely to config
- Create build script with git workflow and make sure script is executable 755
- Set language to node_js with appropriate version, then set npm version.
- install correct version of rvm.
- install bundler
- install gems
- npm install runs automatically