+++

title = "UV Extension Library"
date = "2021-10-08"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev: Other"]

[extra]
image = ""
description = "A typescript library which streamlines the experience of building Urbit Visor powered chrome extensions."
reward = "2 stars"
assignee = ["dcSpark"]
grant_id = "P0074"
completed = true
canceled = false
link = ""

+++

## UV Extension Library

Urbit Visor(https://urbitvisor.com) enables not just web apps to be created (such as Urbit Dashboard), but UV Extensions as well. UV Extensions are chrome web extensions which enhance users' current experience of the web by seamlessly integrating Urbit functionality. From adding overlays into social media websites, Urbit pocket-like functionality that follows you across the web, to direct integrations with crypto light wallets, the sky's the limit for what kind of UV extensions can be built.

The purpose of this grant is to build a typescript library which streamlines the experience for developers to build their own UV Extensions. It will implement the following functionality to enable this:

1. Implement an extension <-> extension messaging channel between Urbit Visor and arbitrary extensions built by developers.

2. Integrate the messaging channel into the library so that all messages emitted by UV extensions go directly to Urbit Visor with 0 configuration required.

3. Reimplement and expose the UV API to wrap around the extension <-> extension messaging channel to offer UV Extension developers the exact same developer experience as Urbit Web App developers.

In short, the library will allow developers to simply import it into their project and instantly start interacting with Urbit Visor. The technical details of how extensions implement messaging, configuring the messages so that they arrive at Urbit Visor, ensuring that the messages match the correct schema, having it all exposed in an easy to use API, among others are all taken care of.

This library is a key part of the Urbit Visor infrastructure required to provide developers a top notch experience in getting started building UV extensions by minimizing the barrier of entry.

## Milestones

### Milestone 1 - Implement UV Extension Library

Expected Completion: End Of October

Payment: 2 stars
