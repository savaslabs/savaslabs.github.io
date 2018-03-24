---
layout: post
title: "Updating Drupal 8 core via Composer"
date: 2018-03-25
author: Anne Tomasevich
tags: drupal drupal8 drupal-planet composer
summary: Some quick tips for completing this surprisingly tricky task.
featured_image: "/blog/composer-drupal-8.jpg"
featured_image_alt: "Composer and Drupal 8 working together"
drupal_planet_summary: |
  Updating Drupal 8 core with Composer has proven to be a problematic process
  for many developers and has caused some to abandon the platform entirely,
  opting to stick with Drupal 7. Having updating our own Drupal 8 sites many
  times now, we've compiled some notes on how to use Composer to update core
  and what to do when issues arise.
---

Updating Drupal 8 core with Composer has proven to be a problematic process for many developers. For some, this is nearly as upsetting as the fact that [the Composer logo is actually a conductor](https://github.com/composer/getcomposer.org/issues/36), and some have abandoned the platform entirely, opting to stick with Drupal 7.

The process isn't always as simple as running `composer update drupal/core` and going about your day—the update from 8.3 to 8.4 was notoriously difficult and I recently experienced an issue while updating from 8.4.5 to 8.5.0. In this article I've provided instructions for updating D8 core with Composer, plus some tips for dealing with common issues.

This is especially important now as we await a [highly critical security update to all versions of Drupal](https://www.drupal.org/psa-2018-001), to be released on Wednesday, March 28, 2018. This level of security update is quite rare, but the update needs to be implemented on all sites as soon as possible after its release.

As the PSA linked to above notes, the Drupal Security Team will be providing security releases for unsupported minor versions 8.3.x and 8.4.x due to the issues many have encountered when updating from these versions. If you're still on one of those versions, the update may be more straightforward if you stick with the release for that minor version.

## General instructions for updating core

First, let's cover the steps needed to update Drupal 8 core with Composer.

1. To update the core package, run:

    ```
    composer update drupal/core --with-dependencies -v
    ```

    It's recommended to run the update command with the `--with-dependencies` flag to update any of Drupal core's dependencies as well.

2. To capture any included database updates, run `drush updb -y`.
3. To capture any included configuration changes, run `drush config-export -y` and commit the changes.

All three of these steps are necessary whenever the core package is updated.

## Dealing with errors

### Core version doesn't update

If you run the `composer update` command but core isn't updating, edit your `composer.json` file to include the specific version of core you want, e.g. `^8.5`. Then, run the `composer update` command again.

### Composer command outputs errors

Composer may not be able to resolve all of the dependencies of core and will output an error like this:

```bash
Your requirements could not be resolved to an installable set of packages.

  Problem 1
    - Conclusion: don't install drupal/core 8.5.0
    - Conclusion: don't install drupal/core 8.5.0-rc1
    - Conclusion: don't install drupal/core 8.5.0-beta1
    - Conclusion: don't install drupal/core 8.5.0-alpha1
    - Conclusion: don't install drupal/core 8.6.x-dev
    - Conclusion: remove symfony/config v3.2.9
    - Installation request for drupal/core ^8.5 -> satisfiable by drupal/core[8.5.0, 8.5.0-alpha1, 8.5.0-beta1, 8.5.0-rc1, 8.5.x-dev, 8.6.x-dev].
    - Conclusion: don't install symfony/config v3.2.9
    - drupal/core 8.5.x-dev requires symfony/dependency-injection ~3.4.0 -> satisfiable by symfony/dependency-injection[3.4.x-dev, v3.4.0, v3.4.0-BETA1, v3.4.0-BETA2, v3.4.0-BETA3, v3.4.0-BETA4, v3.4.0-RC1, v3.4.0-RC2, v3.4.1, v3.4.2, v3.4.3, v3.4.4, v3.4.5, v3.4.6].
    - symfony/dependency-injection 3.4.x-dev conflicts with symfony/config[v3.2.9].
    - symfony/dependency-injection v3.4.0 conflicts with symfony/config[v3.2.9].
    - symfony/dependency-injection v3.4.0-BETA1 conflicts with symfony/config[v3.2.9].
    - symfony/dependency-injection v3.4.0-BETA2 conflicts with symfony/config[v3.2.9].
    - symfony/dependency-injection v3.4.0-BETA3 conflicts with symfony/config[v3.2.9].
    - symfony/dependency-injection v3.4.0-BETA4 conflicts with symfony/config[v3.2.9].
    - symfony/dependency-injection v3.4.0-RC1 conflicts with symfony/config[v3.2.9].
    - symfony/dependency-injection v3.4.0-RC2 conflicts with symfony/config[v3.2.9].
    - symfony/dependency-injection v3.4.1 conflicts with symfony/config[v3.2.9].
    - symfony/dependency-injection v3.4.2 conflicts with symfony/config[v3.2.9].
    - symfony/dependency-injection v3.4.3 conflicts with symfony/config[v3.2.9].
    - symfony/dependency-injection v3.4.4 conflicts with symfony/config[v3.2.9].
    - symfony/dependency-injection v3.4.5 conflicts with symfony/config[v3.2.9].
    - symfony/dependency-injection v3.4.6 conflicts with symfony/config[v3.2.9].
    - Installation request for symfony/config (locked at v3.2.9) -> satisfiable by symfony/config[v3.2.9].
```

This happens when one of Drupal's dependencies is updated and the new version requires an updated version of another package. To resolve this, include the dependency package causing the issue in the `composer update` command. The `--with-dependencies` flag this will ensure that the dependency's *dependencies* are also updated. To fix the error above, I ran:

```bash
composer update drupal/core symfony/config --with-dependencies -v
```

## You're not alone

If you continue to run into problems, the best advice I can give you is to search for the specific update you're trying to make. Every time I've had an issue I've been able to find discussions online regarding that specific update and potential resolutions.

In fact, when I got the error above while trying to update to 8.5.0, I found [this helpful article](https://orkjern.com/updating-to-drupal-85-with-composer) by drupal.org user [eiriksm](https://www.drupal.org/u/eiriksm) and was able to resolve the issue. Check out the article and its comments for more discussion on how to deal with Composer issues when updating Drupal 8 core.
