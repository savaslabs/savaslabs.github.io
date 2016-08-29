---
layout: post
title: "Building a time machine for Durham's food landscape"
date: 2015-04-27
author: Tim Stallmann
tags: cartography leaflet durham
summary: Remember *Another Thyme*? *Kim Son*? *Honey's*? The *Know* restaurant and book store? As Durham gains more notoriety for its "foodie scene," it's easy to forget restaurants of the past. So here at Savas Labs, we've created a Durham restaurant time machine.
---
Remember *Another Thyme*? *Kim Son*? *Honey's*? The *Know* restaurant and book store? As Durham gains more notoriety for its "foodie scene," it's easy to forget restaurants of the past.
So here at Savas Labs, we've created a helpful [Durham restaurant time machine](http://www.savaslabs.com/durham-restaurants-map).

<div class="blog-image wrap-left">
<a href="http://www.savaslabs.com/durham-restaurants-map"><img src="/assets/img/blog/restaurants-map-pan-pan-diner.png" alt="Map showing the Pan Pan Diner, at its original location on Hillandale Road" width="250" height="212"></a>
<p>The Pan Pan Diner, at its original location on Hillandale Road (misspelled as <i>Hillondale</i> in the health inspections dataset)</p>
</div>

With this tool, you can click back through the years (from 1995 through 2015) to see which restaurants were open when, and where.
No longer do you have to wonder:

* Where was the original Pan Pan Diner located? (Hillandale Rd and I-85)
* Where was Ninth Street Bakery before it was on W Chapel Hill Street, and when did it move (776 Ninth Street, 1997)
* Is it true when people say that there were no restaurants downtown in the 1990s? (not exactly, but there were a lot fewer)

<br><b>Click here to [take a look!](http://www.savaslabs.com/durham-restaurants-map)</b>
And we'd love to hear what you think! You can reach us on twitter at <a href="https://twitter.com/savas_labs">@savas_labs</a>, or email <a href="mailto:info@savaslabs.com">info@savaslabs.com</a>.

## Sources
The data comes from [Durham's new open data initiative](http://data.dconc.gov/), which provides a dataset of restaurant inspections going back all the way to 1990.
We cleaned their data and mapped it using [Leaflet](http://www.leafletjs.com), an open-source Javascript mapping framework -- how we did that
 will be the subject of a future post! The gorgeous
basemap is [Stamen Design](http://www.stamen.com)'s watercolor tiles, but if you find yourself lost you can click the "label streets" button to get a little bit more
geographic context.

The full sourcecode for the map is available on github at [savaslabs/durham-restaurants-map](https://github.com/savaslabs/durham-restaurants-map).


