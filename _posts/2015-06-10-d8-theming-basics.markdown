---
layout: post
title: "Drupal 8 Theming Basics"
date: 2015-06-10
author: Anne Tomasevich
tags: drupal8 drupal-planet theming drupal
summary: Theming in Drupal 8 means a lot of changes for current Drupalers and a lot of awesome stuff for everyone. I'll cover what's new and how to create a custom theme in Drupal 8.
drupal_planet_summary: |
  Theming in Drupal 8 means a lot of changes for current Drupalers. These updates make Drupal more accessible to non-Drupalers and more modular, semantic, modern, and fun for everyone. Right now, documentation is scarce and often out-of-date, so I've collected all that I've learned while building my first Drupal 8 site.

  Since most contributed base themes don't have an 8.x branch in a useable state at this point, Savas Labs created a custom theme based on Classy, Drupal's new base theme. I'll step through the process of creating a custom theme and walk through the basics of Twig and Twig debugging.

---

Theming in Drupal 8 means a lot of changes for current Drupalers and a lot of awesome stuff for everyone. In this post I'll cover:

- What's changing
- The positives and negatives of these changes
- How to create a custom theme in D8
- Twig basics
- Twig debugging

## What's new?

Too much to list here, but here are some highlights:

- [Twig](http://twig.sensiolabs.org/documentation), a template engine by SensioLabs, is used inside template files in lieu of PHP
- Responsive design elements are included by default
- Breakpoints can be set and used across modules and themes
- Support for IE8 and below is dropped meaning the use of jQuery 2.0, HTML5, and CSS3 (including pseudo selectors) are now supported
- Classy, a new base theme, is introduced
- CSS: far fewer IDs are used, default classes are no longer in core but are moved to Classy, CSS file structure now uses SMACSS and class names follow the BEM format
- CSS and JS files are attached to pages differently
- `template.php` becomes the slightly better-named `[theme-name].theme`. Maybe we'll finally get `theme.php` in Drupal 9?

Check out Drupal's [change log](https://www.drupal.org/list-changes/published/drupal?keywords_description=&to_branch=&version=&created_op=%3E%3D&created%5Bvalue%5D=&created%5Bmin%5D=&created%5Bmax%5D=&impacts%5B%5D=3) for a comprehensive list of changes.

## Why all the changes?

Though the theming layer in Drupal 8 is quite different from Drupal 7 and will require some relearning, these changes come with great improvements, including:

- Fewer Drupal-specific conventions and more popular, well-documented frameworks (such as Twig), meaning non-Drupalers can jump in much more quickly. Let’s face it - Drupal 7 theming has a major learning curve, which can keep developers and designers from using Drupal at all.
- Template files are more secure since they no longer contain PHP code (thanks to Twig). Sanders at [d8.sqndr.com](http://d8.sqndr.com/) offers this nice/scary example of PHP code that could be executed in a Drupal 7 template file:

```php
// This really shouldn’t be allowed to work, and it won’t in D8.
  <?php db_query('DROP TABLE {users}'); ?>
```

- Even more security: text is automatically escaped in Twig, meaning a lower chance of XSS attacks.
- D8 themers don’t need to know PHP to whip up a theme.
- Separation of logic from appearance, leading to more modular (reusable) code.
- Speaking of more modular code, Twig introduces [template inheritance](http://twig.sensiolabs.org/doc/templates.html#template-inheritance)
- Lack of browser support for IE8 and below means we get to use HTML5, CSS3, and modern jQuery libraries
- More semantic CSS class names means leaner CSS and a more readable DOM
- A general trend towards more extendable, modular, well-organized, better-performing code


## Okay, are there any disadvantages?

At the time of writing this post, the toughest things about theming in Drupal 8 for me were:

- Contributed themes and modules not having their 8.x branches ready. So far I haven't seen any contributed themes that are truly usable with Drupal 8. This will surely change soon, and it's good motivation to submit patches in the meantime.
- Lack of documentation online. When building my first D8 site, documentation often didn't exist for the problem I was having, it existed but was marked as out of date, or it was out of date but NOT marked as such. This was definitely a challenge! I'd recommend taking anything you read with a grain of salt (including this).

Fortunately both of these problems will resolve as Drupal 8 gets closer to release.

## Creating a custom theme in Drupal 8
So, now that we’ve covered some reasons that D8 theming will be awesome and we're feeling motivated to submit some patches and write some documentation, let’s create a custom theme using Classy as a base.

The first thing to note is the different file structure. The `core` folder now holds all the the modules and themes that ship with Drupal, and contributed and custom modules and themes are now found respectively in the `modules` and `themes` folders in the Drupal document root (mine is called `docroot`).

Let’s create a folder for our new theme. Savas Labs is working on a Drupal 8 mapping project, so I’ll use that as an example. Our theme is called “Mappy,” so we’ve created a folder for our theme within `themes/custom`.

<img class="blog-image-xl" src="{{ site.base_url }}/assets/img/blog/theme-folder-location.png" alt="Screenshot of D8 file structure.">

The first file we’ll want to create is `[theme-name].info.yml`, which replaces D7’s `[theme-name].info` file. I’ve created `mappy.info.yml`, shown below. If you’re new to YAML, Symfony has a [nice writeup](http://symfony.com/doc/current/components/yaml/yaml_format.html#collections) on syntax. Pay close attention to the whitespace - for example, a space is required after the colon in key-value pairs.

```yaml
# mappy.info.yml
name: Mappy
type: theme
description: 'D8 Theme for a basic leaflet site.'
core: 8.x
base theme: classy
libraries:
 - mappy/global-styling
 - mappy/leaflet
regions:
  navbar: 'Top Navigation Bar'
  content: Content
  sidebar: 'Sidebar'
  footer: 'Footer'
```

Let's knock out the easy ones:

```yaml
name: Mappy
type: theme
description: 'D8 Theme for a basic leaflet site.'
core: 8.x
```

This information tells Drupal that we're dealing with a Drupal 8 theme and gives Drupal a name and description to display in the admin UI. Note that all of these items are required for your theme to be installable.

```yaml
regions:
  navbar: 'Top Navigation Bar'
  content: Content # required!
  sidebar: 'Sidebar'
  footer: 'Footer'
```

This hasn't changed much from Drupal 7. Don't forget that the `Content` region is required. You can also forego declaring regions if you want to use Drupal's [default regions.](https://www.drupal.org/node/2469113)


### Classy, the new base theme

```yaml
base theme: classy
```

Classy is a brand new base theme that ships with Drupal core. All CSS classes were moved out of core template files and into Classy's as a way to a) contain, minimize, and organize default classes and b) give developers the option of not using Drupal's default classes without having to undo core. One can simply choose not to use Classy as a base theme.

Additionally, Classy's classes follow the BEM convention, making them less generic and more meaningful. Check out [this article](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) for a great introduction to BEM.


### Libraries

```yaml
libraries:
 - mappy/global-styling
 - mappy/leaflet
```

In Drupal 8, assets can be added to pages in a few different ways: globally, per-template, and per-page. We've chosen to add our CSS and JS globally since this is a small site and the same relatively lightweight assets are used on almost every page.

In the `mappy.info.yml` file, I've listed two libraries. These correspond to items in my `mappy.libraries.yml` file, which lives in the root of my theme directory. No matter how you're including CSS or JS files on a page, you'll need to define them in your `[theme-name].libraries.yml` file.

```yaml
# mappy.libraries.yml
global-styling:
  css:
    theme:
      css/styles.css: {}

leaflet:
  css:
    theme:
      css/leaflet.css: {}
  js:
    js/leaflet.js: {}
    js/map.js: {}
  dependencies:
    - core/jquery
```

As you may have guessed, `global-styling` is a library that applies site-wide styles. `leaflet` is the leaflet library, which consists of `leaflet.css` and `leaflet.js`, plus our custom file `map.js`. jQuery is no longer loaded on every page in Drupal 8, so we have to explicitly include it when it's required.

By listing these two libraries in `mappy.info.yml` we ensure that these assets will be included on every page of our site. However, this is typically not the best practice for larger sites since these files can seriously affect performance. [This page](https://www.drupal.org/developing/api/8/assets) on Drupal.org details how to attach assets to pages via hooks so that CSS and JS files are only loaded where they're needed.


### Breakpoints
Another new YAML file, `[theme-name].breakpoints.yml`, allows developers to create standard breakpoints to be used by modules and themes across the site. You can set custom breakpoints by defining them in this file. Below is our breakpoints file, which also resides in the root of our theme. Note that we simply adapted the breakpoints file from the Bartik theme.

```yaml
# mappy.breakpoints.yml
mappy.mobile:
  label: mobile
  mediaQuery: '(min-width: 0px)'
  weight: 2
  multipliers:
    - 1x
mappy.narrow:
  label: narrow
  mediaQuery: 'all and (min-width: 560px) and (max-width: 850px)'
  weight: 1
  multipliers:
    - 1x
mappy.wide:
  label: wide
  mediaQuery: 'all and (min-width: 851px)'
  weight: 0
  multipliers:
    - 1x
```

Important tip: Once you add a breakpoints file, you'll need to uninstall and reinstall your theme to expose these breakpoints in the admin UI.

With these files set up, you now have a working custom theme!


## Creating template files with Twig

In our custom theme's current state, we're using Classy's template files as-is. If we want to customize any of these templates, we need to override them with Twig files located in our custom theme's `templates` directory.

[Twig](http://twig.sensiolabs.org/doc/templates.html) is a template engine with syntax similar to Django, Jinja, and Liquid. It simplifies template creation with clean syntax and useful build-in filters, functions, and tags. In a Drupal template file (now with the extention .html.twig), anything between {% raw %}`{{ ... }}`{% endraw %} or {% raw %}`{% ... %}`{% endraw %} or {% raw %}`{# ... #}`{% endraw %} is Twig.

- {% raw %}`{{ These }}`{% endraw %} are for printing content, either explicitly or via functions
- {% raw %}`{% These %}`{% endraw %} are for executing statements
- {% raw %}`{# These #}`{% endraw %} are for comments

### Printing variables and regions

In Drupal 7 we render content like so:

```php
<?php print render($page['sidebar']); ?>
```

Printing variables using Twig in D8 is as easy as including them in the double curly brace delimiter.

```liquid
// In page--front.html.twig
// Print the sidebar region.
{% raw %}
{{ page.sidebar }}
{% endraw %}
```

...unless there are special characters in the variable name. If that's the case and you see an error when using the syntax above, you can use Twig's subscript syntax, which should look pretty familiar to Drupalers:

```liquid
// In page--front.html.twig
// Print the page type.
{% raw %}
{{ page['#type'] }}
{% endraw %}
```

This will be more useful when debugging. The Drupal core base themes include lists of available variables and regions in the DocBlock of their template files, or you can print variables to the page via Twig's debug mode (more on that below) to see what's available to you.

### Filters and functions

Twig comes with many built-in [filters](http://twig.sensiolabs.org/doc/filters/index.html) that variables are passed to via the pipe character. These filters do many of the things that PHP functions would have in previous Drupal versions. One example is the date filter:

```liquid
// Format the post date.
{% raw %}
{{ post.published|date("Y-m-d") }}
{% endraw %}
```

There are also [Drupal-specific Twig filters](https://www.drupal.org/node/2357633), such as `t` which runs the string through the `t()` function.

```liquid
// Run an ARIA label through t()
{% raw %}
<nav class="tabs" role="navigation" aria-label="{{ 'Tabs'|t }}">
{% endraw %}
```

By the way, [ARIA labels](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) are new in Drupal 8 too!

In addition to filters, Twig provides a range of [functions](http://twig.sensiolabs.org/doc/functions/index.html) that are also used within the double curly brace delimiters.

### Tags

Control flow and other [tags](http://twig.sensiolabs.org/doc/tags/set.html) are also supported in Twig. One of my favorite things about templating languages is how easy it is to execute `if` statements and `for` loops. [Savas Labs](https://github.com/savaslabs/savaslabs.github.io) uses Jekyll for our company website and the Liquid templating language makes it easy to loop through a list of data points, blog posts, projects, etc. and print them to a page rather than writing out all of the HTML. In Drupal, we'll use the `if` statement quite often.

```liquid
// From Bartik's page.html.twig
// If there are tabs, output them.
{% raw %}
{% if tabs %}
  <nav class="tabs" role="navigation" aria-label="{{ 'Tabs'|t }}">
    {{ tabs }}
  </nav>
{% endif %}
{% endraw %}
```

Another useful tag is `set`, which allows you to set and use variables throughout the template. In the following example, the variable `heading_id` is set and then used as the `aria-labelledby` attribute. Note that the Twig concatenation character `~` is used, and the string '-menu' is passed through the `clean_id` filter.

```liquid
// From Classy's block--system-menu-block.html.twig
{% raw %}
{% set heading_id = attributes.id ~ '-menu'|clean_id %}
<nav{{ attributes.addClass(classes) }} role="navigation" aria-labelledby="{{ heading_id }}">
{% endraw %}
```

### Coding standards

Since this is new to some Drupalers, take a moment to check out the [coding standards](https://www.drupal.org/node/1823416) for Twig.


## Debugging with Twig

Twig comes with a highly useful debug feature that outputs helpful HTML comments and allows you to code without having to clear the cache constantly, but it doesn't work out of the box. We're going to turn on that feature and disable the several layers of caching that require developers to clear the cache every time they make a change in a template file.

To enable debug mode and turn off caching, we need to do 3 things:

1. Turn on Twig's debug mode
2. Turn on Twig auto reload, meaning that Twig templates are automatically recompiled when the source code is changed
3. Disable Drupal's render cache

Note that one thing we do NOT need to do, surprisingly, is turn off Twig caching - turning on auto reload is enough.

If you open `default.services.yml` located in `sites/default`, you'll see some `twig.config` options where you can enable Twig debugging auto reload. I'm going to use this syntax but in a different file because I'm using a local settings file.

I created `settings.local.php` by making copy of `example.settings.local.php` in `sites`, moving it to `sites/default` and renaming it. I then opened up `settings.local.php` and customized the `$databases['default']['default']` array.

To get Drupal to recognize my local settings file, I opened `settings.php` and uncommented the last 3 lines:

```php
<?php
if (file_exists(__DIR__ . '/settings.local.php')) {
  include __DIR__ . '/settings.local.php';
}
```

In `settings.local.php` we'll see:

```php
<?php
/**
 * Enable local development services.
 */
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';
```

This means we need to head over to `sites` and edit `development.services.yml` to change our local development services. I added these lines to this file to enlable debug mode and auto reload:

```yaml
parameters:
  twig.config:
    debug: true
    auto-reload: true
```

Great, we've completed steps 1 and 2. Fun fact: step 3 is already complete too! In `settings.local.php`:

```php
<?php
/**
 * Disable the render cache (this includes the page cache).
 *
 * This setting disables the render cache by using the Null cache back-end
 * defined by the development.services.yml file above.
 *
 * Do not use this setting until after the site is installed.
 */
$settings['cache']['bins']['render'] = 'cache.backend.null';
```

So by using the local settings file we've already disabled the render cache.

Now, reload your site and you should see HTML comments in your browser's code inspector with lots of helpful info: which theme hook is being implemented, theme hook suggestions (i.e. how to override the current theme hook), and which template file is being output. You can also make changes to your source code and simply refresh the page to see your changes rather than constantly clearing the cache.

### Where my variables at?
One useful function that comes with Twig is `dump()`. This function works once you've enabled Twig's debug mode and can be entered into any template file.

```liquid
// Print out all variables on the page.
{% raw %}
{{ dump() }}
{% endraw %}

// Print the page's base path.
{% raw %}
{{ dump(base_path) }}
{% endraw %}
```

`dump()` is great, but it outputs a rather unwieldy array.

<img class="blog-image-large" src="{{ site.base_url }}/assets/img/blog/dump-output.png" alt="Screenshot of dump function output.">

Enter the beloved Devel module and the new Devel Kint module. Kint is to Drupal 8 what krumo was to Drupal 7. Once Devel and Devel Kint are installed, you can use `kint()` in place of `dump()` for a nice expandable array.

```liquid
// In page--front.html.twig
// Print out all variables on the page.
{% raw %}
{{ kint() }}
{% endraw %}
```

<img class="blog-image-xl" src="{{ site.base_url }}/assets/img/blog/kint-output.png" alt="Screenshot of kint function output.">

Ahh, much better!


## Further reading:
- Start with Drupal.org's [theming guide](https://www.drupal.org/theme-guide/8)
- Check out sqndr's excellent [Drupal 8 theming guide](http://d8.sqndr.com/)
- Drupalize Me's [post](https://drupalize.me/blog/201405/lets-debug-twig-drupal-8) about debugging Twig has some detailed information about `dump()`, devel and kint. Be aware that some of the information in that post on configuring Twig is out of date.
