---
layout: post
title: Drupal 8 turns 2. Are you taking advantage of it yet?
date: 2017-10-27
author: Chris Russo
tags: drupal drupal8 drupal-planet
summary: Drupal 8 has been around for almost two years. We take a look at where it's been and where it's going.
featured_image: "/blog/drupal-7-outweighs-8.jpg"
featured_image_alt: "Drupal 7 outweighs Drupal 8 in 2016"
drupal_planet_summary: |
  Drupal 8 has been around for almost two years. In the first of a two-part series, we take a look at how successful Drupal 8 has been. In the second, we'll investigate its future value and the cost of developing on older platforms.
disclaimer: |
  This article provides some criticism of rose-colored lens Dries used when evaluating Drupal 8's adoption in several instances in 2016. However, after having listened to the [#Driesnote at DrupalCon Vienna from September 2017](https://events.drupal.org/vienna2017/driesnote) in which he presents a more balanced analysis on Drupal 8, I realized my North-American-centric focus on DrupalCons limited my contemporary analysis. I recommend his talk. Ultimately, Dries and I come to the same place of optimism for the future using oddly similar language. Who knew?
---

Drupal 8's official release was [nearly two years ago](https://www.drupal.org/blog/drupal-800-released), and many ask how is it doing? Has it lived up to its ambition to revolutionize Drupal websites?

In the first of a [two-part series](/2017/11/08/cost-of-drupal-7.html), we'll provide our insight into the evolution of Drupal 8 over its first two years in the wild. In [part two](/2017/11/08/cost-of-drupal-7.html), we'll look at important factors to consider in your Drupal investments going forward.

## (Drupal) Change is hard

