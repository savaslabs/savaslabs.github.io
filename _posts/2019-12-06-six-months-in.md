---
layout: post
title: "Six months in: Revelations and Roadblocks as a Junior Developer"
date: 2019-12-06
author: Madeline Streilein
tags: front-end-dev philosophy best-practices accessibility tailwind
summary: Ever wondered what beginning a dev career at a web agency is like? One of our own shares hurdles, highlights, and tips as she reflects on half a year at Savas Labs.
description: Ever wondered what beginning a dev career at a web agency is like? One of our own shares hurdles, highlights, and tips as she reflects on half a year at Savas Labs.
image: "/assets/img/blog/madeline-six-mo-blog.jpg"
featured_image: "/blog/madeline-six-mo-blog.jpg"
featured_image_alt: "Photo by Suzanne D. Williams on Unsplash. Features butterfly chrysalis transitioning from cacoon to butterfly."

---

Today marks month six as a Junior Front-end Developer at Savas Labs. As it so happens, this week I also celebrate one year since I began to learn to code. Here are some hurdles overcome and lessons learned during that time. Excuse the clichés.

### RE: The role

#### It’s never too early to contribute to process improvement or documentation

I can’t stress the importance of documentation enough: in onboarding, for coding standards and workflow. One aspect I have found frustrating is when project documentation gets out of date. I have learned that it is quite challenging to balance the demands of being efficient on a project while documenting what's most relevant to others. Still, I choose to err on the side of more documentation as I believe it makes the team more efficient, especially when including project-specific information that would be hard to glean from a search.

