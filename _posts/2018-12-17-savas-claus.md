---
layout: post
title: "Savas Claus™: The inaugural holiday tradition"
date: 2018-12-17
author: Chris Russo Ben Eckerson
tags: open-source team company-culture
summary: "We wrote a Slack bot to help facilitate our first annual office secret santa!"
featured_image: "/blog/savasclaus.png"
featured_image_alt: "Savas Claus logo"
---

'Tis the season of :gift: giving. Now that we've [brought Ben on](/2018/12/11/savas-welcomes-ben-eckerson-coo.html) and along with him has followed loads of holiday cheer. <link href="http://vjs.zencdn.net/4.6/video-js.css" rel="stylesheet"><script src="http://vjs.zencdn.net/4.6/video.js"></script><video class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="640" height="360" poster="http://media.virbcdn.com/images/22/VideoImage-83362-237571-a2321d971cc95a5e2c207084ede25263.jpg" data-setup='{}'><source src="http://media.virbcdn.com/videos/534x300/ee/Video-425231-81264_sd_mobile.mp4" type="video/mp4" /></video>

Ben has swiftly instituted our first annual Savas Claus™: the name we chose for the traditional gift giving tradition oft referred to as [secret santa](https://en.wikipedia.org/wiki/Secret_Santa) in which a group of people buys gifts for one another while keeping the giver and receivers anonymous until the big reveal. It's exciting stuff.

Typically to randomly select the pairings, you write everyone's name down on paper, put the names into a hat, and each person blindly picks one name for whom they get a gift. However, this analog approach has _one major flaw_: one can easily end up with himself:

<div class="blog-image-large" style="text-align:center">
<img src="https://media1.tenor.com/images/fe6a574d37f0b0189d412bb11e719906/tenor.gif" alt="Kevin from the Office gets himself for secret santa">
</div>

## The challenges

First, knowing that we had ahead of us one of the **_two_** hard things in computer science: cache-invalidation, off-by-one errors, and **naming things**, we put it to a poll. We ended up with Savas Claus™ by a narrow margin over Secret Savas (it was mentioned to be too close to "secret service"). Given the aforementioned self-selection problem combined with the fact that our team is distributed, as web engineers, we went for a digital solution.

## The approach

Since Slack is so deeply ingrained in our day-to-day, naturally we looked for a solution there first. A [Secret Santa Slack app does exist](https://savaslabs.slack.com/apps/A0E7EFUB1-secret-santa), yet it didn't afford us the flexibility and panache we were going for — plus it's way more fun to [make your own](https://github.com/savaslabs/savas-slack-tools/pull/5)! So we (well Chris) got in some weekend time building a simple Slack app and putting on the finishing touches before our weekly Monday morning team-wide status call.

## How it works

We already use tools on a near-daily basis that randomize the order of our team, like who gets to choose lunch each week when we go out, or the order we talk in the weekly status call. So, adding the Savas Claus™ functionality was a natural extension to what existed. The code creates a random order of the team, and then regenerates a second randomly ordered list of the team and matches them to each other. If there are any repeats in the same slot it regenerates the second list and will do so until two orders are created without people in the same "slot" or getting themselves for which to get a gift. When we have two vetted lists of "givers" and "receivers" then the Slack app privately messages each giver as to what recipient for whom they will be gifting. The message looks something like this:

![Chris's resulting Savas Claus private message](/assets/img/blog/savas-claus-chris-screenshot.png)

Note that the exclamation point was meant to be a subtly hidden link, an [:rabbit: :egg: easter egg](https://en.wikipedia.org/wiki/Easter_egg_(media)) if you will, but it seems Slack sensed it was the wrong time of year for such shenanigans and unfurled the [office reference](https://www.youtube.com/watch?v=B6jCMaiTqG0) for all to see plainly. You win some and you lose some.

## The results :santa: :christmas_tree: :gift: :gift_heart:

The team is currently prepping and/or shipping their gifts before our "unwrapping" virtual party/social of sorts in a couple days. No doubt we'll use our "Savas Shuffle" Slackbot to determine the order for who will open their gifts first. [Follow us on Twitter](http://twitter.com/savaslabs) and we'll share the real results (the gifts!) from our first annual Savas Claus™.

<!--

TODO: Get some video/photo from our big reveal - everyone holding their gifts
TODO: Tweet to Tim - Tweet and get response ?

-->

