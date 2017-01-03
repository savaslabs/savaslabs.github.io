---
layout: post
title: # Enter title in quotes
date: # e.g. 2016-11-15
author: # Enter the author name
tags: # Enter tags separated by spaces
summary: # Enter a one-sentence summary
featured_image: "/blog/[path to image]"
featured_image_alt: # Enter alt text in quotes
featured_image_height: "000px"
featured_image_width: "1474px"
drupal_planet_summary: |
  # Include this if this post has the Drupal tag
---

## Headings

Your post title (stored in the post's front matter) will be an H1. Your
top-level headings should be H2's (##), then H3's (###), etc.

## Images

You can include a featured image in the front matter using the `featured_image`
and `featured_image_alt` keys. This will work for our site and for Drupal Planet.
Please try to do this for every post!

Your image should be 1474px wide. Blog images should be placed in
`_/assets/img/blog`, but you should only include `/blog/[filename].jpg` in the
front matter of your post.

Lastly, please include `featured_image_width` and `featured_image_height` in
pixels to satisfy Google's structured data requirements.

## Syntax Highlighting

Since updating to Jekyll 3.0.2 which uses Kramdown/Rouge, to use syntax
highlighting in a post you just need to use backticks (similar to GitHub or
Slack highlighting).

Special tips:

1. You can include the language name after the first set of backticks with no
space e.g. ```bash
2. The syntax block must be proceeded and followed by blank lines.
3. For php you must including an opening php tag to get proper highlighting.
4. To display raw Liquid code, you'll need to wrap your code in {% raw %} and
{% endraw %} tags.

## Tags

To add a new tag, complete the following:

1. Add the tag to _data/tags.yml.
2. Add a new markdown file for the tag in blog/tag. This creates a page for posts with that tag.
3. Add the tag to the front matter of your post.