Plus, seasoned developers tend to forget the need to explain tidbits that have become second nature to them. Take it upon yourself to add to documentation (READMEs, [GitHub gists](https://gist.github.com/), etc.) that would aid future developers in the onboarding process, and current developers on present or future assignments.

When I realized others could benefit from the things I learned about working with our website, I created a gist with instructions on how to update it. I have also contributed to various company-wide discussions, like our approach to the technical architecture of a project, the handoff that happens when designers pass of their comps to front-end developers, the front-end tools we should use, among other processes.

#### Vulnerability is an asset

My weaknesses include the fact I’m developing in a different language and framework than I trained in, a tendency to compare, and admittedly: impatience. I want to be a self-sufficient developer, and I want to be a self-sufficient developer _now_.

However, I know that comparing myself to developers with any multiplier of years of my experience won’t accelerate my growth. So I admit what I do not know and try my best to describe what I do. This can feel vulnerable, but the benefits are tremendous. I ask a lot of questions, and I’ve made it my mission to learn from every person on my projects. I’ve learned really sweet CSS tricks from [Alex](/company/alex-manzo/), Drupal custom module, and preprocess best practices from [Devan](/company/devan-chase/), project workflow from [Dan](/company/dan-murphy/), Drupal error resolution from [Brian](/company/brian-vuyk/), and a wealth of web accessibility knowledge from [Sean](/company/sean-oshea/). I especially love the repository of internal Q&A in the form of our #help Slack channel. I'm always impressed at how readily and thoroughly members of our team pitch in there.

#### If your company provides training time, you better utilize it

Savas allocates weekly training time for us as the role requires constant learning, regardless of tenure. There can be give and take when we're on tight deadlines, and I've learned it's important to make sure it stays a priority; another project could always use help. I have previously used my weekly allocation to get more familiar with Webpack, React Native, design systems, front-end architecture, web accessibility, and I have dove deeper into Drupal documentation that my peers sent me in the midst of PR reviews. The more you utilize given opportunities to hone in on your skills, the more value you’ll add to your team.

### RE: The job

#### Web accessibility development begins before you write the first line of code

Web accessibility, structuring the code's output to be as inclusive as possible on the web, is something Savas takes seriously: it's a [core value](/company/mission-and-values/#be-inclusive). Therefore, ensuring adherence to accessibility standards and best practices cannot be relegated to running a quick report at the end of a project. What I mean is this: say you have a component, a discreet visible (ideally reusable) thing on an app/webpage. On desktop view, this component displays as a triptych of cards showing information. On mobile view, this component should function as an accordion, with icons that toggle the component open or closed on user action, revealing additional information (that was visible without user action on desktop). The time to figure out how to make this component keyboard and screen reader accessible is before you sit down (or stand up, you standing desk-ers) to create said component in HTML, Twig, and the CSS/SASS/CSS framework of your choosing. The wrong time is after you’ve created the component without tabbing functionality or semantic HTML, reused the component in 5 other organisms within your [atomic design](https://bradfrost.com/blog/post/atomic-web-design/) component library, mapped to it in your Drupal node/paragraph template, written Javascript only for onClick toggle behavior, etc…

We have used Storybook, a component library, on [recent projects](/2019/10/11/storybook-pt-1.html). It provides real-time accessibility testing via an add-on called [a11y](https://www.npmjs.com/package/@storybook/addon-a11y). However, I strongly suggest going out of your way to become adept at developing accessible technology. A few good places to start: [The A11y Project](https://a11yproject.com/), Web Content Accessibility Guidelines [(WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/), Accessible Rich Internet Applications [(ARIA)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA). After Sean gave an insightful skillshare in November (more on that to come), I began practicing and testing my semantic markup skills and tag usage with random company landing pages.

As no accessibility tool will catch every issue with your web project, we incorporate the following tools into our QA process, in addition to manual review:
[VoiceOver](https://www.apple.com/voiceover/info/guide/_1124.html): Apple’s screenreader.
Browser Extensions:
[WAVE](https://wave.webaim.org/extension/)
[WGAG Color Contrast Checker](https://chrome.google.com/webstore/detail/wcag-color-contrast-check/plnahcmalebffmaghcpcmpaciebdhgdf)
[SiteImprove](https://chrome.google.com/webstore/detail/siteimprove-accessibility/efcfolpjihicnikpmhnmphjhhpiclljc)

I stand by this: if you develop in-accessible solutions, you are not an effective developer.

#### Front-end architecture is an art

Success as a front-end developer requires having a thorough understanding of the design comps provided to you. In the case of Drupal development, this means recognizing not just which paragraphs/taxonomy terms to reuse, but which design elements to reuse and which have variations. Success also relies on content-agnostic markup. Lorem ipsum may have been confusing from the context of mapping our documentation of required components to the designs in the absence of annotations, but it can definitely aid in creating content-agnostic markup.

How to make components that are both accessible and reusable? Semantic HTML and content-agnostic CSS.

I effectively went through 1-3 of [Adam Wathan’s phases of writing CSS](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/) in a matter of weeks. Ironically enough, we use [Tailwind CSS](/2019/11/06/using-tailwind-for-css.html) which Adam created, but historically we have not used it the way he intended. This was our process until recently:

- Develop individual components in Chrome DevTools with Tailwind CSS utility classes within the HTML file (Twig template, in our case)
- When it worked/looked the way we wanted, we’d replace the utility classes with content-specific BEM modifiers in the component’s Twig file
- We’d then copy over the Tailwind utility classes to the component’s SASS file to style the modifiers

This took a non-trivial amount of time and substantially slowed down Webpack, all in the name of cleaner template files and, though I may not have known it at the time, separation of concerns. We’ll be incorporating the later phases Adam describes in upcoming projects.

#### Drupal is a beast

At [Project Shift](https://www.projectshift.io/) they primarily trained us in the MERN (MongoDB, Express, React, Node.js) technology stack, plus vanilla JS, a little Backbone, and Bootstrap. The tech stack of my first full-time project in my current role was Drupal (PHP, Twig), Storybook, and TailwindCSS. I was in unfamiliar territory. Advice to be given, six months later:

- Confusing `make cim` (or `drush cim`) and `make cex` is not a question of if, but when. When you do, you will be sad, but life goes on.
- Truly, the best way to learn is by doing. I wrote my first PHP preprocess function when creating an interactive map component with layers of nested entity references.
- Drupal isn’t a walk in the park for senior Drupal developers either, so be kind to yourself. An example:

Months ago I implemented the footer on a client project. I was particularly proud of the PR. Except when I assigned the PR to our tech lead for review, he told me that even after following my testing instructions, he couldn’t see the content in the footer. In the words of every contestant on the Great British Baking Show: I was gutted. After some back and forth trying to troubleshoot what step I missed, we had a revelation. 

<div class="blog-image-full-width">
<img alt="Screenshot of a conversation between Dan and Madeline about why the code in her pull request wasn't working." src="/assets/img/blog/madeline-dan-slack.png">
</div>

<div class="blog-image-large">
<img alt="Screenshot of Dan explaining in a pull request review how to configure a custom footer block in Drupal." src="/assets/img/blog/drupal-footer-troubleshoot.png">
</div>

Props to Dan and his always-thorough code reviews; they are a great learning opportunity.

#### Development is like riding a bike

Nuggets from my back-end training come in handy every once in a while. At the conclusion of our most recent team retreat, which we call a [parliament](2019/11/08/parliament.html), we wrapped it up with Savas's first hackathon, Hack-to-the-Future:tm: ! _(If you're thinking Delorean, you're right!)_. My team, consisted of Drew on design, Dan (yes, code review Dan from above) on back-end development and myself on the front-end while Jordan assisted with capturing our work. We decided to build a decoupled web app with a Drupal back-end. After running into some challenges as one does when building anything for the first time, I Googled my way to a solution for a CORS error that was thrown when I attempted to make an HTTP GET request to our Drupal endpoint. Though I haven’t dealt with Drupal on the back-end, my experience with Node.js and the CORS library proved fruitful. The [solution](https://www.drupal.org/node/2715637#comment-12284397), coincidentally, was written by a former Savas Labs partner (Thanks Justin!).

Nuggets from product development at my fellowship still apply as well, and I didn’t realize how much until the same hackathon in the fall. A reminder: trust your gut if you know something will take longer than is estimated, no matter how new to the team you are. If you know you can’t make a multi-view web app in seven hours with a well-oiled team and technology you know well, then trust that you won’t be able to do it with a new team and new technology. With that being said, there are times to ignore your gut. There are times when instead you should…

#### Take Risks

You could decide to preserve your sanity for the sake of a polished output or you could shoot for the moon, fail, and learn a metric ton about the stars that you wouldn’t have otherwise (_cringe_). I’ll set the scene:

**What we had:** Figma mobile mockups taken from Material Design UI Kit, a front-end developer, a back-end developer, and a designer.

**What we faced:** 7 hours until the demo

**What we were building:** A decoupled React - Drupal web application

**What we used:** [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) to save hours that we'e need to configure Webpack

**What we didn’t know, and what we learned (chronologically) as our seven-hour mark neared:**

1. [Material Design Web](https://material.io/develop/web/) is incompatible with Create React App unless one ejects due to the need to edit the webpack.config.js
2. Material Design React works with CRA but doesn’t have all the same components at Material Design Web, such as the data table which was integral to our entry log comps
3. Neither Material Design Web nor Material React Web has all the same components as Material Design for mobile apps.
4. We didn’t _think_ we needed centralized state management when we started, but we did.
5. There wasn’t enough time to style.
6. There wasn’t enough time to connect to the back-end to get real data.

To meet our 5 p.m. deadline, we could have attempted just the entry log view, and the create entry functionality. We could have made a pretty simple node webserver with one GET and one POST endpoint to handle fetching all the logs and adding a new one, without having to deal with authentication. We could have styled the log and the new entry form from scratch, and been able to present our working single-purpose app…

…BUT this strategy wouldn’t have exposed us to the nuances of Material Design, a new-to-us component library, the downsides of Create React App, or given us practice with a decoupled Drupal app. Our demo result wasn’t what we envisioned, but we made a great effort, were exposed to the complexities of one another’s roles, and now have a greater understanding of the tools we tested. Also, in that shooting for the moon, I've been inspired to pick up where we left off on a few weekends since, and I hope we can have something to show sometime early next year.

### What’s Next

I’m in the midst of a React Native project, and there are big things on the horizon. Now that I’m more comfortable in Drupal, I look forward to honing in on front-end architecture, accessibility, trying out new tools, and of course, further contributing to internal processes.

