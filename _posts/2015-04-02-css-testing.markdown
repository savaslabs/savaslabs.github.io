---
layout: post
title: "CSS testing techniques and tools"
date: 2015-04-02
author: Anne Tomasevich
tags: css testing
summary: Writing CSS is easy. Writing good, semantic, DRY CSS, all while avoiding unintended changes elsewhere on your site, is not so easy. Since automated testing is a high priority to our team, I set out to research CSS testing techniques that we could integrate into our workflow. There are plenty of tools out there, so I've reviewed the ones most ideal for our shop.
---

Writing CSS is easy. Writing good, semantic, DRY CSS, all while avoiding unintended changes elsewhere on your site, is not so easy. Since automated testing is a high priority to our team, I set out to research CSS testing techniques that we could integrate into our workflow. There are plenty of tools out there, so I've reviewed the ones most ideal for our shop.

##### Criteria:

> 1. Must be relatively quick to install and configure. We're a small team generally dealing with 100-300 hours per project and we can't devote much of that to setting up our CSS testing platforms.
> 3. Ideally would be applicable to dynamic sites. Many of the techniques available involve comparing a local or development site to reference images, which become rapidly outdated for sites with dynamic content like news, posts or social media feeds. Since we're primarily a Drupal shop, we need to be able to run tests that don't break with changing content.   

##### Testing methods:

> - Syntax checks    
> - House/project styleguide    
> - Image diff    
> - Computed style

Note: most of the techniques I tested require the node package manager (npm) for installation. Check out <a href="https://docs.npmjs.com/getting-started/installing-node">the npm docs</a> for installation instructions.


#### Syntax checks & house/project styleguide

##### CSS Lint 

<a href="https://github.com/CSSLint/csslint/wiki/Command-line-interface">CSS Lint</a> is a command line tool that points out CSS syntax errors, testing the targeted CSS files against a set of rules. Out of the box these rules are based around Object Oriented CSS, so your opinion of OOCSS will likely determine how useful you find CSS Lint. As it says on the <a href="http://csslint.net/">online version</a>, it may hurt your feelings.

That said, CSS Lint is entirely customizable so rules can be created, edited, or omitted. This is where either a house or project-specific styleguide would come in handy. The team can agree on these rules and test their CSS against that ruleset.

##### StyleStats 

<a href="https://github.com/t32k/stylestats">Stylestats</a> provides stylesheet statistics and is useful in tandem with CSS Lint. It works on single stylesheets or a directory of them, or globbing can be used (don't forget the quotes, e.g. `stylestats 'styles/*.css'`). Stylestats will report the number and size of your stylesheets, simplicity (# rules/# selectors), unique font sizes, number of ID selectors used, and other pertinent information.


#### Image Diff

Tools using this technique take screenshots of the local/dev/staging site and compare them to a baseline via PhantomJS, a headless browser.

##### BackstopJS

<a href="https://github.com/garris/BackstopJS">BackstopJS</a> wraps ResembleJS, another Image Diff tool, in a nice, user-friendly interface. It uses Gulp - a Javascript library for automating tasks - to create a reference image set, then run a test. This can be done in any environment and the config file can be reused across environments by simply updating the test site URL. Dynamic content can cause failed tests, but selectors can be ignored to avoid this.

BackstopJS is a cinch to install and configure (<a href="https://css-tricks.com/automating-css-regression-testing/">this article</a> by Garrett Shipon, the author of BackstopJS, is a good walkthrough), and the test command opens a report with a list of passed and failed tests and diffs of the failed tests, so any unintentional regressions are quickly pinpointed. 

##### Wraith

Created by BBC News, <a href="http://bbc-news.github.io/wraith/index.html">Wraith</a> compares a local/dev/staging site against the live site, much more useful for sites with dynamic content than a set of baseline images that would quickly become outdated. A major downside is that the testing process is more manual than Backstop since Wraith doesn't output a report - the CLI states whether or not there were failures, but it's up to the tester to find them in individual images or a gallery of all the diffs. The image diffs show differences down to the pixel in bright blue, but they still have to be found manually. Still, Wraith would be a valuable tool for large Drupal sites. For smaller or non-Drupal sites, I'd stick with Backstop.


#### Computed Style

##### Hardy 

<a href="http://hardy.io/">Hardy</a> tests CSS via Cucumber story files. These easy-to-understand files are the greatest benefit of Hardy because everyone on the team or on the client side, regardless of technical knowledge, can understand and agree upon the tests. A cool feature of Hardy is selector maps, setting a selector to a meaningful name (so article > h1 becomes 'Article title'), making the tests even more readable. Hardy can be used in the command line or integrated with Travis CI, automating the testing process.

Because of the time-consuming nature of creating the tests, I would reserve the use of Hardy for large theming projects in which avoiding CSS regression errors is key.


#### Further reading

>- <a href="http://csste.st/">csste.st</a> - A good place to start.
>- A nice <a href="https://css-tricks.com/automatic-css-testing/">summary</a> of automated testing techniques.
>- An excellent introductory <a href="http://code.tutsplus.com/tutorials/object-oriented-css-what-how-and-why--net-6986">tutorial</a> on object oriented CSS.

