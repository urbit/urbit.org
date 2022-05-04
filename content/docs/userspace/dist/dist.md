+++
title = "Overview"
weight = 1
template = "doc.html"
+++

Urbit allows peer-to-peer distribution and installation of applications. A user can click on a link to an app hosted by another ship to install that app. The homescreen interface lets users manage their installed apps and launch their interfaces in new tabs.

This document describes the architecture of Urbit's app distribution system. For a walkthrough of creating and distributing an app, see the [`Guide`](/docs/userspace/dist/guide) document.

## Architecture

The unit of software distribution is the desk. A desk is a lot like a git branch, but full of typed files, and designed to work with the Arvo kernel. In addition to files full of source code, a desk specifies the Kelvin version of the kernel that it's expecting to interact with, and it includes a manifest file describing which of the Gall agents it defines should be run by default.

Every desk is self-contained: the result of validating its files and building its agents is a pure function of its contents and the code in the specified Kelvin version of the kernel. A desk on one ship will build into the same files and programs, noun for noun, as on any other ship.

This symmetry is broken during agent installation, which can emit effects that might trigger other actions that cause the Arvo event to fail and be rolled back. An agent can ask the kernel to kill the Arvo event by using the new `%pyre` effect. Best practice, though, is for no desk to have a hard dependency on another desk.

If you're publishing an app that expects another app to be installed in order to function, the best practice is to check in `+on-init` for the presence of that other app's desk. If it's not installed, your app should display a message to the user and a link to the app that they should install in order to support your app. App-install links are well-supported in Tlon's Landscape, a suite of user-facing applications developed by Tlon.

For the moment, every live desk must have the same Kelvin version as the kernel. Future kernels that know how to maintain backward compatibility with older kernels will also allow older desks, but no commitment has yet been made to maintain backward compatibility across kernel versions, so for the time being, app developers should expect to update their apps accordingly.

Each desk defines its own filetypes (called `mark`s), in its `/mar` folder. There are no longer shared system marks that all userspace code knows, nor common libraries in `/lib` or `/sur` — each desk is completely self-contained.

It's common for a desk to want to use files that were originally defined in another desk, so that it can interact with agents on that desk. The convention is that if I'm publishing an app that I expect other devs to build client apps for (on other desks), I split out a "dev desk" containing just the external interface to my desk. Typically, both my app desk and clients' app desks will sync from this dev desk.

Tlon has done this internally. Most desks will want to sync the `%base-dev` desk so they can easily interact with the kernel and system apps in the `%base` desk. The `%base` desk includes agents such as `%dojo` and `%hood` (with Kiln as an informal sub-agent of `%hood` that manages desk installations).

A "landscape app", i.e. a desk that defines a tile that the user can launch from the home screen, should also sync from the `%garden-dev` desk. This desk includes the versioned `%docket-0` mark, which the app needs in order to include a `/desk/docket-0` file.

The `%docket` agent reads the `/desk/docket-0` file to display an app tile on the home screen and hook up other front-end functionality, such as downloading the app's client bundle ([glob](/docs/userspace/dist/glob)). Docket is a new agent, in the `%garden` desk, that manages app installations. Docket serves the home screen, downloads client bundles, and communicates with Kiln to configure the apps on your system.

For those of you familiar with the old `%glob` and `%file-server` agents, they have now been replaced by Docket.

### Anatomy of a Desk

Desks still contain helper files in `/lib` and `/sur`, generators in `/gen`, marks in `/mar`, threads in `/ted`, tests in `/tests`, and agents in `/app`. In addition, desks now also contain these files:

```
/sys/kelvin     ::  Kernel kelvin, e.g. [%zuse 420]
/desk/bill      ::  (optional, read by Kiln) list of agents to run
/desk/docket-0  ::  (optional, read by Docket) app metadata
/desk/ship      ::  (optional, read by Docket) ship of original desk publisher, e.g. ~zod
```

Only the `%base` desk contains a `/sys` directory with the standard library, zuse, Arvo code and vanes. All other desks simply specify the kernel version with which they're compatible in the `/sys/kelvin` file.

### Updates

The main idea is that an app should only ever be run by a kernel that knows how to run it. For now, since there are not yet kernels that know how to run apps designed for an older kernel, this constraint boils down to ensuring that all live desks have the same kernel Kelvin version as the running kernel itself.

To upgrade your kernel to a new version, you need to make a commit to the `%base` desk. Clay will then check if any files in `/sys` changed in this commit. If so, Clay sends the new commit to Arvo, which decides if it needs to upgrade (or upgrade parts of itself, such as a vane). After Arvo upgrades (or decides not to), it wakes up Clay, which finalizes the commit to the `%base` desk and notify the rest of the system.

