+++

title = "Project Creation & Package Management for Urbit"
date = "2024-01-31"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Tool"]

[extra]
image = ""
description = ""
reward = "5 Stars"
assignee = ["~hastyp-patmud", "~doplyr-harbur"]
champion = ["~rovnys-ricfer"]
grant_id = "P0335"
completed = true
canceled = false

+++

# Rationale

We want to improve the urbit developer experience, while hardening the software supply chain——Right now, building on Urbit is building on hard mode. The developer experience has much to be desired when it comes to project creation, testing, and deploying, gaps that ultimately make incoming developers more likely to churn. As more peer to peer OS and/or application environment projects come to market, Urbit will need to bridge it's best in class kernel and systems level design, with equally robust dev tools across it's stack on both Urth and Mars.

# Overview
# Goals
- Build and release an MVP of the Urbit package manager, supported by an on-chain package registry system, metadata & attestation layer, and developer tooling.

Here is a shortlist of things that need to be solved for this goal:
- Project Creation
- Code Scaffolding for Hoon
- Binary Management
- Package/Dependency Management

# Workstreams
In order to facilitate this, there are a few different things that need to be built:

1. JS IPC Library (clack) — 1 Star — a js wrapper around conn.c to make your fake-ships scriptable from JS on MacOS
2. CLI (golem) — 1 Star — and Urth-side CLI for project creation, scaffolding, and binary & dependency management
3. Package Manager — 3 Stars — an Urbit instance of an Egyn registry for managing packages, binaries, and other Urbit artefacts, as well as a GUI to browse them

The Second part of this proposal doc will go into each of these in more detail.

# Design & Implementation
## Clack - Design
Clack is an IPC Library for JS for interfacing with Kahn. Why is this useful? Well, having this would essentially allow your urbit ships (or more likely, test ships) be scriptable from unix/javascript. For react devs, this means you can create build tools that work for both react and urbit, right from gulp/grunt and the like. It also means that you can create nodejs CLI tools that manage test ships as well. The clack library is important for this project specifically, because the lack of IPC connection in node is a blocker to creating a proper starter CLI from earth in JS (see golem in the next section). Making sure the IPC connection to node works and making sure at least %fyrd calls are supported will unblock the project, and clack can be later extended to include the other calls as well if needed.

## User Segments
- JS Developer

## User Stories
1. As a JS Dev, I need to be able to send %fyrd messages to conn.c, so that I can trigger threads in my fake ships
2. As a JS Dev, I need to be able to use self-documenting method names to make these calls, so that I can start using Urbit tooling before i finish learning Hoon/nouns
3. As a JS Dev, I need to be able to rely on the client to jam/newt encode my input, so that I can continue using objects/methods in my code

## Engineering Design
![Ocean](https://storage.googleapis.com/media.urbit.org/grants/Archetype-1.png)

## Golem - Design
Golem is a CLI for creating projects, managing dependencies, running a test env, and publishing your app. It uses a templating system to create new projects and add scaffolding to existing ones, emphasizing IAC in order to preserve consistency and allow teams to iterate on best practices for common activities in an Urbit app. It manages both code dependencies (think /lib/mydep.Hoon) as well as desk dependencies. The structure of the projects and test envs are included in the engineering designs of this section, as well as a diagram of which low-level interactions are handled at each step.

For now we will primarily be focusing on solving for: project creation

Once we complete the user stories for setting up the project (react/gall) and environmnent (fakezod) via the CLI, we can later scope out additional funcitonality.

## User Segments
- Urbit Developer

## Stories
### Creation
- As an Urbit Dev, I need to be able to create Urbit projects from unix, so that I don't need to set them up manually every time
- As an Urbit Dev, I need to be able to create a project with react, so that I can build my UI in JS
- As an Urbit Dev, I need to be able to create a project with sail, so that I can build a UI in Hoon
- As an Urbit Dev, I need to be able to create an empty project, so that I can set up a custom front end and desk with my preferred tooling
### Binary and Package Management pt. I
- As an Urbit Dev, I need to be able to get the right binaries at the time of project creation, so that I don't have to find and install them manually
- As an Urbit Dev, I need to be able to get the latest versions of %base and %garden at the time of project creation, so that I don't have to find and install them manually deployment pipeline
- As an Urbit Dev, I need to be able to publish my libraries to the registry, so that they can be reused by other contributors as a code dependency
- As an Urbit Dev, I need to be able to publish my desk to the registry, so that they can be reused by other contributors as a des dependency
### Package Management Pt. II
- As an Urbit Dev, I need to be able to search packages on the registry by name, so that I can find if it has what I need
- As an Urbit Dev, I need to be able to install a package from the registry, so that I can find reuse the code
- As an Urbit Dev, I need to be able to uninstall a package from the registry, so that I can remove vulnerabilities/surface area from my application

## Engineering Design
Here is a model of the project and test env structure of golem:
![Ocean](https://storage.googleapis.com/media.urbit.org/grants/archetype-2.png)

This diagram shows what low-level operations are run on your project or test fleet, when using the commands `create`, `serve`, and `deploy` respectively:
![Ocean](https://storage.googleapis.com/media.urbit.org/grants/archetype-3.png)
Ultimately, golem is the place from where you run the unix-side SDLC for an Urbit app (as shown above):
![Ocean](https://storage.googleapis.com/media.urbit.org/grants/archetype-4.png)

# UI/UX Design
- NA

# Package Manager - Design
## User Segments
- Urbit Developer
- Auditor

## Stories
- As an Urbit Dev, I need to be able to publish libraries to the registry, so that other developers can use them
- As an Urbit Dev, I need to be able to fetch libraries from the registry, so that other I can use them
- As an Urbit Dev, I need to automatically handle versioning of my libraries when I publish, so that other developers can keep tract of the version they are dependent on
- As an Auditor, I need to be able to publish attestations to libraries, so that I can provide metadata about what I can confirm about the package

## Engineering Design
See [Egyn Whitepaper](https://cdn.githubraw.com/archetype-org/archetype-org.github.io/ba0b901d1b308bd06f67d0c5bbd8e0ce6ed9fcf1/whitepaper.pdf) — The Urbit registry will be an instance of the Egyn stack, specific to Urbit.

# Milestones

clack — 1 Stars

golem — Project Creation — 1 Stars

Package Manager — Contracts and Deployment — 1 Stars

golem — Binary and Package Management — 2 Stars