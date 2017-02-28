---
layout: post
title: Five Drupal 8 Tips to Empower Content Authors
date: 2017-03-06
author: Oksana Cyrwus
tags: drupal drupal8 drupal-planet user-experience
featured_image: "/blog/content-authoring-d8.jpg"
featured_image_alt: "Five Drupal 8 Tips to Empower Content Authors"
featured_image_height: "917px"
featured_image_width: "1474px"
summary: Five Drupal 8 tips to make the content authoring experience more enjoyable and productive!
drupal_planet_summary: |
  Creating and publishing quality content within time constraints is a common challenge for many content authors. As web engineers, we are focused on helping our clients overcome this challenge by delivering systems that are intuitive, stable, and a pleasure to operate.

  Customizing the user experience for content authors is a critical component that site architects must implement in order to establish and maintain client satisfaction. Drupal 8 makes it easier for digital agencies to empower content creators and editors with the right tools to get the job done efficiently.

  Here are five tips in Drupal 8 that make the content authoring experience more enjoyable and productive.

---

Creating and publishing quality content within time constraints is a common challenge for many content authors. As web engineers, we are focused on helping our clients overcome this challenge by delivering systems that are intuitive, stable, and a pleasure to operate.

During the architectural phase, it's critical to craft the editorial experience to the specific needs of content authors to ensure the best content editing experience possible. Drupal 8 makes it even easier than previous versions for digital agencies to empower content creators and editors with the right tools to get the job done efficiently, and more enjoyably.

Our five tips to enhance the content editing experience with Drupal 8 are:

