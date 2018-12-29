---
layout: post
title: "Why your website needs HTTPS"
date: 2018-06-26
author: Chris Russo
tags:  marketing user-experience best-practices performance drupal drupal-planet
summary: The upside of HTTPS now greatly exceeds any previously valid tradeoffs. If you're not using it exclusively, it's time to make the switch.
image: "/assets/img/blog/https.jpg"
featured_image: "/blog/https.jpg"
featured_image_alt: "Image endorsing move to HTTPS from HTTP"
drupal_planet_summary: |
  There are many considerations for site owners on when to make the move to HTTPS. Google has just stepped up the pressure. Secure communication is especially important for Drupal site owners and the time to make the move to HTTPS is now.
---

This is part one of a [two-part series](/2018/08/01/how-to-move-to-https.html) on transitioning to HTTPS

For some time, major internet players have advocated for a ubiquitous, secure internet, touting the myriad benefits for all users and service providers of "HTTPS everywhere". The most prominent and steadfast among them is Google. In the next week, continuing a multi-year effort to shepherd more traffic to the secure web, Google will make perhaps its boldest move to date which will negatively impact all organizations not securely serving their website over HTTPS.

To quote the official [Google Security Blog](https://security.googleblog.com/2018/02/a-secure-web-is-here-to-stay.html)

> Beginning in July 2018 with the release of Chrome 68, Chrome will mark all HTTP sites as “not secure”

![Chrome insecure message for HTTP]({{ site.url }}/assets/img/blog/chrome-68-not-secure.png)<br>
 <span class="caption"> Google blog </span>

Given the ambiguous "in July 2018", with no clearly communicated release date for Chrome 68, it's wise to err on the side of caution and assume it will roll out on the 1st. We have readied our partners with this expectation.

So what does this mean for your organization if your site is not served over HTTPS? In short, it's time to make the move. Let's dig in.

## What is HTTPS?

HTTP, or **H**yper**T**ext **T**ransfer **P**rotocol, is the internet technology used to communicate between your web browser and the servers that the websites you visit are on. HTTPS is the secure version (s for secure) which is served over TLS: Transport Layer Security. What these technical acronyms equate to are tools for internet communication that verify you're communicating with who you think you are, in the way you intended to, in a format that only the intended recipient can understand. We'll touch on the specifics in a moment and why they're important. Put simply, HTTPS enables secure internet communication.

## Why secure browsing matters

Leaving aside the technical details for a moment and taking a broader view than communication protocols reveals more nuanced benefits your organization receives by communicating securely with its audience.

### HTTPS improves SEO

Since Google accounts for 75-90% of global search queries ([depending](https://netmarketshare.com/search-engine-market-share.aspx?options=%7B%22filter%22%3A%7B%22%24and%22%3A%5B%7B%22deviceType%22%3A%7B%22%24in%22%3A%5B%22Desktop%2Flaptop%22%5D%7D%7D%5D%7D%2C%22dateLabel%22%3A%22Trend%22%2C%22attributes%22%3A%22share%22%2C%22group%22%3A%22searchEngine%22%2C%22sort%22%3A%7B%22share%22%3A-1%7D%2C%22id%22%3A%22searchEnginesDesktop%22%2C%22dateInterval%22%3A%22Monthly%22%2C%22dateStart%22%3A%222017-06%22%2C%22dateEnd%22%3A%222018-05%22%2C%22segments%22%3A%22-1000%22%7D) [on](https://www.statista.com/statistics/267161/market-share-of-search-engines-in-the-united-states/) [the](https://www.smartinsights.com/search-engine-marketing/search-engine-statistics/) [source](http://gs.statcounter.com/search-engine-market-share)) SEO is understandably often synonymous with optimizing for Google. Given their market domination, competitors are taking queues from Google and in most cases it's safe to assume what's good for SEO in Google is good for optimizing competing search engines.

In the summer of 2014, [Google announced on their blog](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html) that they would begin to favorably rank sites who used HTTPS over HTTP. It's already been nearly four years since we've known HTTPS to be advantageous for SEO. Since then, Google has consistently advocated the concept of HTTPS ubiquity, frequently writing about it in blog posts and speaking about it at conferences. The extent to which serving your site over HTTPS improves your SEO is not cut and dry and can vary slightly depending on industry. However, the trend toward favoring HTTPS is well under way and the scales are tipped irreversibly at this point.

### HTTPS improves credibility and UX

Once a user has arrived at your site, their perceptions may be largely shaped by whether the site is served over HTTP or HTTPS. The user experience when interacting with a site being served over HTTPS is demonstrably better. [SEMrush summarizes well](https://www.semrush.com/blog/https-just-a-google-ranking-signal/#header2) what the data clearly indicate; people care a great deal about security on the web. A couple highlights:

- The [second highest concern for online shoppers was security](https://www.statista.com/statistics/467656/us-online-shopping-concerns/). The first was shipping being too expensive.
- [Crimes Americans worried about the most in 2016](https://www.statista.com/statistics/339735/crime-worries-in-the-united-states/): #2 having credit card stolen (69%), and #3 having web identity compromised (64%).

> You never get a second chance to make a first impression.

With engaging a participant of your target audience, you have precious few moments to instill a sense of credibility with them. This is certainly true of the first time a user interacts with your site, but is also true for returning users. You have to earn your reputation every day, and it can be lost quickly. We know credibility decisions are [highly influenced by design choices](http://credibility.stanford.edu/guidelines/index.html) and [are made in well under one second](https://www.tandfonline.com/doi/abs/10.1080/01449290500330448). Combining these two insights, with the visual updates Chrome is making to highlight the security of a user's connection to your site, drawing the user's attention to a warning in the URL bar translates to a potentially costly loss in credibility. Unfortunately it's the sort of thing that users won't notice unless there's a problem, and per the referenced cliché, at that point it may be too late.

#### Browsers drawing attention to insecure HTTP

Much like search, browser usage patterns have evolved over the last five years to heavily favor Google Chrome. Therefore, what Google does carries tremendous weight internet-wide. Current estimations of browser usage put Chrome between 55% and 60% of the market ([again](https://en.wikipedia.org/wiki/Usage_share_of_web_browsers), [depending](http://gs.statcounter.com/browser-market-share) [on](https://netmarketshare.com/browser-market-share.aspx) [sources](https://www.w3counter.com/trends)). Firefox has followed suit with Chrome as far as HTTP security alerts go, and there's no indication we should expect this to change. So it's safe to assume a combined 60-75% of the market is represented by Chrome's updates.

#### Google Chrome HTTP warning roll out

Google (and closely mirroring behind, Firefox) has been getting more stringent in their display of the security implications of a site served over HTTP (in addition to sites misconfigured over HTTPS). They've shared details on the six-step roll out on [their general blog](https://blog.chromium.org/2018/05/evolving-chromes-security-indicators.html) as well as on a more technical, granular level on the [Chrome browser blog](https://www.chromium.org/Home/chromium-security/marking-http-as-non-secure).

In January 2017, they began marking any site that collects a password field or credit card information, served over HTTP as subtly (grey text) not secure.

![Chrome insecure message for HTTP]({{ site.url }}/assets/img/blog/jan-2017-http-not-secure.png)<br>
 <span class="caption">Laravel News</span>

Then, in October 2017, they tightened things up so that a site that collected _any_ form information over HTTP, would have the same "not secure" messaging. They added the more action-based aspect of showing the warning on the URL bar _when a user entered data into a form_. This is an especially obtrusive experience on mobile due to space constraints, which more deeply engages the user cognitively as to exactly what is unsafe about how they're interacting with the site.

![Chrome insecure message for HTTP]({{ site.url }}/assets/img/blog/oct-2017-http-insecure.gif){:class="blog-image-large"}<br>
<span class="caption"> Google blog </span>

Next, in July 2018, all HTTP sites will be marked as not secure.

In September 2018, secure sites will be marked more neutrally, removing the green secure lock by default connoting a continuing expectation that HTTPS is the norm and no longer special.

![Chrome insecure message for HTTP]({{ site.url }}/assets/img/blog/sep-2018-neutral-https.png){:class="blog-image-large"}<br>
<span class="caption"> Google blog </span>

In October 2018, any HTTP site that accepts any form fields will show affirmatively not secure with a <span style="color:#cc0000">**bold red label**</span>, much like a misconfigured HTTPS site does now.

![Chrome insecure message for HTTP]({{ site.url }}/assets/img/blog/oct-2018-http-affirmative-insecure.gif){:class="blog-image-large"}<br>
<span class="caption"> Google blog </span>

Though they haven't yet announced a date, Google intends to show affirmatively not secure for all HTTP sites. The drive is clearly to establish the norm that all the web traffic should be served over HTTPS and that outdated HTTP is not to be trusted. This is a pretty strong message that if Google has their way (which they usually do) HTTPS will inevitably be virtually mandatory. And inevitably in internet years, may be right around the corner.

### HTTPS vastly improves security for you and your users

Returning to the technical, as mentioned previously, HTTPS helps secure communication in three basic ways.

- **Authentication** "you're communicating with who you think you are"
- **Data integrity** "in the way you intended to"
- **Encryption**: "in a format that only the intended recipient can understand"

#### What authentication does for you

In order for the browser to recognize and evaluate an HTTPS certificate, it must be verified by a trusted certificate authority (CA). There are a limited amount of CAs who are entrusted to distribute HTTPS certificates. Through [public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography), a fairly complex but interesting topic, through inherent trust in the CA who has provided the HTTPS certificate for a given site, the browser can verify any site visitor is positively communicating with the expected entity with no way of anyone else posing as that entity. No such verification is possible over HTTP and it's fairly simple to imagine what identify theft would be possible if you were communicating with a different website than you appeared to be. In the event any of the major browsers cannot validate the expected certificate, they will show a strong, usually red warning that you may not be communicating with the expected website, and strongly encourage you to reconsider interacting at all.

![Chrome misconfigured HTTPS]({{ site.url }}/assets/img/blog/misconfigured-https.png)<br>

Therefore, the authentication gives your users the confidence you are who you say you are, which is important when you're engaging with them in any way whether they're providing an email, credit card or simply reading articles.

#### How data integrity helps you

Ensuring perfect preservation of communication over the internet is another guarantee HTTPS provides. When a user communicates with a website over HTTPS, the browser takes the input of that communication and using a one-way hashing function creates a unique "message digest": a concise, alphanumeric string. The digest may only be reliably recreated by running the exact same input through the same hash algorithm irrespective of where and when this is done. For each request the user makes to the website, the browser passes a message digest alongside it and the server then runs the input it receives from the request through the hash algorithm to verify it matches the browser-sent digest. Since it is nearly computationally impossible to reverse engineer these hash functions, if the digests match, it proves the message was not altered in transit. Again, no such data integrity preservation is possible over HTTP, and there is therefore no way to tell if a message has been altered en route to the server from the browser.

#### What encryption does for you

Communicating over an unencrypted HTTP connection allows for some easily exploitable security risks in the case of authentication to a site. To demonstrate how easy it can be to take over someone's account on an HTTP connection, a tool called [Firesheep](https://en.wikipedia.org/wiki/Firesheep) was developed and openly released in mid 2010. Major social media platforms  [Facebook and Twitter were both susceptible](https://www.pcworld.com/article/209333/how_to_hijack_facebook_using_firesheep.html) to this exploit for some time after Firesheep was released. The identity theft is carried out through a means called [session hijacking](https://en.wikipedia.org/wiki/Session_hijacking). With Firesheep installed, a few clicks could log you in as another user who was browsing over WiFi nearby on any HTTP website. This form of session hijacking is possible when the authentication cookies, small identifying pieces of information that live in your browser while you're logged into a site, are transmitted to the server  on each request over HTTP. Over WiFi these messages are broadcasted into the air in plain text, and can be picked up by anyone listening. HTTPS prevents this since the communication is encrypted and unintelligible to eavesdroppers.

In the example of a CMS like Drupal or any other system in which there is a login, if an administrator with elevated site permissions is logged in over HTTP, they're subject to the same risk if that traffic is monitored or "sniffed" at any point along its path from the browser to the server. This is especially easy over WiFi but is not relegated to only WiFi. The cookies are sent to the server upon every request, regardless of whether or not the user entered their password during the active session or not. Depending on the admin's privileges, this access can be easily escalated to complete control of the website. Encryption is a big deal.

### HTTPS is required for the modern web

One of the more promising developments of the last few years, is the pervasiveness and effectiveness of Progressive Web Apps (PWAs). PWAs is the name coined for a set of technologies that provide a feature-set for mobile browsing akin to native applications, yet is entirely served through the web browser. PWAs require all communication to be done over HTTPS. Some of the possibilities with PWAs that were previously relegated to native applications only are:

- Providing content and services based on the user's location data
- Providing interaction with the user's camera and microphone within the browsing experience
- Sending push notifications
- Serving off-line content

If you aren't taking advantage of any of these features that are possible through PWAs, it's something your organization should strongly consider to further engage users. Before the ambitions to be on feature parity with native applications are fully borne-out, PWAs will continue to evolve the power of layering deeper engagement with users on top of your existing mobile experience with minimal effort. PWAs simply do not work over HTTP. HTTPS is required to open the door to their possibilities.

## Barriers to HTTPS have been lifted

Historically, considering a move to HTTPS has been held back by some valid concerns for webmasters whose job it was to select where and how their websites were hosted. A few of the fundamental apprehensions could be categorized as:

- **No perceived benefit.** People often assumed if they weren't collecting financial or personal information, it wasn't necessary. We've covered why holding this belief in 2018 is a misconception. Savas Labs made the move in July 2017 to serve exclusively over HTTPS for our [statically-generated Jekyll website](/blog/tag/jekyll/) even though at the time we had no forms or logins.
- **Performance costs.** We know reducing latency is crucial for optimizing conversions and HTTPS does require additional communication and computation. However, with the broad adoption of the HTTP/2 protocol over the last few years, HTTPS now [usually outperforms HTTP](http://www.httpvshttps.com/).
- **Financial costs.** HTTPS was too complex and costly to implement for some. Large strides have been made across many hosting providers who now bundle HTTPS into their hosting offerings by default, often at no additional cost. [Let's Encrypt](https://letsencrypt.org/), a relatively new and novel certificate authority, first began offering free certificates (which they still do) and then made it easy to automatically renew those certificates, helping to ease the burden and cost of implementation.

We cover each of these in more detail in [part two](/2018/08/01/how-to-move-to-https.html) that will help guide you on how to make the move to HTTPS.

## Conclusion

To revisit Google's announcement:

> Beginning in July 2018 with the release of Chrome 68, Chrome will mark all HTTP sites as “not secure”.

Interpreting that and providing our perspective:

> You're not part of the modern web unless you're exclusively using HTTPS.

A bold, if slightly controversial statement, but for ambitious organizations like the folks we're fortunate enough to work with each day, HTTPS-only is the standard in mid 2018 and beyond. Given the benefits, the lifted previous barriers, and the opportunity for the future, very few organization have a good reason not to exclusively serve their sites over HTTPS.

Have we convinced you yet? Great! Read [part two](/2018/08/01/how-to-move-to-https.html) for some assistance on how to make the move.

## Additional resources

- [Google I/O 2014: "HTTPS Everywhere"](https://www.youtube.com/watch?v=cBhZ6S0PFCY)
- [Progressive Web App Summit 2016: Mythbusting HTTPS](https://www.youtube.com/watch?v=e6DUrH56g14)
- [First Impressions Matter: The Importance of Great Visual Design](https://conversionxl.com/blog/first-impressions-matter-the-importance-of-great-visual-design)
- [A demonstration of speed benefits of HTTP/2 via HTTPS over HTTP](http://www.httpvshttps.com/)