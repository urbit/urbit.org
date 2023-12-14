+++
title = "Herd"
date = "2022-08-10"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "Herd - Dependency management for Citadel"
reward = "2 stars"
assignee = ["~midsum-salrux"]
grant_id = "P0170"
champion = ["~littel-wolfur"]
completed = true
+++

## Dependency Management for Citadel

Currently, urbit does not have a dependency management system. Developers have to include system files and libraries in their application
desks, often with inconvenient symlink setups. This project will extend %citadel with a dependency management system that allows a developer
to define a list of dependencies for a desk that %citadel uses to retrieve inter-desk source files and keep them in sync.

## Deliverable

The user may create a desk.herd file (ala desk.bill and friends) at their desk root containing a hoon list of beef (a beam-like structure)
describing the set of dependencies for that desk. These should point to sources defined on local or remote desks accessible from the ship
running %citadel. %citadel will create a new build desk by fuse-ing the list of dependencies followed by the source files from the development
desk.

### Sample desk.herd file

```
=/  our  ~sampel-palnet
=/  now  ~2022.7.18..20.53.47..b9b2
^-  (list beef)
:~  [[our %base [%da now]] /lib/csv/hoon]
    [[our %landscape [%da now]] /sur/graph-store/hoon]
    [[our %bitcoin [%da now]] /lib/btc/hoon]
==
```

Documentation through %docs will also be included.

## Future work/stretch goals

%citadel could support command line library installation ala npm or rubygems by allowing developers to serve libraries remotely. This
example poke to a local instance could ask a remote %citadel on ~sampel-palnet for the sources corresponding to the %remote-lib library and
install them into %application-desk, all while maintaining the integrity of current state of dependencies for that desk.

```:citadel [%install %application-desk ~sampel-palnet %remote-lib]```

## Milestones & Compensation

Expected completion: September 15, 2022

Reward: 2 stars