[1. Don’t make authors guess - use structured content](#dont-make-authors-guess---use-structured-content)

[2. Configure the WYSIWYG editor responsibly](#configure-the-wysiwyg-editor-responsibly)

[3. Empower your editorial team with Quick-Edit](#empower-your-editorial-team-with-quick-edit)

[4. Enrich content with Media Embeds](#enrich-content-with-media-embeds)

[5. Simplify content linking with LinkIt](#simplify-content-linking-with-linkit)

## 1. Don’t make authors guess - use structured content

The abundance of different devices, screen sizes and form factors warrants the use of structured content. Structured content is content separated into distinct parts, each of which has a clearly defined purpose and can be edited and presented independently from one another according to context.

“How does that relate to a content editor’s experience?” - you may ask.

In years past, it was very popular to give content editors an ability to create “pages” using one big “MS Word-like” text box for writing their articles, news releases, product descriptions, etc. This approach produced content that was not reusable and was presented in one strict way. Who wants to navigate within one enormous text area to move images around?

Though those days are long behind us, and even though we all know about the importance of structured content, sometimes we _still fail_ to utilize the concept correctly.

Drupal was one of the first Content Management Systems (CMS) to introduce the concept of structured content (node system - Drupal 3 in 2001). In fact, Drupal is no-doubt the best CMS for implementing the concept of structured content, but its ability to provide a good content authoring experience lagged behind this solid foundation.

Today, in Drupal 8, editing structured content is a joy!

With the WYSIWYG (**W**hat **Y**ou **S**ee **I**s **W**hat **Y**ou **G**et) editor and Quick Edit functionality in Drupal core, we can equip our content editors with the best of class authoring experience and workflow!

You can see the difference between unstructured and structured D8 content below. Instead of only one field containing all text, images, etc., the structured content stores each definitive piece of information in it's own field, making content entry fast and presentation flexible!

<img src="/assets/img/blog/structured-vs-unstructured.jpg" class="blog-image-large" alt="Structured vs unstructured content">

### The benefits of Drupal 8 structured content approach:

- The author clearly understands where each piece of information should reside and does not have to factor in markup, layout, and design while editing (see [tip #2](#configure-the-wysiwyg-editor-responsibly)). Content entry becomes remarkably efficient and allows the author to concentrate on the essence of their message instead of format.
- The publishing platform is easier to maintain while supporting system scalability.
- The modular nature of structured content makes migrations between CMS versions or to a completely different CMS much more streamlined. _A huge plus for those long-term thinkers!_

## 2. Configure the WYSIWYG editor responsibly

Drupal 8 ships with WYSIWYG text editor in core. The editor even works great on mobile! In a society that is so dependent on our mobile devices - who wouldn’t like to be able to quickly edit a missed typo right from your phone?

Drupal 8 provides superior enhancements to the UX (User Experience) for content authors and editors out of the box. However, with a little configuration, things can be further improved.

When establishing the UI (User Interface) for content authors, site builders should focus on refining rather than whole-sale adoption of the available features. Customizing the WYSIWYG editor is the perfect example of subtle improvements that can immediately make a big difference.

The WYSIWYG text editor is an effective tool for simple content entry since it does not require the end user to be aware of HTML markup or CSS styles. Many great functions like text formatting options (font family, size, color, and background color), source code viewing, and indentation are available at our fingertips, but as site builders we should think twice before adding all those options to the text editor toolbar!

With great power comes great responsibility! Sometimes, when you give content editors control over the final appearance of the published content (e.g. text color, font family and size, image resizing, etc.), it can lead to an inconsistent color schemes, skewed image ratios, and unpredictable typography choices.

How do we help our content authors in avoiding common design / formatting mistakes? Simple!

**Use a minimalist approach when configuring the WYSIWYG text editor.** Give authors access to the most essential text formatting options that they will need for the type of content they create and nothing more. If the piece of content edited should not contain images or tables - do not include those buttons in the editor. The text editor should be used only for sections of text, not for the page layout.

A properly configured CMS should not allow content editors the ability to change the size of the text or play with image positioning within the text section or the ability to add H1 headers within auxiliary content.

Below is an example of a bad vs. good Wysiwyg configuration.

<img src="/assets/img/blog/good-vs-bad-wysiwyg-editor.jpg" class="blog-image-large" alt="Wysiwyg editor configuration compared">

### Benefits of the minimal (thoughtful) WYSIWYG configuration:

- Easy to use
- Less confusion (though there are edge cases, most editors don't use all the buttons)
- Better usability on mobile devices
- Less risk of breaking established website design

Let’s keep our content editors happy and not overcrowd their interfaces when it’s absolutely not necessary. It is our duty as software engineers to deliver systems that are easy to use, intuitive, scalable and uphold design consistency.

## 3. Empower your editorial team with Quick-Edit

[The Quick Edit module](https://www.drupal.org/docs/8/core/modules/quick-edit/overview) is one of the most exciting new features that is included in Drupal 8 core. It allows content authors and editors to make updates to their content without ever leaving the page.

The days of clicking “Edit” and waiting for a separate page to load just to fix a tiny typo are gone! The Quick Edit module eliminates that extra step and allows content editors to save a great deal of time on updating content. As an added bonus - content editors can instantly see how updated content will look within the page flow.

Here's the Quick Edit functionality in action.

<img src="/assets/img/blog/quick-edit-demo.gif" class="blog-image-large" alt="Quick Edit module demo">

### Quick Edit configuration tip for back-end and front-end developers

To make use of the Quick Edit functionality within the website pages, entities have to be rendered on the page via [View Modes](https://www.drupal.org/docs/8/api/entity-api/display-modes-view-modes-and-form-modes) and not as separate fields.

This restriction presents a challenge when there’s a needs to provide Quick Edit functionality for a page constructed by the Views module. More often than not, Views are used to single out and output individual fields from the entities. The most used Views formats are “Table” and “Grid”. They currently [do not support Quick Edit functionality for usability reasons](https://www.drupal.org/node/1962606).

A workaround for this issue is to use the custom View modes for Entities and create custom Twig templates for each View mode that should be outputted by Views in order to accommodate custom layout options.

## 4. Enrich content with Media Embeds

In the era of social media, content editors can’t imagine their daily routine without being able to embed their Tweets or videos into the stories they publish on their sites. In Drupal 6 and the early days of Drupal 7, it was pretty challenging to provide this functionality within the WYSIWYG editor. Developers had to configure many different plugins and modules and ask them politely to cooperate.

The Drupal 8 Media initiative has placed the content author’s experience and needs at the forefront of community efforts. As a result, we have access to a great solution for handling external media - [CKEditor Media Embed Module](https://www.drupal.org/project/ckeditor_media_embed). It allows content editors to embed external resources such as videos, images, tweets, etc. via Wysiwyg editor. Here's an example of the Tweet embed -- the end result looks beautiful and requires minimal effort.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;If you&#39;re going to build a new site, build it in D8.&quot; - someone who knows what they&#39;re talking about quotes <a href="https://twitter.com/jrbeaton">@jrbeaton</a> <a href="https://twitter.com/TriDUG">@TriDUG</a> <a href="https://t.co/8w9GAuuARu">pic.twitter.com/8w9GAuuARu</a></p>&mdash; Savas Labs (@Savas_Labs) <a href="https://twitter.com/Savas_Labs/status/824770016507752448">January 27, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

With all this media goodness available to us, there is no reason why we shouldn’t go the extra mile and configure the CKEditor Media Embed module for our content authors!

## 5. Simplify content linking with LinkIt

Linking to content has always been a clumsy experience for content editors, especially when linking internally within the same site.

There was always the risk of accidentally navigating away from the page that you were actively editing (and losing any unsaved information) while searching for the page to link to. Also, the default CKEditor link button allowed editors to insert a link, assign it a target value, title, maybe an anchor name, but that was about it. If the link to the internal content changed, there was no way for the page to update and links throughout the website would end up broken.

Let’s not put our content editors through that horrible experience again. [LinkIt module](https://www.drupal.org/project/linkit) for Drupal 8 to the rescue!

With the LinkIt module the user does not have to copy / paste the URL or remember it. LinkIt provides a search for internal content with autocomplete field. Users can link not only to pages, but also to files that are stored within Drupal CMS.

The new and improved linking method is much more sustainable, as it recognizes when the URL of the linked content changes, and automatically produces the correct link within the page without the need to update that content manually.

<img src="/assets/img/blog/linkit-file-link-demo.gif" class="blog-image-large" alt="LinkIt File link demo">

<span class="caption">Linking to files with LinkIt</span>

My personal favorite feature of the LinkIt module is the flexible configuration options. The LinkIt module makes it possible to limit the type of entities (pages, posts, files) that are searchable via the link field. You can also create a custom configuration of the LinkIt autocomplete dialog for each WYSIWYG editor profile configured on your site. Plus, it is fully integrated with Drupal 8 configuration synchronization.

## Final Thoughts

As site builders, there are many improvements that we can make in order to **streamline the process of content authoring**.

With the right mix of forethought and understanding, Drupal 8 allows web engineers to deliver content publishing platforms that are unique to the client’s specific needs, while making web authoring a productive and satisfying experience.
