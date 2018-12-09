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

'Tis the season of :gift: giving. Now that we've [brought Ben on](/2018/12/11/savas-welcomes-ben-eckerson-coo.html), along with him has followed ample holiday cheer. <link href="https://vjs.zencdn.net/4.6/video-js.css" rel="stylesheet"><script src="https://vjs.zencdn.net/4.6/video.js"></script><video class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="640" height="360" poster="https://media.virbcdn.com/images/22/VideoImage-83362-237571-a2321d971cc95a5e2c207084ede25263.jpg" data-setup='{}'><source src="https://media.virbcdn.com/videos/534x300/ee/Video-425231-81264_sd_mobile.mp4" type="video/mp4" /></video>

Ben suggested and we swiftly agreed to our first annual Savas Claus™: the name we chose for the traditional gift giving tradition oft referred to as [secret santa](https://en.wikipedia.org/wiki/Secret_Santa) in which a group of people buys gifts for one another while keeping the giver and receivers anonymous until the big reveal. It's exciting stuff.

Typically, to randomly assign gift receivers to their respective givers, you write everyone's name down on paper, put the names into a hat, and each person blindly picks a name for whom they get a gift. However, this analog approach has _one major flaw_: one can easily end up with himself:

<div class="blog-image-large" style="text-align:center">
<img src="https://media1.tenor.com/images/fe6a574d37f0b0189d412bb11e719906/tenor.gif" alt="Kevin from the Office gets himself for secret santa">
</div>

## The challenges

First, knowing that we had ahead of us one of [the **_two_** hard problems in computer science](https://martinfowler.com/bliki/TwoHardThings.html): cache-invalidation, off-by-one errors, and **naming things**. So we put it to a poll. Savas Claus™ prevailed by a narrow margin over Secret Savas (it's main critique: being too close to “secret service”). Given the aforementioned self-selection consideration ("the Kevin problem"), the fact that our team is distributed, and we're web engineers, naturally we went for a digital solution.

## The approach

Since Slack is so deeply ingrained in our day-to-day, we looked for a solution there first. A [Secret Santa Slack app does exist](https://savaslabs.slack.com/apps/A0E7EFUB1-secret-santa), yet it didn't afford us the flexibility and panache we were going for — plus it's way more fun to [make your own](https://github.com/savaslabs/savas-slack-tools/pull/5)! So we (well Chris) got in some weekend time building a simple Slack app to use during our weekly Monday morning team-wide status call.

## How it works

We use tools on a near-daily basis that randomize the order of our team, for purposes like who gets to choose the lunch spot each week when we go out, or to randomize the order we speak during our weekly status call. So, adding the Savas Claus™ functionality was a natural extension to what we already had. The app creates a random order of the team (the "givers"), generates a second randomly ordered list of the team ("the receivers") and pairs them with each other. If there are any repeats among the two lists in the same slot, the app automatically regenerates the second list and will repeat until the lists share no one in the same slot, and therefore receivers can safely be assigned to givers. With the lists vetted, the Slack app privately messages each giver notifying them of their respective recipient. The message looks _something_ like this:

![Chris's resulting Savas Claus private message](/assets/img/blog/savas-claus-chris-screenshot.png)

NB: the exclamation point was meant to be a subtly hidden link, an [:rabbit: :egg: easter egg](https://en.wikipedia.org/wiki/Easter_egg_(media)) if you will, but it seems Slack sensed it was the wrong time of year for such shenanigans and sabotaged the surprise unfurling the [office reference](https://www.youtube.com/watch?v=B6jCMaiTqG0) for all to see plainly. You win some and you lose some.

## The results :santa: :christmas_tree: :gift: :gift_heart:

The team is currently prepping and/or shipping their gifts before our "unwrapping" virtual party/social of sorts in a couple days. No doubt we'll use our "Savas Shuffle" Slackbot to determine the order for who will open their gifts first. [Follow us on Twitter](https://twitter.com/savaslabs) and we'll share the real results (the gifts!) from our first annual Savas Claus™.

