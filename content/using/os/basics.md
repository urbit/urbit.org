+++
title = "Basics"
description = "How to operate your ship, including using your ship's filesystem and messaging applications, starting a moon, or requesting a DNS entry."
template = "doc.html"
weight = 1
aliases = ["docs/using/messaging/", "docs/using/admin/"]
[extra]
hidetitle = "true"
+++

Your urbit (also called your _ship_) is a persistent Unix process that you
mainly control from its console, called the `dojo`.

### Shutdown

You can turn your urbit off with `Ctrl-d` from the Chat or Dojo prompts.

You can force-quit your urbit with `Ctrl-z` from anywhere.

### Restart

To restart your urbit simply pass the name of your pier:

```sh
$ ./urbit some-planet
```

or

```sh
$ ./urbit comet
```

### Logging

To log an urbit's command line output to a file, use `script`:

```sh
$ script urbit.log ./urbit your-urbit
```

### Moving your pier

Piers are designed to be portable, but it _must_ be done while the urbit
is not running. Urbit networking is stateful, so you can't run two copies
of the same urbit in two places.

To move a pier, simply move the contents of the directory it lives in.
To keep these files as small as possible we usually use the `--sparse`
option in `tar`. With a pier `your-urbit/`, something like this should work:

```sh
tar -Scvzf ~/your-urbit.tar.gz ~/your-urbit/
scp your-old-server:~/your-urbit.tar.gz your-new-server:~
```

Then to unzip it, on your other Unix server, run:

```sh
tar xfvz your-urbit.tar.gz
```

Delete the tar file, and, after installing Urbit on your new server, start your urbit back up with:

```sh
./urbit your-urbit
```

### Hardware requirements

