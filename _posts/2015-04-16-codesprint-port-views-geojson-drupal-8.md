---
layout: event
title: "Code sprint: Help port Views GeoJSON to Drupal 8"
date: 2015-04-16
author: Kosta Harlan
start-date: April 24, 2015
start-time: 1:00 PM
end-date: April 24, 2015
end-time: 5:00 PM
duration: 4
location: American Underground @ Main
location-url: http://americanunderground.com/
street-address: 201 W Main St.
city-state: Durham, North Carolina
postal-code: 27701
tags: cartography drupal event
comments_enabled: 0
summary: |
  Join us on the afternoon of April 24 to help port the Views GeoJSON module to Drupal 8.
drupal_planet_summary: |
  Triangle-area Drupalers and cartography enthusiasts: please join us from 1:00 PM to 5:00 PM on April 24 at the American Underground @ Main. Our team will be working on porting Views GeoJSON to Drupal 8.
---
Triangle-area Drupalers and cartography enthusiasts: please join us from 1:00 PM to 5:00 PM on April 24 at the [American Underground @ Main](http://americanunderground.com/). Our team will be working on porting [Views GeoJSON](https://www.drupal.org/project/views_geojson) to Drupal 8.

We'll be updating this post shortly with some additional information on how to prepare for the code sprint — tips for setting up a Drupal 8 development environment, what tasks we'll be tackling during the code sprint, and how you can participate remotely if you can't come here in person.

If you're interested to join us, please RSVP to [info@savaslabs.com](mailto:info@savaslabs.com).

## Update: Preparing for the codesprint

As promised above, here are some notes on how to prepare for participating in the code sprint tomorrow. Please do these things before arriving at the sprint so we can get started right at 1 PM.

### Set up a local Drupal 8 site

Spend some time getting your [local Drupal 8 environment set up](/2015/04/23/drupal-8-docker-bowline-setup.html). Make sure you can login, that XDebug is working, etc. At the time of this writing, the latest beta is [`8.0.0-beta9`](https://www.drupal.org/node/2459341), we recommend using that instead of the latest commit to the `8.0.x` branch.

### Clone the Views GeoJSON repo from GitHub, and review the issues

I've mirrored the Views GeoJSON repo from Drupal.org over on GitHub. You can clone the repo at [https://github.com/savaslabs/views_geojson](https://github.com/savaslabs/views_geojson).

I recommend cloning the repo into your `/modules` directory, as symlinking it led to some problems. So, if your local D8 site is at `~/src/d8local`, then you would `cd ~/src/d8local/modules; git clone https://github.com/savaslabs/views_geojson.git`

After cloning the repo, double check that you can enable it on your local Drupal 8 site. It won't do anything (yet!) but you should be able to enable it.

Make sure you also fork the repo on GitHub so that you can submit pull requests to it. We'll be using pull requests to review code before merging it in. At the end of the day, we'll create a single patch against the `7.x-1.x` branch that we'll submit to the Views GeoJSON issue queue on Drupal.org.

I've also created [issues in the GitHub repo](https://github.com/savaslabs/views_geojson/issues) that we can divvy up tomorrow.
