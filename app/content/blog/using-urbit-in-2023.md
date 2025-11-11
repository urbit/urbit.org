+++
title = "Using Urbit in 2023"
date = "2023-02-06"
description = "There are more ways to run Urbit than ever, and more options coming soon."
[extra]
image = "https://storage.googleapis.com/media.urbit.org/blog/usingurbit-2023.jpg"
author = "Josh Lehman"
ship = "~wolref-podlex"
+++

![](https://storage.googleapis.com/media.urbit.org/blog/usingurbit-2023.jpg)

Recent years have seen several iterations on ways to run an Urbit node and join the network. [Port](https://github.com/latterbolden/port) and support for running Urbit from Windows were added a couple of years ago and have previously been recommended ways of running Urbit. We no longer recommend these options for the vast majority of users in favor of better options that are now available. 

Read on to learn about the background underpinning these decisions and your options for joining the network going forward.



# Background

With the introduction of Landscape in 2020 the demand for being on the network rose substantially from what it had been, yet the only way of running Urbit was through the command line, which was a significant barrier for entry. 

In 2021 Port and a native Windows binary were both introduced via contributions from the open source community: Port was built via our [grants](https://urbit.org/grants/cross-platform-desktop-urbit-app) [program](https://urbit.org/grants), and the Windows binary was contributed via a [pull request](https://github.com/urbit/urbit/pull/4675). Together, these two projects enabled users to run Urbit locally without requiring command-line knowledge. Port was summarily added as an officially recommended way to run Urbit.

Over the course of 2022 it became clear that, while often useful for trying Urbit out, the experience of running Urbit locally via Port was fundamentally limited: Urbit runs best as a server, and laptops provide neither a stable running environment nor consistent web-based access from other devices.

Windows presented further challenges, particularly around maintenance: our team of runtime engineers has had their progress stymied by the need to support Windows, which has substantially different requirements from macOS and Linux. It’s ultimately much more important to our team that we make progress on the versions of the runtime that run well in a server environment, which is the best way to use Urbit, than for local installations.

Going forward we no longer recommend Port as an officially supported option for joining the network, and have dropped support for the native Windows binary as of version [1.16](https://groups.google.com/a/urbit.org/g/dev/c/3S6A8Qf8Qzg) of the runtime. That said, it’s worth noting that Port *is not deprecated*! It is still actively [maintained here](https://github.com/latterbolden/port) by the same people that have been maintaining it since the beginning.

Let’s move on and talk about your options for getting on the network going forward.


# Joining the Network Today

Over the course of 2022 many companies emerged and built products that will get you on Urbit, and their teams are constantly working to provide you with a great experience.

If you’re not comfortable at the command line you should use a [hosting provider](https://urbit.org/getting-started/hosted). Hosting providers run your Urbit for you and take care of any ongoing maintenance required. If you eventually want to transition to running Urbit yourself, they’ll let you pack up your node and run it however you want: whether that’s at a different hosting provider or your own infrastructure. Learn about [recommended hosting providers in our getting started guide.](https://urbit.org/getting-started/hosting-providers)

For more technical users the [command line](https://urbit.org/getting-started/cli) is still a reliable option. For casual testing you can boot a planet or comet on your local macOS or Linux-based machine, and for more serious usage you should refer to our [cloud hosting guide](https://urbit.org/getting-started/cloud-hosting) to get set up on a VPS. A newer option for self-hosting is [Native Planet’s](https://nativeplanet.io) suite of [software](https://www.nativeplanet.io/software) for turning a local computer into an Urbit server complete with DNS.


# Coming soon

New options for joining Urbit are just around the corner.

Word has it that [Tlon](https://tlon.io/hosting) will soon allow you to invite your friends to groups directly from within their [suite of applications](https://tlon.io/landscape), with onboarding handled seamlessly through their hosting service. 

[Holium’s Realm app](https://www.youtube.com/watch?v=gdu4QtFR-Bs), a collaborative desktop computing environment available on macOS (for now), allows users to sign up with an existing Urbit or brand new hosted one — all seamlessly surfaced through Realm’s signup flow. You can sign up for the private alpha [here](https://holium.com).

Tirrel’s [Scene](https://planet.one/scene) is a desktop application with built-in hosting, like Realm, that works on macOS, Windows and Linux, and it’s available now. Hosting is powered by their [Planet One](https://planet.one) service.

For the self-hosting enthusiasts out there Native Planet has created [purpose-built Urbit home servers](https://www.nativeplanet.io/hardware) that [make self-hosting easy](https://twitter.com/jmrphy/status/1616196970384887808) and look great doing it.

Joining Urbit has never been easier, and it’s constantly getting easier. See you on the network!
