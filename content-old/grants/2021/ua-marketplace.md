+++
title = "Userspace Apprenticeship: Marketplace"
date = "2021-05-26"

[taxonomies]
grant_type = [ "Apprenticeship" ]
grant_category = [ "App Dev", "Arvo" ]

[extra]
image = ""
description = "A marketplace in which users can post items for sale and browse goods for sale by other users."
reward = "1 star"
mentor = ["~timluc-miptev"]
assignee = ["~dachus-tiprel"]
grant_id = "A0009"
completed = false
canceled = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0018&prefill_Grant+Name=Marketplace"
+++

A marketplace in which users can post goods for sale and browse goods for sale by other users. Probably similar in feel to Craigslist. A lot of design will be required here, since the space of possible things to make is very big.

The most likely architecture has users hosting their items, with aggregator-type services listing and indexing items from multiple users. It's also possible that sales will be able to designate escrow parties for money or goods, and/or arbitrator parties to decide when a sale is complete.

Simple versions of this can be implemented to learn userspace programming, and a particular good design could become its own product.

## User Stories

As a user I can:

- post goods I want to sell
- browse goods other users have for sale
- curate marketplaces other users can sell in
- buy products
- sell products
- have a 3rd party confirm when a sale is complete
