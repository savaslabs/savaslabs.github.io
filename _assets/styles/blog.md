# Blog style guide

This style guide covers how to construct blog posts and the standards we follow at Savas Labs.

## Table of contents

### Blog post guidelines

1. Blog post template
2. Naming convention
3. Headings
4. Images
5. Tags
6. Syntax highlighting
7. Twitter widget

### Blog post standards

1. Review process
2. Featured image requirement
3. Grammarly
4. Tests

---

## Blog post guidelines

The following information covers how to write blog posts.

### Blog post template

There is a template markdown file for blog posts located in `_templates`. Copy
this template and follow the instructions for filling out front matter and
write your post in the body.

### Naming convention

Jekyll's naming convention for posts is as follows:

```
YYYY-MM-DD-name-of-blog-post.md
```

### Headings

Your post title (stored in the post's front matter) will be an `<h1>`. Your
top-level headings should be `<h2>`'s (`##`), then `<h3>`'s (`###`), etc.

### Images

#### Featured images

You can include a featured image in the front matter using the `featured_image`
and `featured_image_alt` keys. This will work for our site and for Drupal Planet.
This is required for every post.

Blog image files should be placed in
`_/assets/img/blog`, but you should only include `/blog/[filename].jpg` in the
front matter of your post.

Lastly, please include `featured_image_width` and `featured_image_height` in
pixels to satisfy Google's structured data requirements.

#### Image placement and size within the post body

You can add images with the following markdown syntax:

```
![Image alt text here]({{ site.url }}/assets/img/blog/image-name.jpg){:class="blog-image-full-width"}
```

Plain ol' `<img>` tags work too.

You can add following classes to contextual images:

- `class="blog-image-full-width"` - image will span the whole width of the post. This image style is preferred over the others.
- `class="blog-image-large` - image will be max 500px wide and horizontally centered
- `class="blog-image` - image will be max 250px wide and horizontally centered
- `class="blog-image-left"` - image will float left
- `class="blog-image-right"` - image will float right
- `class="blog-image-row"` - image will be horizontally centered and padded

Captions can be added to full width images by adding `<span class="caption">Caption</span>` right under the image tag.

To add caption to floated images wrap the `<img>` tag in a `<div>` and give it a class:

``` html
<div class="blog-image-left">
 <img src="/assets/img/blog/{img}" alt="{alt}">
  <span class="caption">{caption}</span>
</div>
```

Up to six images and their captions can be displayed in a row by wrapping in a `<div>` with class `.blog-row`:

``` html
<div class="blog-row">
<div class="blog-image-row">
 <img src="/assets/img/blog/{img}" alt="{alt}">
  <span class="caption">{caption}</span>
</div>
<div class="blog-image-row">
 <img src="/assets/img/blog/{img}" alt="{alt}">
  <span class="caption">{caption}</span>
</div>
<div class="blog-image-row">
 <img src="/assets/img/blog/{img}" alt="{alt}">
  <span class="caption">{caption}</span>
</div>
<div class="blog-image-row">
 <img src="/assets/img/blog/{img}" alt="{alt}">
  <span class="caption">{caption}</span>
</div>
</div>
```

### Tags

To add a new tag, do the following:

1. Add the tag to `_data/tags.yml`.
2. Add a new markdown file for the tag in `blog/tag`. This creates a page for posts with that tag.
3. Add the tag to the front matter of your post.

#### Drupal planet posts

For Drupal planet posts, i.e. those that include the `drupal-planet` tag, please include the `drupal_planet_summary` element in your front matter.

### Syntax Highlighting

To implement syntax highlighting in a post, use backticks (similar to GitHub or
Slack highlighting).

Special tips:

1. You can include the language name after the first set of backticks with no
space e.g. ```bash
2. The syntax block must be preceded and followed by blank lines.
3. For php you must including an opening `<?php` tag after the backticks to get
proper highlighting.
4. To display raw Liquid code, you'll need to wrap your code in `{% raw %}` and
`{% endraw %}` tags.

### Twitter widget

We're using the `jekyll-twitter-plugin` to allow us to use a simple Liquid tag
to add Twitter widgets to blog posts or other pages. Use the following format
within HTML or markdown files:

```
{% twitter https://twitter.com/SavasLabs/status/729504649233899521 %}
```

---

## Blog post standards

The following information covers standards we Savasians agree to adhere to when
composing and reviewing blog posts.

### Each post must be reviewed by at least one other Savasian

The author should give the reviewer ample notice and time to perform the review.

### Each post must have a featured image

We will be developing a defined process for requesting a featured image from
another team member.

### Each post must be run through Grammarly

Sign up for the web version or download the app, then paste the text of the post
into the editor and resolve issues as you see fit. This should be done by the
author and the reviewer.

### The author should examine the output of the pre-commit hook

Posts will be tested for the following:

#### Spell check

Aspell outputs a list of potentially misspelled words. You can add words to the
shared dictionary by adding them to `savas_wordlist.txt`. Please only
add legitimate words (actual words that Aspell just doesn't know, proper nouns,
developer terms, etc.). If a word is questionable (e.g. slang) do not add it.
Also, when adding acronyms or words that contain them (e.g. "PhpStorm"), ensure
you use the proper capitalization so that the incorrect capitalization will
throw an error.

#### Markdownlint

We use the `mdl` gem to check coding standards in markdown files. Rules are
configured in `.mdlrc`. Markdownlint runs as part of the pre-commit hook so you
can make changes, but it also runs as part of our test suite since it's critical
that any violations are fixed.

#### Proselint

Proselint suggests best practices for writing prose. You're free to ignore suggestions that don't apply, but you
should probably listen to it sometimes (says the Savasian who uses "very" too
often). Keep in mind you can run `git commit --no-verify` to ignore Proselint
suggestions.

#### Drupal planet tag check

If the post lists the `drupal` tag, the pre-commit hook will suggest that the
`drupal-planet` tag and the `drupal_planet_summary` be added. If there is a
`drupal-planet` tag with no summary, the pre-commit hook will throw an error.


