---
layout: post
title: "Drupalized Web Mapping @ NACIS 2015"
date: 2015-11-05
author: Tim Stallmann
tags: drupal drupal-planet cartography
summary: Slides from Tim's talk on building web maps using Drupal at the 2015 NACIS conference.
---

Two weeks ago, I gave a presentation on [Drupalized Web Mapping](http://timstallmann.github.io/nacis-drupal-mapping-talk/#/) for the [North American Cartographic Information Society 2015](http://www.nacis.org) conference in Minneapolis, MN.
The full set of slides for the talk are [online via Github pages](http://timstallmann.github.io/nacis-drupal-mapping-talk/#/), but here I'm going to skip the "what is Drupal" side of the talk and focus on giving more detail on three different recommended workflows for building web maps in Drupal.

Note: At the time of writing this few of the modules mentioned had stable D8 ports. The shift to D8 is likely to change the landscape of mapping modules significantly, so the following advice is really focused on D7 sites (although we're using the third approach on a D8 site currently).

## The use case - why Drupal?

ArcGIS.com, Google My Maps, CartoDB, Mapbox - the list of GUI-based web-mapping tools keeps getting longer. These tools are great
for a lot of purposes. But there are a few things which are hard to do easily using most conventional web-based mapping/GIS tools that *are* easy to do in Drupal:

 * Annotating features with rich text and longer text descriptions, and having that text be easily editable in a WYSIWYG format.
 * Attaching media (pictures, audio and video) to features without having to use a separate external service for storing media. ArcGIS.com and CartoDB both require you to upload photos elsewhere and then copy-and-paste a URL from the photo location, not the simplest workflow.
 * Incorporating search and filtering capabilities.
 * Allowing multiple users to edit and comment on feature attributes, using versioning and permission controls.

This blog post covers how to add a styled web map of node locations to a Drupal website. There are also ways to add more powerful mapping
and GIS capabilities to Drupal (for example via [cartaro](http://www.cartaro.org), but I'm not going to talk about those here). I also assume you're already
familiar with basic Drupal concepts.

## Getting and storing geo-data

[Geofield](https://www.drupal.org/project/geofield) is the best module for adding location information to existing content types in a Drupal website. For most basic purposes, the default
storage settings will work just fine, although for more complicated geo-data you can also enable PostGIS integration for better performance on the back-end.
Geofield depends on the [GeoPHP API module](https://www.drupal.org/project/geophp), a wrapper for the [GeoPHP library](https://geophp.net/) which can also integrate with the [GeOS](https://geophp.net/geos.html) PHP extension, if it's installed on your server, for some moderate performance gains.

Once you've added a Geofield to your content type to store location info, you'll need to populate the field. [Geocoder module](https://www.drupal.org/project/geocoder) allows you to auto-populate a geofield by geocoding address information in another text field.
This can be a full address, or also just a city and state name. For production sites, you'll need to make sure that your site abides by the terms of use of your chosen geocoder (for example, [sites using Google Geocoder must also display
their data on a Google Map](https://developers.google.com/maps/documentation/geocoding/usage-limits)). The [MapQuest Open Geocoding](http://open.mapquestapi.com/geocoding/) service uses exclusively [OpenStreetMap](http://www.openstreetmap.org) data, and as such has a much less restrictive use policy. I haven't played around with using Mapzen's opensource [Pelias](https://github.com/pelias/pelias) geocoder
with Drupal yet, but the Geocoder module has a really simple plugin system that allows you to define your own geocoding endpoint.

For sites where ease-of-use on the data-entry side is a lower priority, you can also just allow direct input of latitude and longitude coordinates via the node edit screen (or pasting in GeoJSON for more complicated geometries). Lat/long coordinates
are easy to find via Google Maps, or even just a Google search.

## Leaflet module

One of the simplest ways to add a web map to your site is using the [Leaflet module](https://www.drupal.org/project/leaflet), which is a wrapper around the [Leaflet.js](http://leafletjs.com) web mapping framework. With Leaflet installed, you can set the display mode
for your geofield to "Leaflet Map", which will add a locator map to each node page. With Leaflet Views also installed, you can set the display mode for a view to "Leaflet" to output a view as a map - you'll need to include
a geofield as one of the fields in the view before this will work, of course. With this set-up, to add search or filters to the map all you have to do is add them as exposed filters to the view!

Leaflet offers some basic customization options -- you can set popup title and content, choose a different point icon image, and choose from a couple of different basemaps. The [Leaflet More Maps](https://www.drupal.org/project/leaflet_more_maps) module also offers some additional basemaps. But there
are a lot of limitations on customizing maps made using the Leaflet module. If you want to add multiple layers, use tokens from a field in the view to set the icon image, or add custom behavior overlays to the map you'll need to either use OpenLayers or write your own
 custom code.

## OpenLayers module

OpenLayers is a wrapper for the [OpenLayers](http://www.openlayers.org) web mapping framework. OpenLayers is a highly object-oriented mapping framework in which all components of the map (markers, popups, map interaction behaviors, data layers, etc.) are modelled using objects and inheritable classes. For example, to design
your own popup you theoretically just have to extend the `OpenLayers.Popup.FramedCloud` class and override some of its attributes or behaviors. In practice, this is more complicated than it sounds, especially because not all the class intricacies are well-documented.

OpenLayers offers much more customization via the various settings GUIs than Leaflet does. I'm not going to get into all the details here, as it's pretty self-explanatory (there's a [decent slideshare from DrupalCamp Spain](http://www.slideshare.net/pvhee/mapping-in-drupal-7-using-openlayers) as well). One thing you do need to know when using OpenLayers, is that you're going to need to create (at least) *two* views for each map. Each data layer will have its own view, with format `OpenLayers Data Overlay`. Then you'll configure a map object within OpenLayers, but in order to actually display the map you need to create a view with format `OpenLayers Map`. If you're using contextual filters, those filters need to be applied (with identical settings) on both views, for the map *and* the relevant data layer.

Open Layers does have a cost of more computational and memory overhead than Leaflet. On a recent project, I found that on a production server with the GeOS PHP extention installed,
 OpenLayers maps would fail to render on the server-side once the mapped view reached about 500-750 points. If you're just displaying individual points, you can get around this performance limitation using the [GeoCluster](https://www.drupal.org/project/geocluster) module for D7, which implements
 server-side clustering, but that module clusters all features at once and does not support, for example, clustering multiple feature layers separately. Also it needs some D8 port-related love.

<img src="/assets/img/blog/pauli_murray_map_site_screenshot.jpg" width="500px" height="223px" alt="Screenshot of Durham Civil and Human Rights map, showing a detail of Pauli Murray's childhood home." class="blog-image-large">

## Views GeoJSON + Custom leaflet.js code

This is a sort of "headless Drupal" approach, and it's the one we're using on Savas' first D8 site, the [Durham Civil Rights map](https://github.com/savaslabs/durham-civil-rights-map). By using the Views GeoJSON module, you can
render the output of any view containing location information as a GeoJSON feed (potentially even including exposed filters via the query path). Then, just like any GeoJSON feed, that data can be loaded via AJAX into a Leaflet (or OpenLayers, or other frameworks) map. Savas' [Anne Tomasevich](http://savaslabs.com/team/anne-tomasevich/) has a
great write-up on just how to do that [in Drupal 8 specifically](http://savaslabs.com/2015/07/06/map-in-drupal-8.html), and I wrote a post a while ago about [how to map GeoJSON data in Leaflet more generally](http://savaslabs.com/2015/05/18/mapping-geojson.html). This approach is still something we're
experimenting with, so we'd love to hear your thoughts. One note -- using this approach it's also possible for any user with enough permissions to view the GeoJSON feed to very easily download the full dataset using this approach.
