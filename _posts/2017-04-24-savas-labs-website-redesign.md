---
layout: post
title: Savaslabs.com Redesign
date: 2017-04-24
author: Chris Russo
tags: design user-experience jekyll
summary: The Spring 2017 Redesign of Savaslabs.com
featured_image: "/blog/redesign-featured.jpg"
featured_image_alt: "Many devices testing responsive"
featured_image_height: "917px"
featured_image_width: "1474px"
---

At Savas Labs, we are a forward-looking bunch, much like our neighbors around the corner from our Durham office, The Republik, who wear that badge a little more... overtly:

<img src="/assets/img/blog/the-republik-building.jpg" alt="Front of The Republik building" class="blog-image-full-width">

Though future-focused-first, we _also_ recognize the importance of history and the value of a little reflection. After all, we  _must_ learn from our mistakes to truly thrive.

> Know from whence you came. If you know whence you came, there are absolutely no limitations to where you can go. - James Baldwin

Aside: I can't recommend the award-winning documentary about James Baldwin's legacy [_I am not your negro_](http://www.iamnotyournegrofilm.com/) strongly enough. See it.

### From whence we came...
Savas Labs matured substantially in 2016, refining processes and adding new team members who brought complementary skills. It's both intriguing and humbling to reflect on just how much we learned in the past year. It wasn't all [puppy dogs and ice cream](https://www.google.com/search?biw=1524&bih=979&tbm=isch&sa=1&q=puppy+dogs+and+ice+cream&oq=puppy+dogs+and+ice+cream), but the successes and the challenges helped us carve out our place in the world. We worked with consultants, analyzed and soul-searched to elicit what it is we love doing _and_ are really good at as a growing team. One manifestation of these pursuits was the establishment of [our core values](/company/mission-and-values/). They help hold us and future Savasians (coining the demonym _Savasian_ - another thing we did in 2016) accountable to an agreed upon set of principles which drive how we treat one another and our partners.

In addition to internal analysis, we studied our best projects to see what characteristics in partners and their challenges for which we are best fit. We uncovered that what we enjoy most and truly [excel](/company/mission-and-values/#excel) at are projects with strategic and complex needs that lean heavily on our deep Drupal expertise usually requiring inter-departmental engagement within organizations.

Ergo: our positioning statement that appears front-and-center on our [homepage](/):

> We craft elegant Drupal web systems that propel organizations

### Why the redesign

You know, the typical reason, because we wanted to :wink:. In truth, we were due for a redesign as the last time we did this was [over two years ago](/2015/04/01/building-our-site.html). Additionally, given our growth, we felt our website did not reflect the quality of work we've been doing. As we updated our message, we recognized copy updates alone would be insufficient to demonstrate our capabilities. In the process, we took advantage of the artistic skillset of one of our 2016 additions to the team, [Oksana Cyrwus](/company/oksana-cyrwus/), to create a vision of our team's identity.

<img src="/assets/img/blog/cross-browser-testing-lab-redesign-2017.jpg" alt="Many devices testing responsive" class="blog-image-full-width">
<span class="caption">Oksana's cross browser testing lab</span>

### Construction Materials

Although we're usually building client websites in Drupal, we chose to continue with the static site generator Jekyll which we've [written about before](/blog/tag/jekyll/) as our platform. We believe firmly in using the right tool for the job and use a multitude of technologies, frameworks and programming languages in any given <s>Sunday</s> workday.

<img src="/assets/img/blog/construction.jpg" class="blog-image-full-width" alt="Man cutting wood">

As [Josh Lockhart](https://twitter.com/codeguy) a local author and creator of the [Slim PHP MicroFramework](https://www.slimframework.com/) advised a developer audience at a recent PHP conference talk ([Video link](https://youtu.be/hH4HyfXiH9Y?t=924)):

> Be aware that other tools exist and that they may be better suited for certain tasks.

Ultimately, for us, the benefits outweighed the drawbacks:

<img src="/assets/img/blog/inertia.jpg" alt="man pushing a rock: inertia" class="blog-image-right">

**Bennies**

1. No database back-end, meaning reduced security threats and reduced hosting complexity. We're able to host for free on [GitHub Pages](https://pages.github.com/).
1. A [highly-performant framework](/2016/10/19/optimizing-jekyll-with-gulp.html).
1. [Ease of deployment](/2016/10/25/deploy-jekyll-with-travis.html).
1. Efficient for our workflow as it is developer oriented.
1. Inertia.

**Drawbacks**

1. Requires Ruby ecosystem competency which often presents the need to acquire new skills for Drupalers.
1. Requires developer-level skills to update.
1. Not as robust of an ecosystem as Drupal for example.
    1. Example: When we were dissatisfied with our comment options, we [built our own server](/2016/04/20/squabble-comments.html) on guess what, a different framework. This took us time and is less feature-rich than what we'd get with Drupal out of the box.

These drawbacks, though not without their costs, are also opportunities for us to be a part of the broader web ecosystem and learn. The more exposure to best-practices and other frameworks, the more we can borrow from and employ them in our work, though it _is_ an investment to develop the expertise.

Jekyll works for us since the [team of savvy Savasians](/company#team) is comfortable rapidly learning a new workflow to publish updates to our website. Additionally our website needs are relatively simple, certainly compared to the needs of many of our partners. Our partners often have personnel with a wide range of technical training and often require sophisticated content models, granular authentication and permissions, advanced content publishing workflows among many other common needs for which a modular ecosystem of plugins like Drupal's would be better suited.

Alongside Jekyll, we used [Hologram](http://trulia.github.io/hologram/) developed by Trulia for our [style guide](/styleguide). It proved to be a great workflow for our designer, front-end developer and myself to interact efficiently and see updated results in the browser rapidly.

### Timing

And today... Today we celebrate our independ... no - we celebrate our redesigned website launch and the [Drupalcon Baltimore](https://events.drupal.org/baltimore2017) kickoff simultaneously! Coincidence? Of course not! However, I would like to give a shoutout to my entire team for making this happen on a tight schedule and an extra big-ups to Anne and Oksana who put in extra hours in the weeks leading up to make today possible. It was fun to be a part of the building process again; I found myself feverishly reloading the site every time new code was pushed up, which was often many, many times a day.

So now it's time to show off our fancy new website complete with business cards to boot! Tell us what you think [in comments](#js-expander-trigger) or on [Twitter](https://twitter.com/intent/tweet?text=We%20think%20the%20redesign%20is%20likely,%20nay,%20probable,%20to%20bring%20about%20world%20peace%20%F0%9F%8C%8F%20%E2%98%AE%EF%B8%8F%20Congrats%20%40Savas_Labs%21&source=webclient).

{% twitter https://twitter.com/Savas_Labs/status/854730073152385027%}
