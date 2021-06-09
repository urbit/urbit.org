+++
title = "﻿A Collaborative Web Mapping System for Urbit"
date = 2020-09-03
[taxonomies]
grant_type = ["proposals"]
grant_category = ["App Dev: Other"]
[extra]
image = ""
description = "Allow small scale spatial data to be stored and retrieved in Urbit, for use in landscape and external applications, and shared across ships."
reward = 4
assignee = "Lumphead"
id = "634393623"
completed = false
link = ""
+++

A Collaborative Web Mapping System for Urbit
==================

##### Goal


Allow small scale spatial data to be stored and retrieved in Urbit, for use in landscape and external applications, and shared across ships.

##### Background/Motivation


This proposal has grown out of a previous bounty which called for Open Street Map data to be ingested into Urbit.  Through discussion it was decided that as OSM already provides a free, open and widely available base map and street network, a more useful system for Urbit would provide a method of storing spatial documents, which can overlay upon existing spatial data such as Open Street Map tiles, be collected together for use in landscape apps, and combined, shared and collaboratively edited with other ships as 'Portals'.  A spatial document, for the purpose of this proposal, is a single valid GeoJSON[^1] document.  A spatial document could contain a single geometry, a feature (geometry with associated properties), or a collection of features (a GeoJSON 'featurecollection').  A Portal is a collection of spatial documents, with associated metadata and can include spatial documents from multiple ships, whose owners can collaboratively edit or construct maps.  

##### Overview


 * The proposed system will follow the Urbit store-hook-view pattern as described here https://docs.google.com/document/d/1hS_UuResG1S4j49_H-aSshoTOROKBnGoJAaRgOipf54/edit?ts=5d533e42

 * The system will be implemented in two stages.  The first stage will implement simple spatial types and a spatial document store, demonstrate input and output of spatial data, and provide a minimal landscape app for creating and editing spatial documents, but limited to the local ship.  The second stage will build on the first and provide Portals; collections of spatial documents and associated metadata, which can be shared across ships - similar to the 'canvas' landscape app (https://github.com/yosoyubik/canvas).

#### Stage 1 - A spatial store, spatial types, simple demo app


##### Spatial Document Store and Tools

 * A storage system for the GeoJSON[^1] format and following the GeoJSON feature model.  
 * The store will accept GeoJSON, validate and store, my intention is to use 'enjs' and/or 'de-json:html' existing hoon libraries to parse JSON.  It will not perform any spatial indexing[^2]
 * Implement spatial types/structures - geometry, position, point, polygon, linestring, multipoint, multipolygon, geometrycollection upon which can be built the geojson geometry and feature model.
 * Implement a generator which can read a GeoJSON document in to the store, and can write a constructed document out of the store.
 * Implement a test suite based around GeoJSON specification and the above generator.
 
##### Hook, View and Landscape App

 * Implement the hook and view components of store-hook-view pattern atop the spatial data store.
 * In this stage the system will only allow data to be viewed/edited on the local ship.
 * Integrating spatial information with Landscape apps (which can render vector features using available javascript libraries/clients such as Openlayers and Leaflet).
 * Overall, somewhat like 'urlayers' hackathon project (github.com/gusmacaulay/urlayers), but with a sane data store and following the store-hook-view pattern.

#### Stage 2 - A Portal Store and Collaboration System

##### Store (Metadata,  Portals)

 * Expands on the Stage 1 architecture with additional store
 * The additional store which will house Portals.  Portals consists of a map document with metadata (area of interest bounds, styling[^3], author/s etc.), and which may contain many spatial documents, which may be stored locally or on other ships.
 * It may be that the Urbit graph store is the appropriate place for this information, exploring using graph store vs a custom Portal store will be undertaken as part of Stage 2.  
 
##### Hook/View/App

* A hook/view/landscape app which allows for displaying and interacting with Portals;
   * Editing of individual Portals
   * Sharing of Portals. As a resource owned by a ship, a Portal is somewhat analogous to a chat channel. Individual spatial documents within the Portal can come from local or foreign ship.  The owner of the Portal will be able to set permissions on spatial documents within the portal.
 * The overall concept of the Portal app can be likened to the 'canvas' landscape app, but for maps and cartography.  The key feature is to present a Portal map with spatial data from different ships and collaborative editing.

##### Footnotes

[^1]: The very readable spec for geojson can be found here http://geojson.org.  An overview of GeoJSON summarizing 
it's advantages and limitations can be found here https://macwright.com/2015/03/23/geojson-second-bite.html

[^2]: A mature spatial store would include spatial indexes and provide spatial queries, however for the objectives of this proposal basic spatial spatial documents storage and retrieval can be achieved without spatial indexing.  Each spatial document is treated as its own entity, and has limited querying beyond fetching and inspecting the data structure.  However this is enough that it can easily be splatted on a map.  Spatial indexing of geometries (or parent features/feature collections), is a sensible next step, which would allow many more use cases but is not in scope for this proposal.  

[^3]: It may be possible to store styling info within the spatial documents, there are at least two GeoJSON style storage conventions, but nothing standardised (see discussion here https://gis.stackexchange.com/questions/22474/geojson-styling-information).  Neither of these are part of the GeoJSON standard and appear to be not used much in the wild.  There are formats such as KML and GeoPackage which have styling support, but these are also more complex formats.

##### About Me

I am a beef farmer and software engineer (geospatial web applications).  I work with tools/frameworks such as Openlayers, Leaflet, Geoserver, Postgresql/PostGIS etc.  and I code predominantly in Java, Javascript, SQL, Clojure, and Python.  I have completed the original Hoon 101 course, half the 201 course, and the recent hackathon.  My hackathon entry was a very primitive geojson editor gall/landscape app (https://github.com/gusmacaulay/urlayers).


~lomped-firser


## Milestones


### Stage 1 
2 stars
A spatial store, spatial types, simple demo landscape app


### Stage 2
2 stars
A Portal Store and Collaboration System

    