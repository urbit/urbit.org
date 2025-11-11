+++
title = "Run urbit in a virtual server"
description = "Urbit runs seamlessly in any cloud server or datacenter you may already be familiar with"
tags = []
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "Technical Documentation", link = "https://docs.urbit.org/user-manual/running/cloud-hosting", description = "A step by step guide for running urbit on a cloud server" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

For the technical user, running urbit on a server from your favorite cloud provider is an easy way to sidestep the tedious nature of home networking, and get high reliability and uptime our of your urbit. It is also a fun process for the intrepid power user who wants to better understand how their computer works. 

Cloud server providers abound, from huge providers with lots of optional services like [Amazon Web Services](https://aws.amazon.com/) and [Google Cloud](https://aws.amazon.com/), to smaller, low-cost providers like [SSDNodes](https://ssdnodes.com) or [Linode](https://www.linode.com/). If you are already familiar with a cloud provider, just go with your favorite. If you haven't developed a preference yet, check out [this step-by-step guide for running urbit in a cloud server](https://docs.urbit.org/user-manual/running/cloud-hosting) for a few recommended options with very hands on instructions for how to get started in their specific environments.

The main thing to consider when running urbit in the cloud is to ensure your available compute, RAM, and storage is sufficient. Generally we would recommend the following as minimum requirements:

- **OS**: Linux, pick your favorite flavor
- **Architecture**: x86_64 or aarch64
- **vCPUs**: 1 (more is generally a waste unless you're running more than one Urbit)
- **Memory**: 2GB will work with a swapfile, though 4GB is preferred
- **Disk space**: 40GB is preferred but 10GB will work

Other than that, your Urbit will tend to perform better on higher performance CPUs and with additional memory, but you can get away with a small amount of memory and disk space at first, and as you use your urbit you may eventually hit the limit of one or the other and need to upgrade it.
