---
layout: post
title: "Building a map in Drupal 8"
date: 2015-07-06
author: Anne Tomasevich
tags: drupal drupal8 drupal-planet cartography leaflet
summary: In this post I'll outline how to create a basic map in Drupal 8 using the Leaflet library within a custom theme and the Views GeoJSON module.
drupal_planet_summary: |
  Adding a map to a Drupal 7 site is made easy by a variety of location storage and map rendering modules. However, at the time of this post most of these modules don't have an 8.x branch ready and therefore aren't usable in Drupal 8. Since Savas Labs has recently taken on a Drupal 8 mapping project, we decided to use the Leaflet library within a custom theme to render our map and the Views GeoJSON module to store our data.

  In this post we'll add the Leaflet library to a custom theme using the new *.libaries.yml file, write a little Javascript to create our map, and pull in map points via a REST export view.
---

Adding a map to a Drupal 7 site is made easy by a variety of location storage and map rendering modules. However, at the time of this post most of these modules don't have an 8.x branch ready and therefore aren't usable in Drupal 8. Since Savas Labs has recently taken on a Drupal 8 mapping project, we decided to use the Leaflet library within a custom theme to render our map and the Views GeoJSON module to store our data.

Before we jump in, I have to give major kudos to my coworker [Tim Stallmann](/team/tim-stallmann/). This tutorial is based on his [excellent post](/2015/05/18/mapping-geojson.html) about mapping with Leaflet and GeoJSON, so check that out for a great primer if you're new to mapping.

## Setup

Before we can get into mapping, we'll need a working Drupal 8 site. Savas Labs has previously gone over [setting up a D8 site using Docker](/2015/04/23/drupal-8-docker-bowline-setup.html) and [creating a custom theme](/2015/06/10/d8-theming-basics.html). That said, you don't need to use Docker or a custom theme based on Classy to create your map - any Drupal 8 instance with a custom theme will do. In this tutorial, I'll be referencing our custom theme called Mappy that we created for the [Durham Civil Rights Mapping project](https://github.com/savaslabs/durham-civil-rights-map).

## Install contributed modules

First you'll need to install several contributed modules in your site's `modules/contrib` directory:

