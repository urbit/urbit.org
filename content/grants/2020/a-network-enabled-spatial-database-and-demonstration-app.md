+++
title = "﻿A network enabled spatial database and demonstration app for Urbit"
date = "2020-09-02"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "Allow small scale spatial data to be stored and retrieved in Urbit, for use in landscape and external applications, and shared across ships."
reward = "4 stars"
assignee = ["~lomped-firser"]
id = "634393623"
completed = true
link = ""
+++

# A network enabled spatial database and demonstration app for Urbit

##### Goal

Allow small scale spatial data to be stored and retrieved in Urbit, for use in landscape and external applications, and shared across ships.

##### Background/Motivation

This proposal has grown out of a previous bounty which called for Open Street Map data to be ingested into Urbit. Through discussion it was decided that as OSM already provides a free, open and widely available base map and street network, a more useful system for Urbit would provide a method of storing spatial documents, which can overlay upon existing spatial data such as Open Street Map tiles, be collected together for use in landscape apps, ...and poast .... A spatial document, for the purpose of this proposal, is a single valid GeoJSON[^1] document. A spatial document could contain a single geometry, a feature (geometry with associated properties), or a collection of features (a GeoJSON 'featurecollection'). The fridge store is a collection of poastcards, both those stored locally and those shared from other ships.

##### Overview

- The proposed system will follow the Urbit store-hook-view pattern as described here https://docs.google.com/document/d/1hS_UuResG1S4j49_H-aSshoTOROKBnGoJAaRgOipf54/edit?ts=5d533e42

- The system will be implemented in two milestones. The first milestone will implement simple spatial types and a spatial document store, demonstrate input and output of spatial data, and provide a minimal landscape app for creating and editing spatial documents, but limited to the local ship. The second milestone will build on the first and provide a network enabled store and web application for sharing 'poastcards'; spatial documents with text and an image, which can be shared with other ships and viewed through the web application ('Poast').

#### Milestone 1 - A spatial store, spatial types, simple demo app

##### Spatial Document Store and Tools

- A storage system for the GeoJSON[^1] format and following the GeoJSON feature model.
- The store will accept GeoJSON, validate and store, my intention is to use 'enjs' and/or 'de-json:html' existing hoon libraries to parse JSON. It will not perform any spatial indexing[^2]
- Implement spatial types/structures - geometry, position, point, polygon, linestring, multipoint, multipolygon, geometrycollection upon which can be built the geojson geometry and feature model.
- Implement a generator which can read a GeoJSON document in to the store, and can write a constructed document out of the store.
- Implement a test suite based around GeoJSON specification and the above generator.

##### Hook, View and (not Landscape) App

- Implement the hook and view components of store-hook-view pattern atop the spatial data store.
- In this milestone the system will only allow data to be viewed/edited on the local ship.
- Integrating spatial information with Landscape apps (which can render vector features using available javascript libraries/clients such as Openlayers and Leaflet).
- Overall, somewhat like 'urlayers' hackathon project (github.com/gusmacaulay/urlayers), but with a sane data store and following the store-hook-view pattern.

#### Milestone 2 - A networked spatial store, and full fledged demo app

##### Network enabled store ('Fridge')

- Expands on the Stage 1 architecture with an enhanced store ('Fridge') and an app ('Poast').
- The enhanced store (a 'Fridge'), which will house 'Poastcards'. Poastcards consist of an image,text, a geometry. A poastcard can be represented in a geojson feature, making heavy use of the the feature properties (a key value object, part of the geojson specification) to store the non-spatial information.
- It may be that the Urbit graph store is the appropriate way to share/link Poastcards, exploring using graph store vs a custom Fridge store will be undertaken as part of Stage 2.
- 'Poast' is a PoastCard viewing and sharing app, for landscape. We will implement a mvp/polished demo for this milestone.
- 'Poast' will be made available through the upcoming software distribution system as part of this milestone.

##### Rich demonstration App ('Poast')

- A hook/view/landscape app which allows for displaying and interacting with Poastcards/Fridge store;
  - Editing/Creation of Poastcards via a web ui.
  - Sharing of Poastcards; a Poastcard is a resource owned by a ship, once create they can be shared read-only with others.
- The overall concept of the Poast app can be likened to the experience of sending postcards and personal letters in the pre internet era. Unlike most present day social media, Poast will not have a feed.
- Poast will be minimally landscape integrated, insofar is it can be launched from a tile and follow landscape styling.
- For this milestone only a minimal set of features will be included to allow for creating, sharing, and viewing of Poastcards.


##### About Me

I am a beef farmer and software engineer (geospatial web applications). I work with tools/frameworks such as Openlayers, Leaflet, Geoserver, Postgresql/PostGIS etc. and I code predominantly in Java, Javascript, SQL, Clojure, and Python. I have completed the original Hoon 101 course, half the 201 course, and the recent hackathon. My hackathon entry was a very primitive geojson editor gall/landscape app (https://github.com/gusmacaulay/urlayers).

~lomped-firser

## Milestones

### Milestone 1

2 stars
A spatial store, spatial types, simple demo landscape app

### Milestone 2

2 stars
A network enabled spatial store, for sharing spatial data in urbit.
A rich demostration app, for sharing spatial data, images and text.


[^1]: The very readable spec for geojson can be found here http://geojson.org. An overview of GeoJSON summarizing its advantages and limitations can be found here https://macwright.com/2015/03/23/geojson-second-bite.html
[^2]: A mature spatial store would include spatial indexes and provide spatial queries, however for the objectives of this proposal basic spatial spatial documents storage and retrieval can be achieved without spatial indexing. Each spatial document is treated as its own entity, and has limited querying beyond fetching and inspecting the data structure. However this is enough that it can easily be splatted on a map. Spatial indexing of geometries (or parent features/feature collections), is a sensible next step, which would allow many more use cases but is not in scope for this proposal.
[^3]: It may be possible to store styling info within the spatial documents, there are at least two GeoJSON style storage conventions, but nothing standardised (see discussion here https://gis.stackexchange.com/questions/22474/geojson-styling-information). Neither of these are part of the GeoJSON standard and appear to be not used much in the wild. There are formats such as KML and GeoPackage which have styling support, but these are also more complex formats.
