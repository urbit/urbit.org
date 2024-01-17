+++
title = "Hari + Rama (The Urbit Cyclopaedia)"
date = "2022-03-25"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "Facilitating 'A literal but delinquent reprint of the Encyclopedia Schizophrenica on Urbit'."
reward = "6 stars"
assignee = ["~rabsef-bicrym", "~sogrum-savluc"]
grant_id = "B0211"
champion = ["~sarlev-sarsen"]
completed = false
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0211&prefill_Grant+Name=STP%20Cyclopaedia"
+++

# Hari + Rama (The Urbit Cyclopaedia)

## Rationale

Serving the People DAO would like to move some of their content onto the Urbit network. In order to do that, they need additional controls and facilities on top of the New Groups (and Diary) product Tlon will soon be releasing. Hari and Rama are a server and client agent for generating, maintaining, and connecting to "Foundations", groups that create Encyclopedias. Hari and Rama maintain additional metadata regarding the Encyclopedia, including folders, tags, permissioned authors and editors, opt-in view-count-per-post and unique-view tracking for the server.

## Overview
* `hari:` An Encyclopedia Schizophrenica Server, on Urbit. Generates "Foundations" and allows `rama` clients to connect to them to receive metadata.
* `rama:` A client for injesting additional metadata about groups, from `hari`. Note that it is not necessary for a user to use `rama` to read the contents of a Foundation's Encyclopedia (though they won't have the full experience).

## User Stories

### Hari
1. I can create a Foundation (meaning a Public Group, with a section called "<my input>-paedia", that contains a Diary that only I can write to, but who's posts anyone can comment on.
    
2. On creating such a Foundation, I associate with it some versionable set of metadata, which I can modify using a series of commands (initially, as below):
> Note: Hari contains both the state that rama normally carries plus some additional information that is not shared to clients.
    
> Note: Hari's command set relating to metadata allows the host to set the folders and tags that are allowed on their Foundation. If authors (almoners) or janitors tag/retag some document with a tag not in the allowed list (`tags.public`), those tags will be stripped but stored in `proposed-tags.secret` whereupon the admin can approve those tags for later use.
```
++  states
    |%
    +$  rama
      $:  folders=(jug term @ud)
          authors=(jug @p @ud)
          views=(map @ud @ud)
          tags=(jug term @ud)
      ==
    +$  hari
      $:  public=rama
        $=  secret
        $:  proposed-tags=(set term)
            unique-views=(jug @ud @p)
        ==
      ==
    --
```

3. For each Foundation that I create, I can permission a set of Almoners (writers) and Janitors (editors) for my Foundation.
    * Almoners can submit new articles and edit their own articles.
    * Janitors can retag/folder articles, edit articles, delete comments.

4. I can also close my Foundations at will, and cause the relevant Groups cleanup activities.
    
5. All metadata that I collect will be parsed into Hari. The public facing portions of this (de-identified) will be shared back to Rama users.
    
6. Though I am technically the only writer to the Foundation, I will preserve metadata about authors when they send me articles they write.
    
### Rama
    
1. I can watch any number of providers, whereupon I will learn of the Foundations they host.
    
2. I can join any Foundation or leave any Foundation from any host I watch, and Rama will track for me which I am in (despite being able to see this in Groups).
    
3. I can allow or disallow the capture of my viewing information for metrics to my Foundation provider.
    
4. I can save/delete articles into a list of my own (later editions might allow you to set up a Foundation from these materials).
    
5. I can receive metadata updates from the host including new articles being added to folders, tags, new view counts, etc.
    
6. I can view Foundations through standard Groups or through an interface that enriches that experience with the metadata captured by Hari and Rama.
    
## Architecture

The Foundation system will piggyback off of the New Groups system for content delivery. All Foundations will be legible and interactable through Groups, though they will lack some of the convenience of the metadata system that Hari and Rama afford.
    
## Milestones

### Milestone 1 - 3 stars
    
* Initial product provided to STP for Front End Development
* Product includes all features described in user stories above
* Product documentation includes step-by-step instructions for interacting through a JavaScript Front End.
    
### Milestone 2 - 2 stars

* Front End Development is in progress and STP identifies that all required components are in place for the completion of Front End Development, inclusive of any additions, changes, deletions, modifications to the interaction pattern required to complete the desired activities (see user stories).

### Milestone 3 - 1 star
    
* Product is deployed and available for installation on Urbit.
* All user stories are satisfied, an application listing is available at urbit.org/ecosystem and documentation is available via `%docs`.
