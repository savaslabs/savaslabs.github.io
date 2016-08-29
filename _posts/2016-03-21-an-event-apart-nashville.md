---
layout: post
title: "An Event Apart Nashville: post-conference thoughts"
date: 2016-03-21
author: Anne Tomasevich
tags: conference design front-end-dev
summary: Some recap and reflection after my first An Event Apart conference.
featured_image: "/assets/img/blog/aea_nashville_hero.png"
featured_image_alt: "An Event Apart: Nashville logo over Broadway Street"

---

Sitting in the Nashville airport after attending
[An Event Apart](http://aneventapart.com/), a leading web design and development
conference, I found myself feeling overwhelmed at the sheer volume of
information I'd just taken in and the positively enormous possibilities lying
ahead of the people who build the web (and the equally huge responsibility we
have to move forward with thoughtfulness and compassion).

I wasn't quite sure what to expect going in, so I'd like to summarize my biggest
takeaways, share some of the things I found exciting, and reflect on what I
got out of attending and whether it was worth the relatively high ticket price.

## Major takeaways

Knowing the kind of ground-breaking conversations that can happen at An Event
Apart (for instance, the idea of responsive design was introduced by
[Ethan Marcotte](http://ethanmarcotte.com/) at
[An Event Apart Seattle 2010](http://aneventapart.com/news/post/five-years-ago-today-responsive-web-designs-debut))
I was hoping for a glimpse into the future of the web, and I wasn't disappointed.
Throughout the event, a few overarching themes came up.

### Unified design is the logical continuation of responsive design.

Between the growing capabilities of devices, the sheer number of models, the
differences in how we use them depending on age/location/race/preference/ability,
and our ever-increasing use of small screens, there is no "mobile" and "desktop"
anymore. In his talk, [Cameron Moll](http://cameronmoll.tumblr.com/) replaced
the responsive design paradigm with **unified design** - a cohesive, consistent
experience across all devices regardless of where the experience begins,
continues, and ends. If we commit to this, we empower users to not only have a
seamless experience using our products, we also allow them to use whichever
device makes the most sense for them. As Cameron put it:

> The best interface is the one within reach.

Unified design isn't just important for the sake of a great user experience
across multiple devices. Right now, 13% of US adults are smartphone-only users,
and that percentage rises for people without a college degree, people who make
less than $20,000 a year, and young people --- 21% of millenials use the internet
exclusively on mobile. And the US is behind most countries in mobile use! So if
we continue gutting the functionality of our sites on small screens, we're
penalizing large and sometimes vulnerable groups of users who can't afford or
simply don't want another internet connection besides their phone.

So why do our mobile sites fall so short? Constantly growing desktop screens
gave us the opportunity to fill those screens with less-than-useful content. Once we
needed to adapt to small screens, we had to cut down our desktop sites and often
ended up sacrificing functionality. This is where the idea of mobile-first can
save us - rather than designing for desktop then scaling down, we can design for
mobile and then add enhancements depending on device capabilities. One of the
biggest gains for me from this conference was finally grasping the true value
of mobile-first design.

### Beyond devices, the Internet of Things is coming and can be awesome -- if we design responsibly.

I'll be honest, the [Internet of Things](http://www.wired.com/2013/05/internet-of-things-2/)
usually gives me a creepy,
hair-standing-up-on-the-back-of-my-neck, [Ray-Bradbury-was-right feeling](https://www.washingtonpost.com/business/technology/dreams-of-ray-bradbury-ten-predictions-that-came-true/2012/06/06/gJQAqbs9IV_story.html). But the
possibilities in front of us are truly amazing, and if we handle the responsibility
with care, we can meld the internet with our physical world in a way that actually improves
our lives. [Josh Clark](https://bigmedium.com/) suggested that instead of using
our powers to bombard people with ads or infantilize them with needless apps, **we
should strive to make people feel like superheroes.** One great example that Josh
shared is [Wayfindr](http://www.rlsb.org.uk/tech-hub/wayfindr), an audio
navigation system to help visually impaired people use the London Tube.

Josh also called on us to design calm technology - to weave data into the background
of our lives rather than overwhelming people with it. A wearable should be something
you'd wear if it didn't contain any technology. And like an [escalator](https://youtu.be/bVceIdoWf5o?t=378), a physical
item should still work if the technology within breaks.

### As the web seeps further into our lives, compassion is key.

One of the most powerful moments of the conference was Eric Meyer's presentation
on designing for real people through compassion. Through an incredibly personal
and vulnerable narrative, which you can read more about
[in this post](http://meyerweb.com/eric/thoughts/2014/12/24/inadvertent-algorithmic-cruelty/)
or [in his excellent book](https://abookapart.com/products/design-for-real-life),
Eric showed us the importance of considering users beyond the ideal personas we
create. Rather than considering these users "edge cases," Eric encouraged us to
think about "**stress cases**," users who have an urgent or sensitive need and require
additional thought and consideration. He challenged us to question our
assumptions about our users, to earn and maintain their trust, and not to
exacerbate the bad situations that inevitably affect people -- people who still
have to use the internet.

Josh Clark brought this up as well when discussing the rapid development of new
inputs for touch devices, recognizing that we don't yet have a set of principles
to design by. His simple call to action:

> Be the person who cares.

This principle was demonstrated throughout the conference, too. Even when
presenters brought up examples of people getting things wrong, they did so to
ensure that we learn from each other's mistakes rather than repeating them, and
they constantly reiterated that we all have room to improve.

## Other awesome things

Here's a little data-dump of other noteworthy items:

- From Jeffrey Zeldman: **We’re facing the same problems we always have** - bloat,
arguments over what code/language to use/support, which browsers to support,
different screen sizes/dimensions, how to do layouts, etc. These aren't new
problems even though the web is constantly evolving.
- From Jen Simmons: **The
[feature query](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports).**
Incomplete CSS3 modules are no longer unusable; they can be used in browsers
that support them and ignored by browsers that don't.
- Speaking of incomplete CSS3 modules,
**[CSS shapes](http://alistapart.com/article/css-shapes-101).** This one's a ways
off from being completed, but I can't wait to play around with it.
- From Aaron Gustafson: **Work harder so your users don't have to.** Aaron's
comprehensive guide on forms emphasized carefully considering every form field
to place the brunt of the work on the developer rather than the user.
- From Josh Clark: **Don't require a different app for every smart device.**
Make it easy on the user to connect via
[the physical web](https://google.github.io/physical-web/).
- From Jason Grigsby: **Input is exploding.** Consider the following: keyboard,
mouse, camera, accelerometer, trackpad, gestures, location services, voice,
compass, beacons (e.g. bluetooth), gyroscope, Siri and other AIs, fingerprint
recognition, Apple Pay, barometer, 3D touch. There were 142 years between the
keyboard and the mouse, and now we get new inputs with each new device.
- From Josh Clark: when designing for touch, **let the real world be your guide.**
Function isn't always more important than form when it comes to enabling new
users to seamlessly learn new technologies. As data becomes more and more
tangible, we can capitalize on new inputs to allow users to interact with the
web in increasingly realistic, physical ways.

## Was it worth it?

This was my biggest question given the relatively high cost, and yes, I think it
was worth it. The high caliber of the speakers, their presentations, and the
event as a whole justified the ticket price in my opinion. Every talk was
polished, informative, and relevant to the current status and future of our
industry. Not only did I learn a ton, I believe that the event spreads a
much-needed set of values that will be crucial to the progression of the web as
it infiltrates more and more aspects of our lives.

[Eric Meyer's post from 2005](http://meyerweb.com/eric/thoughts/2005/12/14/event-pricing/)
provides further clarity on the pricing.

Going in I anticipated more technical talks that directly taught a skill or
tool. Maybe half of the presentations were like this, and some of these covered
CSS3 modules that aren't yet supported enough to use. That said, I liked that
the general theme of the conference was shaping the future of web design and
front end development. I certainly walked away with new skills and a huge list
of things to try, but I also learned so much about what's coming in the industry
and how those of us who work in it can shape it for the better. I left
An Event Apart excited, motivated, and frantically trying to decide which of
the things I learned to explore first.
