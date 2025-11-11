+++

title = "Generalized Digital Content Web Store"
date = "2022-05-10"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]

[extra]
image = ""
description = "Online Store for Selling Digital Content (Text / Audio / Video)"
reward = "3 stars"
assignee = ["~tirrel"]
champion = ["~tacryt-socryp"]
grant_id = "P0140"
completed = true
canceled = false
link = ""

+++

# Rationale
Tirrel Studio is an open source collection of agents that allows anyone to publish digital content from their Urbit to the web. We currently support publishing basic blogs and email newsletters, and have seen strong interest despite our product being barebones. The next big move for us is to enable any creator on Urbit to get paid. We plan to add a generic storefront feature to Studio. This online storefront will function similarly to Substack or Patreon, allowing customers to subscribe to content from their favorite creator and be billed in US dollars on a monthly basis.

Subscriptions are an increasingly popular way for people to support creators they like and to receive access to digital services. Creators have a strong incentive to own their content and list of customers, as it often constitutes their entire income. Urbit's unique architecture is a perfect fit for serving both of these needs.

# Implementation
## New Agents:
Implement a new `%shop` generic store agent as a rewrite of the %naive-market planet sale agent. Shop will keep track of product listings, prices, inventories, metadata (descriptions, images, and categories), and records of sales for three types of products: planets, subscriptions, and one-time content purchases.

A new `%auth` agent will be created to handle content access for digital subscriptions and one-time content sales. This agent is currently in progress and maintains state regarding users, what those users have access to, and supplies a fully-featured magic link login system utilizing HTTP cookies and sessions for accessing webpages that are behind payment gates.

Current Agent Improvements:
The `%pipe` agent will be expanded to handle publishing a new type of site template, the “store template”.

The `%nmi` agent will be expanded to handle recurring subscriptions.

The %auth agent will keep track of paid content and who may access it (either a @p or an email address). When a user wants to access paid content, Magic will send a “magic link” which will authenticate the user and allow them access to the underlying content. Magic links will expire after they are used, and login cookies will expire after a week.

Shop:

```
    +$  product
    $%  [%planet who=ship sel=selector]
    [%subscription period=@dr renewals=$@(@ud [%infinite ~])]
    [%content base-url=@t ~]  ::  TODO: add in some form of S3 one-time url code generator
    ==
    ::
    +$  info
    $:  time=@da
    email=@t
    password=(unit @t)
    ==
    ::
    +$  update
    $%  [%add-product nam=@tas pro=product pri=price]
    [%del-product nam=@tas]
    [%set-product-price =nam =price]
    ::
    [%spawn-ships who=ship =config sel=selector]  ::  todo: move to thread
    [%sell nam=@tas =info]
    ==
``` 
## User Stories
[Omitted long matching line]

[Omitted long matching line]

- Jimmy Takeria is a big calisthenics guy who teaches other guys how to get jacked. He makes informational videos and posts them to YouTube as well as running a Discord community about calisthenics. Jimmy doesn't like YouTube and Discord's new misinformation policies because he has unconventional ideas about nutrition. Jimmy decides to move his community off of Discord and into Groups on Urbit, and sets up a Studio webstore where he sells access to his latest workout videos and cutting edge nutritional info on a subscription basis. He's satisfied that he can manage his entire online business using Urbit.

# Milestones and Compensation
July 2022 - 3 Stars - completion of agents and related documentation
