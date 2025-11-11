+++

title = "Twitter UV Extension"

date = "2021-10-08"

[taxonomies]

grant_type = ["Proposal"]

grant_category = ["Dev: Apps"]

[extra]

image = ""

description = "Web extension which enhances twitter with native Urbit functionality."

reward = "4 stars"

assignee = ["dcSpark"]

grant_id = "P0090"

completed = true

canceled = false

link = ""

+++

## Twitter UV Extension

[Urbit Visor](https://urbitvisor.com) enables not just web apps to be created (such as Urbit Dashboard), but UV Extensions as well. UV Extensions are web extensions which enhance users' current experience of the web by seamlessly integrating Urbit functionality. From adding overlays into social media websites, Urbit pocket-like functionality that follows you across the web, to direct integrations with crypto light wallets, the sky's the limit for what kind of UV extensions can be built.

This grant is focused on building out a Twitter UV Extension, which is a web extension that injects UI and logic into twitter which interfaces directly (and securely) with the user's ship via Urbit Visor. The Twitter UV Extension will target two main use cases:

1. "Share On Urbit" - Users will have a share button in the bottom right corner of every single tweet they see on Twitter. When clicked, this which allows them to instantly share that tweet to any chat channel on their Urbit ship.

2. "Unroll" - Following in stride to the ever popular "unrolling" of twitter threads, users will have the ability to "unroll" any thread that they find straight into a notebook on their Urbit ship. This will allow users to read their favorite threads in long-form, save them for archival purposes, and share them in groups with others.

The Twitter UV Extension will be the first initial highlight of what is possible to be built on top of Urbit Visor. Furthermore it will allow users to take advantage of novel features such as hot-swapping between ships. User's data/ship is locked behind Urbit Visor's permission system, thus providing safety together with brand new functionality.

Because this is the first UV extension to be built (and prior to a full-fledged UV Extension Framework/Library being implemented) various design patterns and UI workflows will need to be figured out from scratch to make this happen. This initial work will set the stage for future UV extensions, and as such we will be building out key components (UI + logic) that other UV extensions can reuse to hit the ground running. For example, we will wrap workflows such as making the set of scries/subscribes to read group metadata & find all channels which are then exposed to the end user as an interactive modal with search which they use to select the correct channel they are looking for. This will allow us to do the brunt of the implementation, and then future devs can simply use in their projects as needed even with little to no Urbit knowledge.

These generalized components will eventually be integrated into a future UV Extension Framework/Library (which streamlines the entire process of building a UV extension for developers, including seamless direct extension <-> Urbit Visor messaging, wrapping the UV API, and more) but for now this grant focuses on building the Twitter UV Extension and the first generalized components as well.

## Milestones

### Milestone 1 - Implement UV Extension Workflow & Basic Share Functionality

Expected Completion: End Of October

Payment: 2 stars

### Milestone 2 - Implement Unroll Functionality

Expected Completion: End Of October

Payment: 1 star

### Milestone 3 - Generalize Components For Reuse

Expected Completion: Early November

Payment: 1 star
