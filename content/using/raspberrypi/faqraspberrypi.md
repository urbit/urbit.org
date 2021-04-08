+++
title = "FAQ for Raspberry Pi"
description = "Frequently asked questions about running Urbit on a Raspberry Pi."
template = "doc.html"
weight = 2
[extra]
hidetitle = "true"
+++

Frequently Asked Questions about running Urbit on a Raspberry Pi.

## Are there any ports that should be publicly accessible to make a planet perform more quickly?

Urbit locally claims port 12321 (loopback, that's fine to stay closed) and a higher numbered random port for the [Ames](https://urbit.org/docs/tutorials/arvo/ames) port. The Ames port should be set/opened/forwarded, otherwise your planet will use Urbit's galaxy NAT breaking scheme which will be slower. To do this, set the Ames port to something known and open/forward it on your firewall/router. Protocol must be UDP. You can pass the port to use with the -p option when starting your ship - e.g.  `urbit -p 54345 sampel-planet`

## How can I check to see if my Urbit's Ames port is open?

Use [nmap/zenmap](https://nmap.org/zenmap) to check the UDP port. Format is ``nmap -sU -p <your-urbit-ames-port> <your-urbit's-ip>``

Example checking port 33333 on a ship running on 192.168.0.143

- https://i.gyazo.com/b880bf0684a3c4d0f248b6be5dbb035b.png

## How do I find the Ames state for a given ship?

In dojo run ``.^(ship-state:ames ax+/=//=/peers/~some-ship)``

## How do I see my route and if my ship's Ames port is directly open to the Internet?

First in dojo run ``|hi ~some-ship`` (otherwise the next command might crash) then run ``=/(ss .^(ship-state:ames ax+/=//=/peers/~some-ship) ?>(?=(%known -.ss) route.ss))``

It will say `direct=%.n` if you're firewalled/behind a router and `direct=%.y` if you have your Ames port exposed to the Internet so you can communicate with other Urbit ships directly.

## How can I check to see if my SSD and enclosure support USB Attached SCSI Protocol (UASP) and why should I care?

[UASP](https://en.wikipedia.org/wiki/USB_Attached_SCSI) allows for faster read/write data speeds to and from storage devices connected by USB 3. You can check if your SSD and enclosure supports UASP by running `lsusb -t` in a terminal. If the device says `Driver=uas` then you're all set. [More info here](https://www.jeffgeerling.com/blog/2020/uasp-makes-raspberry-pi-4-disk-io-50-faster).

- https://i.gyazo.com/0bf8b45397018d8730fd8ac56e07ec53.png

##  I can't download my Arvo keyfile from the Bridge. How can I fix this without breaching?

You need deterministic keys to be able to download your Arvo keyfile. To get deterministic keys, do a (non-breaching) rekey on [Bridge](https://bridge.urbit.org), download your new keyfile and then in dojo do: ``|rekey '0wsome.keyfile.string.goes.here'``

## What's TRIM and why should I care?

The problem [TRIM](https://www.crucial.com/articles/about-ssd/what-is-trim) fixes is deletions, which the controller of the SSD can't be made aware of without TRIM. It's always a good idea to have TRIM active on your SSD, because it will keep writes fast and prevent premature wear from write amplification, though the lack of TRIM actually causing a problem should be years away in most cases. [More info here](https://www.jeffgeerling.com/blog/2020/enabling-trim-on-external-ssd-on-raspberry-pi).

## Can I get my RPi to boot and be able to connect via VNC without requiring me to have a monitor connected at start up?

In a terminal on your RPi run `sudo raspi-config` then select `Display Options` and then `Resolution`.  Pick any of the DMT modes you like from the menu, just not the default. If you attach a monitor from time to time, pick the DMT mode appropriate for your monitor. If you fly headless all the time, it matters not.

- https://i.gyazo.com/98e39fcc638568b41195c1f10926bf05.png

## How can I test my RPI's disk latency?

You can use `ioping` to monitor I/O latency in real time. It shows disk latency in the same way as `ping` shows network latency. [More info here](https://www.cyberciti.biz/faq/linux-freebsd-openbsd-macosx-find-disk-io-latency-with-ioping).

Here's an example of `ioping` results run on an Argon RPI4 build.

NVMe SATA SSD connected via USB 3
```
$ ioping -DR -w 5 . | tail -n 1
min/avg/max/mdev = 165.7 us / 175.6 us / 1.27 ms / 14.6 us
$ ioping -DRL -w 5 . | tail -n 2 | head -n 1
generated 4.47 k requests in 5.00 s, 1.09 GiB, 894 iops, 223.6 MiB/s
```

microSD
```
$ ioping -DR -w 5 . | tail -n 1
min/avg/max/mdev = 325.8 us / 367.8 us / 8.09 ms / 114.7 us
$ ioping -DRL -w 5 . | tail -n 2 | head -n 1
generated 779 requests in 5.00 s, 194.8 MiB, 155 iops, 38.9 MiB/s
```

## My external drive plugged into my RPI4 keeps randomly unmounting. What's could be causing this?

While banging on various Argon ONE + M.2 SATA builds, we've noticed a significant performance issue between the [Official RaspberryPi4 PSU](https://www.raspberrypi.org/products/type-c-power-supply) and the slightly more powerful [Official Argon ONE PSU](https://www.argon40.com/argon-one-power-supply-for-raspberry-pi-4.html).

When stress testing the SATA drive while using the Official RaspberryPi4 PSU, we have noted that occasionally the mounted drive can disappear. This never happens while using the Official Argon ONE PSU.

Our conclusion is that the Official Argon ONE PSU has plenty of extra juice to handle very busy SATA drives, while the Official RaspberryPi4 PSU chokes.

If you're following the build instructions in the [Hot-To Guide for Raspberry Pi](@/using/raspberrypi/howtoguideraspberrypi.md), be sure to buy and use the Argon ONE PSU specified in the instructions.  And if you've got some other kind of RPi4 build with an external SSD and notice the drive randomly unmounting, then you should probably upgrade to a beefier PSU like the Official Argon ONE. 


## More Help

The “smol computers” Urbit group at ``~dasfeb/smol-computers`` is a friendly community of hardware hackers exploring the future of Urbit and Bitcoin on small computing devices like RaspberryPi, NanoPi, Android and ARM. Just post your questions in chat and someone will be happy to give you a hand.

![smol computers](https://i.gyazo.com/cc6ba88c61a2734fcecda4e34fb0b8dd.gif)
