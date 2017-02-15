---
layout: post
title: 5 Tips to Empower Content Authors Using Drupal 8
date: 2017-02-14
author: Oksana Cyrwus
tags: drupal drupal8 drupal-planet user-experience
featured_image: "/blog/content-authoring-d8.jpg"
featured_image_alt: "5 Tips to Empower Content Authors Using Drupal 8"
featured_image_height: "917px"
featured_image_width: "1474px"
summary: We can make many improvements in Drupal 8 to make the content authoring experience more enjoyable and productive, regardless of enhancements in core. Here’s 5 of them.
drupal_planet_summary: |
  Creating and publishing quality web content within time constraints is a common challenge for many of our clients. As web engineers, we are focused on delivering systems that are intuitive, stable and a pleasure to operate. Customization of the user experience for content authors is a critical component that site architects must implement in order to establish and maintain client satisfaction.

  Lucky for us, Drupal 8 made it easier for digital agencies to empower content creators and editors with the right tools to get the job done efficiently.

  We can make many improvements in Drupal 8 to make the content authoring experience more enjoyable and productive, regardless of enhancements in core.

  Here’s 5 of them.
---

Creating and publishing quality web content within time constraints is a common challenge for many of our clients. As web engineers, we are focused on delivering systems that are intuitive, stable and a pleasure to operate. Customization of the user experience for content authors is a critical component that site architects must implement in order to establish and maintain client satisfaction.

Lucky for us, Drupal 8 made it easier for digital agencies to empower content creators and editors with the right tools to get the job done efficiently.

We can make many improvements in Drupal 8 to make the content authoring experience more enjoyable and productive, regardless of enhancements in core.

Here’s 5 of them.