- [Geofield](https://www.drupal.org/project/geofield), which creates a new field type called geofield that we'll use within a view
- [GeoPHP](https://www.drupal.org/project/geophp), a dependency of Geofield
- [Views GeoJSON](https://github.com/savaslabs/views_geojson), a style plugin for Views that outputs data in GeoJSON, which can be used by Leaflet to create map points. You'll note that I've linked to Savas Labs Views GeoJSON GitHub repo rather than the module's [Drupal.org page](https://www.drupal.org/project/views_geojson), because at the time of writing this our 8.x branch is not yet available there. You can follow the status of this issue [here.](https://www.drupal.org/node/2527636)

There are 3 core modules you'll need:

- [Views](https://www.drupal.org/node/1912118) (now part of core!)
- [RESTful Web Services](https://www.drupal.org/project/restws) (otherwise known as rest)
- [Serialization](https://www.drupal.org/documentation/modules/serialization)

Rest and serialization are dependencies of Views GeoJSON, so they will be installed when Views GeoJSON is installed.

## Add the Leaflet library

<img src="/assets/img/blog/map-in-drupal-8/leaflet-files.png" alt="Screenshot of the Mappy theme showing Leaflet file locations" class="blog-image wrap-left" width="256" height="504">

Head over to [Leaflet's website](http://leafletjs.com/download.html) and download the latest stable release of the Leaflet library.

Move the Leaflet files into your custom theme directory (see mine for reference). You can put your files wherever you want to, you'll just need to customize your filepaths in the libraries file in the next step.

You should also create a custom JavaScript file to hold your map code - ours is called `map.js`.

Next you'll need to add the Leaflet library to your theme's [libraries file](https://www.drupal.org/developing/api/8/assets). In `mappy.libraries.yml`, shown below, I've defined a new library called `leaflet` and stated the paths to leaflet.css, leaflet.js and my custom JS file map.js.

Note that I've listed jQuery as a dependency - in Drupal 8 jQuery is no longer loaded on every page, so it needs to be explictly included here.

```yaml
# From mappy.libraries.yml
leaflet:
  css:
    theme:
      css/leaflet.css: {}
  js:
    js/leaflet.js: {}
    js/map.js: {}
  dependencies:
    - core/jquery
```

Once the library is defined, you need to include it on your page. This can be done globally by including the following in your [theme].info.yml file:

```yaml
# In mappy.info.yml
libraries:
 - mappy/leaflet
```

You could also attach the library in a Twig template:

```liquid
{% raw %}
{# In some .html.twig file #}
{{ attach_library('mappy/leaflet') }}
{% endraw %}
```

For more methods of attaching assets to pages and elements, check out Drupal.org's [writeup](https://www.drupal.org/developing/api/8/assets) on the matter.

## Define a new content type

Now we need a content type that includes a location field.

1. Navigate to `admin/structure/types/add`
2. Give your new content type a name (we called ours "Place"), then click "Save and manage fields."
3. Add a new field with the field type Geofield. If Geofield isn't an option, you should double-check that the Geofield module is installed. Add a label (we used "Location Coordinates"), then click "Save and continue."
<img src="/assets/img/blog/map-in-drupal-8/geofield_creation.png" alt="Screenshot of geofield creation" class="blog-image-large">
4. On the next page, leave the number of maxiumum values at 1 and click "Save field settings."

That's it! Obviously you can add more fields to your content type if you'd like, but all we need to generate a map marker is the geofield that we created.

## Add some content

Next, add a few points by navigating to "node/add/place" (or node/add/whatever your content type is called) and create a few nodes representing different locations. A quick Google search can provide you with the latitude and longitude of any location you'd like to include.

## Add a new view

Next we'll add a view that will output a list of our "place" nodes as GeoJSON thanks to the Views GeoJSON plugin.

1. Navigate to `admin/structure/views/add`
2. Give your new view a name - ours is called "Points."
3. Under View Settings, show content of type "Place" (or whatever you named your new content type).
4. Check the "Provide a REST export" box. Note that this box will only be available if the rest module is installed. Enter a path for your data to be output - we chose "/points". Click "Save and edit."
5. Under "Format," click on "Serializer." Change the style to GeoJSON. When the GeoJSON settings pop up, add the following settings:
  <img src="/assets/img/blog/map-in-drupal-8/rest-export-settings.png" alt="Screenshot the rest export settings for the Places view" class="blog-image-large" width="440px">
6. Under "Pager," change the number of fields to display to 0 (which means unlimited in this case).

For reference, here's the settings for my Places view:
<img src="/assets/img/blog/map-in-drupal-8/places-view.png" alt="Screenshot of settings for the Places view" class="blog-image-xl">

We've just set up a view that outputs GeoJSON data at [site-url]/points. Take a minute to go to that URL and check out your data. In the next step, we'll use this page to populate our map with points.

## Create the map div and add a base map

The first thing we need to do is create a div with the id "map" in our template file. Our map is on the front page so I've inserted the following into `page--front.html.twig`. Place this code in the template your map will reside in. Feel free to customize the class, but the ID should remain "map."

```html
<div id="map" class="map--front"></div>
```

We also need to define a height and width of the map div. Ours is going to span the entire page background so I've included the following in my Sass file:

```scss
.map--front {
  // Set these to whatever you want.
  height: 100%;
  width: 100%;
}
```

Previously we created a custom JavaScript file to hold our map code. Ours is called `map.js` and is located in our custom theme's `js` directory. In the code below, we've added the map itself and set a center point and a zoom level. We've centered over our hometown of Durham, NC and selected a zoom level of 12 since all of our map markers are viewable within this region. Check out [this explanation](https://www.mapbox.com/guides/how-web-maps-work/#tiles-and-zoom-levels) of zoom levels, or go for a little trial and error to get the right one for your map.

```js
(function ($) {
  // Create map and set center and zoom.
  var map = L.map('map', { // The `L` stands for the Leaflet library.
    scrollWheelZoom: false,
    center: [35.9908385, -78.9005222],
    zoom: 12
  });
})(jQuery);
```

Now we need to add a base map. We're using Positron by CartoDB. We'll import the tiles and attribution, then add them as a layer to our map.

```js
(function ($) {
  // Add basemap tiles and attribution.
  var baseLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
  });

  // Create map and set center and zoom.
  var map = L.map('map', {
    scrollWheelZoom: false,
    center: [35.9908385, -78.9005222],
    zoom: 12
  });

  // Add basemap to map.
  map.addLayer(baseLayer);
})(jQuery);
```

Go to your Drupal site and rebuild your cache and you should see your base map!

<img src="/assets/img/blog/map-in-drupal-8/map-without-markers.png" alt="Screenshot the base map" class="blog-image-xl">

## Add our points

Next, we're going to access the GeoJSON we're outputting via our view to add points to our map. First, let's add the path to our marker image.

```js
L.Icon.Default.imagePath = '/themes/custom/mappy/images/leaflet';
```

Now we'll use `.getJSON` to retrieve our data from the url "/points," then trigger the `addDataToMap` function to create a new layer containing our points via Leaflet's geoJson function.

```js
// Add points.
  function addDataToMap(data, map) {
    var dataLayer = L.geoJson(data);
    dataLayer.addTo(map);
  }

  $.getJSON('/points', function(data) {
    addDataToMap(data, map);
  });
```

 Refresh - we've got points!

<img src="/assets/img/blog/map-in-drupal-8/map-with-markers.png" alt="Screenshot of the map with markers" class="blog-image-xl">

## Add popups

The last thing to do is add popups to each point when they're clicked. We'll insert this code in the `addDataToMap` function. If you actually navigate to [site-url]/points, you can inspect your GeoJSON and see which array keys have been assigned to the fields in your content type.

<img src="/assets/img/blog/map-in-drupal-8/geojson-points.png" alt="Screenshot of GeoJSON" class="blog-image-xl">

I want to display the node title in the popup, which I can see is at `feature.property.name`.

```js
 function addDataToMap(data, map) {
        var dataLayer = L.geoJson(data, {
            onEachFeature: function(feature, layer) {
                var popupText = feature.properties.name;
                layer.bindPopup(popupText);
            }
        });
        dataLayer.addTo(map);
    }
```

Now when I click on a point I get a nice little popup with the node title.

<img src="/assets/img/blog/map-in-drupal-8/map-with-popup.png" alt="Screenshot of the map with a popup open" class="blog-image-xl">

Check out the entire [map.js file](https://github.com/savaslabs/durham-civil-rights-map/blob/master/themes/custom/mappy/js/page--front--map.js) and be sure to visit Savas Labs GitHub repository for the [Durham Civil Rights Mapping project](https://github.com/savaslabs/durham-civil-rights-map) and the [completed site](http://www.durhamcivilrightsmap.org/) to see a Drupal 8 site in action!
