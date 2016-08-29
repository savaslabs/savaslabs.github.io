---
layout: post
title: "Managing GeoJSON data using GDAL"
date: 2015-05-25
author: Tim Stallmann
tags: cartography leaflet
summary: Sometimes the data you want isn't exactly the data you have. This post examines how to clean, filter and convert data using free and open-source tools.
---

In my [last tutorial](/2015/05/18/mapping-geojson.html), we used USGS earthquake data to make a simple web map using leaflet. Today, we'll explore how to use GDAL tools to explore and manipulate GeoJSON data.
Why might this be useful?

* Removing un-needed properties to optimize filesize
* Filtering data by location for mapping purposes
* Cleaning data by removing invalid features
* Converting other geo-data formats into GeoJSON, or vice versa.

## Installing GDAL and Downloading Sample Data

[GDAL (Geospatial Data Abstraction Library)](http://www.gdal.org) is a free and open-source translator library for both raster and vector data formats. It provides a number of core functionalities for data processing and conversion which are used across the suite of [OSGeo applications](http://www.osgeo.org). More importantly for our purposes, GDAL provides a bunch of command-line tools for processing geospatial data.

If you're on a Mac and using homebrew, you can easily install GDAL by running `brew install gdal` from the command line. Otherwise, you can download [binaries from GDAL](http://trac.osgeo.org/gdal/wiki/DownloadingGdalBinaries) or [compile the source code yourself](http://trac.osgeo.org/gdal/wiki/BuildHints).

Just like the last tutorial, we're going to be using the USGS earthquake data. Navigate to [http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson](http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson), and save the resulting file to your computer as a `.geojson` file.

## Using OGRInfo to look inside your dataset

[OGRInfo](http://www.gdal.org/ogrinfo.html) lets us look inside geospatial datasets, viewing both summary info and lists of individual features. It's useful to see what attributes are available for a given dataset or how many features it contains, as well as testing out attribute filters and examining individual features.

Let's try some basic commands. Just running ogrinfo on a dataset will give you a list of all the layers it contains. In the case of GeoJSON, this is usually just a single layer.

```bash
$ ogrinfo all_month.geojson
ERROR 4: GeoJSON Driver doesn't support update.
Had to open data source read-only.
INFO: Open of `all_month.geojson'
      using driver `GeoJSON' successful.
1: OGRGeoJSON (3D Point)
```

That's not very helpful, so let's try peeking inside the (only) layer. ogrinfo syntax has you pass the layer name as the second argument. By default, it will print every feature in this dataset (7.5 Mb worth!) to the console, so instead let's add the `-so` argument, which displays a summary of the layer. Note that the GeoJSON driver for OGR has assigned the layer name `OGRGeoJSON`, which we're passing in:

```bash
$ ogrinfo all_month.geojson OGRGeoJSON -so
ERROR 4: GeoJSON Driver doesn't support update.
Had to open data source read-only.
INFO: Open of `all_month.geojson'
      using driver `GeoJSON' successful.

Layer name: OGRGeoJSON
Geometry: 3D Point
Feature Count: 10082
Extent: (-179.924400, -62.035900) - (179.989800, 68.959900)
Layer SRS WKT:
GEOGCS["WGS 84",
    DATUM["WGS_1984",
        SPHEROID["WGS 84",6378137,298.257223563,
            AUTHORITY["EPSG","7030"]],
        AUTHORITY["EPSG","6326"]],
    PRIMEM["Greenwich",0,
        AUTHORITY["EPSG","8901"]],
    UNIT["degree",0.0174532925199433,
        AUTHORITY["EPSG","9122"]],
    AUTHORITY["EPSG","4326"]]
mag: Real (0.0)
place: String (0.0)
...
magType: String (0.0)
type: String (0.0)
title: String (0.0)
```

Now this is getting somewhere! We've got info about the number of features, the extent of the data (apparently there aren't earthquakes at the poles, or USGS isn't monitoring them), the coordinate system of the data, and a full list of attributes.

What might that `type` attribute be telling us? We can use ogrinfo to run basic SQL queries on the data as well, for example:

```bash
$ ogrinfo all_month.geojson -sql "SELECT DISTINCT type FROM OGRGeoJSON -q"
ERROR 4: GeoJSON Driver doesn't support update.

Layer name: OGRGeoJSON
OGRFeature(OGRGeoJSON):0
  type (String) = earthquake

OGRFeature(OGRGeoJSON):1
  type (String) = quarry blast

...
```

Note: I'm using the `-q` flag to suppress some of the more verbose output. Also, ogrinfo unfortunately doesn't support `GROUP BY` or `LIMIT` clauses on SQL queries for GeoJSON files.

We can also use this to answer some basic questions about the data. Like, how many earthquakes were recorded with magnitude of 5 or greater?

```bash
$ ogrinfo all_month.geojson -sql "SELECT COUNT(*) FROM OGRGeoJSON WHERE mag>=5" -q
ERROR 4: GeoJSON Driver doesn't support update.

Layer name: OGRGeoJSON
OGRFeature(OGRGeoJSON):0
  COUNT_* (Integer) = 176
```

## Optimizing your data

Check the filesize of the `all_month.geojson` file you downloaded. It probably weighs in at around 7-8 Mb, which is really unwieldy for a client to download before viewing a web map. Can we trim the file down a bit?

First pass: if you remember the output from `ogrinfo -so`, you'll remember that there are a *lot* of attributes in this data-set! For a web map, we usually just use a few attributes to populate pop-up text. In this case, we're just going to use the place, mag, and url properties.

Ogr2Ogr is another tool designed for converting to and from a variety of geospatial data formats, but it also allows us to filter the data as we're copying it and only copy over specific attributes. So we can use it to "convert" the dataset from GeoJSON into a new GeoJSON with fewer columns.

The basic syntax is:
`ogr2ogr -f "Output format specifier" output_filename input_filename`

We want to cherry-pick only a few attribute fields, which we can to using the `-select` flag:

```bash
$ ogr2ogr -f GeoJSON all_month_optimized.geojson all_month.geojson -select mag,place,url
```

If you look at the filesize on the new geojson we just created, you'll see we managed to strip it down to a much smaller 2-3 Mb.

ogr2ogr also accepts the `-sql` flag, so we could also have written:

```bash
$ ogr2ogr -f GeoJSON all_month_optimized.geojson all_month.geojson -sql "SELECT mag,place,url FROM OGRGeoJSON"
```

## Filtering data by attributes

With this syntax, it's easy to select out a subset of the features (since who will really be able to navigate 10,000+ points if we were to map the full dataset, anyway?):

```bash
$ ogr2ogr -f GeoJSON all_month_mag_over_5.geojson all_month.geojson -sql "SELECT mag,place,url FROM OGRGeoJSON WHERE mag>=5"
```

Now we're just down to 44 kb, a totally reasonable size for mapping.

Here's what the dataset we just made looks like (via [geojson.io](http://geojson.io)):
<img src="/assets/img/blog/earthquakes-mag-5-geojson-io.jpg" width="500px" height="250px" alt="Screenshot of GeoJSON.io map showing earthquakes distributed across the world" class="blog-image-large">

## Filtering by location

What if we just want to map earthquakes that have taken place in a specific area?

The simplest way to approach this it to filter the data by a bounding box -- a rectangular area defined by latitude and longitude coordinates. [Geojson.io](http://geojson.io) has a rectangle-drawing tool which will give you latitude and longitude coordinates of the corners pretty easily. I tried drawing a rectangle over the rough area of the US East of the Mississippi, and passed those arguments into ogr2ogr's `-clipsrc xmin ymin xmax ymax` argument (that's South-East corner longitude, SE corner latitude, NW longitude, NW latitude):

```bash
$ ogr2ogr -f GeoJSON all_month_us_east.geojson all_month.geojson -clipsrc -86.835 24.206 -69.609 46.800
```

Here's the result. Florida turns out to be a good place to live if you want to avoid minor tremors! Also notice that because of using a simple latitude-longitude rectangle to filter the data, we also pulled in those parts of Canada which are south of Maine.
<img src="/assets/img/blog/earthquakes-us-east-geojson-io.jpg" width="400px" height="400px" alt="Screenshot of GeoJSON.io map showing earthquakes in the past month in the United States, with one point in Canada" class="blog-image-large">

## Filtering by location 2: Clipping to another dataset

But what if we want all the earthquakes in, say, North Dakota? For more complicated area queries, we'll have to supply the clipping area as a separate datasource.

We can download a shapefile of all 50 US States from the Census Bureau, then select out North Dakota and pass that as a clipping argument to ogr2ogr. First, download the `tl_2014_us_state.zip` file from the [Census Bureau FTP site](ftp://ftp2.census.gov/geo/tiger/TIGER2014/STATE/), and unzip it to the same directory as your geojson file.

Let's use ogrinfo to examine this file and see how we could select out North Dakota

```bash
$ ogrinfo tl_2014_us_state.shp tl_2014_us_state -so
INFO: Open of `tl_2014_us_state.shp'
      using driver `ESRI Shapefile' successful.

Layer name: tl_2014_us_state
Geometry: Polygon
Feature Count: 56
Extent: (-179.231086, -14.601813) - (179.859681, 71.441059)
Layer SRS WKT:
GEOGCS["GCS_North_American_1983",
    DATUM["North_American_Datum_1983",
        SPHEROID["GRS_1980",6378137,298.257222101]],
    PRIMEM["Greenwich",0],
    UNIT["Degree",0.017453292519943295]]
REGION: String (2.0)
...
NAME: String (100.0)
...
```

Looks like we can just select by name. Try it first in ogrinfo:

```bash
$ ogrinfo tl_2014_us_state.shp -SQL "SELECT * FROM tl_2014_us_state WHERE NAME='Georgia'" -GEOM=NO
INFO: Open of `tl_2014_us_state.shp'
      using driver `ESRI Shapefile' successful.

Layer name: tl_2014_us_state
Geometry: Polygon
Feature Count: 1
Extent: (-179.231086, -14.601813) - (179.859681, 71.441059)
...
```

That worked, so now we can format the whole ogr2ogr string, using `-clipsrc` and `-clipsrcsql` options. Note that because we're using a very detailed shapefile for the state outlines, this command takes a long time to process. On my MacBook Pro it clocks in at around 3 minutes.

```bash
$ ogr2ogr -f GeoJSON all_month_georgia.geojson all_month.geojson -clipsrc tl_2014_us_state.shp -clipsrcsql "SELECT * FROM tl_2014_us_state WHERE NAME='Georgia'"
```

And here's the GeoJSON dataset we just created, viewed on geojson.io -- all two earthquakes in Georgia last month!

<img src="/assets/img/blog/earthquakes-georgia-geojson-io.jpg" width="500px" height="164px" alt="Screenshot of GeoJSON.io map showing two earthquakes in Georgia" class="blog-image-large">
