---
title: "Run Urbit OS"
source_kind: "overview"
canonical_url: "/overview/running-urbit/run-urbit-os"
human_md_url: "/overview/running-urbit/run-urbit-os.md"
agent_mode: "fallback"
dependencies:
  - "/overview/running-urbit.md"
related_pages:
  - "/overview.md"
  - "/overview/running-urbit/run-urbit-os.md"
---

Human-oriented content: /overview/running-urbit/run-urbit-os.md

# Run Urbit OS

Set up and run your own Urbit node

Once you have acquired an Urbit ID of your chosing, you will be able to spin up your own Urbit node, or 'ship'. There are a variety of ways to do this, each with their own tradeoffs and benefits. If you are a highly technical user, running your urbit in a virtual private server (VPS) can offer streamlined networking in an execution environment you are already familiar with. If you are just trying to maximize your personal sovereignty, Native Planet offers an easy way for you to physically run your urbit in your home to truly maintain control over your data.

## Urbit as overlay OS

Urbit OS is a personal server operating system that runs on any Unix box as a self-contained virtual machine

Urbit is a computer designed to last forever, but this doesn't mean that you are going to have the same hardware for three centuries. Instead, Urbit is a unified 'logical computer' that is portable across hardware instances as an 'overlay OS'. 

To do this, it uses the Urbit runtime, Vere, to run on any 'host' operating system. Presently this is done via [Unix binaries](https://docs.urbit.org/get-on-urbit#get-the-urbit-runtime) to support running on both Linux and MacOS, but in the near future there will also be Window's binaries as well.

One of the benefits to this overlay OS model is that your entire Urbit is as portable as a zip file. Want to move your urbit from a hosting provider to your own local hardware? Or from a local machine to a server you run in a datacenter? Just zip up your "pier" (the directory containing your urbit), send it over the internet, and start it up on the new hardware. Your Urbit will automagically reconnect with your peers and continue running as though nothing changed. 

Your urbit achieves this via "stateful networking", though, so make sure you don't "double boot"; that is, run an urbit node with the same identity in two locations at once. To avoid this, if you ever move your urbit, be sure to shut it down first, then move it and restart it in the new location. After starting it in the new location, delete (or otherwise never turn back on) any old copies of your pier. Double booting will disrupt your networking and require you to do a [factory reset](https://docs.urbit.org/user-manual/id/guide-to-resets), or 'breach', and may result in data loss.

### References

- [Technical Documentation](https://docs.urbit.org/urbit-os/what-is-urbit-os) — Technical explainer of Urbit OS
- [Vere Runtime](https://github.com/urbit/vere) — GitHub repository for Vere, the Urbit runtime

## Run urbit locally

Quickly and easily run urbit on your laptop, or home desktop computer

Because Urbit runs on any host OS, it is trivially easy to run an urbit ship on your laptop or home computer and connect to the Urbit network. After getting a copy of [the urbit runtime for your system](https://docs.urbit.org/get-on-urbit?#get-the-urbit-runtime) you can follow the instructions to "Boot up your urbit" and you will find that your local device has connected to the Urbit network and is now able to communicate peer-to-peer with other Urbit nodes.

There are some considerations worth mentioning about running your urbit locally and on a home network, though. "Out of the box" you get connectivity with other Urbit ships over [Ames](https://docs.urbit.org/urbit-os/kernel/ames), Urbit's p2p networking protocol, and this will persist even if your IP address changes (for example, if your ISP rotates your IP or if you are running on a laptop moving from coffee shop to coffee shop) thanks to Urbit ID's routing and peer-discovery mechanisms. You will also be able to easily access your urbit's web interface at `http://localhost:80` from the device running the urbit process or `http://<hostname>.local:80` from devices on your home network. 

But, what you won't get "out of the box" is a publicly accessible domain on the internet. This means, for example, that you won't be able to access something like `https://sampel-palnet.arvo.network` on your phone in order to connect to the [Tlon Messenger](https://tlon.io/posts/about-tlon-messenger) mobile app while you are on the go, or that you won't be able to use your urbit to publish a blog to the open internet. 

If you are technically inclined, running an urbit locally at home and setting up the networking can be a fun project, and there are plentiful reasons for why you might just want your urbit to avoid the public internet as a whole, but it is only fair to let you know that running urbit locally without any further configuration can give a somewhat truncated experience. That said, local instances are a great way to run ['fakeships'](https://docs.urbit.org/build-on-urbit/environment#creating-a-fake-ship) for development purposes.

### References

- [Technical Documentation](https://docs.urbit.org/get-on-urbit) — A step by step guide to running urbit locally

## Run urbit using Native Planet hardware

Placeholder description

[Native Planet](https://nativeplanet.io) is an organization that builds and sells beautiful computer hardware specifically optimized towards running Urbit nodes. Blending the benefits of hands-free managed hosting services, self-sovereign local hosting, and reliable cloud datacenters, running your urbit on Native Planet hardware is a highly recommended path for the Urbit 'power user', or even the technical developer who would rather spend time writing software than handling home networking issues.

Native Planet offers a variety of hardware devices designed to run one to many independent urbit instances, and all come preloaded with ColonyOS and Groundseg, Native Planet's open-source software for managing Urbit nodes and related services. Groundseg includes automatic MinIO setup as well, which is necessary for sending images in Tlon Messenger.

They also offer a SaaS service (a free year comes with each hardware purchase), Startram, which seamlessly handles DNS and networking so your urbit can be accessed from the open internet. Included in their offering is your own domain, like `https://sampel-palnet.startram.io`. 

Not big on SaaS services? Don't worry, they have made a single-tenant version of Startram called [Anchor](https://github.com/native-planet/anchor) which you can self-host if that is more your speed.

### References

- [NativePlanet.io](https://nativeplanet.io) — Visit the official Native Planet website to purchase hardware optimized for self-hosting urbit
- [Groundseg](https://manual.groundseg.app/) — Groundseg is free and open source software for running and managing urbit ships with a easy to understand GUI

## Run urbit in a virtual server

Urbit runs seamlessly in any cloud server or datacenter you may already be familiar with

For the technical user, running urbit on a server from your favorite cloud provider is an easy way to sidestep the tedious nature of home networking, and get high reliability and uptime our of your urbit. It is also a fun process for the intrepid power user who wants to better understand how their computer works. 

Cloud server providers abound, from huge providers with lots of optional services like [Amazon Web Services](https://aws.amazon.com/) and [Google Cloud](https://aws.amazon.com/), to smaller, low-cost providers like [SSDNodes](https://ssdnodes.com) or [Linode](https://www.linode.com/). If you are already familiar with a cloud provider, just go with your favorite. If you haven't developed a preference yet, check out [this step-by-step guide for running urbit in a cloud server](https://docs.urbit.org/user-manual/running/cloud-hosting) for a few recommended options with very hands on instructions for how to get started in their specific environments.

The main thing to consider when running urbit in the cloud is to ensure your available compute, RAM, and storage is sufficient. Generally we would recommend the following as minimum requirements:

- **OS**: Linux, pick your favorite flavor
- **Architecture**: x86_64 or aarch64
- **vCPUs**: 1 (more is generally a waste unless you're running more than one Urbit)
- **Memory**: 2GB will work with a swapfile, though 4GB is preferred
- **Disk space**: 40GB is preferred but 10GB will work

Other than that, your Urbit will tend to perform better on higher performance CPUs and with additional memory, but you can get away with a small amount of memory and disk space at first, and as you use your urbit you may eventually hit the limit of one or the other and need to upgrade it.

### References

- [Technical Documentation](https://docs.urbit.org/user-manual/running/cloud-hosting) — A step by step guide for running urbit on a cloud server

## Run Urbit Using Groundseg

Groundseg is free and open-source software for running urbits, developed by Native Planet

Groundseg is, in the words of Native Planet, "The best way to run an Urbit ship". Practically speaking, it gives the Urbit user a straightforward GUI for booting a new urbit ship, or uploading an existing pier, and then managing the operation of that instance of Urbit OS. You can adjust the available loom space to make room for additional apps or content in your urbit, you can truncate your event log to save space on your host machine, and you can even adjust automatic maintenance routines that keep your urbit running smoothly.

Distributed by default with every Native Planet hardware device, Groundseg also comes as the core focus of ColonyOS, a bespoke Linux distribution designed for exactly this purpose. Technically speaking, Groundseg does two core functions: it orchestrates docker containers running urbit instances, and it handles the networking flows of those containers—including to any attached Startram or Anchor instances to support streamlined clearweb access to your Urbit's web interfaces.


**Disclaimer**: GroundSeg runs with `sudo` privileges on your device. This is required for controlling various aspects of the device. For this reason, we (and the Native Planet team) recommend a dedicated device. Luckily, just about any old computer from the last 15 years will be able to run urbit, just keep in mind that the `urbit` process is heavy on disk writes, so expect that both read/write speeds will impact performance, and you should keep an eye on drive health over time.

### References

- [GitHub Repository](https://github.com/Native-Planet/GroundSeg) — The official Git repository for Groundseg, from Native Planet
- [Native Planet Software](https://nativeplanet.io/software) — Native Planet's official software page for downloading Groundseg
