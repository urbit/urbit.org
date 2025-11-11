+++

title = "Plug"
date = "2022-09-01"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]

[extra]
image = ""
description = "Sell a catalog of physical goods from your Urbit"
reward = "5 stars"
assignee = ["~hastyp-patmud"]
champion = ["~novlud-padtyv"]
grant_id = "P0156"
completed = true
canceled = false
link = ""

+++

# Elevator Pitch
Plug is a lightweight way to list and sell a small catalog of physical goods on Urbit — Plug your merch!

# Purpose

Commerce is one of the most important needs fulfilled by the internet today. While there is a long way to go in terms of a complete solution for businesses at scale. There is no reason why Urbiters shouldn’t be able to move Etsy stores or Ebay listings onto Urbit, and sell to their friends on network.

Plug is that solution: A lightweight way to list products and take payments, storing your data on your Urbit where it can’t be taken away or sold back to you as a “Premium Tier”.

The goal of plug is to immediately enable users that want to sell one or a handful of things online today, while keeping in mind how it might accommodate adjacent systems built around it later — when it comes time to build tooling for more robust operations.

# Scope

There are many systems used by ECommerce stores today:
* **Storefront** — A interface for listing products, and checking out; often includes other media and content (I.e. pages), and things like discounts and coupons
* **Product Information Management (PIM)** — An interface for managing things like product listings, variants, product metadata, product dimensions etc
* **Inventory** — An interface and associated reports for managing quantity and supply of various products, variants and SKUs contained in a PIM
* **Warehouse Management System (WMS)** — A set of interfaces for tracking the handling of inventory items and related metadata (location, expiration, damage etc)
* **Fulfillment Management System (FMS)** — An set of interfaces for packing and shipping pieces of inventory, as well as tracking and notifications
* **Procurement / ERP** — A system for generating POs and ordering products from your suppliers; often includes forecasting
* **Marketplace** — A system which accommodates the abstraction of having multiple sellers (and their associated stores and catalogs) rather than just one; applicable at all layers of the data model

As you can see the scope is rather large. Plug is only intended to solve for a subset of this upon delivery, however its data models should be aware of these adjacent needs and take pains to future proof themselves for easy extension. A brief description of what Plug will cover is as follows:
* A **PIM Interface** to create, edit, delete basic product listings — title, images, description, id — no variants, metadata, complex specs etc
* A **storefront** to display product listings and a **checkout** (Bitcoin, Fiat); additional site content will be minimal
	* *Note: implementation will use JAMStack to insert web2 fiat payment rails for now, with the intent to upgrade once a native solution is available*

While by no means comprehensive, this targeted selection of tooling should be complete for the set of use cases we are targeting: *seller’s who want to list individual items, or a small catalog*

# Design and Implementation

## User Segments
* Sellers
* Buyers

## User Stories
1. As a **seller**, I need to be able to store product information on my Urbit, so that I own and control the content for my site
2. As a **seller**, I need to be able to create, update, and delete product information on my Urbit, so that I can poke and scry to manage my content
3. As a **seller**, I need to be able to add a product listing in a GUI, so that my product can be made available to buyers
4. As a **seller**, I need to be able to remove a product listing in a GUI, so that it does not keep getting bought after it is sold
5. As a **seller**, I need to be able to update product listings title, description and images in a GUI, so that I can make listings more enticing / error free
6. As a **seller**, I need to be able to update the price of a listing in a GUI, so that my price remains competitive
7. As a **seller**, I need to be able to serve a store, so that I can share product listings with buyers
8. As a **buyer**, I need to see product listings so that I can shop for what I want
9. As a **buyer**, I need to be able to add items to cart, for later purchasing
10. As a **seller**, I need customers to be redirected to an external checkout page, so that one of my various payment processors can validate the cart and collect payment
11. As a **buyer**, I need to be able to check out, so that I get my Items
12. As a **buyer**, I need to be able to pay with fiat, so that my bank can show my NSA Agent my conspicuous spending 🕵🏻‍♂️ 😉
13. As a **seller**, I need to be able to store bitcoin carts in my urbit, so that they can be made available in a GUI
14. As a **seller**, I need bitcoin carts to contain order info, that I know what to ship
15. As a **buyer**, I need bitcoin carts to contain payment/price info, that I know what to pay and which address to send to
16. As a **buyer**, I need to be able to pay with bitcoin wallet, so that my indiscretions remain private and decentralized 👌
17. As a **seller**, I need to be able to see bitcoin carts in a GUI, so that I know when orders come in
18. As a **seller**, I need to be able to see when a buyer has paid a bitcoin cart, so that I know to ship the items

