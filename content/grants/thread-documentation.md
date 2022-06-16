+++
title = "Thread Documentation"
date = "2021-02-17"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Documentation" ]

[extra]
image = ""
description = "Document, explain, and give simple howtos for the usage patterns of threads in the Dojo and Gall agents."
reward = "1 star"
assignee = ["~tinnus-napbus"]
id = "4948904"
completed = true
link = ""
+++

# Thread Documentation Bounty

The [official thread documentation](https://urbit.org/docs/tutorials/arvo/gall/#threads) is accurate and helpful, but it's a very thin combination of explainer (production code), how-to, and reference. It's a nice starting point, but it's not sufficient to let a typical Urbit autodidact enthusiast get fully comfortable with threads. As a result, they are often an uncomfortable/unused part of the Urbit system, even though they are useful and robust.

Fortunately, the amount of implicit knowledge needed to build a strong mental model of threads and begin using them in Urbit applications. By expanding the explainer/tutorial/howto/reference and delineating them more clearly, we can expose this part of Urbit to devs.

This bounty is detailed for clarity, but the individual sections shouldn't take too long to write and don't need to be extremely long.

## scope

- `ted` directory
- `spider` usage in Gall
- calling from the dojo with `-`
- the `bind`/`;<` chaining model
- how `spider` manages its threads

### not in scope

- aqua

## sections

### tutorial

- Walk through building a thread that composes multiple threads
- Will be all from the Dojo using `-`, no Gall
- Should include the following calls
  - setting a timeout
  - pass cards to Arvo/Gall
  - HTTP call
  - read a file from Clay

### explainer

- use `lib/strand.hoon` code to explain `bind` and the `%wait` etc. objects
- explain how all threads MUST take `strand-input` as an argument
- explain how `spider` sends `strand-input` to threads and how it determines which threads to send to.

### how-to

- Call out to outside web services, chaining calls in the manner of promises/async in other languages
- make system calls to Arvo
- receive/handle responses from Arvo
- use `spider` to integrate with Gall
- use `retry` and `backoff` for calls that may fail

### reference

This can be thin for now, because most necessary thread functions are in `lib/strandio.hoon`, and we don't need to just cut-and-paste that. Just make a quick list of functionality in `lib/strandio` or edit the one in the current thread docs

## user stories

- as a learner with Hoon knowledge, I will be able to build a mental model of how `spider` manages threads, sends input to them, and chains them together. `bind` and `;<` will be demystified and explained in very simple, mechanical ways.
- as a Hoon learner with prior monad experience, I should be able to get a feel for the similarities of IO monads and Urbit threads, and develop strong intuitions for the more mechanical nature of Urbit ones.
- as a moderately motivated autodidact with Hoon knowledge I should be able to start writing `ted` threads for Dojo usage immediately, with no other outside materials or informal help needed
- as a Gall app developer or maintainer, I should be able to integrate threads into my Gall apps

## resources available

`~timluc-miptev` will be available to whomever does the bounty to explain things, work through any tough spots, and connect to useful people if necessary.

## Milestones

### Complete the bounty

1 stars
Everything in "sections" is done.
