+++
title = "Urbit as overlay OS"
description = "Urbit OS is a personal server operating system that runs on any Unix box as a self-contained virtual machine"
tags = ["urbit-os", "virtual-machine", "runtime"]
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "Technical Documentation", link = "https://docs.urbit.org/urbit-os/what-is-urbit-os", description = "Technical explainer of Urbit OS" },
    { title = "Vere Runtime", link = "https://github.com/urbit/vere", description = "GitHub repository for Vere, the Urbit runtime" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

Urbit is a computer designed to last forever, but this doesn't mean that you are going to have the same hardware for three centuries. Instead, Urbit is a unified 'logical computer' that is portable across hardware instances as an 'overlay OS'. 

To do this, it uses the Urbit runtime, Vere, to run on any 'host' operating system. Presently this is done via [Unix binaries](https://docs.urbit.org/get-on-urbit#get-the-urbit-runtime) to support running on both Linux and MacOS, but in the near future there will also be Window's binaries as well.

One of the benefits to this overlay OS model is that your entire Urbit is as portable as a zip file. Want to move your urbit from a hosting provider to your own local hardware? Or from a local machine to a server you run in a datacenter? Just zip up your "pier" (the directory containing your urbit), send it over the internet, and start it up on the new hardware. Your Urbit will automagically reconnect with your peers and continue running as though nothing changed. 

Your urbit achieves this via "stateful networking", though, so make sure you don't "double boot"; that is, run an urbit node with the same identity in two locations at once. To avoid this, if you ever move your urbit, be sure to shut it down first, then move it and restart it in the new location. After starting it in the new location, delete (or otherwise never turn back on) any old copies of your pier. Double booting will disrupt your networking and require you to do a [factory reset](https://docs.urbit.org/user-manual/id/guide-to-resets), or 'breach', and may result in data loss.
