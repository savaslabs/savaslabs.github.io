---
layout: post
title: "Building savaslabs.com"
date: 2015-04-01
author: Anne Tomasevich
tags: jekyll bourbon sass
summary: What do web developers do when they have a few days between projects? Build an entire company website from scratch. Thanks to Jekyll and Bourbon, we were able to completely redo our website efficiently.
disclaimer: |
  This post includes some outdated Bourbon and Neat mixins, such as `span-columns` and `display(flex)`.
---

As a newly branded company, Savas Labs needed a company website to showcase our work and abilities, and to provide a platform for connecting with other developers and to the Drupal community in particular via blogging and hosted events.

We initially intended to whip up a site quickly using a Jekyll template. We had previous experience with [Jekyll](http://jekyllrb.com/), a platform for mostly-static sites whose benefits include rapid setup, free hosting with Github Pages, and integration with Prose.io for blogging.

We chose a one-page template, hoping this would mean an even quicker initialization process, and set up a site. As this was our company's first website we had a great deal of work to do between choosing design elements, fleshing out the site's structure, creating content, and hounding everyone to turn in a moderately professional photo of him or herself for the team profiles.

After a few weeks of squeezing in work on the site when we could, it became apparent that the template wasn't going to meet our needs. The one page layout lacked the depth we wanted, and the template didn't allow us to showcase our skills as developers. We tossed around the idea of creating a site from scratch, keeping Jekyll but ditching the template. A few of us have a well-developed love of Sass and wanted to try <a href="http://bourbon.io">Bourbon</a>, a Sass mixin library, its grid system [Neat](http://neat.bourbon.io), and [Bitters](http://bourbon.io), a basic set of styles that help set up a new Sass environment. We also used a few components from [Refills](http://refills.bourbon.io/).

Creating a new Jekyll site was a matter of a few commands:

```bash
$ gem install jekyll
$ jekyll new [sitename]
$ cd [sitename]
$ jekyll serve
```

This created the file structure, and `jekyll serve` starts a local server on which the new site is running, convenient for coding on sunny patios with bad wifi.

From here we created each page and incorporated the content we had already generated for the original site. Creating the skeleton of the site was relatively quick thanks to Jekyll's use of YAML [front matter](http://jekyllrb.com/docs/frontmatter/) and the modular nature of its HTML files. We used markdown files in lieu of HTML when possible, and capitalized on Jekyll's support of the Liquid templating language to include HTML snippets (e.g. head, header and footer) and to loop through lists (e.g. team members or recent blog posts).

Next we incorporated the Bourbon, Neat and Bitters libraries into our site and started styling.

Modular partial files allowed us to organize our files semantically and avoid redundancies. _color.scss holds the color variables, _typography.scss ensures that text elements are consistent across the entire site, and _layout.scss holds styles that apply to every page. There's certainly a learning curve with Sass and it can become unnecessarily complicated if one isn't careful (overnesting!), but Sass makes writing non-redundant, modular code so much easier.

Neat worked well for this site. The number of columns is set in _grid.scss (12 is the default) and we mostly used just two mixins - span-columns and shift.

```scss
div {
  @include span-columns(8);
  @include shift(2);
}
```

This div will span 8 columns and will be offset by 2 columns, centering it in the 12-column grid. A bit more semantic than Foundation's `col-lg-8 col-lg-offset-2`

To create a few repeated layouts, we used the navigation, footer, and cards Refills. This was our first experience with flexbox and we heavily referenced [this excellent article](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) from CSS-Tricks. Since flexbox isn't quite stable and has gone through several versions, a hefty amount of vendor prefixes are required, and this is where Bourbon became a real asset. Instead of:

```scss
div {
  display: -webkit-box;
  display: -moz-box;
  display: box;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
}
```

...we simply used the mixin:

```scss
div {
  @include display(flex);
}
```

In addition to flexbox, we used Bourbon's CSS3 transitions mixins, em to pixel calculations, and media query mixins.

Lessons learned:

* Jekyll gets simple sites up and running quickly
* Templates can sometimes be more limiting than useful
* Bourbon makes Sass even more fun
* Neat is just right for a simple, responsive site
* Refills are handy for creating clean, minimal elements, at least until everyone's websites start looking the same a la Twitter Bootstrap

Our site is open source so feel free to check out our [Github repository!](https://github.com/savaslabs/savaslabs.github.io)
