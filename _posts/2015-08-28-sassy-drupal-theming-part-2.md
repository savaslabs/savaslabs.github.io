---
layout: post
title: "Sassy Drupal theming: a lighter version of SMACSS"
date: 2015-08-28
author: Anne Tomasevich
tags: drupal drupal-planet theming sass bourbon front-end-dev
services: development design-ux
summary: We'll use SMACSS principles to organize our custom SCSS and keep it lean and maintainable.
drupal_planet_summary: |
  It takes some forethought, but a well-organized theme means code that is modular and easy to maintain or pass off to another developer. SMACSS principles are becoming more and more widespread and can be applied to a Drupal theme. At Savas Labs we've picked out what we love from SMACSS and simplified the rest, creating a stylesheet organization method that works for us. In this post (part 2 of my three-part series on Drupal theming with Sass) I'll go through our version of SMACSS and link to real examples.
---

In my [previous post](/2015/08/21/sassy-drupal-theming-part-1.html) I outlined how to build a Sass directory within a custom Drupal theme including Bourbon and Neat.

At this point, we're ready to write some SCSS within the `base`, `components`, and `layouts` directories. In this post I'll demonstrate how Savas Labs applies [SMACSS](https://smacss.com/) principles to organize our custom SCSS. As a reminder, I'll be linking to our [Drupal 8 mapping site](https://github.com/savaslabs/durham-civil-rights-map) as an example throughout, but none of this is Drupal-8-specific.

<hr>

## Drupal-flavored SMACSS

When we left off, our `sass` directory looked like this:

```bash
# Inside the custom theme directory
sass
├── _init.scss
├── base
├── components
├── layouts
├── lib
│   ├── bourbon
│   ├── font-awesome
│   └── neat
└── styles.scss
```

At this point we're ready to start styling. Let's take a look at the three folders that will hold our custom `.scss` files, which are loosely based on SMACSS. Acquia has a [nice writeup](https://dev.acquia.com/blog/organize-your-styles-introduction-smacss) of how SMACSS principles can be applied to Drupal, but I like to simplify it even further.

### Base

I personally only have three files in the `sass/base` directory. Don't forget that we already [imported these three partials](/2015/08/21/sassy-drupal-theming-part-1.html#set-up-stylesscss) in `styles.scss`.

For full examples of each of these files, check out [our `base` directory](https://github.com/savaslabs/durham-civil-rights-map/tree/master/themes/custom/mappy/sass/base).

#### `_normalize.scss`
This is simply [`normalize.css`](https://necolas.github.io/normalize.css/) renamed as `_normalize.scss` - remember that CSS is valid SCSS. Thoughtbot recommends using `normalize.css` as your CSS reset along with Neat. Regardless of which reset you use, include it in `base`.

#### `_base.scss`
This is for HTML element styles only. No layout, no classes, nothing else. In here I'll apply font styles to the body and headings, link styles to the anchor element, and possibly a few other site-wide styles.

#### `_variables.scss`
This is where I house all of my Sass variables and custom mixins. I typically have sections for colors, fonts, other useful stuff like a standard border radius or spacing between elements, variables for any [Refills](http://refills.bourbon.io/) I'm using, and custom mixins.

I'd definitely recommend including `_normalize.scss` in `base` if you're using Neat, but other than that do what works for you! If you're following my method, your `sass` folder should be looking like this:

```bash
# Inside the custom theme directory
sass
├── _init.scss
├── base
│   ├── _base.scss
│   ├── _normalize.scss
│   └── _variables.scss
├── components
├── layouts
├── lib
│   ├── bourbon
│   ├── font-awesome
│   └── neat
└── styles.scss
```

### Layouts

This directory holds page-wide layout styles, which means we'll be making heavy use of the Neat grid here. This is flexible, but I recommend a single `.scss` partial for each unique template file that represents an entire page. Think about what works best for your site. For the sake of our example, let's say we're creating `_front-page.scss` and `_node-page.scss`. I like to also create `_base.scss` for layout styles that apply to all pages.

Remember that these styles only apply to the page's layout! I occasionally find myself moving styles from the `layouts` directory to `base` or `components` when I realize they don't only define layout. In these partials, you should be doing a lot of grid work and spacing. This is the entirety of my `sass/layouts/_base.scss` file on our mapping site:

```scss
/**
 * @file
 *
 * Site-wide layout styles.
 */

body {
  @include outer-container();

  main {
    @include span-columns(10);
    @include shift(1);
    @include clearfix;

    h1 {
      margin-top: em($navigation-height) + $general-spacing;
    }
  }
}
```

We're almost there:

```bash
# Inside the custom theme directory
sass
├── _init.scss
├── base
│   ├── _base.scss
│   ├── _normalize.scss
│   └── _variables.scss
├── components
├── layouts
│   ├── _base.scss
│   ├── _front-page.scss
│   └── _node-page.scss
├── lib
│   ├── bourbon
│   ├── font-awesome
│   └── neat
└── styles.scss
```

### Components

In SMACSS this is called "modules," but that gets a little confusing in Drupal Land. This is for applying layout and theme styles to smaller chunks of your site, which in Drupal typically means regions. Create a separate partial for each region, or if you have several distinct components within a region, consider a separate partial for each of them.

Let's say we created partials for the header, footer, and sidebar regions, plus one for non-layout node page styles. At this point, our `sass` directory is looking like this:

```bash
# Inside the custom theme directory
sass
├── _init.scss
├── base
│   ├── _base.scss
│   ├── _normalize.scss
│   └── _variables.scss
├── components
│   ├── _node-page.scss
│   └── regions
│       ├── _footer.scss
│       ├── _header.scss
│       └── _sidebar.scss
├── layouts
│   ├── _base.scss
│   ├── _front-page.scss
│   └── _node-page.scss
├── lib
│   ├── bourbon
│   ├── font-awesome
│   └── neat
└── styles.scss
```

Now we've got a nicely organized, easy to navigate Sass directory, ready to hold your styles and compile them into one beautiful CSS file!

<hr>

But how do we ensure that our one CSS file really is beautiful? Check out [my final post](/2015/09/03/sassy-drupal-theming-part-3.html) about best practices for writing Sass that you can easily maintain or pass off to another developer.
