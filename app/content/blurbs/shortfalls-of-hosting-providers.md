+++
title = "Shortfalls of hosting providers"
description = "Hosting providers are designed to be scalable, not bespoke, operations."
tags = ["hosting", "urbit-os"]
lastest-update = ""
image = ""
imageDark = ""
references = [
    # { title = "", link = "", description = "" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

Hosting providers are a great solution for handling running and maintained large numbers of urbit ships at scale, and it is thanks to urbit's unique design that running your operating system as a hosted node doesn't mean your are forever trapped in MEGACORP's datacenter. But there are some considerations to having a hosting provider run your urbit for you that are worth considering.

Primarily, your urbit communicates over an end-to-end encrypted network (Ames), but because it is a full logical computer that runs as a process on the host machine, it cannot be 'encrypted at rest'. Yes, if your urbit was turned off it's pier could be encrypted before being put into storage, but *while running it must be unencrypted*. This means the an untrustworthy or otherwise compromised host could look at your data and computation. Now, urbit isn't designed as an *anonymous* computer network, and it isn't good for doing things that you wouldn't want your grandma to know you were doing (don't do crimes, kids), but it is worth noting that hosts *could* see your data *if they wanted to* (or if someone else forced them to).

Secondarily, because hosts operate at scale they are more likely to have more narrow ways to interact with your urbit. When self-hosting your urbit, you are in control (and responsible for) figuring out how to set up networking, chosing a domain name and DNS configurations, and accessing the underlying unix process (i.e. over `ssh`). Hosts will tend towards focusing on providing smooth and reliable access to your Urbit's web interface, for a smooth consumer experience. This is great for your average end user, but some power users or developers may find it more limiting than they desire.
