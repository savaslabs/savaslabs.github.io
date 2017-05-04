---
layout: post
title: "When Drupal database sanitization isn't enough"
date: 2015-08-04
author: Chris Russo
tags: drupal drupal8 drupal-planet best-practices
services: development
summary: |
  The user revision module does not (_yet_) care about `drush sqlsan`,
  and it should!
drupal_planet_summary: |
  One of the most embarrassing and potentially costly things we can do as developers is to send emails out to real people unintentionally from a development environment. It happens, and often times we aren't even aware of it until the damage is done and a background process sends out, say, 11,000 automated emails to existing customers (actually happened to a former employer recently). In the Drupal world, there are [myriad ways](https://github.com/chrisarusso/Tilthy-Rich-Compost-Website/commit/64a558e2) to [attempt to address](https://github.com/chrisarusso/Tilthy-Rich-Compost-Website/blob/master/scripts/sanitize.php) this problem.

  We discuss how to use a drush hook on the `drush sqlsan` command to ensure proper sanitization while using the `user revision` module.
disclaimer: |
    After enough whining, my patch (discussed later in the post) [did make it in](https://www.drupal.org/commitlog/commit/17646/c4c24e4cd9e5c267d4bff6af5c11e3d514f788f1) to the `user_revision` module. Thanks Peter.
---

## The general problem
One of the most embarrassing and potentially costly things we can do as developers is to send emails out to real people unintentionally from a development environment. It happens, and often times we aren't even aware of it until the damage is done and a background process sends out, say, 11,000 automated emails to existing customers (actually happened to a former employer recently). In the Drupal world, there are [myriad ways](https://github.com/chrisarusso/Tilthy-Rich-Compost-Website/commit/64a558e2) to [attempt to address](https://github.com/chrisarusso/Tilthy-Rich-Compost-Website/blob/master/scripts/sanitize.php) this problem.

## General solutions to the general problem
- [maillog](https://www.drupal.org/project/maillog) - A Drupal module that
logs mails to the database and optionally allows you to "not send" them
- [reroute email](https://www.drupal.org/project/reroute_email) - A Drupal
module that intercepts email and routes it to a configurable address
- [devel mail](https://api.drupal.org/api/devel/devel.mail.inc/7) - An
option of the beloved devel module which writes emails to local files instead
of sending
- [mailcatcher](http://mailcatcher.me/) (not Drupal-specific) - Configure your
local mail server to not send mail through PHP

## The _ultimate_ solution to _the problem_?
**Never store real email addresses in your development environment**. In the
Drupal world, we do that by using the `drush sql-sanitize`
[command](http://drushcommands.com/drush-6x/sql/sql-sanitize). With no arguments,
how I typically execute it, the command will set all users emails addresses to
a phony address that looks like this: `user+1@localhost.localdomain`. This is a
good thing. Then, even in cases in which you do accidentally send out emails
in an automated way, often from [cron](https://www.drupal.org/cron), sending to phony addresses
is a livable mistake; no end-user receives an email that confuses
her or makes her lose confidence in your organization.

So, in _most_ cases, `drush sqlsan` (alias) is enough, and the mail redirection
options linked above are additional safety measures. Of course, I'm not
writing about _most_ scenarios now am I? Sadly, I'm not yet aware of a
comprehensive solution that ensures no email will be sent from a development
environment. Please [comment](#js-expander-trigger) if you know of one!

## The _specific_ problem with `user_revision` module
One pernicious case, in which `drush sqlsan` is insufficient in sanitizing your
database, is when  the
[`user_revision` module](https://www.drupal.org/project/user_revision)
is enabled on a Drupal 7 site, at least without
[my patch](https://www.drupal.org/node/2534638)
applied. The `user_revision` module
[extends the `UserController`](http://cgit.drupalcode.org/user_revision/tree/user_revision.module?id=cce42174aec453e6652da8738e397df20b6f2cd0#n164)
class, which overwrites fields from the "base" table `users` (in the case) to
the "revision" table, `user_revision`, due to
[the way that `entity_load()` works](http://cgit.drupalcode.org/drupal/tree/includes/entity.inc?h=7.x#n306)
. Therefore, when a user entity is loaded, it receives the `mail` field
from the `user_revision` table. Without the above patch applied,
this table is not affected by `drush sqlsan`.

## How did I discover this?
I discovered this when adding new cron, notification functionality to the
[Tilthy Rich Compost](http://tilthyrichcompost.com) website, which we maintain.
We [began using](https://github.com/chrisarusso/Tilthy-Rich-Compost-Website/commit/fccc3f7387616510d512d3700639c5de3a560a1e) the `user_revision`
module in 2013 due to [losing information we still needed](https://github.com/chrisarusso/Tilthy-Rich-Compost-Website/issues/29
) from canceling users. After sending emails to subscribers from my development
environment for the 10th time in 2 years, even after sanitizing, I was determined
to figure out once and for all, what was going on. So like any deep-dive, I
fired up the trusty ol' debugger and discovered the aforementioned culprit.

## The solution to the _specific_ problem
After consulting [Kosta](/team/kosta-harlan/), we agreed
that the solution would be to write a [drush hook](https://www.drupal.org/node/2534638)
for the `user_revision` module. This code would need to sanitize the `mail`
field in the `user_revision` table and would be invoked when the `drush sqlsan`
command is executed in the presence of the `user_revision` module.  However,
to write this code efficiently and effectively, I would need to debug drush commands
during execution, which I had never done.

## How to debug drush (or other CLI scripts) with PHPStorm

### Set up xdebug (Mac only)
I first installed xdebug with [homebrew](http://brew.sh/) via
[this method](http://antistatique.net/en/we/blog/2013/09/17/debugging-with-xdebug-and-phpstorm-on-macos-x).
NB: Changing the port change to `10000` was necessary for me.

### Upgrade to latest drush
I [ensured I was using the most recent version of drush](http://whaaat.com/installing-drush-8-using-composer)
(I strongly recommend perusing Brant's [about page](http://whaaat.com/about))
to ensure that the code I wrote would apply to most recent drush development.

### Getting breakpoints in PHPStorm to listen to drush
Several have blogged about this before, so I'll just point theirs out. Generally,
I followed
[these instructions](https://web.archive.org/web/20150405094739/https://www.deeson.co.uk/labs/debugging-drupal-drush-real-time-phpstorm-and-xdebug),
but I trust that my mentor and friend
Randy Fay['s article](http://randyfay.com/content/remote-command-line-debugging-phpstorm-phpdrupal-including-drush)
is excellent as well. They all seemed to use
[xdebug](http://xdebug.org/) and [PHPStorm](https://www.jetbrains.com/phpstorm/),
and though I use PHPStorm, I have been using ZendDebugger for years, with
reasonable success. But I _had_ been dissatisfied of late, and the rest of the
[team](/team) uses xdebug anyway, so I figured it would be a safe switch,
which proved true. After having xdebug properly installed, you can
[add a line](https://github.com/kostajh/dotfiles/blob/master/.bashrc#L85)
to your `.bashrc` file to always make PHPStorm ready to listen for drush
commands.

## The solution in action
So [now when running `drush sqlsan`](https://github.com/chrisarusso/Tilthy-Rich-Compost-Website/commit/cf8f04f65b9f782ebaaf84d4348043f5aeec8409),
we can truly feel safe that we won't send emails to anyone we didn't mean to.
You're welcome community :wink:

## Will `user_revision` exist in D8?
It's not clear, though [some](https://www.drupal.org/sandbox/devpreview/2444961)
think [so](https://www.drupal.org/node/2336681).
Perhaps mature D8 entities and revisioning on all entities will render a contrib
module unnecessary. Time will tell.
