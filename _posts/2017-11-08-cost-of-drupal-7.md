---
layout: post
title: "The cost of investing in Drupal 7 - why it's time for Drupal 8"
date: 2017-11-08
author: Chris Russo
tags: drupal drupal8 drupal-planet
summary: While there _were_ compelling reasons to build in Drupal 7 in the past, we discuss why, for most, it's time to move on to Drupal 8.
featured_image: "/blog/drupal-8-outweighs-7.jpg"
featured_image_alt: "Drupal 8 outweighing Drupal 7 on a scale"
drupal_planet_summary: |
  In the second of a two-part series, we investigate Drupal 8's present value and help highlight sometimes hidden costs of developing on an older platform.

---
This is part two of a two-part series.

In [part one](/2017/10/27/drupal-8-turns-2.html), we discussed how Drupal 8's adoption in its first two years was a bit lackluster compared to what many expected. Grounded in a better understanding of the shortcomings of the past two years, we'll try to equip those of you considering Drupal 8 with the information you need to make the best decision for your organization as you continue to invest in the powerful framework of Drupal.

![Image of Drupal 8 adoption curve]({{ site.url }}/assets/img/blog/drupal-early-adopter-vs-majority.png)<br>
<span class="caption"> Credit: Angie Byron AGAIN on ["Everything you need to know about the top 8 changes in Drupal 8"](https://www.slideshare.net/AcquiaInc/acquia-d8-webinar/58) from May 2015 </span>

Drupal 8 adoption is certainly no longer in the "early adopter" phase, yet we still haven't entered the "majority" phase. For most organizations not yet powered by Drupal 8, our stance is: **it's probably time to upgrade**. The value you're missing out on with the newer software _is real_. Perhaps less obviously, if you're investing in your Drupal 7 site beyond passive maintenance, you may well be doubling your long-term costs by deferring and exacerbating what will need to be refactored later. For organizations who have web staff, work with an agency, or do any non-trivial customization to their Drupal website, this applies to you.

#### A disclaimer upfront

Drupal agencies like ours benefit from upgrades in the short-term because they are usually a substantial undertaking. This fact, in part, is why over the past two years people have written more often about encouraging an upgrade to Drupal 8 rather offering a more holistic and measured perspective. A small dose of healthy skepticism typically serves site owners best. If Savas Labs is to live into its [values](https://savaslabs.com/company/mission-and-values/#be-respectful) we _must_ factor in the needs of two other stakeholder groups when advising on an upgrade: our clients, and the collective Drupal community. Given the [substantial effort to upgrade](/2017/10/27/drupal-8-turns-2.html#inertia-perceived-value-and-expense), if we focus solely on the short-term, we do our clients a disservice. In doing that, the next time those site owners and admins have the option to select a tool to power their web systems, they may look elsewhere remembering their pain and disappointment in recent experience. This ripple effect has the potential to create many former Drupal users. Imbued with the [open source ethos](http://www.agrowingculture.org/open-source-ethos/), we believe we owe it to the broader Drupal community from which we've gained so much to consult with honesty and integrity.

## What you're missing out on

As [we discussed in part 1](/2017/10/27/drupal-8-turns-2.html#complete-code-re-architecture), we lived through the challenges of the complete re-architecture of the Drupal application from 7 to 8.

Angie Byron, the person I apparently can't stop referencing, said in 2013:

> For people who grew up learning PHP on Drupal, and there are a lot of people for whom that's true, I think Drupal 8 will be kind of a big adjustment for them.

Though it wasn't easy, at Savas Labs we feel strongly that it was a wise investment that's just beginning to pay off. At this point in its maturation, we believe now (as [other Drupal leaders](https://www.lullabot.com/articles/the-cultural-construction-of-drupal) have [felt for some time](https://www.garfieldtech.com/blog/dropping-forward)), that Drupal 8 is superior to previous versions in nearly all use cases for which organizations currently use Drupal. Some argue that Drupal 8 has [become too complex](https://www.mydropwizard.com/blog/drupal-sucks-non-profits) and [left smaller sites behind](https://www.mydropwizard.com/blog/drupal-8-has-left-small-non-profits-behind-how-can-we-fix), but it's important to consider [their incentives](https://www.mydropwizard.com/comment/410#comment-410) for a well-rounded perspective. Via Acquia, Pantheon and other hosting providers, you can serve up a Drupal 8 website within minutes equipped with more features and a superior user experience to previous versions on a free tier to boot! While simultaneously catering better to those not writing code, the engineers who have always pushed Drupal to its physical limits have more power to build sophisticated tools and integrations that can do more for their clients than ever before.

In exploring this deeper, let's start with the technical, and dig into the more nuanced to answer the Drupal 8 question: "What's in it for me?" ([WIIFM?](https://www.fastcompany.com/3001250/times-change-whats-it-me-question-you-need-answer)), for _you_.

### WIIFM? Features.

It's fairly easy to find information touting Drupal 8's strengths around the web, and it's pretty straightforward that software we write today (and have been writing for 4 years) is superior to [software written 8.5 years ago](https://dri.es/drupal-7-code-freeze-september-1st) (or [10.5 years ago with Drupal 6](https://www.drupal.org/forum/deprecated/deprecated-drupal-newsletter/2007-06-06/the-drupal-newsletter-june-2007)). Let's look briefly at some high-impact improved features for site owners and admins.

#### Design/UX/Usability Improvements with Drupal 8

In developing Drupal 8, perhaps for the first time, the Drupal leadership [took user experience work seriously](https://www.drupal.org/community-initiatives/drupal-core/usability) and developed a cohesive [strategy to improve UX](http://drupalsun.com/node/26589) for Drupal 8. The results paid off.

1. [Responsive out of the box](https://www.drupal.org/docs/8/mobile/responsive-web-design): Given that Drupal 8's release came long after responsive web design became popular enough to garner its own acronym, naturally, all themes (administrative and otherwise) were developed to be responsive. RWD has been a must for years, but it took heavy lifting to achieve in Drupal 7.
1. [Better content authoring](/2017/03/06/five-drupal-8-tips-to-empower-content-authors.html): Drupal 8 has adopted a more Wordpress-like UX for editors, which for many years had been cited as a distinction between the two, rightfully favoring Wordpress. Content authoring layout improvements coupled with responsiveness have made administration from a phone a pleasant experience.
1. [Accessibility at lower cost](https://www.drupal.org/8/usability): Accessibility efforts, though not prioritized by all, continue to gain traction as we continue to expand our ability to [be inclusive](/company/mission-and-values/#be-inclusive). We've seen clients threatened with lawsuits over not adhering to accessibility standards. Whether motivated by benevolence or risk-aversion, accessibility should be on your radar, and it's easier in Drupal 8.
1. [Multilingual in core](http://www.drupal8multilingual.org/): With a cohesive system now in core, we have been able to build a [couple of](https://www.durhamatletico.com/) [multilingual sites](http://howsyourbabync.org/) with relative ease, not having to dedicate substantial additional time to the translation component.

> Drupal 8 multilingual is a world of difference. What would take 22 or more modules in Drupal 7 you would do with 4 (and all in core). <span>- @kristen_pol</span>

#### The API-first initiative

One of the larger
https://www.drupal.org/node/2757967#roadmap



### WIIFM? Performance.

If you take performance seriously, [which you should](https://blog.kissmetrics.com/loading-time/), there's a lot to like about Drupal 8. Sticking with the theme of sophistication, Drupal 8 provides a much more granular ability to cache specific components than its predecessors. And as we know in the high-performance web world, [cache](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching) [is](http://blog.catchpoint.com/2017/03/13/caching-web-performance/) [king](https://www.digitalocean.com/community/tutorials/web-caching-basics-terminology-http-headers-and-caching-strategies). When Drupal 8 first came out, a leading Acquia engineer showed some [mixed results](https://www.jeffgeerling.com/blog/2016/yes-drupal-8-slower-drupal-7-heres-why) on Drupal 8 performance. The heavier codebase invariably means having to swim upstream to make it outperform the lighter codebase in Drupal 7, but I'm happy to say the architects had their flippers on when working through these challenges. Take these two fundamental points:

1. Regardless of how fast the underlying code executes, what matters to users is perceived performance, i.e. how long they have to wait to interact with the page. Perceived delay has been drastically reduced by an experimental-turned-core module (more on that later) called [BigPipe](https://www.drupal.org/docs/8/core/modules/bigpipe/overview). BigPipe loads components of a page in the order in which a user is expected to interact with them while delivering more expensive components as they're available. This breaks with the tradition of all-or-nothing webpages served by Drupal that were either in the cache or not, lending itself to a Facebook-like experience, which is where [BigPipe came from](https://www.facebook.com/notes/facebook-engineering/bigpipe-pipelining-web-pages-for-high-performance/389414033919/).<br><br>
 ![GIF of Drupal 8 BigPipe Video]({{ site.url }}/assets/img/blog/bigpipe-in-drupal-8.gif)<br>
  <span class="caption"> [Slower video here](https://www.youtube.com/watch?time_continue=41&v=JwzX0Qv6u3A ) </span>
2. Modern performance tactics derive the largest gains from _outside_ of the application leveraging services like a Content Delivery Network (CDN), and/or a web application accelerator, [like Varnish](https://varnish-cache.org/intro/index.html#intro), to serve up resources to anonymous traffic (users _not_ signed-in) as quickly as possible. For most sites, anonymous traffic comprises a majority of overall traffic. Traditionally, there have been limitations to improving performance for authenticated traffic, and that's where Drupal 8 shines. With BigPipe and a more granular caching system, Drupal 8 can substantially outperform Drupal 7's authenticated user experience, so it's a win-win.

If you're made of time today, check out our [other articles we've written about performance](/blog/tag/performance) for a deeper dive into this broad and complex topic.

### WIIFM? People.

We know that behind any powerful movement are powerful people. To quote Dries, as I did in my Drupalcon talk in New Orleans:

> fostering the Drupal community is actually more important than just managing the code base.

Also, atop the Drupal.org homepage [used to read](https://events.drupal.org/neworleans2016/sessions/stay-community)

> Come for the code, stay for the community.

Without needing to resonate with all the warm and fuzzies that many within the community do, these sentiments show the richness and value of the Drupal community. And that rich community, not out of neglect, but rather necessity, has moved on from Drupal 7. Top designers, developers, and strategists are working on few Drupal 7 projects these days, and most would prefer to move on. For those who work with web designers and engineers (or [used to be one like me](https://www.drupal.org/u/chrisarusso)), you know that they often have an insatiable appetite for learning, and want to do that with increasingly relevant tools to their growth and output. Sticking to dated software is an effective way to weed out the best and brightest.

#### The Improved Developer Experience (DX) of Drupal 8

Just like happy customers tend to be repeat customers, [happier developers](http://fortune.com/2015/10/29/happy-productivity-work/) [also produce returns](https://www.fastcompany.com/3048751/happy-employees-are-12-more-productive-at-work); they're [more productive](http://www.snacknation.com/blog/employee-happiness/).

There are a few improvements in Drupal 8 that make life _substantially_ better for developers. The [Configuration Management Initiative](https://www.drupal.org/docs/8/configuration-management/managing-your-sites-configuration) was a boon to developers who struggled with a module called "features" which was not designed to do what most of us used it for. The CMI addresses the previous workaround, rife with inconsistencies, of moving site configuration from development to staging and production environments. Although it may seem trivial, developers _love this better system_ in Drupal 8, and it means more efficient development, therefore higher ROI.

#### Proudly found elsewhere / not invented here / getting off the island

A primary Drupal 8 philosophy that has largely been successful, but yet to fully bear fruit, is the concept to drastically reduce "Drupalisms" that had proven a challenge for newcomers to the system who had to learn a suite of things specific to only Drupal. The proudly found elsewhere paradigm seeks to mitigate this by leveraging the best of other open source tools when possible rather than reinvent the wheel. A few of the tools Drupal 8 now exploits are [Symfony components](https://symfony.com/), [Twig templating engine](https://twig.symfony.com/), and [Composer Dependency Manager](https://getcomposer.org/). This "borrowing" has two positive consequences: 1) it reduces the workload for Drupal core contributors by utilizing what's freely available and well vetted through other communities, 2) it allows people familiar with those other frameworks a smoother onramp to productivity in Drupal. I believe we haven't yet seen a majority of the benefit to the Drupal 8 project from the many people who were already versed in Symfony and TWIG before working with Drupal.

To quote Angie Byron for the thousandth time ([full video here](https://youtu.be/wWnhfTSkmoU?t=386)):

> For people who are classically trained or have experience in other languages, Drupal 8 is going to make a lot more sense to them than Drupal 7 did. We're just falling more in line with what the larger people are doing… within the broader PHP community.

### WIIFM? Cost savings.

The active decision to upgrade or passive indecision to wait both have cost implications. Perhaps this is the most useful section for readers whose primary responsibilities aren't technical.

Continuing to invest in Drupal 7 (or earlier) can be costly in ways that may not be abundantly apparent on the surface. For most organizations who work with an agency, custom development is where a brunt of the efforts are spent, and therefore is the primary cost driver. "Custom development" occurs when the functionality a client requests is either not freely available on the open-source market or the agency is unaware of its existence and a developer will write code for the specific use case to "extend" the out-of-the-box functionality. The [80-20 rule](https://en.wikipedia.org/wiki/Pareto_principle) applies well to software development in Drupal: roughly 20% of the functionality a client requests accounts for 80% of the effort of a project since that 20% must be built from scratch. When site owners request various functionality, it can be difficult for them to differentiate what may constitute custom development efforts vs. freely available from the contributed community. Given the high effort of customization and related technical debt accumulated, site owners should request a high degree of transparency to understand what requires custom development when establishing project budgets. This way, the organization can do a cost/benefit analysis on a granular, per-feature basis. The goal for developers should be to always start with exploring what already-made wheels are out there for the turning before crafting their own. Be wary of alternative thinking. Yet, as extensible and rich the Drupal community is, nearly all of our engagements require customization.

#### Easy Drupal upgrades forever

![A happy Drupal sunrise]({{ site.url }}/assets/img/blog/the-promise-of-making-drupal-upgrades-easy-742x1114.jpg)<br>
  <span class="caption"> Image from Dries's blog post </span>

To the surprise of the community, in an abrupt departure from business-as-usual in early 2017, Dries committed to ["easy upgrades forever"](https://dri.es/making-drupal-upgrades-easy-forever), starting with Drupal 8 of course. The short of it is Drupal 8 to 9 upgrades should be **far easier** (and less expensive) than any previous major version upgrade, and so will be from here on in. That means for those not yet on Drupal 8, you only have one final difficult upgrade left in your Drupal journey until the end of time.

This is a fairly natural outcome given the possibilities afforded by a more structured, object-oriented architecture coupled with the growing desire to ease upgrade pain that has been building for some time. Although difficult technical work is needed to [flesh out exactly how this will be done](https://www.drupal.org/core/d8-bc-policy), the commitment from the top is worth putting stock in and the community is on the way to making this grand proclamation a reality. When upgrades are far easier, they will help rectify some of the sentiment of leaving the smaller sites behind, since major version upgrades will be a much less daunting task with Drupal 8 and beyond.

##### Drupal 6 or 7 custom development is especially expensive

However, perhaps the **most important point** is that you may be doubling your efforts for the final time if you're doing custom development on Drupal 6 or 7, since it will invariably need to be rewritten to work on Drupal 8 with the same 80-20 rate we mentioned earlier. Given the commitment to easy upgrades and guidelines for backwards compatibility, it's quite likely that custom code written for Drupal 8 will be highly portable to Drupal 9 and 10 that won't require an arduous rewrite.

![A Drupal 6 house]({{ site.url }}/assets/img/blog/house-for-drupal-6.jpg)<br>
<span class="caption"> Not our actual house, and it's not _this_ bad.</span>

I live in the equivalent of a Drupal 6 house. My partner and I keep putting off things we'd like to do now in prep for a more substantial renovation "on the horizon." We're not going to get solar panels before replacing the roof, and we won't upgrade to a high energy efficiency HVAC system until we restructure some of the foundation. We're being mindful of mitigating our overall costs, which makes sense, but this all sets up a perverse incentive to make no improvements in the immediate. The same can be true for an older Drupal site. As she frequently reminds me, I'll remind you: it's probably time to take the plunge and build your Drupal 8 house.

##### Cost to upgrade is going down

While there remains one final decidedly not easy upgrade if you're not yet on Drupal 8, the good news is the cost to upgrading has gone down and will continue to. As of the [release of 8.4.0](https://www.drupal.org/blog/drupal-8-4-0), migrating from Drupal 6 is nearly all the way there:

> Core provides migrations for most Drupal 6 data and can be used for migrating Drupal 6 sites to Drupal 8, and the Drupal 6 to 8 migration path is nearing beta stability.

The sentiment on 7, expectedly so, is not as far along:

> The Drupal 7 to Drupal 8 migration is incomplete but is suitable for developers who would like to help improve the migration and can be used to test upgrades especially for simple Drupal 7 sites. Most high-priority migrations are available.

So migration from 7 still requires some work. More on this ahead.

#### Early adopters paved the way

We all owe a debt of gratitude to those who were willing to take the risk of building on Drupal 8 in its earlier days. We commend both organizations and agencies who were ambitious and willing to incur some risk to help push the rest of the project forward. We're proud to put ourselves on that list, starting [2.5 years ago](https://github.com/savaslabs/durham-civil-rights-map/commit/7736d4f7375845db5adfd38df721d091a2c72db3), but it unsurprisingly came with challenges and lessons learned. Mistakes that come with experience are virtually entirely positive for the future since we've learned what to do and what to avoid. It's time for you to benefit from the work of the early adopters.

### WIIFM? The Future.

The future is uncertain; the only things guaranteed are death and taxes. Actually, even [those](https://phys.org/news/2017-03-economists-minimum-income.html) I'm [not so sure](https://www.scientificamerican.com/article/aging-is-reversible-at-least-in-human-cells-and-live-mice/) :wink: Regardless, the future for Drupal 6 and 7 are a known entity not likely to get much better. The upside of Drupal 8, while partially known, is largely still in the making and will keep getting better over time.

#### Continuous innovation with experimental modules! Who doesn't want _that_?

Among the suite of other firsts, Drupal 8 has [updated its minor version approach](#continuous-innovation-with-experimental-modules-who-doesnt-want-that) to accommodate for innovations in core and this is another game changer. Previously, the first version of Drupal 7 (7.0) was essentially functionally the same as the latest (currently 7.56). Now new minor releases introduce [experimental modules](https://www.drupal.org/core/experimental) which are driven by agreed-upon priorities and are then vetted over time to see if they'll graduate from the "experimental" label and be fully baked into core. Therefore Drupal 8 can and will adapt; Drupal 7 cannot. The transparent structure leadership established provides a good balance of innovation and predictability with two minor version releases a year. To track these for your own planning, at any time you can check the development [roadmap](https://www.drupal.org/core/roadmap).

#### Javascript

The Drupal community has been abuzz with "headless" or "decoupled" Drupal since the advent of Drupal 8. The basic idea is that Drupal can lean on its strength of being an excellent tool for highly structured and organized data in the backend while allowing freedom and flexibility of choice on the presentation layer (front end). Though [discussed two years ago](https://dri.es/should-we-decouple-drupal-with-a-client-side-framework) to no formal conclusion, Dries has recently [cited React](https://dri.es/drupal-looking-to-adopt-react) as the go-to presentation layer for Drupal administrative interfaces come early 2018. This is a fairly big deal, and formally moving forward to more tightly link with React has many implications we haven't yet fully explored. As the lines between websites and web applications continue to blur, this proudly-found-elsewhere addition may prove to be a powerful one that will not be possible for Drupal 6 or 7. We see this as another wise move to be more in-sync with the rapidly growing impact of JS frameworks.

#### Access to complementary tools

The re-architecture towards object-orientation helped Drupal join the modern PHP community's framework ([Symfony](https://symfony.com/), [Laravel](https://laravel.com/), [Cake](https://cakephp.org/), [Phalcon](https://phalconphp.com/en/), [Zend](https://framework.zend.com/), [Slim](https://www.slimframework.com/), [CodeIgniter](https://www.codeigniter.com/), [Yii](http://www.yiiframework.com/), and [Fuel](https://fuelphp.com/) to name the most popular) development practices. One subtle yet substantial value to that move is now many tools that are built to help support these other frameworks are available to Drupal as well. As the toolkit for modern web development grows richer and more robust, the more Drupal can utilize, the better. A couple examples we've recently used to help inform project quality and future maintenance costs are [Code Climate](https://codeclimate.com/) and [Scrutinizer](https://scrutinizer-ci.com/). These tools have much less value analyzing a Drupal 6 or 7 site.

## Our advice

So we've dumped a lot of information on you at this point, but it may still not be entirely clear what you should do with your outdated Drupal site. Ahead we provide general suggestions as well as what is pertinent to site owners for each version separately (Drupal 6 and 7).

### To everyone on Drupal <8

We still have <3 for Drupal <8. Drupal 5, 6, and 7 got us to where we are. But here's what we think you should consider about where you're going.

1. **Plan 3 years out** if possible. A stitch in time saves nine, and every minute of planning saves 10 in execution. They're clichés, but true. Planning well requires a real dedication to strategic and investigative work; there's no way around it. The upside is it allows you to be intentional about when to incorporate an upgrade, rather than being at the mercy of expiring security support. Organizational stakeholders are usually not compelled by upgrading for the sake of upgrading without other bells and whistles that come with it. An experienced partner can help shepherd the long-term planning process to provide guidance on efforts and things to consider. If you're not working with an agency, do it yourself. Expect to redesign and do a software upgrade every 3-5 years and time those together if possible. Factor in upgrades to other systems that integrate with your website as well as any initiatives that may require functional improvements. Put all of these larger investments on a **roadmap** with a timeline and be clear about what components are dependent on or impacted by other components. With technical work, the devil is in the details, so a thorough assessment or "discovery project" is usually the best next step. Discovery work is light on upfront investment yet thorough enough to guide your organization through the many choices in your roadmap. This is really the best way to use your resources most efficiently. If your organization hasn't historically done this, it handicaps you a bit at the moment, but if you'll excuse one final cliché: there's no time like the present.
1. **Be mindful of what you _don't_ need**. We all get excited about the possibilities of new functionality. However, when things we've built have outlived their purpose, let them go. Given the complexity and interdependence of the tools we build, customizations take the form of mounting, insidious and potentially crippling technical debt if left unaddressed. The cost to upgrade the technical debt is likely the major cause for most of those who have not yet upgraded; it is certainly the case for all of our partners who haven't. This debt can be hard to track, and it's not something most agencies proactively share since they have a hand in creating it and can also be shortsighted. Ask for answers as to how your partner is managing your technical debt. If you don't get good answers, keep asking. Another subset of this concept is that even if you want to maintain certain functionality, it needn't be done in the with the same modules on the Drupal 8 platform. So don't take a given module's absence in Drupal 8 as a certainty that it cannot be efficiently achieved in Drupal 8. In many cases, it can.
1. **Training will be required.** If you plan to build with the same team that built your <8 site, and they have not worked on any other Drupal 8 or object-oriented PHP projects, make sure you dedicate time and budget resources for substantial training.

### To those with production Drupal 6 sites.

I wrote a Drupal 6 series as Drupal 8 had announced its release (the [overview](/2015/11/24/drupal-6-upgrade.html), [the risks](/2015/12/10/drupal-6-part-2.html), [the options](/2016/01/25/drupal-6-part-3.html), [Drupal 7 or 8](/2016/02/24/drupal-6-part-4.html)) which is a good reference for both what was true then and what has changed now. Then, I certainly encouraged a conversation with your partner about what is right for you. That has not changed. What has changed is the maturity of the migration system, making it easier to port your content from 6 to 8. An upgrade to Drupal 8 by way of migration should be where you start based on all of the above, and the job before committing to that path is to well vet all requirements to migrate. Given that migrations are high-effort, you should explore alternatives with your development team. How much it's worth to invest in a migration depends on how valuable your old content is to preserve, which varies widely for organizations.

If through research you uncover that you're still not ready for Drupal 8, you should make an action plan to follow up on the components that will allow you to upgrade to Drupal 8 and track those over time. You should look into efforts to upgrade to Drupal 7, being mindful of how you can mitigate the costs to the Drupal 8 upgrade. You should consider support with the MyDropWizard team in the immediate. It's lead by David Snopek who is on the core security team and has an impressive Drupal resume. It's hard to assess how the support provided by MDW compares to the [core security team](https://security.drupal.org/team-members), but it's much better than not having any security support. I would also caution those to not use the relief from having coverage through MDW as a reason to rest on your laurels. If Drupal is still working for you, you should be thinking about how to get to Drupal 8. Additionally, as we agreed earlier there's no longer even certainty to death and taxes, it's possible that things could change for MDW, and you'd be without support again.

### To those with production Drupal 7 sites.

As far as building new on Drupal 7, I have a hard time conceptualizing for whom that is the right choice. MDW [wants to keep the door open to building new in Drupal 7]((https://www.mydropwizard.com/blog/its-ok-build-new-sites-drupal-7)), but others [point out incentives again](https://www.mydropwizard.com/comment/916#comment-916). Much like the hat tip to Dries for accepting criticism, I must commend MDW accepting these comments on their blog.

If you have a high degree of customization and technical debt, [keep track of the development of Drupal 9](https://www.drupal.org/node/2608062). Upgrade now cannot be prescriptive for the 900,000+ sites still on Drupal 7. We generally agree with Angie's recent presentation at Acquia Engage called [Drupal 9 and Backwards Compatibility: Why now is the time to upgrade to Drupal 8](https://www.slideshare.net/webchickenator/drupal-9-and-backwards-compatibility-why-now-is-the-time-to-upgrade-to-drupal-8/39) for those on Drupal 7:

> If it's working for you that's fine! (Until Drupal 9)
> But if D8 offers features you want, consider earlier adoption.

So, if you've determined that you'll remain on Drupal 7 for some time, your development team should be aware of a couple Drupal modules ([xautoload](https://www.drupal.org/project/xautoload) and [service_container](https://www.drupal.org/project/service_container)) that make writing Drupal-8 like code possible in Drupal 7. These tools will help familiarize developers with Drupal 8 paradigms and possibly reduce substantial technical debt in the future.

### To those not on Drupal, but considering it

If you're in the market for a CMS and have ambitious web goals, you should at least check out Drupal. It's been holding [fairly steadily in the CMS market](https://w3techs.com/technologies/history_overview/content_management), and given some of the problems of the past with versions before Drupal 8, we think this speaks very promisingly of the future for Drupal. This is not to say that it is the right fit for all websites. It is not. However, with [free hosting](https://pantheon.io/features/drupal-hosting) [options](https://www.acquia.com/acquia-cloud-free), and improved and simplified admin experience, and the most powerful backend of the open source CMSes, it does fit a lot of needs.

### We want to hear from you

We want to hear from your experience, whether or not it resonates with what we've presented here. Are you having challenges to upgrading that you feel went unaddressed here? Notice anything we overlooked? Comment away, or write us privately if that's appropriate. I'm also often on [Drupal slack](https://drupal.slack.com/messages) (@chrisarusso) checking in on our local #TriDUG meetup conversations.