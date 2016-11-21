---
layout: post
title: "Sassy Drupal theming: Setting up Bourbon and Neat"
date: 2015-08-21
author: Anne Tomasevich
tags: drupal drupal-planet theming sass bourbon front-end-dev
summary: A step-by-step tutorial on setting up Bourbon and Neat and compiling it all with Compass.
drupal_planet_summary: |
  When Savas Labs built a custom Drupal 8 theme, we needed to include a grid framework and chose Bourbon's Neat for its ease of use, its light weight, and the library of useful Sass mixins provided by Bourbon. In this post I detail how to set all of this up and use Compass to compile SCSS.

---

Recently Savas Labs [built a custom Drupal 8 theme](/2015/06/10/d8-theming-basics.html) using Bourbon for mixins and Neat as our grid framework, applying our favorite parts of SMACSS principles and focusing on creating organized, maintainable code. The result? Fast, easy coding and a relatively lightweight theme.

In this three-part series I'll detail:

- Setting up Bourbon and Neat within a Drupal theme for quick, well-organized styling
- [Creating a Sass file structure following a light version of SMACSS](/2015/08/28/sassy-drupal-theming-part-2.html)
- [What we at Savas Labs consider best practices for creating shareable, maintainable Sass](/2015/09/03/sassy-drupal-theming-part-3.html)