[1. Don’t make authors guess - use structured content](#dont-make-authors-guess---use-structured-content)

[2. Configure WYSIWYG editor responsibly](#configure-wysiwyg-editor-responsibly)

[3. Empower your editorial team with Quick-Edit](#empower-your-editorial-team-with-quick-edit)

[4. Enriched content with Media Embeds](#enriched-content-with-media-embeds)

[5. Simplify content linking with LinkIt](#simplify-content-linking-with-linkit)

## 1. Don’t make authors guess - use structured content

The abundance of different devices, screen sizes and form factors warrants the use of structured content. Structured content is content separated into distinct parts, each of which has a clearly defined purpose and can be edited and presented independently from one another according to context.

“How does that relate to a content editor’s experience?” - you may ask.

In years past, it was very popular to give content editors an ability to create “pages” using one big “MS Word-like” text box for writing their articles, news releases, product descriptions, etc. This approach produced content that was not re-usable and was presented in one strict way.

Well, those days are long behind us and even though we all know about the importance of structured content, sometimes we still fail to utilize the concept correctly. Plus, who wants to navigate within the enormous text area to move images or text around?

The concept of structured content is not new to Drupal. In fact Drupal was one of the first Content Management Systems (CMS) to introduce it (node system - Drupal 3 in 2001). Drupal is no-doubt the best CMS for implementing the concept of structured content, but it always lacked in its ability to provide a good content authoring experience.

In Drupal 8, editing structured content is a joy! With Wysiwyg (What you see is what you get) editor and Quick Edit functionality already in Drupal core, we can equip our content editors with the best of class authoring experience and workflow!

To visualize the difference between unstructured and structured content - see the image below.

<img src="/assets/img/blog/structured-vs-unstructured.jpg" class="blog-image-large" alt="Structured vs unstructured content">

Unstructured content has only one field which contains text, images, etc. Alternatively, structured content allows to store each definitive piece of information in it’s own field, making content entry fast and presentation flexible.

### The benefits of Drupal 8 structured content approach:

- The content author clearly understands where each piece of information should reside. Content entry becomes remarkably efficient.
- The content author does not have to factor in the markup, layout and design of the content while editing it  (see [tip #2](#configure-wysiwyg-editor-responsibly) below). This enables the author to concentrate on the essence of their message instead of content format and presentation.
- Structured content makes the publishing platform easy to maintain while supporting system scalability.
- Migration of the sites with granular structured content between CMS versions or to a completely different CMS is much more streamlined. _A huge plus for those long-term thinkers!_

## 2. Configure WYSIWYG editor responsibly

Drupal 8 ships with Wysiwyg text editor in core. The editor even works great on mobile! In a society that is so dependent on our mobile devices - who wouldn’t like to be able to quickly edit a missed typo right from your phone?

Drupal 8 provides superior enhancements to the UX (User Experience) for content authors and editors out of the box. However, things can always be improved and refined. During the phase of establishing UI (User Interface) for content authors we should be focused on refinement rather than adoption of the available features. Customization of the Wysiwyg editor is the perfect example where subtle improvements can immediately make a big difference.

Wysiwyg text editor is an effective tool for simple content entry, as it does not require the end user to be aware of HTML markup or CSS styles. Having all the great functions of the text editor at our fingertips often prompts us to share all these functions and settings with our content authors. Some examples of such functions are various text formatting options (font family, size, color, background color, etc.), source code viewing, indentation, line-height and others. Think twice before adding all those formatting options to the text editor toolbar!

With great power comes great responsibility! We have all seen in the past what happens when you give content editors control over the final appearance of the published content (e.g. text color, font family and size, image resizing, etc.). This often leads to an inconsistent color schemes, skewed image ratios and unpredictable typography choices.

How do we help our content authors in avoiding common design / formatting mistakes? Simple!

**Use a minimalist approach when configuring the Wysiwyg text editor.** Give authors access to the most essential text formatting options that they will need for the type of content they create and nothing more. If the piece of content edited should not contain images or tables - do not include those buttons in the editor. Text editor should be used only for sections of text, not for the page layout.

A properly configured CMS should not allow content editors the ability to change the size of the text or play with image positioning within the text section or the ability to add H1 headers within auxiliary content.

Below you can see an example of bad vs. good Wysiwyg configuration.

<img src="/assets/img/blog/good-vs-bad-wysiwyg-editor.jpg" class="blog-image-large" alt="Wysiwyg editor configuration compared">

### Benefits of the minimal (thoughtful) Wysiwyg configuration:

- Easy to use
- Less confusion (nobody ever uses all those buttons, of course there are edge cases)
- Better usability on mobile devices
- Less risk of breaking established website design

Let’s keep our content editors happy and not overcrowd their interfaces when it’s absolutely not necessary. It is our duty as software engineers to deliver systems that are easy to use, intuitive, scalable and uphold design consistency.

## 3. Empower your editorial team with Quick-Edit

[The Quick Edit module](https://www.drupal.org/docs/8/core/modules/quick-edit/overview) is one of the most exciting new features that is included in Drupal 8 core. It allows content authors and editors to make updates to their content without ever leaving the page.

The days when the content editor had to click “Edit” and load a separate page to fix a tiny typo are gone! The Quick Edit module eliminates the extra step and allows content editors to save a great deal of time on updating the content. As an added bonus - content editors can instantly see how updated content will look within the page flow. See below.

<img src="/assets/img/blog/quick-edit-demo.gif" class="blog-image-large" alt="Quick Edit module demo">

### Quick Edit configuration tip for back-end and front-end developers

To make use of the Quick Edit functionality within the website pages, entities have to be rendered on the page via [View Modes](https://www.drupal.org/docs/8/api/entity-api/display-modes-view-modes-and-form-modes) and not as separate fields.

This restriction presents a challenge when there’s a needs to provide Quick Edit functionality for a page constructed by the Views module. More often than not, Views are used to single out and output individual fields from the entities. The most used Views formats are “Table” and “Grid”. They currently [do not support Quick Edit functionality for usability reasons](https://www.drupal.org/node/1962606).

#### Use custom View Modes with custom Twig templates

A workaround for this issue is to use the custom View modes for Entities and create custom Twig templates for each View mode that should be outputted by Views in order to accommodate custom layout options.

## 4. Enriched content with Media Embeds

In the era of social media, content editors can’t imagine their daily routine without being able to embed their Tweets or videos into the stories they publish on their sites. In Drupal 6 and in the early days of Drupal 7 it was pretty challenging to provide this functionality within Wysiwyg editor. Many different plugins and modules had to be configured to play nice together.

The Drupal 8 Media initiative has placed the content author’s experience and needs at the forefront of community efforts. As a result, we have access to a great solution for handling external media - [CKEditor Media Embed Module](https://www.drupal.org/project/ckeditor_media_embed). It allows content editors to embed external resources, such as videos, images, tweets, etc. within the content via Wysiwyg editor. An example of the Tweet embed is shown below. The end result looks beautiful and requires minimal effort!

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;If you&#39;re going to build a new site, build it in D8.&quot; - someone who knows what they&#39;re talking about quotes <a href="https://twitter.com/jrbeaton">@jrbeaton</a> <a href="https://twitter.com/TriDUG">@TriDUG</a> <a href="https://t.co/8w9GAuuARu">pic.twitter.com/8w9GAuuARu</a></p>&mdash; Savas Labs (@Savas_Labs) <a href="https://twitter.com/Savas_Labs/status/824770016507752448">January 27, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

When all this media goodness is available to us, than there is no reason why we shouldn’t  go an extra step and configure CKEditor Media Embed module for our content authors!

## 5. Simplify content linking with LinkIt

Linking to content has always been a clumsy experience for content editors, especially when there is a need to find a page on your site that you wish to link to. There was always a risk to navigate away from the page that you editing in search for the other link and lose the information already entered but not yet saved.

The default CKEditor link button allowed the content editor to insert a link, assign it a target value, title text, maybe an anchor name and that’s about it. If the link to the internal content changed, there was no way for the page that is linking to that content to know that and links throughout the website were ending up broken.

Let’s not put our content editors through that horrible experience again. [LinkIt module](https://www.drupal.org/project/linkit) for Drupal 8 to the rescue!

With LinkIt module the user does not have to copy / paste the URL or remember it. LinkIt provides a search for internal content with autocomplete field. User can link not only to pages, but also to files that are stored within Drupal CMS.

The new and improved linking method is much more sustainable, as it recognizes when the URL of the linked content changes, and automatically produces the correct link within the page without the need to update that content manually.

<img src="/assets/img/blog/linkit-file-link-demo.gif" class="blog-image-large" alt="LinkIt File link demo">

<span class="caption">Linking to files with LinkIt</span>

My personal favorite feature of the LinkIt module are the flexible configuration options. The LinkIt module makes it possible to limit the type of entities (pages, posts, files) that are searchable via link field. You can also create a custom configuration of the LinkIt autocomplete dialog for each Wysiwyg editor profile configured on your site. Plus it is fully integrated with Drupal 8 configuration synchronization.

## Final Thoughts

There are many improvements that we can make in order to **streamline the process of content authoring**.

Drupal 8 with the right mix of forethought and understanding, allows web engineers to deliver content publishing platforms that are unique to the client’s specific needs, while making web authoring a productive and satisfying experience.
