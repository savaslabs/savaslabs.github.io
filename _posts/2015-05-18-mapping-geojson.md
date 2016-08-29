---
layout: post
title: "Mapping external GeoJSON data"
date: 2015-05-18
author: Tim Stallmann
tags: cartography leaflet
custom_js: leaflet.js
summary: Leaflet.js is a powerful, light-weight javascript API for mapping. In this post, I'll walk through how to use Leaflet to map GeoJSON data.
---
[Leaflet.js](http://www.leafletjs.com) is a powerful, light-weight javascript API for mapping. In this post, I'll walk through how to use Leaflet to map GeoJSON data. By the end, we'll have a map of earthquakes in the past 24 hours (using live USGS data) which looks like this:

<img class="blog-image-large" src="/assets/img/blog/earthquakes-map.jpg" alt="Screenshot of the map of earthquakes which we'll create in this tutorial." width="500" height="202">

## Basic Leaflet Set-up

This section largely duplicates the basic Leaflet set-up at [this tutorial](http://leafletjs.com/examples/quick-start.html), except for we also add a Leaflet-providers plugin to get easy access to additional tilesets.

The first step in any mapping project using Leaflet is to add a basic div to your page with `id=map`. Leaflet will grab onto this div and insert the map content dynamically. You'll need to fix the div size using CSS:

```css
#map {
  height: 300px; // Or whatever height you like
  width: 100%;
}
```

Next, we need to add Leaflet javascript and CSS and jQuery javscript to the page. jQuery is needed here to load external GeoJSON through an AJAX call. In a production site, you might want to host these libraries locally.

```html
<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"/>
<script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
```

The bulk of the mapping work will take place in custom javascript, which we can either place inline in the HTML file, or in a separate source file. We'll create a leaflet map object:

```js
var map = L.map('map');
```

Next, we need to add a background layer, or basemap. I like to do this using the [leaflet-providers](https://github.com/leaflet-extras/leaflet-providers) plug-in, which gives an easier way to add basemaps from multiple providers without having to manually specify the [URL template strings](http://leafletjs.com/reference.html#tilelayer) for each layer.

Download the `leaflet-providers.js` file, and save it in the same directory as your working HTML file. In a real site, I would be using [bower](http://www.bower.io) and [browserify](http://browserify.org/) to manage packages, but that's a topic for another post entirely. Place this code *after* the previous script tags.

```html
<script src="leaflet-providers.js"></script>
```

With leaflet-providers included, we can add a number of different basemaps. Here we're using free [OpenTopoMap](http://opentopomap.org/about) tiles.

```js
var terrainTiles = L.tileLayer.provider('OpenTopoMap');
terrainTiles.addTo(map);

// Set the initial viewport of the map. Here we're centering on Savas Labs' hometown and zooming out a bit.
map.setView([35.9908385, -78.9005222], 8);
```

## Bringing in GeoJSON

Whether you're pulling in GeoJSON from external data source or hosting it locally, you'll need to load the data using AJAX. jQuery provides a standard `getJSON` function, which will load JSON from an external source and then fire a callback once the data has loaded. In this example, I'm using the [USGS geoJSON feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) of all recorded earthquakes in the past 24 hours.

```js
function addDataToMap(data, map) {
    var dataLayer = L.geoJson(data);
    dataLayer.addTo(map);
}

$.getJSON("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(data) { addDataToMap(data, map); });
```

The callback creates a new Leaflet layer object by calling `L.geoJson`, and then adds that layer to the map.

Note that within jQuery, JSON is in all caps, whereas Leaflet uses strict camelCase (geoJson).

We need to access the map variable inside `addDataToMap`, so I'm using a closure here to pass that along with the data. This is usually not strictly necessary, since depending on how your javascript is written, `map` is probably already available within the scope of `addDataToMap`. But let's explicitly pass it here, to avoid being confusing.

Here's what your map should look like at this point:

<div id="map" style="width: 100%; height: 300px;"></div>
<script type="text/javascript">
L.Icon.Default.imagePath = "/assets/img";
var map = L.map('map');
var terrainTiles = L.tileLayer.provider('OpenTopoMap');
terrainTiles.addTo(map);
map.setView([35.9908385, -78.9005222], 3);

function addDataToMap(data, map) {
    var dataLayer = L.geoJson(data);
    dataLayer.addTo(map);
}

$.getJSON("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(data) { addDataToMap(data, map); });
</script>

## Adding Popups

Wouldn't it be nice to be able to click on some of those points and find out more details about the earthquake? So far we haven't made use of any, but Leaflet allows you to pass a variety of [callbacks as options to `L.geoJson`](http://leafletjs.com/reference.html#geojson). These include:

* pointToLayer( GeoJSON featureData, LatLng latlng )
  * Called once for each point feature in the geoJSON. Use this to create a custom marker when data points are added to the map. Returns [L.Marker](http://leafletjs.com/reference.html#marker) object.
* onEachFeature( GeoJSON featureData, ILayer layer )
  * Called after each feature is created and on the map. Use this to add event listeners to the feature.
* filter( GeoJSON featureData, ILayer layer )
  * Called once for each feature in the dataset to determine whether it should be displayed on the map or not. Returns a boolean true if the feature should be displayed, false otherwise.
* coordsToLatLng( Array coords )
  * Translates whatever coordinates are in the geoJSON file into latitude and longitude coordinates in WGS 84. Necessary if your GeoJSON data is in a different coordinate system. Returns a [LatLng](http://leafletjs.com/reference.html#latlng) object.
* style( GeoJSON featureData )
  * Generates CSS which applies to the marker for the feature with data `featureData`. Returns CSS in the form of a Javascript object.

Here, we'll modify `addDataToMap` to use `onEachFeature` to bind a popup to each feature as it is added. In general with GeoJSON you'll find additional data associated with each point in `feature.properties`. I'm using the USGS properties to add a popup giving the precise location, magnitude, and link to more info for each earthquake.

```js
function addDataToMap(data, map) {
    var dataLayer = L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            var popupText = "Magnitude: " + feature.properties.mag
                + "<br>Location: " + feature.properties.place
                + "<br><a href='" + feature.properties.url + "'>More info</a>";
            layer.bindPopup(popupText); }
        });
    dataLayer.addTo(map);
}
```

And here's the "finished" map! Stay tuned for more GeoJSON + Leaflet tutorials from [Savas Labs](http://www.savaslabs.com)

The final HTML file with inline javascript is also posted [as a gist here](https://gist.github.com/chrisarusso/d7d54a4149830a8baa6d).

<div id="map2" style="width: 100%; height: 300px;"></div>
<script type="text/javascript">
var map2 = L.map('map2');
var terrainTiles2 = L.tileLayer.provider('OpenTopoMap');
terrainTiles2.addTo(map2);
map2.setView([35.9908385, -78.9005222], 3);

function addDataToMap2(data, map) {
    var dataLayer = L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            var popupText = "Magnitude: " + feature.properties.mag
                + "<br>Location: " + feature.properties.place
                + "<br><a href='" + feature.properties.url + "'>More info</a>";
            layer.bindPopup(popupText); }
        });
    dataLayer.addTo(map);
}

$.getJSON("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(data) { addDataToMap2(data, map2); });
</script>