## Technical Reqs

System will be desgned to send users to an external checkout; for the purposes of this grant, this will be a 3rd party web2/JS payment processor, in future work this boundary will be replaced with an Urbit native checkout application (either by gall or a web2/glob). In both cases the boundary/API contract should be similar. Will work with Tirrel on the design to minimize friction down the line for this future work.  

## Engineering Design

### Containter Descriptions
The implementation will have 3-4 distinct parts
* **PIM Backend** — a gall agent, essentially a product listing DB and associated pokes/scries for CRUD
* **PIM Frontend** — A globbed React (or Vue?) app; list of existing listings, form for adding listings, form for editing listings etc; image storage in S3 (or other URL)
* **A web storefront** — A (web2?) storefront built and served from your urbit via a gall agent and sail; displays product, and lets a user check out; payment processing via JamCart or SnipCart
* **Bitcoin Cart backend?** — a gall agent, handles interaction with bitcoin wallet to validate a cart has been paid (need some direction here)

### System Context (C1)

![IMAGE](http://thisistheaj.com/wp-content/uploads/2022/06/Screen-Shot-2022-06-17-at-12.39.40-PM.png)

### Container Interactions (C2)

![IMAGE](http://thisistheaj.com/wp-content/uploads/2022/06/Screen-Shot-2022-06-17-at-12.39.51-PM.png)

# Milestones

## 1. Data Design + PIM Backend
**Expected Completion**: Early Sept 2022
**Deliverables**:
* Engineering Designs for the system, i.e. C4 and preliminary Data Models
* A Gall Agent, User Stories 1-2
**Payment**: 1 Star

## 2. UI Design + PIM Frontend
**Expected Completion**: Late Sept 2022 (~aiming at assembly demo)
**Deliverables**:
* Greybox Skteches of the PIM UI Designs
* Globbed JS App, User Stories 3-6
**Payment**: 1 Star


## 3. Sail Storefront w/ fiat payment
**Expected Completion**: Oct 2022
**Deliverables**:
* Greybox Skteches of the Store UI Designs
* A Gall Agent + a sail frontend,
* JAM Stack cart integration
* User Stories 7,8
**Payment**: 1 Star

## 4. Fiat Checkout Integration
**Expected Completion**: Nov 2022
**Deliverables**: 
* 2 sets ofIntegration design docs and API contract: one for this grant and 1 for the later urbit native integration
* User Stories 9-11
**Payment**: 1 Star

# About Me

I am a seasoned full stack application developer. Although my initial training was in design and business, I keep getting more technical out of necessity. I’ve been an IC, an Engineering Manager, and a PM in the past.

Most notably I spent 2.5 years leading a team in charge of Warehousing and Supply chain Engineering at a Unicorn Delivery App startup, where I led a team that designed and built their WMS, and ERP systems from pre-valuation to 11B+.

I also have my own ecommerce store nowadays so I am very familiar with the space. Ideally I would like to get paid to port all of the SaaS products I use onto Urbit, so that myself and others can start serving our stores from there and take our data away from shopify and amazon. 

I believe I am uniquely positioned to execute on this.

I am already somewhat familiar with hoon, gall, ames and http-api. I built a habit tracker app that can be found at `web+urbitgraph://group/~hastyp-patmud/ulyssess`

# Future Work

Although this project is scoped to be SLC (simple, loveable, complete) for the purposes of this grant, here is a preview of what a tentative roadmap of follow on projects could look like:
**Plug** — Sell a Thing
* Product Listing
* Payment
**Hawk** — Display Your Wares
* Full Cart
* PIM including Variants, meta, specs etc
**Vend** — Track your merchandise
* Desktop Inventory system
**Ware** — Manage your physical business
* WMS, including PO receipt, Counting, moving, damaging, expiring inventory pieces
**Flea** — Invite sellers to your marketplace
* MarketPlace/Multiple Sellers
**Grab** — Manage your supply chain
* Procurement/ERP, PO generation, forecasting, accounting estimates etc
