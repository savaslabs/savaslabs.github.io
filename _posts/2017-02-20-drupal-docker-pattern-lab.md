---
layout: post
title: "Docker and the Drupal Pattern Lab Starter Theme"
date: 2017-02-20
author: Dan Murphy
tags: drupal drupal-planet docker pattern-lab front-end-dev drupal8
services: development
summary: This post demonstrates how to build a Docker image that can be used in local Drupal development with the Pattern Lab Starter theme and/or with other common front-end applications such as npm, Gulp, and Bower.
featured_image: "/blog/docker-drupal-pattern-lab.jpg"
featured_image_alt: "Docker Drupal 8 Pattern Lab logos on a circuited background"
featured_image_height: "722px"
featured_image_width: "1474px"
drupal_planet_summary: |
  How to build a Docker Pattern Lab image for local Drupal development with the Pattern Lab Starter theme and/or with other common front-end applications such as npm, Gulp, and Bower.
---

## Overview

Savas Labs has been using Docker for our local development and [CI](/blog/tag/continuous-integration/) environments for some time to streamline our systems. On a recent project, we chose to integrate [Phase 2's Pattern Lab Starter theme](https://github.com/phase2/pattern-lab-starter) to incorporate more front-end components into our standard build. This required building a new Docker image for running applications that the theme depends on. In this post, I'll share:

- A `Dockerfile` used to build an image with Node, npm, PHP, and Composer installed
- A `docker-compose.yml` configuration and Docker commands for running theme commands such as `npm start` from within the container

Along the way, I'll also provide:

- A quick overview of why we use Docker for local development
  - This is part of a [Docker series](/blog/tag/docker/) we're publishing, so be on the lookout for more!
- Tips for building custom images and running common front-end applications inside containers.

## Background

We switched to using Docker for local development last year and we love it - so much so that we even proposed [a Drupalcon session on our approach and experience](https://events.drupal.org/node/17250) we hope to deliver. Using Docker makes it easy for developers to quickly spin up consistent local development environments that match production. In the past we used Vagrant and virtual machines, even a Drupal-specific flavor [DrupalVM](https://www.drupalvm.com/), for these purposes, but we've found Docker to be faster when switching between multiple projects, which we often do on any given <del>Sun</del>workday.

Usually we build our Docker images from scratch to closely match production environments. However, for agile development and rapid prototyping, we often make use of public Docker images. In these cases we've relied on [Wodby's Docker4Drupal project](https://github.com/wodby/docker4drupal), which is "a set of docker containers optimized for Drupal."

We're also fans of the [atomic design methodology](http://atomicdesign.bradfrost.com/) and present our clients interactive style guides _early_ to facilitate better collaboration throughout. Real interaction with the design is necessary from the get-go; gone are the days of the static Photoshop file at the outset that "magically" translates to a living design at the end. So when we heard of the [Pattern Lab Starter Drupal theme](https://github.com/phase2/pattern-lab-starter) which leverages [Pattern Lab](http://patternlab.io/) (a tool for building pattern-driven user interfaces using atomic design), we were excited to bake the front-end components in to our Docker world. Oh, the beauty of open source!

## Building the Docker image

To experiment with the Pattern Lab Starter theme we began with a vanilla Drupal 8 installation, and then quickly spun up our local Docker development environment [using Docker4Drupal](http://docs.docker4drupal.org/en/latest/#usage). We then copied the [Pattern Lab Starter code](https://github.com/phase2/pattern-lab-starter) to a new `custom/theme/patter_lab_starter` directory in our Drupal project.

Running the Phase 2 Pattern Lab Starter theme requires [Node.js](https://nodejs.org/en/), the node package manager [npm](https://www.npmjs.com/), PHP, and the PHP dependency manager [Composer](https://getcomposer.org/). Node and npm are required for managing the theme's node dependencies (such as Gulp, Bower, etc.), while PHP and Composer are required by the theme to run and serve Pattern Lab.

While we could install these applications on the host machine, outside of the Docker image, that defeats the purpose of using Docker. One of the great advantages of virtualization, be it Docker or a full VM, is that you don't have to rely on installing global dependencies on your local machine. One of the many benefits of this is that it ensures each team member is developing in the same environment.

Unfortunately, while Docker4Drupal provides public images for many applications (such as Nginx, PHP, MariaDB, Mailhog, Redis, Apache Solr, and Varnish), it does not provide images for running the applications required by the Pattern Lab Starter theme.

One of the nice features of Docker though is that it is relatively easy to create a new image that builds upon other images. This is done via a `Dockerfile` which specifies the commands for creating the image.

To build an image with the applications required by our theme we created a `Dockerfile` with the following contents:

```bash
FROM node:7.1
MAINTAINER Dan Murphy <dan@savaslabs.com>

RUN apt-get update && \
    apt-get install -y php5-dev  && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \

    # Directory required by Yeoman to run.
    mkdir -p /root/.config/configstore \

    # Clean up.
    apt-get clean && \
    rm -rf \
      /root/.composer \
      /tmp/* \
      /usr/include/php \
      /usr/lib/php5/build \
      /var/lib/apt/lists/*

# Permissions required by Yeoman to run: https://github.com/keystonejs/keystone/issues/1566#issuecomment-217736880
RUN chmod g+rwx /root /root/.config /root/.config/configstore

EXPOSE 3001 3050
```

The commands in this `Dockerfile`:

- Set [the official Node 7 image](https://hub.docker.com/_/node/) as the base image. This base image includes Node and npm.
- Install PHP 5 and Composer.
- Make configuration changes necessary for running [Yeoman](http://yeoman.io/), a popular Node scaffolding system used to create new component folders in Pattern Lab.
- Expose ports 3001 and 3050 which are necessary for serving the Pattern Lab style guide.

From this `Dockerfile` we built the image `savaslabs/node-php-composer` and made it [publicly available on DockerHub](https://hub.docker.com/r/savaslabs/node-php-composer/). Please check it out and use it to your delight!

One piece of advice I have for building images for local development is that while Alpine Linux based images may be much smaller in size, the bare-bones nature and lack of common packages brings with it some trade-offs that make it more difficult to build upon. For that reason, we based our image on the standard `DebianJessie` Node image rather than the Alpine variant.

This is also why we didn't just simply start from [the `wodby/drupal-php:7.0`](https://hub.docker.com/r/wodby/drupal-php/~/dockerfile/) image and install Node and npm on it. Unfortunately, the `wodby/drupal-php` image is built from `alpine:edge` which lacks many of the dependencies required to install Node and npm.

Now a Docker purist might critique this image and recommend only "one process per container". This is a drawback of this approach, especially since Wodby already provides a PHP image with Composer installed. Ideally, we'd use that in conjunction with separate images that run Node and npm.

However, the theme's setup makes that difficult. Essentially PHP scripts and Composer commands are baked into the theme's npm scripts and gulp tasks, making it difficult to untangle them. For example, the `npm start` command runs Gulp tasks that depend on PHP to generate and serve the Pattern Lab style guide.

Due to these constraints, and since this image is for local development, isn't being used to deploy a production app, and encapsulates all of the applications required by the Pattern Lab Starter theme, we felt comfortable with this approach.

### Using the image

To use this image, we specified it in our project's `docker-compose.yml` file ([see full file here](https://gist.github.com/dmurphy1/ee62085eef2d40b279cc848f88213fc9)) by adding the following lines to the services section:

```yaml
node-php-composer:
 image: savaslabs/node-php-composer:1.2
 ports:
   - "3050:3050"
   - "3001:3001"
 volumes_from:
   - php
```

This defines the configuration that is applied to a `node-php-composer` container when spun up. This configuration:

- Specifies that the container should be created from the `savaslabs/node-php-composer` image that we built and referenced previously
- Maps the container ports to our host ports so that we can access the Pattern Labs style guide locally
- Mounts the project files (that are mounted to the php container) so that they are accessible to the container.

With this service defined in the `docker-compose.yml` we can start using the theme!

First we spin up the Docker containers by running `docker-compose up -d`.

Once the containers are running, we can open a Bash shell in the theme directory of the `node-php-composer` container by running the command:

```bash
docker-compose run --rm --service-ports -w /var/www/html/web/themes/custom/pattern_lab_starter node-php-composer /bin/bash
```

We use the `--service-ports` option [to ensure the ports used for serving the style guide are mapped to the host](https://github.com/docker/compose/issues/1259#issuecomment-90878095).

Once inside the container in the theme directory, we install the theme's dependencies and serve the style guide by running the following commands:

```bash
npm install --unsafe-perm
npm start
```

Voila! Once `npm start` is running we can access the Pattern Lab style guide at the URL's that are outputted, for example `http://localhost:3050/pattern-lab/public/`.

Note: Docker runs containers as root, so we use the `--unsafe-perm` flag to run `npm install` with root privileges. This is okay for local development, but would be a security risk if deploying the container to production. For information on running the container as an unprivileged user, [see this documentation](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user).

Gulp and Bower are installed as theme dependencies during `npm install`, therefore we don't need either installed globally in the container. However, to run these commands we must shell into the theme directory in the container (just as we did before), and then run Gulp and Bower commands as follows:

- To install Bower libraries run `$(npm bin)/bower install --allow-root {project-name} --save`
- To run arbitrary Gulp commands run `$(npm bin)/gulp {command}`

Other commands listed in the [Pattern Lab Starter theme README](https://github.com/phase2/pattern-lab-starter/blob/master/README.md) can be run in similar ways from within the `node-php-composer` container.

## Conclusion

Using Docker for local development has many benefits, one of which is that developers can run applications required by their project inside containers rather than having to install them globally on their local machines. While we typically think of this in terms of the web stack, it also extends to running applications required for front-end development. The Docker image described in this post allows several commonly used front-end applications to run within a container like the rest of the web stack.

While this blog post demonstrates how to build and use a Docker image specifically for use with the Pattern Lab Starter theme, the methodology can be adapted for other uses. A similar approach could be used with [Zivtech's Bear Skin theme](https://www.drupal.org/project/bear_skin), which is another Pattern Lab based theme, or with other contributed or custom themes that rely on npm, Gulp, Bower, or Composer.

If you have any questions or comments, please post them below!
