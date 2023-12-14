+++
title = "Command-line install"
weight = 3
description = "Installation instructions for technical users"
tag = "selfhost"
+++

This guide covers running the Urbit runtime (Vere) using the command line. This
can be run on your local machine or a server in the cloud, we just cover the
local case here. The runtime is what interprets the Urbit kernel code (Arvo)
into commands your specific machine (macOS or Linux) understands.

Note there is a much more comprehensive [cloud hosting
guide](/getting-started/cloud-hosting) which walks through setting up Urbit on a
[Digital Ocean](https://www.digitalocean.com/) VPS.

### 1. System Requirements {% #about-swap-space %}

- **Processor**: 1 core
- **Memory**: 2GB
- **Storage**: At least a few GB, 40-50GB preferable
- **Network**: Any

**A note on memory**: By default, the Urbit runtime needs 2GB of free memory,
and will fail to boot without it. Urbit usually only uses a portion of this, so
it's possible to use a swap file to makeup for a shortfall without degrading
performance. For instructions on how to configure a swap file on Linux, see
[this linuxize.com guide](https://linuxize.com/post/create-a-linux-swap-file/).

**A note on storage**: Urbit saves every event it processes to its [Event
Log](https://developers.urbit.org/reference/glossary/eventlog). This means its
disk usage slowly grows over time. Until event log truncation is implemented,
it's advisable to have 40 or 50GB of disk space available, so you don't have to
worry about running out for a long time. If you don't have that much, your ship
will still run fine, but you may run out of space some months down the line.

### 2. Install Urbit

Choose your operating system and run the given command in your terminal to
download the Urbit runtime, this command downloads the latest build, unpacks
it, and runs the binary with no arguments to show you the help output:

{% tabs %}

{% tab label="Linux x86_64" %}

```shell
curl -L https://urbit.org/install/linux-x86_64/latest | tar xzk --transform='s/.*/urbit/g' && ./urbit
```

{% /tab %}

{% tab label="Linux AArch64" %}

```shell
curl -L https://urbit.org/install/linux-aarch64/latest | tar xzk --transform='s/.*/urbit/g' && ./urbit
```

{% /tab %}

{% tab label="macOS x86_64" %}

```bash
curl -L https://urbit.org/install/macos-x86_64/latest | tar xzk -s '/.*/urbit/' && ./urbit
```

{% /tab %}

{% tab label="macOS AArch64" %}

```bash
curl -L https://urbit.org/install/macos-aarch64/latest | tar xzk -s '/.*/urbit/' && ./urbit
```

{% /tab %}

{% /tabs %}

If successful, you will see a block of output beginning with the line:

```
Urbit: a personal server operating function
```

### 3. Boot Urbit

An Urbit instance is intrinsically tied to a unique identity called an **Urbit
ID**. There are five classes of Urbit ID, but we will consider two here: comets
and planets.

- **Comet:** A comet is an identity which anyone can generate themselves, for
  free. It's a good option to try out Urbit. Comets are limited by the fact they
  cannot be "factory reset", meaning if your urbit somehow becomes broken or
  corrupted then you'll have to start again with a new identity. In that sense,
  they are impermanent.

- **Planet:** A planet is a permanent identity which you own forever. Planets
  are the class intended for individuals. While there are essentially an
  unlimited number of comets, planets are more scarce (preventing spamming,
  among other things). This scarcity means they usually aren't free (though
  sometimes nice people give them away). This guide will assume you've already
  acquired a planet. If you haven't, you can refer to the ["Get an Urbit ID"
  guide](/getting-started/get-id) before continuing.

Follow the instructions for your case:

{% tabs %}

{% tab label="Boot a Comet" %}

In the terminal, with the `urbit` binary you installed in the previous step, a
comet can be booted with the `-c` option:

```bash
./urbit -c mycomet
```

> `mycomet` will be the name given to the folder it will create. 
>  You can choose any name you like.

It may take a while to initialize the comet (usually only a couple of minutes,
but it could take longer). When it's done, it'll take you to the dojo prompt
(the dojo is Urbit's shell):

```
ames: live on 31337
http: web interface live on http://localhost:8080
http: loopback live on http://localhost:12321
~sampel_marzod:dojo>
```

You can shut down the comet again by typing `|exit` in the dojo or hitting
`Ctrl+D`. When it's first shut down, the runtime will be copied inside the data
folder, so you can start it up again by doing:

```bash
./mycomet/.run
```
> Linux users need to run this command in another terminal window to access
> your urbit on port 80 every time you upgrade your runtime (otherwise it'll 
> default to port 8080):
>
> ```shell
> sudo apt-get install libcap2-bin
> sudo setcap 'cap_net_bind_service=+ep' <pier>/.run
> ```

Since comets are often used temporarily and then discarded, kernel updates are
not enabled by default. If you plan to use your comet for a while, it's a good
idea to enable updates with the following command in the dojo:

```
|ota (sein:title our now our)
```

Lastly most people use their urbit via Landscape, the browser-based UI. In order 
to access Landscape, you need your web login code. You can get this by running 
the following command in the dojo:

```
+code
```

It'll spit out a code that'll look something like `lidlut-tabwed-pillex-ridrup`.
Copy the code it gives you to the clipboard.

{% /tab %}

{% tab label="Boot a Planet" %}

In order to boot a planet, you need a copy of its private keys. If you got your
planet via a claim link, the passport backup `.zip` file you downloaded will
contain a file called something like `sampel-palnet-1.key`. If you don't have
the passport backup or you got your planet by another method, you can instead
login to [Bridge](https://bridge.urbit.org/), select your planet, go to the OS
section, and hit the "Download Keyfile" button.

Back in the terminal, with the `urbit` binary you installed in the previous
step, you can boot your planet with the following command (replacing
`sampel-palnet` with your own planet and pointing to the location of your
keyfile):

```bash
./urbit -w sampel-palnet -k sampel-palnet-1.key
```

This will create a folder with the name of your planet and begin booting.
It may take a while to initialize the planet (usually only a couple of minutes,
but it could take longer). When it's done, it'll take you to the dojo prompt
(the dojo is Urbit's shell):

```
ames: live on 31337
http: web interface live on http://localhost:8080
http: loopback live on http://localhost:12321
~sampel-palnet:dojo>
```

You can shut down the planet again by typing `|exit` in the dojo or hitting
`Ctrl+D`. When it's first shut down, the runtime will be copied inside the data
folder, so you can start it up again by doing:

```bash
./sampel-palnet/.run
```
> Linux users need to run this command in another terminal window to access
> your urbit on port 80 every time you upgrade your runtime (otherwise it'll 
> default to port 8080):
>
> ```shell
> sudo apt-get install libcap2-bin
> sudo setcap 'cap_net_bind_service=+ep' <pier>/.run
> ```

Most people use their urbit via Landscape, the browser-based UI. 
In order to access Landscape, you need your web login code.
You can get this by running the following command in the dojo:

```
+code
```

It'll spit out a code that'll look something like `lidlut-tabwed-pillex-ridrup`
(note this is a separate code to your master ticket). Copy the code it gives you
to the clipboard.

One last thing: The `sampel-palnet-1.key` keyfile is only needed once, when you
first boot your planet. **Now that it's booted, it's good security practice to
delete that keyfile.**

{% /tab %}

{% /tabs %}

### 4. Login

While your urbit is running, the web interface called *Landscape* can be
accessed in the browser. Its URL will usually be either `localhost` or
`localhost:8080`, depending on your platform. To check the address, you can look
at the boot messages in the terminal. You should see a line like:

```
http: web interface live on http://localhost:8080
```

Whichever address and port it says there is the one to open in the browser.

Once open, you'll be presented with the login screen. Paste in the web login
code you copied from the dojo in the previous step and hit "continue". You'll
now be taken to your homescreen, with tiles for the default apps such as Groups,
Talk, and Terminal.

### 5. Runtime Upgrades

When new versions of the Urbit runtime (Vere) are available, you'll have to 
shutdown your urbit and then run the `next` command in order to upgrade.
```
:dojo> |exit
<pier>/.run next
```
Note that `<pier>` in this case is the folder that was created when you first booted
your urbit. When you run this command your urbit will download the latest binary
and place it inside the `.bin` directory inside your pier folder. You can then 
start your ship with the following and you'll be on the latest runtime version:
```
<pier>/.run
```
> Linux users need to run this command in another terminal window to access
> your urbit on port 80 every time you upgrade your runtime (otherwise it'll 
> default to port 8080):
>
> ```shell
> sudo apt-get install libcap2-bin
> sudo setcap 'cap_net_bind_service=+ep' <pier>/.run
> ```

If you've been running Urbit for a while (from before runtime version 1.9) 
and these `.run` commands don't work for you, it probably means you need to 
[dock](https://operators.urbit.org/manual/running/vere#dock) your pier. 
You can do this with the following command:
```
./urbit dock <pier>
```
Then `.run` should work as expected and future runtime upgrades can be done via
`next`.

## Next steps

Learn how to [get around your
urbit](/getting-started/getting-around).
