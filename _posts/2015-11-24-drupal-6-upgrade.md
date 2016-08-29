---
layout: post
title: "It's nearly 2016, your site is running on Drupal 6, now what? Part 1: The overview"
date: 2015-11-24
author: Chris Russo
tags: drupal drupal8 drupal-planet
summary: What to plan for as Drupal 6 EOL approaches.

---
This is part 1 of a series investigating what to do with your Drupal 6 site as
EOL approaches.

**Part 1 - overview** \|
[Part 2 - the risks](/2015/12/10/drupal-6-part-2.html)
 \| [Part 3 - the options](/2016/01/25/drupal-6-part-3.html)
 \| [Part 4 - Drupal 7 or 8?](/2016/02/24/drupal-6-part-4.html)

*****

## The issue at <img src="/assets/img/blog/hand.png" alt="hand">

As most Drupal 6 site owners are aware, after a [prolonged development period](https://www.drupal.org/core/dev-cycle), Drupal 8 was officially released ([8.0.0]((https://www.drupal.org/node/2619030))) last week on November 19th, 2015
[Dries's birthday](https://en.wikipedia.org/wiki/Dries_Buytaert) with a corresponding many, [many a lively party](https://twitter.com/hashtag/Celebr8D8?src=hash):
<img src="/assets/img/blog/celebr8d8.jpg" alt="Drupal 8 celebration #celebr8d8">
<span class="caption">Like this fancy one in downtown Durham atop the rooftop bar of [The Durham Hotel](http://thedurham.com/).</span>

Drupal 8.0.0 is a [**BIG DEAL**](http://celebratedrupal8.com/) and generally speaking is great for the community of Drupal site owners and site builders.

However (there's always a but), with the official release of Drupal 8,
**support for Drupal 6 will end on** [**February 24th, 2016**](https://www.drupal.org/drupal-6-eol). Given the U.S. holiday
season has begun, there is little productive time remaining to undertake a site upgrade before Drupal 6 End Of Life (EOL). If you are a site owner fortunate enough to have survived a Drupal site
upgrade in the past, you are well aware that the upgrade process can be time-intensive for complex sites. It is _never_ as easy as the click of a button. For most Drupal 6 site owners, it is the fact
that their sites _are_ so complex that they have avoided going through the upgrade process for as long as possible.

This presents **responsible** yet **practical** site owners who don't have unlimited budgets with difficult decisions, each with associated
pros and cons to weigh. In **part 1 of this series**, we'll help walk you through the following topics at a high-level,
 with a follow-up post examining each topic in finer detail.

 + What does Drupal 6 EOL mean for me?
 + What are the risks to not upgrading?
 + What are my options?
 + Should we upgrade to Drupal 7 or Drupal 8?
 + How do we decide what to do?

**N.B.**: if you don't fit into the aforementioned category of having budgetary constraints, please [**contact us immediately**](/contact). ;)

### What does Drupal 6 EOL mean for me?

Like any good (and probably the bad too) Drupal advisor will tell you, **it all depends**. Helpful, right? But truly, it's necessary to understand the
organization and its
technical requirements very well to assess the risk of operating a Drupal 6 site after EOL.
As an agency that leverages open source technology to build modern web applications, on a daily basis Savas relies on the Newtonian

> ...shoulders of giants...

to perform sophisticated tasks with the click of a button (or more likely a command in the terminal). That Drupal community that we access and contribute to
 for features
is the same one that provides security maintenance. After EOL for Drupal 6, that click of a button access goes away both for features, but more importantly
 for security fixes. In other words, it means (_almost_) **no one is watching** Drupal 6 after February 24th 2015. For sustainability purposes, that huge community
 ([~100,000 active contributors](https://www.drupal.org/#community-stats)) must use its time and energy to support the newer platforms.

#### State of Drupal 6 sites in production

Drupal 6 has been around for a long time. As of mid November 2015 there are at least
[~125,000 reported instances](https://www.drupal.org/project/usage/drupal) ([likely underrepresented](https://www.drupal.org/node/329620)) of
Drupal 6 sites in the wild. So you are not alone (...I am here with you...) and there is some comfort in that. If you're reading this and have not
begun your upgrade process yet, it is **very** likely you will be spending at least some time outside of support for your Drupal 6 site.
We dive into this at a deeper level in [part 2](/2015/12/10/drupal-6-part-2.html), but some of the factors that are worth taking into consideration as you strategize the upgrade are:

##### Considerations to assess risk
+ How well-known is your organization?
  + Larger organizations with high public profiles are systematically targeted more frequently than smaller, lesser-known organizations.
+ How many contributed modules does your site utilize and how well supported are those modules?
  + Attack vectors that remain for Drupal 6 are likely to be modules that have not received a lot of historical support, but are in some way identifiable to the public when they are in use on a site.
+ How much does your site rely on custom code?
  + Custom code has the advantage of not being publicly known, but the large disadvantage of only being vetted by one site.

### What are the risks?

High-level risks, more closely examined in [part 2](/2015/12/10/drupal-6-part-2.html) are as follows from most severe to least.

+ Complete site compromise and control with consequences dictated by the whim of a hacker.
+ Site incompatibility with mandatory server security upgrades that fall out of sync with Drupal 6 (PHP 7 comes out in late 2015).
+ You do not keep up with modern web development practices. After all, Drupal 6 came out [January 1st, 1970](http://stackoverflow.com/questions/1090869/why-is-1-1-1970-the-epoch-time) ([I just checked](https://www.drupal.org/drupal-6.0)) and given that makes it older than 6 months on the web, it's ancient.
+ You expose yourself to a decreasing market of developers that are able to serve you. With each major release, especially two in row (7 and 8) with significant architectural modifications to the former,
skills honed in development for the current version of the software, provide diminishing returns the further back in versions you go.

### What are my options?

In considering a Drupal 6 upgrade you have a few simple options.

 + Do nothing, and keep your fingers crossed.
 + Upgrade Drupal 6 core to a supported version (probably Drupal 7) and match existing functionality.
 + Engage a robust redesign/rebuild (Drupal 7 or 8).
   + Simultaneously harden the site to best mitigate attack vulnerabilities as the rebuild may take 6-18 months to complete.
 + Select a different solution than Drupal, and migrate to that.

### Drupal 7 or Drupal 8... heck, what about Drupal 9?

This is another one that, I know...shocker, depends. The factors that effect this choice we discuss more in [part 2](/2015/12/10/drupal-6-part-2.html) are:

 + **Organizational tolerance for risk**: Drupal 8 is less tested, and is inherently riskier earlier on in the life cycle of your site.
 + **Willingness to support community**: In some cases Drupal 8 contributed modules will need extra polish to be up to production snuff.
 + **Complexity of site**: Drupal 8 **core** has many more bells and whistles, but the contributed module landscape has a long way to catch up to Drupal 7.
 + **What is the future/life of the site**: Drupal 8 is much more forward-thinking in its approach, whereas though vetted, Drupal 7 is over 4 years old.
 + **Existing developer's skill set**: Drupal 8 architecture, coding style (object oriented) and PFE (proudly found elsewhere) approach that leverages strengths from the rest of the PHP community all mark
 substantial shifts from Drupal 7. Therefore the skills required to succeed in these two realms differ.
 + Get out of here with that Drupal 9 talk! It's neither prime nor even!

## What is our recommendation?

If you feel lost in these concepts or with answering some of these questions on your own, it's best that you [speak with professionals](/contact) who
have years of experience maintaining and upgrading Drupal sites. The upgrade process
is a highly variable one, and is not especially easy to estimate as it is much more nuanced than typical feature development.

Reaching EOL for your existing Drupal site is a time that we encourage site owners to look at the process like **moving into a new and better home**.
It's best to take the time to envision and create what you want in the new space, rather than thoughtlessly replicate what you had in the old.
Why make a carbon copy when you had good reasons to make the move after all (even if you were technologically strong-armed by volunteers)? It's very common to have
features and custom development that have outlived their usefulness to your organization's mission; so it's a good time to purge. Out with the old, in with the new!

Having said that, the desire to preserve content from the existing site is very common and often necessary. There are advanced
migration techniques available from Drupal 6 to Drupal 7 or Drupal 8 that may be entirely separated from the rest of the rebuild, so porting content
and matching site functionality can be completely decoupled.

We **love talking through this process** with site owners. We analyze what makes the most sense for your organization while addressing priorities for both short and long term goals.
We have been building sites in Drupal 8 since May 2015 and sites in Drupal 7
since 2010 so we are well versed to the pros and cons of each. [Reach out](/contact) to further discuss, continue on to [part 2](/2015/12/10/drupal-6-part-2.html) and stay tuned for part 3.

*****

**Part 1 - overview** \|
[Part 2 - the risks](/2015/12/10/drupal-6-part-2.html)
 \| [Part 3 - the options](/2016/01/25/drupal-6-part-3.html)
 \| [Part 4 - Drupal 7 or 8?](/2016/02/24/drupal-6-part-4.html)
