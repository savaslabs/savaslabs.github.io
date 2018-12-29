---
layout: post
title: "How to transition your website from HTTP to HTTPS"
date: 2018-08-01
author: Chris Russo
tags:  marketing user-experience best-practices performance drupal drupal-planet
summary: Now that you know your website needs to be served over HTTPS, we help you get there.
image: "/assets/img/blog/https2.jpg"
featured_image: "/blog/https2.jpg"
featured_image_alt: "Image endorsing move to HTTPS from HTTP"
drupal_planet_summary: |
  How to move from serving your site over HTTP to HTTPS. Spoiler alert: there are some easy ways to do this with various Drupal hosting options. A quick read for guidance.
---

This is part two of a two-part series.

In [part one](/2018/06/26/why-you-need-https.html), we cogently convinced you that regardless of what your organization does and what functionality your website has, it is in your best interest to serve your website securely over HTTPS exclusively. Here we provide some guidance as to how to make the move.

## How to transition to HTTPS

To fully transition to HTTPS from HTTP means to serve your website HTML and assets exclusively over HTTPS. This requires a few basic things:

- A digital certificate from a certificate authority (CA)
- Proper installation of the certificate on your website's server
- Ensuring all assets served from your website are served over HTTPS

Let's break these down.

### Acquire a digital certificate

As briefly discussed in [part one](/2018/06/26/why-you-need-https.html), to implement HTTPS for your website you must procure a digital certificate from a certificate authority. Just like domain name registrars lease domain names, CAs lease digital certificates for a set time period. Each certificate has a public and private component. The public component is freely shared and allows browsers to recognize that a "trusted" CA was the one to distribute the certificate. It is also used to encrypt data transmitted from the browser. The private complement is only shared with the purchaser of the certificate, and can uniquely decrypt data encrypted by the public key. CAs use various methods through email or DNS to "prove" that the person who purchased the certificate is a rightful administrator of the domain for which they purchased it. Once you've received the private key associated with the certificate, you'll need to install it on your server. Annual certificate costs can be as much as $1,000 or as little as nothing. More on that in a moment.

### Install the certificate

![Lots of wires]({{ site.url }}/assets/img/blog/install-https-analogy.jpg)

