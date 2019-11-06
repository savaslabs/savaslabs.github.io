---
layout: post
title: "Using Tailwind for CSS"
date: 2019-11-06
author: Alex Manzo
tags: storybook front-end-dev tailwind
summary: In the spirit of efficiency and team cohesion, Savas Labs has recently utilized Tailwind CSS, a utility-first CSS framework. This has proven especially useful in keeping styles organized, reusable, and functional across projects even with multiple developers and writing styles. This is how we did it.
description: In the spirit of efficiency and team cohesion, Savas Labs has recently utilized Tailwind CSS, a utility-first CSS framework. This has proven especially useful in keeping styles organized, reusable, and functional across projects even with multiple developers and writing styles. This is how we did it.
image: "/assets/img/blog/tailwindcss.jpg"
featured_image: "/blog/tailwindcss.jpg"
featured_image_alt: "TailwindCSS logo with computer background."

---

As any front-end developer knows, keeping styles organized, reusable, and functional across large projects can be a unique challenge. This is especially true when multiple developers are writing styles for a site. As our front-end team at Savas has continued to grow, we’ve worked to find practical solutions to standardize our code. In that spirit, we’ve recently utilized [Tailwind CSS](https://tailwindcss.com/), a utility-first CSS framework.

### Why use a CSS framework?
A CSS framework is useful to add to your workflow because it saves time. Writing CSS means that you will inevitably write a lot of the same code over and over again. A framework helps you reduce that repetition. Additionally, it can help reduce the number of typos and mistakes you’re making in your code and make sure all developers are writing CSS in a consistent style.

### Why Tailwind?
There are a lot of CSS frameworks out there to choose from. You’ve likely worked at least a year of [Bootstrap](https://getbootstrap.com/), which is probably the most popular of the bunch. In addition to providing a library of utility classes, Bootstrap (and other similar frameworks) provide [pre-built UI components](https://getbootstrap.com/docs/4.3/components). These can be incredibly useful in terms of building layouts quickly, but aren’t always practical when going for a custom look and feel.

### Here are some of the highlights of Tailwind:
- Tailwind doesn’t come with pre-built components or opinionated styles. It simply provides [low-level utility classes](https://tailwindcss.com/docs/utility-first/) to help get you up and running quickly.
- Tailwind focuses on mobile-first design and makes it easy to build [responsive](https://tailwindcss.com/docs/responsive-design) elements and pages.
- While it focuses on utility classes, it’s easy to make your own components by [extracting component classes](https://tailwindcss.com/docs/extracting-components/).
- It’s extremely [customizable](https://getbootstrap.com/docs/4.3/components).

For us, an opinionated framework like Bootstrap doesn’t always make sense. After having a positive experience using Tailwind, we decided to go all-in.

### Tailwind in practice
Our first step was really about customizing Tailwind for our needs. This included updating the configuration with colors, breakpoints, spacing values, fonts, and more. From there, we could start using the classes on our components. We can look at a button as an easy example case.

We started by making a simple Twig template in Storybook (more on that here).

```html

<a class=”button {{ classes }}” href=”{{ url }}”>{{ text }}</a>

```

We apply some base styles to the .button class that will apply to any button across the site.

```css

.button {
  @apply text-white /* color: white; */
    text-14 /* font-size: 14px; */
    tppercase /* text-transfrom: uppercase; */
    no-underline; /* text-transform: none; */
}
```

Then, we can add more specific classes to affect color, padding, and other unique styles as needed. The following class list

```css

bg-magnolia border-3 border-magnolia py-20 px-40 hover:bg-transparent hover:text-magnolia

```

results in this styling:

<div class="blog-image">
<img alt="Green button with white text: 'Button Text'" src="/assets/img/blog/tailwindbutton.png">
</div>

### What are the downsides?
One of the biggest drawbacks of Tailwind is that the class list on a given element can become long, making markup less readable.

```html

<h2 class="leading-tight font-bold mb-60 text-18 text-center tracking-wide uppercase"></h2>
<div class="mt-40 order-1 w-full lg:absolute lg:mt-0 lg:order-0 lg:pin-r lg:pin-t lg:w-auto"></div>

```

This can be remedied a bit by using @apply in CSS to apply Tailwind classes. The drawback there is increasing the size of your bundled CSS in the end.

While the ability to customize Tailwind is a huge positive, it can also be wearing having to repeatedly return to the configuration to add in new functionality you need. As we continue to use the framework here at Savas, we keep updating our configuration to reduce time spent on this in the future.

### Last word
Tailwind makes writing CSS faster and easier. It’s as simple as that. I recently worked on another project without any CSS libraries or frameworks installed and immediately lost patience with having to write everything out in full. Once you get the hang of it, Tailwind helps you focus on solving design and style issues as a developer - not on tediously writing the CSS to fix them.