That's the basic flow for upgrading the kernel. However, some kernel updates also change the Kelvin version. If the user has also installed apps, those apps are designed to work with the old Kelvin, so they won't work with the new Kelvin — at least, not at the commit that's currently running.

Kiln, part of the system app `%hood` in the `%base` desk, manages desk installations, including the `%base` desk. It can install an app in two ways: a local install, sourced from a desk on the user's machine, or a remote install, which downloads a desk from another ship. Both are performed using the same generator, `|install`.

A remote install syncs an upstream desk into a local desk by performing a merge into the local desk whenever the upstream desk changes.

The Kelvin update problem is especially thorny for remote installs, which are the most common. By default, a planet has its `%base` desk synced from its sponsor's `%kids` desk, and it will typically have app desks synced from their publishers' ships.

Kiln listens (through Clay, which knows how to query remote Clays) for new commits on a remote-installed app's upstream ship and desk. When Clay hears about a new commit, it downloads the files and stores them as a "foreign desk", without validating or building them. It also tells Kiln.

When Kiln learns of these new foreign files, it reads the new `/sys/kelvin`. If it's the same as the live kernel's, Kiln asks Clay to merge the new files into the local desk where the app is installed. If the new foreign Kelvin is further ahead (closer to zero) than the kernel's, Kiln does not merge it into the local desk yet. Instead, it enqueues it.

Later, when Kiln hears of a new kernel Kelvin version on the upstream `%base` desk, it checks whether all the other live desks have a commit enqueued at that Kelvin. If so, it updates `%base` and then all the other desks, in one big Arvo event. This brings the system from fully at the old Kelvin, to fully at the new Kelvin, atomically — if any part of that fails, the Arvo event will abort and be rolled back, leaving the system back fully at the old Kelvin.

If not all live desks have an enqueued commit at the new kernel Kelvin, then Kiln notifies its clients that a kernel update is blocked on a set of desks. Docket, listening to Kiln, presents the user with a choice: either dismiss the notification and keep the old kernel, or suspend the blocking desks and apply the kernel update.

Suspending a desk turns off all its agents, saving their states in Gall. If there are no agents running from a desk, that desk doesn't force the kernel to be at the same Kelvin version. It's just inert data. If a later upstream update allows this desk to be run with a newer kernel, the user can revive the desk, and the system will migrate the old state into the new agent.

### Managing Apps and Desks in Kiln

Turning agents on and off is managed declaratively, rather than imperatively. Kiln maintains state for each desk about which agents should be forced on and which should be forced off. The set of running agents is now a function of the desk's `/desk/bill` manifest file and that user configuration state in Kiln. This means starting or stopping an agent is idempotent, both in Kiln and Gall.

For details of the generators for managing desks and agents in Kiln, see the [`Dojo Tools`](/docs/userspace/dist/tools) document.

### Landscape apps

It's possible to create and distribute desks without a front-end, but typically you'll want to distribute an app with a user interface. Such an app has two primary components:

- Gall agents and associated backend code which reside in the desk.
- A client bundle called a [`glob`](/docs/userspace/dist/glob), which contains the front-end files like HTML, CSS, JS, images, and so forth.

When a desk is installed, Kiln will start up the Gall agents in the `desk.bill` manifest, and the `%docket` agent will read the `desk.docket-0` file. This file will specify the name of the app, various metadata, the appearance of the app's tile in the homescreen, and the source of the `glob` so it can serve the interface. For more details of the docket file, see the [Docket File](/docs/userspace/dist/docket) document.

### Globs

The reason to separate a glob from Clay is that Clay is a revision-controlled system. Like in most revision control systems, deleting data from it is nontrivial due to newer commits referencing old commits. If Clay grows the ability to delete data, perhaps glob data could be moved into it. Until then, since client bundles tend to be updated frequently, it's best practice not to put your glob in your app host ship's Clay at all to make sure it doesn't fill up your ship's "loom" memory arena.

If the glob is to be served over Ames, there is an HTTP-based glob uploader that allows you to use a web form to upload a folder into your ship, which will convert the folder to a glob and link to it in your app desk's docket manifest file.

Note that serving a glob over Ames might increase the install time for your app, since Ames is currently pretty slow compared to HTTP — but being able to serve a glob from your ship allows you to serve your whole app, both server-side and client-side, without setting up a CDN or any other external web tooling. Your ship can do it all on its own.

For further details of globs, see the [Glob](/docs/userspace/dist/glob) document.

## Sections

- [Glob](/docs/userspace/dist/glob) - Documentation of `glob`s (client bundles).

- [Docket Files](/docs/userspace/dist/docket) - Documentation of docket files.

- [Guide](/docs/userspace/dist/guide) - A walkthrough of creating, installing and publishing a new desk with a tile and front-end.

- [Dojo Tools](/docs/userspace/dist/tools) - Documentation of useful generators for managing and distributing desks.