Installing an HTTPS certificate manually on a server is not a trivial engineering task. We [explain this at a high-level in part one](/2018/06/26/why-you-need-https.html#what-authentication-does-for-you). It  requires expertise from someone who is experienced and comfortable administering servers. There are many different installation methods unique to each permutation of server software and hosting platform, so I won't expend any real estate here attempting to lay it out. If you have to do a manual installation, it's best to search your hosting provider's documentation. However, depending on the complexity of your website architecture, there are ways to ease this process. Some hosting platforms have tools that substantially simplify the installation process. More on _that_ in a moment as well.

### Serve all resources over HTTPS: avoid mixed content

Once you've installed your certificate, it's time to ensure all assets served from your pages are served over HTTPS. Naturally, this entire process should be completed in a staging environment before making the switch to your production environment. Completing a full transition to HTTPS requires attention to detail and diligence. "Mixed content", or serving assets from a page over both HTTP _and_ HTTPS, can be both tedious and insidious to rectify. The longer your site has been around, the more content there is and the more historic hands have been in the pot of content creation, the more work there will be to make the switch. Depending on your platform (CMS or otherwise) and how it was designed, there may be many avenues for different stakeholders to have included assets within a page over time. Developers, site admins, and content editors usually have the ability to add assets to a page. If any assets start with `http://`, they'll need to be updated to `https://` to prevent mixed content warnings.

We have recently helped a client who has been publishing articles at a high cadence for over 10 years with many different stakeholders over that period. Practices weren't consistent and uncovering all the ways in which HTTP resources were served from the page was a substantial undertaking. Therefore, be prepared for a time investment here -- there may be many areas to audit to ensure all assets from all your pages are being served over HTTPS. Some common ways mixed content HTTP assets are served from a site whose HTML is served over HTTPS are:

- Hard-coding a resource: e.g. `http://www.example.com/img/insecure-image.jpg`
- Using a 3rd-party library or ad network reference: `http://www.example.com/js/analytics.js`
  - This is common for libraries that haven't been updated in a while. Most all of them now serve the same assets over the same path securely with HTTPS.

Even [practices that were previously encouraged by Paul Irish](https://www.paulirish.com/2010/the-protocol-relative-url/), a leading web architect for the Google Chrome team, may have contributed to your mixed content problem, so don't feel bad. Just know, there will likely be work to be done.

#### The risk of mixed content

These "not secure" bits of mixed-content [expose the same risk](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content#mixed_content_weakens_https
) that your HTML does when served over HTTP, so browsers rightfully show the user that the experience on your site is "not secure".

Mixed content is categorized in two ways: active and passive. An asset that can contribute to passive mixed content would be an image; it doesn't interact with the page but is merely presented on the page. An example that can be an active asset of mixed content is a javascript file or stylesheet since its purpose is to manipulate the page. Passive mixed content, albeit categorically less severe than active, still exposes opportunities for an attacker to learn a lot about an individual's browsing patterns and even trick them into taking different actions than they intend to on the page. Therefore passive mixed content still constitutes enough of a threat for the browser to issue a warning display.

![mixed content browser errors]({{ site.url }}/assets/img/blog/mixed-content-errors.png)

In the case of an active asset that is compromised, if it were a javascript file, an attacker can take full control of the page and any interaction you may have with it like entering passwords, or credit card information. The mechanism behind this is a [somewhat sophisticated man-in-the-middle attack](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content#mixed_content_types_security_threats_associated), but suffice it to say, if the browser recognizes the vulnerability, the best scenario is the [poor user experience we discussed in part one](/2018/06/26/why-you-need-https.html#https-improves-credibility-and-ux), the worst is total data compromise. Your audience, and by association your organization, will be seeing red.
<br> ![Chrome misconfigured HTTPS]({{ site.url }}/assets/img/blog/misconfigured-https.png)

### The good news about moving to HTTPS

Ensuring your website serves assets exclusively over HTTPS is not as hard as it used to be, and is getting easier by the day.

#### There are free digital certificates

There's no such thing as a free lunch, but a free certificate from a reputable CA? It would seem so. People are just giving them away these days… Seriously, many years in the making since its founding by two Mozilla employees in 2012, the Let's Encrypt project has vowed to make the web a secure space and has successfully endeavored to become a trusted CA that literally does not charge for the certificates they provide. They have shorter lease cycles of 60 to 90 days, but they also offer tooling around automating the process of reinstalling newly provided certificates.

#### There are easier and cheaper ways to install certificates

With the advent of the aforementioned free certificate, many platform-as-a-service (PaaS) hosting options have incorporated low cost or free installation of certificates through their hosting platform sometimes as easily as a few clicks. Let's Encrypt has been [adopted across a broad range of website hosting providers](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920) like Squarespace, GitHub Pages, Dreamhost, all of which we use alongside many others.

For many of our Drupal partners, we prefer to use a platform as a service (PaaS) hosting option like Pantheon, Acquia, or Platform.sh. Both [Pantheon](https://pantheon.io/features/managed-https
) and [Platform.sh](https://platform.sh/blog/free-ssl-certificates-for-every-project-every-environment) now provide a free HTTPS upgrade for all hosting plans; Acquia Cloud, another popular Drupal PaaS, is [still a bit behind in this regard](https://redfinsolutions.com/blog/installing-free-lets-encrypt-ssl-certificates-acquia#comment-3290247800). We have found that the efficiency gains of spending less time in server administration translates to more value to our clients, empowering additional effort for the strategy, design, and development for which they hired us. In addition to efficiency, the reliability and consistency provided by finely tuned PaaS offerings are, in most cases, superior to manual installation.

A good example of the evolution of hosting platforms maturing into the HTTPS everywhere world is our own Jekyll-based site, [which we've written about](/blog/tag/jekyll) and [presented on before](https://www.fldrupal.camp/sessions/sessions-drupal-island/strange-case-dr-jekyll-and-mr-drupal). We first set up HTTPS over GitHub pages using CloudFlare guided by [this tutorial](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/) since we found it necessary to serve our site over HTTPS. However, about a year later [GitHub announced they would provide HTTPS support for GitHub pages](https://blog.github.com/2018-05-01-github-pages-custom-domains-https/).

{% twitter https://twitter.com/github/status/991366832421523456 %}

Similarly, we had previously implemented [Pantheon's workaround](https://pantheon.io/blog/using-cloudflare-run-pantheon-sites-under-https-free) to make HTTPS on all of their tiers accessible to our clients on their hosting platform. Then [they announced HTTPS for all sites](https://pantheon.io/blog/pantheon-launches-global-cdn-automated-https-all-sites). We're thankful both have gotten easier.

#### There are tools to help with the transition to HTTPS

Through its powerful Lighthouse suite, Google has [a tool to help audit and fix mixed content issues](https://developers.google.com/web/tools/lighthouse/audits/mixed-content). Given the aforementioned tedium and potential difficulty of tracking down all the ways in which people have historically added content to your site, this can be an invaluable time saver.

You can also use tools like Qualys SSL Labs to verify the quality of your HTTPS installation. See [how our site stacks up](https://www.ssllabs.com/ssltest/analyze.html?d=savaslabs.com&latest).

## Wrap-up

Given the much greater ease at which many modern hosting platforms allow for HTTPS, the biggest barrier, primarily a matter of effort, is to clean up your content and make sure all assets are served over HTTPS from all pages within your website. So, if you haven't already, start the transition now! [Contact us](/contact) over the phone or email if you need assistance and feel free to [comment below](#js-comments).