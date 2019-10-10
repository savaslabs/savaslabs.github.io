---
layout: post
title: "Storybook Part 1"
date: 2019-10-11
author: Alex Manzo
tags: storybook front-end-dev component-libraries twig drupal drupal-planet
summary: On using Storybook to integrate component libraries into Drupal 8 projects.
description: On using Storybook to integrate component libraries into Drupal 8 projects.
image: "/assets/img/blog/storybook-post.jpg"
featured_image: "/blog/storybook-post.jpg"
featured_image_alt: "Ancient written language."

---

Recently, the team at Savas Labs decided to embark on integrating component libraries into our projects. Component libraries are becoming more and more commonplace in front-end development, particularly with frameworks like React and Vue. However, you don’t need to be using a front-end framework to leverage the benefits of a component library.

### What’s a Component Library?

A component library is a repository of reusable building blocks for your website. Think of some of the items that appear on a website over and over again. There are small items (like form elements) and bigger ones (like an image carousel). These are components. For some examples, head over to [Bootstrap’s documentation](https://getbootstrap.com/docs/3.4/components/), where they lay out some of the many reusable components available with the framework.

Component based design goes hand in hand with the practice of [atomic design](http://bradfrost.com/blog/post/atomic-web-design/). This methodology breaks down elements into five categories: Atoms, Molecules, Organisms, Templates, and Pages. Atoms are the smallest parts of your site. Atoms build molecules, molecules build organisms, etc. I highly recommend visiting the link and learning more about this methodology.

### Why Are We Using a Component Library?

Simply put, we want to be more efficient. One of the many draws of using a component library here at Savas is the ability for front-end developers to start building out pieces of a project before our back-end team has the Drupal site up and running.

You might be familiar with the common coding practice DRY (Don’t Repeat Yourself). Leveraging a component library in our projects allows us to make that practice a reality. We can build one component to be flexible enough for a variety of use cases (more on that later).

Beyond that project-level benefit, a big-picture goal is to use the same base component library across multiple projects. All websites contain many of the same elements. There will be a header, footer, images, and buttons on every site we build. Before even having designs completed, we can already have a skeleton laid out. Additionally, this allows us to make sure we’re always being consistent in our work and adhere to best practices in usability and accessibility.

### Finding the Right Tool

There are a lot of great component library tools out there, but we needed to find one that would fit our (rather specific) needs. Some of the goals we kept in mind while looking for the best tool were:

- Prioritizing integration with Drupal
- Using the same code for components library and Drupal
- Support for Twig (how we build our templates in Drupal)
- Supports our build processes (webpack, linting, image optimization, etc.)

Y’all, I’m gonna be straight with you. Finding the right tool for this was _hard_. Many of the tools for component libraries out there are (very logically) focused on supporting projects in React, Vue, or Angular. Our projects weren’t a logical use case for these kinds of technologies. It immediately became clear that there was probably no “out of the box” solution and we’d have to do at least some customization to fit our needs

We found a lot of blog posts and articles where teams had leveraged a component library and Drupal or integrated Twig with popular component library tools.  Sadly, we didn’t find much explanation of _how_ to do it. (We’re looking to remedy that problem in Part 2 of this post).

After tinkering with several solutions we finally settled on [Storybook](https://storybook.js.org/). Storybook offered a more light-weight file structure than some others, uses webpack, and would work with other front-end technologies we’ll use in the future. Storybook also benefits from a large community that works to improve the product and create great add-ons. Most importantly, it’s adaptable enough to fit our use case.

### Getting Storybook to Work for Us

A friend to Savas gave us a great starter project that included Twig integration to get us up and running. We heavily changed and adapted that into our own setup. We’ll dig into specifics in a future post, but there were some challenges we faced along the way.

1. Integrating Storybook into Drupal
  We ultimately created a Storybook directory within our site’s theme directory. This allows all of the templates in our Drupal theme to access Storybook components within the same project.

2. Using Twig
  Twig Loader has been the key to getting Storybook and Twig to work well together. It’s only necessary for us to load within Storybook itself and has allowed us to use Twig templates seamlessly.

3. Custom Webpack Configuration
  In our theme directory we created a `wepback.commons.js` file that both the webpack config in our Drupal theme and the one in the Storybook directory could have access to. This allows for the styles/scripts Storybook to be compiled into bundles that both Storybook and our Drupal theme have access to.

4. Integrating Tailwind
  As a team we use [Tailwind](https://tailwindcss.com/), a utility framework for CSS. It comes with its own needs in terms of webpack configuration and we fought a bit of a battle getting all plugins and configs to play nicely together.

The setup we ultimately ended up with has worked great with some limitations. We’re still troubleshooting some issues with Storybook accessing our custom JS files. Fortunately, Drupal’s access to the scripts hasn’t been an issue, so we haven’t had our progress impeded too much as we tackle that lingering challenge.

### Thoughts at the Halfway Point

This blog is unique - it’s not a pre-mortem or post-mortem, it’s a….mid-mortem? We’ve already learned a lot, made some mistakes along the way, but are proud to say we have Storybook and Drupal working in tandem with one another.

_Big Jump on Front-end_

One of the biggest differences this approach made off the bat was the ability to immediately get started on building components on the front-end. We built JSON data models so we could populate our templates based on the data that would be coming from Drupal.

Once the Drupal environment was ready, we slid our Storybook theme right in and started hooking up our templates to their respective paragraph types, and voila!

_Getting More Organized_

Focusing on making components reusable and focusing on atomic design principles has helped us be more efficient in our work.

A great example of this is the use of “cards” on one project. This particular project features seven different types of cards. All share at least two common elements, some share many, some have elements that don’t exist on other cards at all.

For each of those seven “types” of cards, each of _those_ has multiple versions that show in different scenarios. They all ultimately reference one component file. In turn, that template can references some even smaller templates that change depending on the context.

From a Drupal perspective, most of our template files contain nothing but a reference and variable declarations to the appropriate storybook component. Nothing gets siloed or repeated.  All roads lead back to `card.twig`:

<div class="blog-image-large">
<img alt="Trending Topic card example" src="/assets/img/blog/storybook-card-1.png">
</div>
<div class="blog-image-large">
<img alt="Core Team card example" src="/assets/img/blog/storybook-card-2.png">
</div>
<div class="blog-image-large">
<img alt="Person card example" src="/assets/img/blog/storybook-card-3.png">
</div>
<div class="blog-image-large">
<img alt="Event card example" src="/assets/img/blog/storybook-card-4.png">
</div>
<div class="blog-image-full-width">
<img alt="Project card example" src="/assets/img/blog/storybook-card-5.png">
</div>
<div class="blog-image-full-width">
<img alt="News Update card example " src="/assets/img/blog/storybook-card-6.png">
</div>
<div class="blog-image-full-width">
<img alt="Featured Topic card example" src="/assets/img/blog/storybook-card-7.png">
</div>

_Challenges_

We’d love to say that everything has been easy and flawless, but you wouldn’t believe us anyway. There have definitely been some challenges along the way.

First, we seem to continually be refactoring component files to be _more_ flexible and reusable as we continue to find use cases for them. We focused heavily on creating paragraph types in Storybook, but as we build others section of our sites, we realize the shared styles and functionality can expand even further.

Along the same lines, finding the right balance on how to break everything down within the paradigm of atomic design is a challenge. I personally have found that some things that began as an “organism” should more realistically be considered “molecules”.

Another challenge has been creating templates that work appropriately for both Drupal and Storybook. What works to display something in Drupal might not work as well for Storybook. Overriding templates for fields changes the data flow so it becomes more necessary to pass Storybook literal templates as data instead of just data itself.

### What’s next?

As of writing this blog post, we’re still working on integrating all of our Storybook components into Drupal and getting sites ready for our clients to start adding content. Once we’ve finished and shipped our projects, we’ll do a post-mortem on what went well, what went badly, and what we learned from this experience.

Then, we’re going to provide you with some solid technical steps on getting Storybook up and running in Drupal, plus some advice to help you along the way.