I'll be pulling some examples from our Drupal 8 theme, but none of this is Drupal-8-specific and really, it's not entirely Drupal-specific. These principles can be applied to any site. Much of the material in these posts is also largely a matter of opinion, so if you disagree or if something else works better for you, sound off about it in the [comments!](#js-expander-trigger)

<hr>

## Definitions
Let's talk vocab.

#### Sass
A preprocessor for CSS. [Sass](http://sass-lang.com/guide) offers functionalities not yet available in CSS like variables, rule nesting, and much more.

#### SCSS
"Sassy CSS." Early Sass, with the file extension `.sass`, used a syntax quite different from the CSS syntax we're already familiar with. Version 3 of Sass brought SCSS, returning to the same syntax as CSS and proving easier to use for most developers. Importantly, this means that valid CSS is also valid SCSS. Files ending with the `.scss` extension are written in SCSS. I still call them "Sass files"; please don't be mad at me.

If you found that last paragraph terribly interesting, you should [read this](http://thesassway.com/editorial/sass-vs-scss-which-syntax-is-better).

#### Partial
An SCSS file that is not directly compiled into a CSS file, but is instead imported into another SCSS file. A partial is denoted by the underscore that begins its filename (e.g. `_base.scss`).

#### Bourbon
A [Sass mixin library](http://bourbon.io/) by [thoughtbot, inc.](https://thoughtbot.com/) Bourbon makes Sass easier and more powerful by providing extremely useful mixins, meaning you don't have to write them yourself. I particularly enjoy using Bourbon for CSS3 mixins, which allow me to use modern CSS3 modules without having to worry about vendor prefixes.

#### Neat
A [lightweight grid framework](http://neat.bourbon.io/) written for Sass, also by thoughtbot. The best part of Neat, in my opinion, is the separation of content from layout that comes from defining layout in Sass files rather than template files. This makes your grid system easier to define, update and maintain and keeps your template files cleaner.

<hr>

Now that we're all dying to use these awesome things with Drupal, let's set it up!

## Create a Gemfile

We need to install Bourbon and Neat, which are both Ruby gems. We could do a quick `gem install bourbon` then `bourbon install` to create a folder of the entire Bourbon library, but this isn't ideal if we're ever going to be sharing this code since each developer (and deployment environment) will need to have these gems installed on their machine. Enter [Bundler](http://bundler.io/), a package manager for Ruby gems. Per the documentation, we only need to do a few things:

#### 1. Install Bundler, which is a Ruby gem itself

```bash
$ gem install bundler
```

#### 2. Create a Gemfile in our theme directory

```bash
$ cd my-custom-theme
$ touch Gemfile
```

...and list out all the gems our theme requires.

```ruby
# Gemfile
source "https://rubygems.org"

gem 'compass'
gem 'sass'
gem 'bourbon'        # Bourbon mixin library.
gem 'neat'           # Bourbon Neat grid framework.
```

See Bundler's [documentation](http://bundler.io/gemfile.html) to read about specifying versions within your Gemfile.

#### 3. Install all your dependencies.

```bash
$ bundle install
```

#### 4. Commit the Gemfile and Gemfile.lock to ensure that everyone is using the same libraries.

```bash
$ git add .
$ git commit -m "Add Gemfile and Gemfile.lock"
```

<hr>

## Create a Sass directory

Within the theme directory, create a directory called `sass`. In here, create the following directories:

```bash
# Inside the custom theme directory
sass
├── base
├── components
├── layouts
└── lib
```

<hr>

## Install libraries

Now we can actually install the Bourbon and Neat libraries within our project.

```bash
$ cd sass/lib
$ bourbon install
$ neat install
$ git add .
$ git commit -m "Add Bourbon and Neat libraries"
```

Here's what we've got now:

```bash
# Inside the custom theme directory
sass
├── base
├── components
├── layouts
└── lib
    ├── bourbon
    └── neat
```

Now that we've got our libraries set up, we need to actually import them so that they're compiled into CSS.

<hr>

## Set up `styles.scss`

Create `styles.scss` in the `scss` directory. Inside `styles.scss`, we'll import all our SCSS partials. View a working example of this [here](https://github.com/savaslabs/durham-civil-rights-map/blob/master/themes/custom/mappy/sass/styles.scss). I generally organize the imports in this manner:

```scss
/**
 * @file
 * Styles are organized using the SMACSS technique. @see http://smacss.com/book/
 */

/* Import Sass mixins, variables, Compass modules, Bourbon and Neat, etc. */
@import "init";
@import "base/variables";

/* HTML element (SMACSS base) rules */
@import "base/normalize";
@import "base/base";

/* Layout rules */
// Import all layout files.

/* Component rules (called 'modules' in SMACSS) */
// Import all component files.
```

We haven't created any of these partials yet, but we will.

Some people may want to use [Sass globbing](https://github.com/chriseppstein/sass-globbing) here for brevity's sake. I prefer not to as I find the file to be more readable without it.

<hr>

## Set up `_init.scss`

Within the `sass` directory, create a file called `_init.scss`.

In `_init.scss` we will (in this order):

1. Import Bourbon (the mixin library) and Neat Helpers (Neat's settings and functions)
2. Set some overrides
3. Import Neat itself
4. Import fonts

You can view an example of a full `_init.scss` file [here](https://github.com/savaslabs/durham-civil-rights-map/blob/master/themes/custom/mappy/sass/_init.scss), but I'll go through some of the highlights.

#### 1. Import `bourbon.scss` and `neat-helpers.scss`

First we import all of Bourbon and Neat's settings and functions, which are included in `neat-helpers.scss`.

```scss
// Import variables and mixins to be used (Bourbon).
@import "lib/bourbon/bourbon";
@import "lib/neat/neat-helpers";
```

#### 2. Create overrides

Now we'll override some of Neat's settings and create our breakpoints.

```scss
// Turn on Neat's visual grid for development.
$visual-grid:       true;
$visual-grid-color: #EEEEEE;

// Set to false if you'd like to remove the responsiveness.
$responsive:    true;

// Set total number of columns in the grid.
$grid-columns:  12;

// Set the max width of the page using the px to em function in Bourbon.
// The first value is the pixel value of the width and the second is the base font size of your theme.
$font-size:     16px;
$max-width-px:  2000px;
$max-width:     em($max-width-px, $font-size);

// Define breakpoints.
// The last argument is the number of columns the grid will have for that screen size.
// We've kept them all equal here.
$mobile:   new-breakpoint(min-width em(320px, $font-size) $grid-columns);
$narrow:   new-breakpoint(min-width em(560px, $font-size) $grid-columns);
$wide:     new-breakpoint(min-width em(851px, $font-size) $grid-columns);
$horizontal-bar-mode: new-breakpoint(min-width em(950px, $font-size) $grid-columns);
```

#### 3. Import Neat

Now that we've completed our settings, we'll import the entire Neat library and our overrides will apply and cause the grid to function the way we want it to.

```scss
// Import grid to be used (Bourbon Neat) now that we've set our overrides.
@import "lib/neat/neat";
```

#### 4. Import fonts

I like to include my fonts in this file to be consistent about how I'm importing my libraries (e.g. the Font Awesome library, which I've included in `sass/lib`). Some people might move this into a `_typography.scss` file or something similar, perhaps residing in the `base` directory. Do what feels right!

```scss
// Fonts -----------------------------------------------------------------------

// Noto Serif (headings)
@import url(http://fonts.googleapis.com/css?family=Noto+Serif:400,700);

// Open Sans (copytext)
@import url(http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,700,400);

// Font Awesome (icons)
@import 'lib/font-awesome/font-awesome';
```

<hr>

## Compile!

We haven't written any custom styles yet, but at this point we can compile our SCSS into CSS using [Compass](http://compass-style.org/help/) (which we included in the Gemfile earlier).

First we need to generate a Compass configuration file using `compass config`.

```bash
$ cd my-custom-theme
$ bundle exec compass config
```

Why did we use `bundle exec`? Running a Compass command as a Bundler executable runs the command using the Compass gem defined in our Gemfile. This way, if we decided to define a specific version of Compass within the Gemfile that potentially differs from another version installed on our local machines, we ensure we're using that specific version every time we run a Compass command.

Now we can compile our Sass. Run this command from the root of your theme directory:

```bash
$ bundle exec compass compile
```

Running this command for the first time does two things:

1. Creates a `stylesheets` directory containing `styles.css`, the compiled version of `styles.scss`.
2. Creates a `.sass-cache` directory

Once we start writing our own Sass, we can have Compass watch for changes and regenerate `styles.css` as we code:

```bash
$ bundle exec compass watch
```

I usually open a new tab in my terminal and leave this command running as I'm styling.

<hr>

At this point our Sass directory is looking like this:

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

Where do we go from here? In [my next post](/2015/08/28/sassy-drupal-theming-part-2.html), I tackle the `base`, `components`, and `layouts` SMACSS-based directories and the custom `scss` files they will hold. In a future post I'll go through some of Savas Labs best practices for writing Sass that can be easily shared amongst team members and maintained in the long run.
