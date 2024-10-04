+++

title = "Shrub Mast"
date = "2024-09-12"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev: Tool" ]

[extra]
image = ""
description = ""
reward = "3 stars"
assignee = ["~bonbud-macryg"]
champion = ["~tamlut-modnys"]
grant_id = "P0387"
completed = false
canceled = false
+++

## Overview

Mast is a front-end model inspired by HTMX. It is also quite different from it. Mast takes the idea of applying minimal updates to the DOM with content rendered on the server, but instead of the developer writing swap logic, a diffing algorithm automatically creates the update and pushes it through an Eyre SSE channel to the Mast script on the browser which then executes the swaps. In addition to this, Mast provides an attribute system which lets you specify event listeners on elements such that the triggered events are poked into handlers in your ship, meaning that all of your client-side interface logic can be implemented in Hoon, within Urbit.

I originally built Mast within Gall, but after Lake Summit I began to work on a shrub version and I realized that the two models fit together very well. Shrubbery combined with Mast allows you to build a Web UI simply by defining Sail to render a shrub's data, and Mast will handle connecting and automatically updating the browser upon changes in this data. Shrub Mast lets you write Web UIs without touching either JavaScript or HTTP.

I recently expanded Shrub Mast with a component system, which in my opinion fully realizes the Shrub Mast model. Using a Sail component element, you can plug the UI of one shrub into the UI of another shrub. In other words, any Mast UI that you write can also function as a component within some other Mast UI. These components themselves can be diffed in and out dynamically. This lets you split up your interface into composable and reusable building blocks for rendering your shrubs, which can each serve as standalone UIs.

Some remaining work needs to be done to push this project to completion.

### Milestone 1: Documentation, Examples, and Tutorials

Estimated time: 1 week

Payment: 1 star

- I will write complete documentation, examples, and tutorials to make it easy for Urbit developers to build Shrub Mast UIs.

### Milestone 2: Feature-completion and Testing

Estimated time: 1 month

Payment: 2 stars

- I will finish a variety of remaining features and improvements, such as: the UI shrub session cleanup system, more flexibility in the accepted manx format, a toggle for diff logs on the client, handling for nonexistent piths, better return attribute handling, and other features recommended by the shrub team.

- I will add testing — in particular for the diffing algorithms and swap system in the script — to ensure that Mast is robust and production ready.

### Total compensation

3 stars
