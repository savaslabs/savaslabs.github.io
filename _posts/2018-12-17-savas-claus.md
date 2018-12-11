---
layout: post
title: "Savas Claus: The inaugural holiday tradition"
date: 2018-12-17
author: Chris Russo
tags: open-source culture people fun
summary: "We wrote a Slack bot to facilitate our first ever distributed office secret santa!"
featured_image: "/blog/savasclaus.png"
featured_image_alt: "Savas Claus logo"
---

'Tis the season of :gift: giving. Now that we've [brought Ben on](/2018-12-11-welcome-ben-eckerson) and with him he's brought all his Christmas cheer suggesting we introduce the first annual "Savas Claus" :tm: - which operates like secret santa: everyone gets a random person. However, unlike the possibility of putting everyone's name in a hat and each individual selecting their recipient with the possibility of selecting their own name,

<!-- ![](https://media1.tenor.com/images/fe6a574d37f0b0189d412bb11e719906/tenor.gif) -->

<div class="tenor-gif-embed" data-postid="7354987" data-share-method="host" data-width="100%" data-aspect-ratio="1.338235294117647"><a href="https://tenor.com/view/brian-baumgartner-the-office-secret-santa-kevin-gif-7354987">Secret Santa The Office GIF</a> from <a href="https://tenor.com/search/brianbaumgartner-gifs">Brianbaumgartner GIFs</a></div><script type="text/javascript" async src="https://tenor.com/embed.js"></script>

So naturally as engineers, we built an app to solve our problem.

But first, knowing that we had ahead of us one of the **_two_** hard things in computer science: cache-invalidation, off-by-one errors, and **naming things**, we put it to a pol.

![Slack poll choosing name Savas Claus](/assets/img/blog/savas-claus-slack-screenshot.png)
<span class="caption"> You can see yours truly didn't get his way - democracy doesn't _always_ work :wink: </span>

## The challenge

Our team is distributed, so a physical fish bowl was not possible. Also, we needed to verify that when randomizing a list of our names, no one get theirself. That was all handled in a few lines of code

## What we did

Since Slack is so deeply integrated in our day-to-day, naturally we looked for a solution there first. A [Secret Santa Slack app does exist](https://savaslabs.slack.com/apps/A0E7EFUB1-secret-santa), yet it didn't afford us the flexibility and unique panache we were going for. So, we decided to [write our own](https://github.com/savaslabs/savas-slack-tools/pull/5)! Got in some weekend time putting the finishing touches before our weekly Monday morning meeting.

## How it works

We already use tools on a near-daily basis that randomize who gets to choose lunch each week when we go out, or the order for various meetings we hold. So, adding "Savas Claus" :tm: functionality was a natural extension to what existed. The code creates a random order of the team, and then regenerates a second randomly ordered list of the team and matches them to each other. If there are any repeats in the same slot it regenerates the second list and checks until there are no repeats. When we have two matching lists "givers" and "receivers" then the givers each get privately messaged as to what recipient they will be gifting to. It looks something like this:

![Chris's resulting Savas Claus private message](/assets/img/blog/savas-claus-chris-screenshot.png)

Exclamation was meant to be an [:rabbit: :egg: easter egg](https://en.wikipedia.org/wiki/Easter_egg_(media)), but it seems Slack sensed it was the wrong time of year for such shenanigans and unfurled the [office reference](https://www.youtube.com/watch?v=B6jCMaiTqG0) for all to see plainly. You win some and lose some.

## The results :santa: :christmas_tree: :gift: :gift_heart:

We'll update the post here with some shots to share from our first "Savas Claus" :tm:

<!--

TODO: Get some video/photo from our big reveal - everyone holding their gifts
TODO: Tweet to Tim - Tweet and get response ?

-->

