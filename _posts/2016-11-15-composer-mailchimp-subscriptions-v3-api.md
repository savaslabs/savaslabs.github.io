---
layout: post
title: "Using MailChimp API v3.0 to subscribe users to email lists in Drupal custom modules"
date: 2016-11-15
author: Dan Murphy
tags: drupal drupal-planet composer module-development mailchimp
summary: How to use Composer along with the ThinkShout PHP library for MailChimp API v3.0 to easily subscribe users to mailing lists without the MailChimp contributed module.
featured_image: "/blog/mailchimp_3_drupal_composer_3.jpg"
featured_image_alt: "sheet music"
featured_image_height: "983px"
featured_image_width: "1474px"
drupal_planet_summary: |
  A tutorial that shows you how to use Composer and ThinkShout's new PHP library for MailChimp API v3.0 to easily subscribe users to mailing lists in Drupal custom modules without using the MailChimp contributed module. This is a follow-up to a previous post that used the old API, and also includes some new Drupal 8 specifics.
---

Our clients are often looking to reach their audiences via email campaigns, and [MailChimp](https://mailchimp.com/) is one of the solutions we frequently recommend for this. MailChimp makes it easy to create and manage email campaigns while also providing beneficial analytics on user behavior.

Earlier this year I wrote [a blog post](/2016/01/22/composer-mailchimp-subscriptions.html) showing how to use [Composer Manager](https://www.drupal.org/project/composer_manager) along with the Mailchimp API v2.0 PHP package to subscribe users to mailing lists in a Drupal 6 or 7 custom module without the need for the Mailchimp contributed module.

However, since then, MailChimp API v3.0 was released and Mailchimp announced that v2.0 (and all prior versions) will no longer be supported after 2016.

So in this blog post, I'll demonstrate how to accomplish the same objective using the new MailChimp API v3.0, and I'll expand the tutorial to also include some Drupal 8 specifics.

## Background

To quickly summarize the key takeaways from my previous blog posts [on Composer Manager](/2015/10/15/composing-with-composer-manager.html) and [subscribing users to MailChimp lists using the old API](/2016/01/22/composer-mailchimp-subscriptions.html):

- Composer is a tool for managing PHP libraries that your project depends on.
- Challenges arise managing project-wide dependencies when custom and contributed modules specify their own unique dependencies.
- [Composer Manager](https://www.drupal.org/project/composer_manager) is a contributed module for Drupal 7 (and formerly Drupal 6) that addresses these challenges and allows contributed and custom modules to depend on PHP libraries managed via Composer.
- Using a Composer managed PHP package for the MailChimp API, we can easily subscribe users to MailChimp lists in a Drupal custom module without relying on the Mailchimp module.
- While the [Mailchimp contributed module](https://www.drupal.org/project/mailchimp) is great, sometimes all you need is a simple, lightweight method for subscribing users to mailing lists.

One important development since my previous posts is that Composer Manager has been deprecated for Drupal 8. [Improvements introduced in Drupal 8.1.0](https://www.drupal.org/project/drupal/releases/8.1.0) allow modules to rely on Composer managed dependencies without the need for the Composer Manager module.

## Implementation

There are a few steps we must take so that we can subscribe users to mailing lists in our custom module. We'll review each of these steps in detail:

- Add the MailChimp API v3.0 PHP library as a dependency of our custom module.
- Ensure that the library is installed for our project.
- Properly use the library in our custom module to subscribe users to mailing lists.

### Specify the dependency

ThinkShout maintains the [Mailchimp contributed module](https://www.drupal.org/project/mailchimp) and we were very excited to see that as part of the effort to ["get Drupal off the island"](http://www.garfieldtech.com/blog/off-the-island-2013) they also released [a PHP library for MailChimp API v3.0](https://packagist.org/packages/thinkshout/mailchimp-api-php).

To use this new library, we must specify it as a dependency of our custom module. We do that in a `composer.json` file that sits in our custom module's root directory and requires that library via the following code:

```json
{
  "require": {
    "thinkshout/mailchimp-api-php": ">=1.0.3"
  }
}
```

### Install the library

Composer is intended for projects and therefore requires a Drupal site to have a single `composer.json`, so things get complicated when individual modules specify their own dependencies.

For Drupal 7 sites (or still active Drupal 6 sites), the [Composer Manager](https://www.drupal.org/project/composer_manager) contributed module handles this by merging the requirements specified by each custom and contributed module's `composer.json` files into a single, consolidated, site-wide `composer.json` file.

So for Drupal 6/7 projects we'll need Composer Manager installed and enabled.

Once enabled, we can generate the consolidated `composer.json` and then install all of the site's dependencies that file specifies (including the MailChimp API v3.0 PHP library specified by our custom module) in one of two ways:

From the command line, we can run the following drush commands:

```bash
$ drush composer-json-rebuild
$ drush composer-manager install
```

Alternatively, we could include the following lines in an update hook:

```bash
// Re-build Composer Manager composer.json and run composer update.
drush_composer_manager_composer_json_rebuild();
drush_composer_manager('update');
```

For Drupal 8 sites, the process is slightly different. As mentioned previously, as of release 8.1.0, Drupal core directly uses Composer to manage dependencies and the Composer Manager module is no longer necessary. For Drupal 8 sites, we should follow the [Drupal.org instructions for managing dependencies for a custom project](https://www.drupal.org/node/2822349). Following those instructions ensures that all of the site's dependencies, including the MailChimp library specified by our custom module, are installed.

### Use the library

Once we have the MailChimp API v3.0 PHP library installed, we can use it in our custom module to subscribe users to mailing lists.

We suggest creating a dedicated function for subscribing users to email lists which can then be called throughout the custom module. For our purposes, we modeled that function off of the Mailchimp module (version 7.x-4.6) `mailchimp_subscribe_process()` function.

We implemented the following function, which can be reviewed and modified for your specific purposes:

```php
<?php
/**
 * Add an email to a MailChimp list.
 *
 * This code is based on the 7.x-4.6 version of the Mailchimp module,
 * specifically the mailchimp_subscribe_process() function. That version of
 * the Mailchimp contrib module makes use of the ThinkShout PHP library for
 * version 3.0 of the MailChimp API. See the following for more detail:
 * https://www.drupal.org/project/mailchimp
 * https://github.com/thinkshout/mailchimp-api-php.
 *
 * @see Mailchimp_Lists::subscribe()
 *
 * @param string $api_key
 *   The MailChimp API key.
 * @param string $list_id
 *   The MailChimp list id that the user should be subscribed to.
 * @param string $email
 *   The email address for the user being subscribed to the mailing list.
 */
function mymodule_subscribe_user($api_key, $list_id, $email) {

  try {
    // Set the timeout to something that won't take down the Drupal site:
    $timeout = 60;
    // Get an instance of the MailchimpLists class.
    $mailchimp = new \Mailchimp\MailchimpLists($api_key, 'apikey', $timeout);

    // Use MEMBER_STATUS_PENDING to require double opt-in for the subscriber. Otherwise, use MEMBER_STATUS_SUBSCRIBED.
    $parameters = array(
      'status' => \Mailchimp\MailchimpLists::MEMBER_STATUS_PENDING,
      'email_type' => 'html',
    );

    // Subscribe user to the list.
    $result = $mailchimp->addOrUpdateMember($list_id, $email, $parameters);

    if (isset($result->id)) {
      watchdog('mymodule', '@email was subscribed to list @list.',
        array('@email' => $email, '@list' => $list_id), WATCHDOG_NOTICE
      );
    }
    else {
      watchdog('mymodule', 'A problem occurred subscribing @email to list @list.', array(
        '@email' => $email,
        '@list' => $list_id,
      ), WATCHDOG_WARNING);
    }
  }
  catch (Exception $e) {
    // The user was not subscribed so log to watchdog.
    watchdog('mymodule', 'An error occurred subscribing @email to list @list. Status code @code. "%message"', array(
      '@email' => $email,
      '@list' => $list_id,
      '%message' => $e->getMessage(),
      '@code' => $e->getCode(),
    ), WATCHDOG_ERROR);
  }
}
```

With that function defined, we can then subscribe an email address to a specific Mailchimp mailing list through the following function call in our custom module:

```php
mymodule_subscribe_user($api_key, $list_id, $email);
```

## Conclusion

By taking advantage of the modern PHP ecosystem built on reusable Composer managed packages, we can easily build or adapt a custom module to subscribe users to mailing lists without the MailChimp contributed module.

Lastly, a special thanks to [ThinkShout](https://thinkshout.com/) for their hard work maintaining the MailChimp module and creating the library, on which this approach depends!
