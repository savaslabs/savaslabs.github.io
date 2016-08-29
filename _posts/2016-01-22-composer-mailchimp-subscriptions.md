---
layout: post
title: "How to subscribe users to MailChimp lists in a Drupal custom module"
date: 2016-01-22
author: Dan Murphy
tags: drupal drupal-planet composer module-development mailchimp
summary: Using Composer Manager and the MailChimp PHP library we can simply and easily subscribe users to mailing lists without using the MailChimp contributed module.
featured_image: "/assets/img/blog/composer.jpg"
featured_image_alt: "composer"
drupal_planet_summary: |
  A demonstration on how to use Composer Manager and the MailChimp PHP library to simply and easily subscribe users to mailing lists without using the MailChimp contributed module.
---

## Overview
In my [last blog post](/2015/10/15/composing-with-composer-manager.html), I wrote about the virtues of [Composer Manager](https://www.drupal.org/project/composer_manager) and how it allows modules to depend on PHP libraries managed via Composer. Basically, Composer Manager allows us to easily use PHP libraries that exist outside of the Drupal ecosystem within our own projects.

In this post, I'll show you how we:

- Used the [MailChimp PHP Library](https://packagist.org/packages/mailchimp/mailchimp) in a custom module to quickly and easily subscribe users to a MailChimp mailing list without the overhead of the [Drupal MailChimp contributed module](https://www.drupal.org/project/mailchimp).
- Managed the MailChimp library dependency via Composer Manager.

## Custom vs. Contrib?
But first, why didn't we just use the MailChimp contributed module? Contributed modules are often a great option and offer many benefits, such as security, maintenance, and flexibility.

But there is a cost to installing all those contributed modules. As [*The Definitive Guide to Drupal 7*](http://definitivedrupal.org/) explains "The more modules you install, the worse your web site will perform."

With each installed module comes more code to load and execute, and more memory consumption. And in some cases, contributed modules add complexity and features that just aren't necessary for the required task.

In our case, the decision to go with a custom solution was easy:

- The MailChimp contributed module had many features we didn't need.
- We were already using Composer Manager on the project to manage other module dependencies.
- The custom module we were building already included logic to determine when to subscribe users to mailing lists (don't worry, we made sure they opted in!)

All we needed was a simple, lightweight method for subscribing a given user to a specific MailChimp mailing list.

## Implementation
We were able to achieve this by adding the [MailChimp PHP library](https://packagist.org/packages/mailchimp/mailchimp) as a dependency of our custom module. We were then able to make a simple call using the API to subscribe a user to the mailing list. We implemented this via the following code.

First, in our module's root directory we created a `composer.json` file that specified the MailChimp PHP library as a dependency:

```json
{
  "require": {
    "mailchimp/mailchimp": "*"
  }
}
```

We then installed the Mailchimp API using the Composer Manager drush commands:

```bash
$ drush composer-json-rebuild
$ drush composer-manager install
```

As explained in my [last post](/2015/10/15/composing-with-composer-manager.html), the first command builds  (or rebuilds) the consolidated project wide `composer.json` file and the second command installs the dependencies.

Next, we created a function in our custom module to subscribe a user to a MailChimp mailing list.

```php
<?php
/**
 * Add an email to a MailChimp list.
 *
 * @param string $api_key
 *   The MailChimp API key.
 * @param string $list_id
 *   The MailChimp list id that the user should be subscribed to.
 * @param string $email
 *   The email address for the user being subscribed to the mailing list.
 */
function my_module_subscribe_user($api_key, $list_id, $email) {

  $mailchimp = new Mailchimp($api_key);

  try {
    $result = $mailchimp->lists->subscribe($list_id, array('email' => $email));
  }
  catch(Exception $e) {
    watchdog('my_module', 'User with email %email not subscribed to list %list_id', array('%email' => $email, '%list_id' => $list_id), WATCHDOG_WARNING);
  }
}
```

With that function defined, we could then subscribe any user to any mailing list by simply calling

```php
<?php
my_module_subscribe_user($api_key, $list_id, $email);
```

## Conclusion
That's it! A nice, simple, and clean approach to subscribing users to a MailChimp mailing list that doesn't require installation of the MailChimp contributed module.

We hope you're as excited as we are at the opportunities Composer and Composer Manager afford us to take advantage of PHP libraries and projects that exist outside of the Drupal ecosystem.