To launch a website (much like [to rock a rhyme that's right on time](https://www.youtube.com/watch?v=l-O5IHVhWj0)) is tricky; to operate a web system in a way that uplifts your organization is _just plain hard_. Although keeping up with the most current software is typically advisable, there _are_ costs to doing so, even for free software like Drupal. Without the vendor lock-in that comes with proprietary Content Management Systems, Drupal site owners have a high degree of freedom to consider how best to invest their web resources. However, this freedom also has a price (see a pattern emerging?) in the form of **time** and **stress** incurred from the responsibility to select the best digital tools to drive your organization for years with _limited_ information to evaluate the nearly _limitless_ options.

Of the [1 million+](https://www.drupal.org/project/usage/drupal) organizations whose main window to the digital world is powered by Drupal, many have priorities that compete in time and budget with web system investments. When considering these priorities, determining the right time to invest in an improved user experience, design, feature-set, or software upgrade can be difficult.

With the ever-increasing complexity and interconnectedness of the software systems we build, even the world's most prominent organizations, often with legions of engineers, have [had](http://www.businessinsider.com/6-software-updates-that-went-wrong-2015-12/#a-small-update-to-the-iphones-software-last-year-caused-thousands-of-phones-to-lose-their-cellular-connections-1) [colossal](https://www.nytimes.com/2016/05/19/technology/personaltech/why-windows-10-upgrades-go-wrong-and-how-to-avoid-it.html) [mishaps](https://www.usatoday.com/story/tech/columnist/2016/03/07/how-recover-iphone-update-gone-bad/81427214/) with [upgrades](https://arstechnica.com/information-technology/2017/08/500-smart-locks-arent-so-smart-anymore-thanks-to-botched-update/). By default, upgrades are not easy.

> To upgrade or not? _That_ is the question.

Like any decision, whether you're building new or upgrading, the fundamental question is: do the benefits outweigh the costs? In the specific case of investing in Drupal the question becomes: _when_ does making the leap to Drupal 8 rather than continuing to invest in Drupal 7 (or possibly 6… don't tell me it's 5 :wink: ) outweigh the costs to take that leap? For any organization to properly answer that question, it's necessary to look 3-5 years out with regard to budget and organizational goals. It's also helpful to better understand how the broader community has approached this same decision over the past two years. Let's take a look.

## Taking stock of Drupal 8's adoption

![stock market image]({{ site.url }}/assets/img/blog/stock.jpg)

After nearly two years since its public release, how has the adoption of Drupal 8 gone?

### Analysis from the top

Before DrupalCon North America in May 2016 in New Orleans, Drupal founder and current project lead Dries Buytaert [blogged that Drupal 8 was doing "outstanding,"](https://dri.es/how-is-drupal-8-doing) citing statistics to substantiate his optimistic view.

> Based on my past experience, I am confident that Drupal 8 will be adopted at "full-force" by the end of 2016.

Many in the community contested the veracity of his optimism in the article's comments and I [commended Dries](https://dri.es/how-is-drupal-8-doing#comment-125541) (yes that's me and not [him](https://twitter.com/MadDogUnleashed), and definitely not [him](http://www.tvguide.com/news/apprentice-trump-russo-39885/)) for facilitating an open conversation that elicited a broad perspective.

About a month later, some six months after Drupal 8 was released, Savas Labs attended DrupalCon NOLA.

{% twitter https://twitter.com/Savas_Labs/status/729504649233899521 %}

During the [perennial "Driesnote,"](https://youtu.be/Ksp5JVFryEg?t=464) Dries continued to present Drupal 8 as well on its way to match if not exceed the success of Drupal 7.

> I really truly believe, Drupal 8 will take off. My guess is that by the end of this year [2016] Drupal 8 will serve an escape velocity... it will become the de facto standard.

and

> The new architecture, features, as well as frequent releases: all of these things make me feel really, really optimistic and bullish about Drupal 8.

### Adoption by the numbers

According to the [usage statistics](https://www.drupal.org/project/usage/drupal) available on the Drupal website, when writing this nearly 80% of the world's Drupal websites were powered by version 7.

![drupal stats d8]({{ site.url }}/assets/img/blog/drupal-version-graph.png)
  <span class="caption"> A graph started by [Angie Byron of Acquia](https://docs.google.com/spreadsheets/d/1ETrxAEHgLepeCR8WhuMDrWba1IKXJGd32Lq0hh5szjs/edit#gid=93393428) that I updated to present. <br>

When Drupal 7 was released on January 5, 2011, there were already more Drupal 7 sites than sites powered by the major version two releases prior: Drupal 5 (A). The same feat for Drupal 8 took over nine months after its release to achieve (C). Total Drupal 7 sites eclipsed total sites of its predecessor version (6) about 13 months after the release of Drupal 7 (B). After nearly 2 years from the release of Drupal 8, it has not yet eclipsed Drupal 7 installations, and at present there are over 700,000 _more_ Drupal 7 sites than Drupal 8.

#### Our take on Dries's bullish-ness

To his credit, the future is notoriously difficult to predict, and even when predicting it, Dries spoke of the significant work that lay ahead to see his vision come to fruition. He also made the referenced comments well over a year ago, and I'll concede speaking in hindsight is infinitely easier. Having said that, comparing the total number of upgraded Drupal 8 sites to Drupal 7 sites over the same period from release in a community that had grown ~220% since Drupal 7's release, while factually indisputable, was probably not as accurate as using adoption percentages to analyze overall trends.

Even the most conservative interpretations of "escape velocity" or "full-force" would have to concede that we're at least a year behind Dries's hopes when he was reporting from DrupalCons Barcelona and New Orleans on impending rapid Drupal 8 adoption. But, what's a dictator worth his salt to do, [benevolent](https://randyfay.com/content/how-do-open-source-communities-govern-themselves) or not, other than to [stretch the stats](https://www.huffingtonpost.com/paul-jarvis/8-out-of-10-statistics-ar_b_6516014.html) a bit to show what he would like to be true for his beloved community, from which he also profits?

#### Our assessment

After two years, the data unequivocally show, as I began discussing [at DrupalCon New Orleans](https://events.drupal.org/neworleans2016/sessions/total-value-ownership-drupal-8-and-beyond), the rate of Drupal 8 adoption is objectively slower than Drupal 7. At this point, a majority of organizations have not yet upgraded from 7 to 8, though likely many have begun efforts. Taking a simplistic view, this means Drupal 8 has either been more costly to upgrade, a comparatively less valuable product, or perhaps both.

Regardless, since it matters to our partners, we found it important to explore the reasons behind the slow adoption rather than to pretend it's not happening. After architecting Drupal 8 web systems for 2.5 years, we have gained insight into the relatively slow adoption.

## Drupal 8 adoption challenges

Drupalers haven't written much about the retrospective analysis of the Drupal 8 adoption challenges. But without being able to take a real, honest look inward, we cannot improve. We must know thyself because the examined Drupal problems are worth fixing! We highlight here the most prominent challenges that have slowed Drupal 8 adoption.

### 1. Complete code re-architecture

The [massive shift of the underpinnings of the Drupal code](https://dri.es/why-the-big-architectural-changes-in-drupal-8) is a decision that has long been debated within the community. There's no question it has proven a challenge for proficient Drupal 7 developers to develop on Drupal 8: for most, substantial training and learning is required. Training takes time, and time can often mean money. The loss in short-term efficiency for seasoned Drupal developers made early adoption riskier, and typically added to a project's expense. Joining with other prominent frameworks known outside of Drupal like Twig and Symfony (colloquially referred to as "[getting off the island](https://www.garfieldtech.com/blog/off-the-island-2013)") was a collective decision by wise Drupal leadership with the long-term value of the product in mind, but in the short-term, for the average Drupal developer, it meant more new things to learn.

### 2. Slow contributed module porting

Historically Drupal has derived much of its usefulness from the rich contributed module ecosystem that extends the features of Drupal core. Contributed modules, although crucial to most live Drupal websites, by definition are not directly driven by those that oversee Drupal core development. This disconnect invariably leads to some important modules not having a usable upgraded version when a new major version of Drupal core is released. This is well-known within the Drupal community, [explained at great length by Angie Byron](http://webchick.net/node/129) (second reference), and not unique to the Drupal 8 release. Tremendous amounts of individual and community efforts are required to upgrade modules to the latest major version. Due to [#1 from above](#complete-code-re-architecture), these efforts were further exacerbated by the re-architecture. Costs to upgrade even one module (it's common for a Drupal 7 site to use 100) are often greater than clients or agencies are willing to absorb on a given project.

### 3. Incomplete upgrade path

We often describe websites as comprised of three main asset groups: the **code** (Drupal core, contributed and custom modules), **files** (think media assets like images), and the **database** where content and site configuration lives. When upgrading, you download the new Drupal code, which has a set of instructions that must be run to apply complex updates to the database. Files remain unchanged. A well-oiled upgrade process is required to update the content and configuration from the site being upgraded into a format intelligible to the new system. The approach to perform those upgrades [has also changed in Drupal 8](https://www.drupal.org/docs/8/upgrade/upgrading-from-drupal-6-or-7-to-drupal-8) to what is now referred to as "a migration". As of the [most recent minor release of Drupal 8](https://www.drupal.org/blog/drupal-8-4-0) in October states:

> …Drupal 6 to 8 migration path is nearing beta stability. Some gaps remain, such as for some internationalization data. The Drupal 7 to Drupal 8 migration is incomplete but is suitable for developers who would like to help improve the migration and can be used to test upgrades especially for simple Drupal 7 sites. Most high-priority migrations are available.

"Nearing beta stability" after two years out from release is not ideal though it is reality since perfecting these migration tasks is hard work. One can discern from the Drupal 7 -> 8 migration snippet that it's clearly further afield, and for those who need to preserve their content, perhaps a non-starter for a 7 -> 8 upgrade. The inability to efficiently update database structures adds to project expense. Whatever doesn't come over "for free" with the migration will need to be manually replicated by a human, and humans are costly, as our time is precious.

### 4. Stance on backwards compatibility

Drupal's approach to backwards compatibility is famously "[for data, not code](https://www.drupal.org/node/2613652)". Briefly put, in their words: "While the upgrade path will reliably preserve your data, there is no backward compatibility with the previous Drupal code." If you want to dig deeper, there's a lot of [good](https://dri.es/backward-compatibility) [discussion](https://www.drupal.org/core/d8-bc-policy) [on](https://www.drupal.org/blog/the-transformation-of-drupal-8-for-continuous-innovation) [this](https://www.drupal.org/core/d8-allowed-changes#bc-break) [topic](https://events.drupal.org/baltimore2017/sessions/backwards-compatibility-burden-benefit).

[WordPress's approach](https://make.wordpress.org/core/handbook/about/release-cycle/version-numbering/), perhaps more than anything, explains [its ubiquity](https://trends.builtwith.com/cms) and [ability to better keep sites on the latest version](https://wordpress.org/about/stats/). In their words:

> Major releases add new user features and developer APIs. Though typically a “major” version means you can break backwards compatibility (and indeed, it normally means that you have), WordPress strives to **never** break backwards compatibility. It’s one of our most important philosophies, and makes updates much easier on users and developers alike.

Albeit a bit confusing, even for the non-technologist, you get the sense they're more worried about breaking stuff and want upgrades to Just Work&trade;. The strength of the Drupal approach is it allows for more innovation, and in some ways, less baggage since preserving backwards compatibility often means hanging on to outdated code. The trade-off is, once old code is determined to be holding innovation back, it's cast to the side, and new structures must be implemented in the updated version. Historically, this paradigm has caused many to get stuck in an outdated Drupal version for longer than they'd like because they cannot afford an upgrade.

### 5. Inertia, perceived value, and expense

A modern organization is focused on more than _just_ their website, and for investments that don't deliver direct, visual, tangible change, stakeholders often overlook them, even when they may present value. Examples where the value is oft-invisible to clients are investing in an automated testing framework that ensures perpetual site integrity, or vigilantly applying security updates as they become available. In either case, the client may perceive them as optional, but foregoing them is likely to cost the organization in the long-run.

Since Drupal only provides security support for two major versions at a time (presently 7 and 8), for many, the prime motive for a new release, often framed as a mandate, is to upgrade from the version two major releases prior, which has fallen out of support. When Drupal 8 came out, Drupal 6 fell out of support after a [grace period of three months](https://www.drupal.org/forum/general/news-and-announcements/2014-06-18/drupal-6-extended-support-announcement), generously extended from the day of release given some of the [community's recognition](https://www.drupal.org/node/2136029) of some of the challenges we've documented here.

If an organization doesn't heed the security warnings, and doesn't find enough value in the new features, they may choose to ignore the upgrade completely. The truth is it's hard to estimate the future risk of using outdated software. However that [future risk is very real](https://www.csoonline.com/article/2130877/data-breach/the-16-biggest-data-breaches-of-the-21st-century.html), and digital security compromises show no signs of slowing down. Savas Labs always advocates for timely security coverage, but it has not always been a budgetary possibility for our partners to upgrade from Drupal 6 to Drupal 8 upon release of 8.

### An answer to the Drupal 6 problem

In addition to our experience, the usage data show many organizations did not plan sufficiently to upgrade from Drupal 6 to 7 or 8 upon Drupal 8's release. Recognizing that, a Drupal agency My Drop Wizard set up [long-term security support](https://www.mydropwizard.com/drupal-6-lts) for the many Drupal 6 sites that were not ready to upgrade to Drupal 8. It's debatable whether or not this was a good thing for the community. People forced to change, often will change sooner than they would otherwise, but they may resent you for it. Conversely, you'd be hard-pressed to find an MDW client who didn't experience anxiety relief when offered an inertia-compliant alternative.

Organizations that don't perceive opportunity in the value the new software provides will look at an upgrade strictly as an expense to avoid, likely citing topics we've covered here.

## Takeaways

Through experience and analysis, we see there are many understandable and justifiable reasons why many organizations haven't yet upgraded to Drupal 8. Now that we've done the hard reflection, the good news is that the present is a much brighter place for not only Drupal 8 but all future versions of Drupal. We have made it through most of the difficult growing pains, and there's great reason to believe that the community has invested wisely in the future. In [part two](/2017/11/08/cost-of-drupal-7.html), we cover the costs of investing in Drupal 7, and why it's probably time to move to Drupal 8.