Urbit can run on any x86 computer (unofficial, unsupported [ARM binaries](https://botter-nidnul.github.io/AArch64_Urbit_Static_Binaries.html) are also available), ideally with at least 2GB of RAM.

Urbit maintains a persistent log of the history of your ship. Eventually this log will be automatically trimmed when necessary, but for now it only increases in size. An actively used planet will consume 5-50 GB of storage space per year of operation.

### Console

Your Urbit terminal is separated into two parts: the prompt (the bottom line) and the record (everything above that). The record is shared; all the output from all the apps in your command set appears in it. The prompt is multiplexed.

In the CLI, Urbit apps can process your input before you hit return. To see this in action try entering `)` as the first character at the Dojo prompt. Since there is no Dojo command or Hoon expression that starts with ')', the Dojo rejects it.

`Ctrl-x` - Switches the prompt between running console apps

`Ctrl-c` - Crash current event. Processed at the Unix layer and prints a stack
trace.

`Ctrl-d` - From Chat or Dojo, stops your Urbit process.

`Ctrl-z` - Stops the Urbit process from _anywhere_.

`↑` / `↓` - History navigation

The following emacs-style key bindings are available:

```
Ctrl-a    Cursor to beginning of the line (Home)
Ctrl-b    Cursor one character backward (left-arrow)
Ctrl-e    Cursor to the end of the line (End)
Ctrl-f    Cursor one character forward (right-arrow)
Ctrl-g    Beep; cancel reverse-search
Ctrl-k    Kill to end of line
Ctrl-l    Clear the screen
Ctrl-n    Next line in history (down-arrow)
Ctrl-p    Previous line in history (up-arrow)
Ctrl-r    Reverse-search
Ctrl-t    Transpose characters
Ctrl-u    Kill to beginning of line
Ctrl-y    Yank from kill buffer
```

### Updates

By default, you will automatically receive updates ([OTAs](/docs/glossary/ota-updates)) from your sponsor. To check your OTA source, run `|ota` in the [dojo](/docs/glossary/dojo).

If for some reason (for example, if your sponsor is out of date), you can switch OTA sources by running `|ota ~otasrc %kids` in the dojo, where `~otasrc` is the ship from which you want to receive updates. It is a good idea to contact the source ship and ask permission to sync from them.

If OTAs are not succeeding, or if you are on an version of Urbit before the `|ota` command was introduced, you can run `|merge %home (sein:title our now our) %kids, =gem %take-that`. **Note:** This will wipe out any custom changes to the base distribution.

#### Additional OTA Troubleshooting

Please check the Support Wiki for additional OTA troubleshooting, such as:
[OTA 1.0.71 failed](https://github.com/urbit/support/wiki/OTA-1.0.71-failed),
[Missing OTA](https://github.com/urbit/support/wiki/Missing-OTA),
[Stuck flow preventing planets from receiving
OTAs](https://github.com/urbit/support/wiki/Stuck-flow-preventing-planets-from-receiving-OTAs),
and [No content shows in Links page after OTA](https://github.com/urbit/support/wiki/No-content-shows-in-Links-page-after-OTA).

### Landscape

On startup Urbit tries to bind to `localhost:80`. If you're already running something on port `80` -- such as any other HTTP server, or another urbit -- you'll find the urbit that you just started on `8080`, `8081`, and so on. For planets only, we also provide web domains through Urbit's own domain. Any planet `~your-urbit` is also at `your-urbit.arvo.network`, but only after you [set up DNS](#dns-setup).

Once running, you can sign into Landscape, your ship’s web interface, from `http://localhost` or `https://your-urbit.arvo.network`. Since our HTTPS isn't audited / battle tested, we just call it "secure" HTTPS. You can find that on `8443`. Or `8444` (and so on) if you're already running something on `8443`.

### Moons {#moons}

Planets can spawn moons, which are meant for connected devices: phones, smart TVs, digital thermostats. The basic idea is that your planet runs permanently in a data center somewhere, while moons run on all your devices. Each planet can issue ~4 billion (`2^32`) moons.

To generate a random moon from your planet, run:

```
~sampel-palnet:dojo> |moon
moon: ~faswep-navred-sampel-palnet
\/0w5cT5t.wCO6i.~e1xg.Oz0qb.QNO6I.3Kt2T.h9M9F.U3vU~.X3Qu0.gtb19.IYTkY.80kWZ.SI\/
  EUE.DXa8i.TiDof.o3-1C.RHLKS.k81M0.ecz5o.ic0Bg.600g1
\/                                                                                                 \/
```

You must manually edit the output of `|moon` to get the correct format for the `key`:

- strip out the `\/`

- combine into one line, omitting spaces

`key` would be `0w5cT5t.wCO6i.~e1xg.Oz0qb.QNO6I.3Kt2T.h9M9F.U3vU~.X3Qu0.gtb19.IYTkY.80kWZ.SIEUE.DXa8i.TiDof.o3-1C.RHLKS.k81M0.ecz5o.ic0Bg.600g1`
in this example.

Put `key` in a file and that file becomes `keyfile`.

You can use the resulting output in the same installation flow from the [Installing Urbit](/getting-started/) guide, following the same scheme as for booting a planet. That scheme is:

```sh
$ ./urbit -w <moonname> -G <key> -c <piername>
```

or

```sh
$ ./urbit -w <moonname> -k <keyfile> -c <piername>
```

The `-c <piername>` argument is not required, but it is recommended; otherwise,
the resulting directory is a rather unwieldy moon name.

Here's how an example moon might be booted:

```sh
$ ./urbit -w faswep-navred-sampel-palnet -G <key> -c mymoon
```

or

```sh
$ ./urbit -w faswep-navred-sampel-palnet -k <keyfile> -c mymoon
```

Moons are automatically synced to their parent `%kids` desk, and can control applications on their parent planet using `|link`.

To breach a moon -- that is, to reset its presence on the network so that it's treated as a freshly spawned ship by others -- run from the parent ship:

```
|moon-breach ~faswep-navred-sampel-palnet
```

To cycle the keys of a moon without breaching, run:

```
|moon-cycle-keys ~sampel-sipnym-wicdev-wisryt
```

### Escaping A Sponsor {#escape}

To use the network as a planet or star, you must be sponsored by an active star
or galaxy, respectively. If your sponsor isn't suiting your needs, you can
escape to a different one. This can be done with
[Bridge](https://bridge.urbit.org/) following the instructions
[here](/using/id/using-bridge#escaping-your-sponsor).

### Continuity breaches

While the Urbit network is in this alpha state, we sometimes have to reboot the whole network. This happens either when major changes need to be shipped or we hit a bug that can't be fixed over the air.

Because Urbit networking is stateful we call this a _continuity breach_. Everything has to be restarted from scratch. Your pier will continue to function after we have breached, but it won’t connect to the rest of the Urbit network.

When this happens, back up any files you'd like to save, shut down your urbit, and recreate it (as if you were starting for the first time).

### Life and rift number

You can check your ship's _life_ and _rift_ number by running `+keys our` in
dojo. You can inspect another ship's life and rift number by running `+keys ~sampel-palnet`. For information on what life and rift are, see [Life and Rift](/docs/azimuth/life-and-rift).

## DNS setup {#dns-setup}

We have a system that lets you request a domain name for your ship in the form of `ship.arvo.network`, where `ship` is your ship's name minus the `~`. This allows users to access their ships remotely using Landscape, our graphical web interface.

Stars and planets follow the same process DNS request process, and galaxies have their own requirements. Moons and comets are not supported.

### Planets and Stars

For a planet or star's DNS request to be made and fulfilled, they must be hosting their ship someplace with a public IP address, and its HTTP server must be listening on port 80.

To get `ship.arvo.network` on a planet or star, you must set up DNS routing with its parent ship by starting the `:dns` app.

To do so, simply run this command in your ship's Dojo, passing the IP address as an argument, using the .0.0.0.0 (`@if`) syntax. For example:

```
> -dns-address &dns-address [%if .1.2.3.4]
```

`:dns`, running locally, will make an HTTP request to that IP address on port 80 to confirm that it is itself available at that IP and port. If that fails, you'll receive a `%bail-early` message in `:chat-cli`; this request will retry a few times. If the self-check is successful, the request is relayed to `~zod`, and you'll receive a message saying, `request for DNS sent to ~zod`. Once `~zod` has acknowledged receipt of the request, your local `:dns` app will send a `:chat-cli` message saying `awaiting response from ~zod`.

The request will be picked up shortly, and the `ship.arvo.network` DNS record will be set to the given IP address. Once that's set up, `~zod` will be notified and `~zod` will, in turn, notify your ship. That ship will now try to verify that it can reach itself on `ship.arvo.network` over port 80. If it can't, it'll send a message saying, `unable to access via ship.arvo.network`. If it can, it will configure itself with that domain and say `confirmed access via ship.arvo.network`.

Great! You're set up now. Try accessing your `ship.arvo.network` in your browser to use Landscape; we recommend Chrome or Brave.

### Configuring SSL

To enable SSL on your ship, use the `acme` agent, which will request a certificate through Let's Encrypt. First, make sure the agent is started:

```
> |start %acme
```

Next, provide the path for the SSL certificate by poking the `acme` agent. The path format is `/tld/your_domain/your_subdomain`, so if your domain is `sampel-palnet.arvo.network`, you'd use it like so:

```
> :acme &path /network/arvo/sampel-palnet
```

### Galaxies

Galaxies are already required to have separate DNS entry at galaxy.urbit.org. There's no automated process for getting that binding, so if you're a galaxy-holder, get in touch with us at support@urbit.org.

There is a command for galaxies that will try to re-use their already-necessary Ames DNS entry for HTTPS:

```
> -dns-auto
```

This will make HTTP-requests to self-check availability over `galaxy.$AMES-DOMAIN` (currently galaxy.urbit.org), where `galaxy` is the galaxy's name minus the `~`.

Otherwise, `-dns-auto` works the same as `:dns|ip` does with stars and planets: if it's available or unavailable, Chat messages, and so on.

### Ports

The built-in logic for listening on port 80 is to try to bind to port 80; if it cannot, it tries 8080, then increments until it can bind a port. Port 80 is available to unprivileged process on recent version of macOS. Otherwise, the process needs to either be run as root, or be given special permission (CAP_NET_BIND on Linux).

### Hoon

You can use Chat to evaluate Hoon code and share the results with everyone in a chat. To do so, preface your Hoon with `#`.

```
~sampel-palnet:chat-cli= #(add 2 2)
```

This will print as:

```
~sampel-palnet# (add 2 2)
                4
```

### URLs

To share a URL, send it as its own message, with no content before or after it.

```
~sampel-palnet:chat-cli= https://urbit.org/
```

This will print as:

```
~sampel-palnet/ https://urbit.org/
```

### Expanding messages

In the case of URLs, they may be too long to display on a single message line. For Hoon code, the code or result could be big. In `:chat-cli`, these get shortened when initially printed out. To view the entire contents, you can select the message in various ways.

```
~sampel-palnet+ some message
----------[240]
~sampel-palnet+ let's try selecting this message!
~sampel-palnet+ another message
~sampel-palnet:chat-cli=
```

In the above example, we can select the middle message by issuing any of the following command:

```
;240
;40
;;
```

`;n` looks for the last message whose sequence number ends in `n`. `;;` simply picks the second-to-last message.

Detailed message output will look something like this:

```
? 240
  0v5.g7r7l.n0d7m.mp4bn.gp6vr.sm5lj at ~2019.10.17..22.08.27..8a03
  ~sampel-palnet
  to ~dopzod/urbit-help
let's try selecting this message!
```
