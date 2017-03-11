---
layout: post
title: Four Useful Additions to Any Developers Toolbox in Q1 2017
date: 2017-03-20
author: Ro Wang
tags: tips efficiency docker
featured_image: "/blog/content-authoring-d8.jpg"
featured_image_alt: "Q1 2017 Tips"
featured_image_height: "917px"
featured_image_width: "1474px"
summary: What we've added to our developer toolboxes in Q1 2017!
---

_This post is part of a new series called "Quarterly Tips and Tricks."_

The Web Development world evolves quickly, and keeping abreast of new tools and methodologies while simultaneously delivering client work is tough.

One of our core [philosophies](http://savaslabs.com/mission-and-values/#excel) at Savas Labs is to "_hold ourselves to a high and constantly improving standard_." To that end, we dedicate time each month to share new tips and tools with each other to continue increasing our collective knowledge base -- we call these our :zap: "Lightning Skillshares!" :zap:

Since we believe in the open source ethos and sharing with the Dev community, in this series, we'll highlight some tips we use to improve our day-to-day efficiency (and hopefully yours too!).

What we've added to our toolboxes in Q1 2017:

[1. Using Teleconsole for collaboration](#using-teleconsole-for-collaboration)

[2. Accessing a Dockerized database via PhpStorm or PhpMyAdmin](#accessing-a-dockerized-database-via-phpmyadmin-or-phpstorm)

[3. Using Apowersoft's Free Screen Recorder to capture your screen](#using-apowersofts-free-screen-recorder-to-capture-your-screen)

## 1. Using Teleconsole for collaboration

[Teleconsole](https://www.teleconsole.com/) let's you share your UNIX terminal session for easy collaboration! We've been using it for a couple months now and find it to be an excellent addition to our team toolbox.

It works by starting a SSH server on the host computer and generating a unique session ID that others can connect to via their terminal or a web browser. You can have multiple connected individuals in a session, though we typically use it more for 1-1 debugging and troubleshooting.

Be aware, collaborators will have _direct_ access to your terminal, so only share with people you trust and be careful about accidental commands. Other than that, it's free and easy to set up -- check it out [here](https://www.teleconsole.com/).

<script type="text/javascript" src="https://asciinema.org/a/7oargr7f911dm8qz4c5m0k2iw.js" id="asciicast-7oargr7f911dm8qz4c5m0k2iw" async></script>
<span class="caption">Terminal sharing 2,700 miles away!</span>

## 2. Accessing a Dockerized database via PhpMyAdmin or PhpStorm

There are many useful tools available for interacting with a MySQL database. Since we've transitioned to Docker for our local development, we've discovered 2 techniques for integrating database tools to work with your local Docker stack.

### Adding PhpMyAdmin to a Docker Stack

[PhpMyAdmin](https://www.phpmyadmin.net/) is a great tool that provides a useful interface for visualizing and interacting with a MySQL database. [Docker4drupal](https://github.com/wodby/docker4drupal) has created an easy [template](https://github.com/wodby/docker4drupal/blob/master/docker-compose.yml) for adding the PhpMyAdmin service to a project's Docker Stack.

To build a container to run the PhpMyAdmin service:

1. Simply add this snippet from docker4drupal to your `docker-compose.yml` file
  - It uses the official `phpmyadmin` image and defines the host as the database container (`mariadb` in this example), so be sure to add it _after_ the section defining your database container.

<img src="/assets/img/blog/dev-tools-07q1-phpmyadmin.png" class="blog-image-large" alt="phpmyadmin container">
<span class="caption">Add to `docker-compose.yml`</span>

2. Set the correct database user and password (`PMA_USER` and `PMA_PASSWORD`).

Once the containers are up you can visit the port specific url (for instance `<example.site>:8001`) to access your project-specific PhpMyAdmin interface! :tada:

### Using PhpStorm's to view a Dockerized Database
Another method is to connect PhpStorm directly to the database container using PhpStorm's Database Browser. Instead of SSHing into the container via the command line, this allows us to view DB tables and run SQL queries directly within the PhpStorm interface!

To connect PhpStorm to you DB container:

1. In PhpStorm, go to the "Database Browser", click the `+` dropdown and select "Data Source > MySQL"
<img src="/assets/img/blog/dev-tools-07q1-pstorm1.png" class="blog-image-large" alt="phpstorm connect1">
2. In the popup window:
  - Map the project DB container's port specified in the `docker-compose.yml` file to `Port` (in the below example it's `32770`)
  - Add the `Database`, `User`, and `Password` fields from the `docker-compose.yml` file as well
  - You can select `Test Conneciton` or just `OK`
<img src="/assets/img/blog/dev-tools-07q1-pstorm2.png" class="blog-image-xl" alt="phpstorm connect2">

Once connected, PhpStorm will display all the tables in a drop down in the Database Browser, which is useful for quickly glancing through all the tables! You'll also be able to run SQL queries within PhpStorm and see outputted results without having to leave the interface! :star2:

<img src="/assets/img/blog/dev-tools-07q1-pstorm3.png" class="blog-image-xl" alt="phpstorm connect3">

## 3. Using Apowersoft's Free Screen Recorder to capture your screen

If a picture's worth a thousand words, than a video is worth...a million? There are times when it's useful to send a short video (for example, a quick tutorial to a client) and Apowersoft's [Free Screen Recorder](https://www.apowersoft.com/free-online-screen-recorder) is an easy tool for recording short screen captures. The free version has a 3 minute maximum limit, but that's generally adequate for our purposes. Other things we like are the ability to customize the cursors appearance and limit the capture to a specific region of your screen.

## Wrap Up
We hope you find this quarter's top picks helpful! Leave a comment if you have additions to share with us!