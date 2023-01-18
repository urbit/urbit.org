+++
title = "Focusing the Runtime"
date = "2023-01-18"
description = "Core development efforts will be focusing on the Urbit runtime for Linux and OSX systems. "

[extra]
author = "Josh Lehman"
ship = "~wolref-podlex"
image = "https://media.urbit.org/blog/runtime-focus.jpg"
+++

![](https://media.urbit.org/blog/runtime-focus.jpg)

<div style="font-size:13px; text-align: center; color: #999">Photo by <a href="https://unsplash.com/@jaspergarrattphotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jasper Garratt</a></div>
  
We’ve had a variety of options available to run Urbit, including a binary for Windows as well as a native desktop application called Port.

From version [1.16](https://groups.google.com/a/urbit.org/g/dev/c/3S6A8Qf8Qzg) and onwards the native Windows binary is no longer officially supported. This decision is primarily due to maintenance. Support for Windows was [added by a contributor](https://github.com/urbit/urbit/pull/4675) a year and a half ago, yet the cost of keeping this code working on an ongoing basis is high relative to the benefits gained.

At the time, options for Urbit hosting were limited and [Port](https://github.com/urbit/port) was one of the few ways to get onto the Urbit network. Support for Windows opened up the possibility for a large new segment of users to give Urbit a try. In the time since then, options for cloud hosting and better options for self-hosting that provide a significantly better experience are more widely available.   So we have also removed Port, the Urbit desktop client, from our recommended ways to get started with Urbit.

For newcomers to Urbit, hosting via [Tlon Hosting](https://tlon.io/hosting), [Third Earth](https://third.earth/home), and [Planet One](https://planet.one/) are all recommended. 

If you prefer to self-host, we’d recommend checking out [Native Planet](https://www.nativeplanet.io/) and their suite of [software](https://www.nativeplanet.io/software).

Windows users who wish to self-host can also explore using [Windows Subsystem for Linux](https://apps.microsoft.com/store/detail/windows-subsystem-for-linux/9P9TQF7MRM4R).

And if you’d like to operate in a desktop environment with either a hosted or self-hosted urbit, you can now use 3rd-party applications like Tirrel's [Scene](https://tirrel.io/scene/index.html) and Holium's [Realm](https://www.holium.com/).

We look forward to bringing you faster and more reliable runtime builds, and seeing the Urbit community's hosting services, hardware, and desktop interfaces continue to get better and better.

