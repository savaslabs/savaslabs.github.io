---
layout: post
title: "Sassy Drupal theming: Best practices"
date: 2015-09-03
author: Anne Tomasevich
tags: drupal theming sass bourbon front-end-dev
summary: Some lessons learned about writing lean, easy-to-understand SCSS and capitalizing on all Sass has to offer.

---

In my previous posts we:

- [Set up a `sass` directory](/2015/08/21/sassy-drupal-theming-part-1.html) containing the Bourbon and Neat libraries and learned how to use Compass to compile our SCSS
- [Used SMACSS](/2015/08/28/sassy-drupal-theming-part-2.html) to organize our lean, modular custom SCSS

To close out this series, I've compiled some lessons learned along the way that have helped me write the most maintainable Sass possible.

<hr>

## 1. Document the crap out of everything
One criticism of Sass is that, particularly because of nesting, things can get complicated quickly and other developers may not know what's going on when you pass off your code. I like to follow these three rules:

#### Place a docblock comment in every `scss` file.
People may not be familiar with SMACSS or whatever personal version of it you're using. Docblock comments makes your files easy to navigate.

In each file, I state the purpose of the file, and include anything that may not be extremely evident. This is the docblock of a layout partial for a tricky map page:

```scss
/**
 * @file
 *
 * Front page layout.
 *
 * On small screens, map takes up 85% of viewport height (vh) and sidebar
 * is below. On larger screens, everything is on top of map with 100% width
 * and height.
 */
```

#### Comment on your grid layout technique.

```scss
// Title box: 10 columns on mobile and narrow, 6 on wide and up.
.node-title-box {
  @include span-columns(10 of 10);

  @include media ($wide) {
    @include span-columns(6 of 8);
    @include shift(1 of 8);
  }
}
```

#### Comment on anything that isn't immediately obvious.

This is as much for yourself in 6 months as it is for other developers who may someday look at your code. (I'm not the only one who forgets why I did something in the first place unless I comment it, right?)

```scss
// On mobile, move zoom controls up so sidebar content doesn't cover it.
@include media ($wide) {
  .leaflet-bottom {
    bottom: 15vh;
  }
}
```

<hr>

## 2. gitignore the CSS directory

Every developer (and your production environment) should be compiling SCSS into CSS locally rather than passing along a compiled CSS file and potentially running into merge conflicts. Simply add your `stylesheets` directory and `sass-cache` to your `.gitignore` file.

```text
# Compiled source #
path/to/theme/.sass-cache/*
paht/to/theme/stylesheets/*
```

<hr>

## 3. Variable names

One of the best things about Sass is being able to make sweeping changes with only one code edit thanks to variables.

But keeping your variables maintainable requires a little thoughtfulness when naming them. For example, let's say these are my site's color variables:

```scss
// Colors
$eggshell: #FFFFF9;
$taupe: #DDE0D0;
$purple: #5F1251;
$green: #709130;
$light-green: lighten($link-color, 25%);
$brown: #5C5240;
```

Cool...until the client wants to overhaul the entire color scheme. You could simply change the hex codes and have very misleading variable names, or you could change the variable names to match the new colors and be stuck doing a find and replace on all the variable names throughout your SCSS files, effectively negating the advantage gained by using Sass.

A more semantic, maintainable way: naming your variables according to their function.

```scss
// Colors
$element-background-color: #FFFFF9;     // Eggshell
$page-background-color: #DDE0D0;        // Taupe
$heading-color: #5F1251;                // Purple
$link-color: #709130;                   // Green
$link-hover: lighten($link-color, 25%); // Lighter green
$copytext-color: #5C5240;               // Brown
```

With this method we can change any of the colors site-wide with a single edit.

<hr>

## 4. Nest, but nest responsibly

Nesting is one of the best things about Sass, but anyone who's used it can tell you that getting nest-happy has consequences.

- Specificity issues: Too many selectors can make it difficult to override styles
- Code bloat: Nesting when it's not necessary can lead to styles that aren't actually needed clogging up your compiled CSS file
- Unreadable code: Crazy nesting is difficult for the next developer to figure out

Some people say "don't nest" or "only nest one level deep." I completely disagree since nesting is a great tool that solves one of CSS's biggest shortcomings.

Some say follow the [Inception Rule](http://thesassway.com/beginner/the-inception-rule) (don't nest more than 4 levels). This is a good guideline and it's beneficial to be mindful of how many levels you've nested, but I don't think an arbitrary number should be a cold hard rule. My general rules of nesting:

1. If your compiled CSS contains rulesets that aren't needed, you did something wrong. If you've got multiple selectors on one level but at the next level you only need to write a rule for one of them, close out the nest and start a new one.
2. Follow your normal specificity rules. Don't use ID selectors since they're so difficult to override. Be as general as possible.
3. Keep nests organized with:
  - Comments. Explain blocks of code so it's easy for another developer to see what it's doing.
  - Good spacing. If your code is appropriately spaced it's easier to read. Which brings me to my last point...

## 5. Use SCSS-Lint

Or whatever code inspector you want. We've had great success with [SCSS-Lint](https://github.com/brigade/scss-lint) on our [company website](https://github.com/savaslabs/savaslabs.github.io/blob/source/_scripts/run-tests.sh). SCSS Lint checks everything from declaration order to whitespace to nesting depth. It's very strict out of the box but you can change or ignore linters to customize it to your needs. Because of the potential complexity of Sass, following coding standards becomes more crucial than ever. And, y'know, it's good for you.

<hr>

Now get out there and write some Sass! Got a different opinion about how to apply SMACSS or how to write the best Sass possible? Let me know about it in the comments!
