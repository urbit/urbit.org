+++

title = "Implement a Git server on Urbit"
date = "2023-08-11"

[taxonomies]
grant_type = ["proposal"]
grant_category = ["Dev: Tool"]

[extra]
image = ""
description = "Implement a minimal Git server"
reward = "11 Stars"
assignee = ["~ponmep-litsem"]
champion = ["~lagrev-nocfep"]
grant_id = "P0297"
completed = false
canceled = false

+++

## Introduction

Git version control system has come to underpin virtually all of software development. Platforms like Github, Gitlab and others provide software development collaboration interfaces used daily by programmers around the world. (The statistics are astounding: around 100 million programmers use Github daily, and over 90 out of Fortune 100 companies use Github as their software development platform.) Although Git itself can be used as a collaboration tool with only email communication, Git web interfaces are overwhelmingly preferred, with very few exceptions of high-profile projects, such as, unsurprisingly, the Linux kernel (for which Git was originally written) and Git itself, whose development is to date conducted exclusively over email.

Thus, although Git technically supports decentralized workflows, in practice use of centralized platforms becomes indispensable because of collaboration features they provide. It is easy to understand this dynamics -- building software involves much that is simply not captured by Git. Submission of issues, pull requests and their collaborative integration, code exploration and review -- all of which are made accessible through a convenient interface.

As Curtis Yarvin wrote back in 2016 about %clay, Urbit's very own distributed VCS,

> In fact, it's really too spartan to fully use at the moment. We ourselves still use %clay mainly as a distribution 
>  system, and do all internal development on GitHub. 
> This is because the present %clay lacks a few little conveniences, like commit messages. See upgrades, below.
> --- https://urbit.org/blog/toward-a-new-clay

7 years later, all Urbit development workflows still rely exclusively on Github. Yet, Urbit with its built-in identity system and growing ecosystem of communication tools seems to be naturally suited to realize software development workflows now only possible with centralized providers, and even go beyond them. 

## A native Urbit Git implementation

We propose to build a minimal user-space Git agent in Hoon, capable of serving git repositories over the HTTP protocol, and supporting a basic set of Git operations. Additionally, an Urbit-hosted Git repository can be instantiated to a clay desk at a specific commit.

There is a number of interesting use cases even a bare-bones server-side Git implementation can offer.

1. An Urbit ship can distribute any Git-based software by allowing tailored, public or otherwise, access to a hosted git repository over the HTTP protocol. It can also mirror an existing git repository. Git hooks in Hoon are a possibility.
2. An Urbit ship can serve as a basic collaboration hub. Although at this point there is no collaboration interface yet, access to selected git operations can be granted to individual ships.
3. A Hoon developer can develop an app using Git and host the code on his own ship. He can set up a development group in Urbit, where others can report issues and post requests for pulls of code from git repositories on their own ships.

We plan to bring the native Urbit Git implementation to a point where it can in some way become part of the current core Urbit development workflow. At some point, all of Urbit development is going to happen at home. Native Git implementation is an important step in this direction.

## Implementation approach

There is currently a number of third-party Git implementations in addition to the reference Git implementation.
Among them are libgit2 (C), JGit (Java), go-git (Go), and Dulwich (python). Git architecture consists, among others, of a content-addressable store, a number of low-level routines for manipulating the store (plumbing), and set of convenience functions out of which user-interface is composed (porcelain). As such, Git naturally lends itself to a gradual implementation to a desired level of feature compatibility.

The Git implementation in Urbit will consists of: (1) libgit - Hoon git library and (2) %git - userspace git agent

## Milestones

### _Milestone valuation in USDC_

The author would like to propose an alternative valuation scheme, with milestones valued in USDC upon completion. 
Valuation in USDC would enable the author to commit to working on this project full-time until its completion. 
Each star of below milestones is valued at 4,000 USDC. 
The estimated time of completion is 1.5 month/milestone. This corresponds to average of 5,333 USDC/month.

### 1. Basic Git representation

Basic Git representation consists of: (1) object store, (2) configuration store, and (3) reference store. 
Basic functionality to manipulate these stores is implemented in `libgit`.

1. Write and read from objects in the object store (blob, tree, commit)
2. Default repository configuration. Read and write repository configuration
3. Create references to objects in the object store

`libgit` implements basic Git plumbing commands neccessary to support the functionality in 1, 2, and 3.
An empty Git repository can be created in the `%git` agent.

_Reward: 2 stars_  

### 2. Git clone

The `%git` agent implements `fetch-pack` functionality and is able to clone, fetch and pull from a remote git repository over the smart HTTP protocol. Only basic `fast-forward` merge is supported. `libgit` is able to handle git packfiles.

_Reward: 2 stars_

### 3. %git repository hosting

`%git` agent is able to serve as a git server, implementing the `upload-pack` functionality 
over the smart HTTP protocol. Basic repository access control is implemented.

_Reward: 2 stars_ 

### 4. Repository instantiation to a clay desk

The `%git` agent supports instantiation of a git repository to a chosen 
clay desk. A clay desk can be automatically kept in sync with a remote git repository by the `%git` agent.

_Reward: 1 star_

### 5. Basic set of Git userspace tools

Given sufficient Git plumbing support in `libgit`, we implement 
a minimal git CLI: `clone`, `merge`, `fetch`, `pull`, `log`, `diff`.
This enables basic on-board management operations of git repositories hosted by the `%git` agent.  

_Reward: 2 stars_ 

### (Stretch) 6. A web frontend patterned after CGit

To complete the functionality of the git agent, a repository can be explored through a basic web interface styled after [cgit](https://git.zx2c4.com/cgit/). Together with the server-side Git CLI, Urbit can serve as a decentralized Git hub.

_Reward: 2 stars_

### 7. The implementation story

The author will deliver an in-person (if possible) presentation at the Assembly 2023 narrating the story of implementing Git on Urbit, provided that sufficient progress has been made by that time. 

## Supplemental Milestones

### A. Support for pushing to an Urbit-hosted repository

With milestone 3, an Urbit ship implements the git `upload-pack` functionality that
allows git clients for cloning and pulling updates from a repository hosted on an Urbit-ship.
To complete git hosting capabilities, a support for pushing to an Urbit-hosted
repository is implemented.

_Reward: 1 star_

### B. `bytestream`  library in `zuse.hoon`

Low-level git functionality requires efficient operations on byte streams. To work around the current limitations of the Urbit runtime, `hoon-git` introduces a minimal byte stream library. In this milestone, this library is refactored and extended to allow for its general use and inclusion in `zuse.hoon`; jets are implemented for all byte reading and writing operations. 

_Reward: 1 star_

### C. git refspec implementation

Minimal fetch command is implemented in MS5 to support on-ship updates of git repositories. We extend fetch to support full git refspec configuration of a remote. This enables custom synchronization strategies, such as keeping a repository in sync with a selection of remote branches or tags.

_Reward: 1 star_
