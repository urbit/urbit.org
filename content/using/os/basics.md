+++
title = "Basics"
description = "How to operate your ship, including using your ship's filesystem and messaging applications, starting a moon, or requesting a DNS entry."
template = "doc.html"
weight = 1
aliases = ["docs/using/messaging/", "docs/using/admin/"]
[extra]
hidetitle = "true"
+++

This document deals with:

- Running an Urbit ship with the ordinary runtime [from the command line](/getting-started/cli).
- Basic setup, configuration and usage in Urbit's shell called the `dojo`.

If you're looking for information on using the GUI application [Port](/getting-started#port), see the [Port guide](/using/running/port) instead.

## Shutdown

You can turn your urbit off with `Ctrl-d` from the Chat or Dojo prompts.

You can force-quit your urbit with `Ctrl-z` from anywhere.

## Restart

To restart your urbit simply pass the name of your pier:

```sh
$ ./urbit some-planet
```

or

```sh
$ ./urbit comet
```

## Logging

To log an urbit's command line output to a file, use `script`:

```sh
$ script urbit.log ./urbit your-urbit
```

## Moving your pier

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

## Hardware requirements

Urbit can run on any x86 computer (unofficial, unsupported [ARM binaries](https://botter-nidnul.github.io/AArch64_Urbit_Static_Binaries.html) are also available), ideally with at least 2GB of RAM.

Urbit maintains a persistent log of the history of your ship. Eventually this log will be automatically trimmed when necessary, but for now it only increases in size. An actively used planet will consume 5-50 GB of storage space per year of operation.

## Console

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

## Updates

By default, your `%base` [desk](/docs/glossary/desk) (which contains the [Arvo](/docs/glossary/arvo) kernel and core apps) receives updates ([OTAs](/docs/glossary/ota-updates)) from your sponsor. Other desks will receive updates from their respective publishers. To check the OTA source for each desk, run `+vats` in the [dojo](/docs/glossary/dojo). It will print out details for each desk - the `source` field shows which ship the desk gets updates from and the `updates` field shows `tracking` if automatic updates are enabled.

If for some reason updates are not enabled or the current source is not online or up to date, you can enable updates or change source with the `|install` command.

`|install (sein:title our now our) %landscape` will enable updates to the `%landscape` desk from your sponsor. `|install ~some-ship %landscape` will enable updates to the landscape desk from whatever ship is specified in place of `~some-ship`. For third party apps, make sure to correctly specify the publisher's ship. Each desk's updates are managed separately, so you'll need to run this for each desk separately. For the `%base` desk specifically, you sync from `%kids` rather than `%base` on the remote ship, so must specify it like `|install (sein:title our now our) %kids, =local %base`.

#### Additional OTA Troubleshooting

Please check the Support Wiki for additional OTA troubleshooting, such as:
[OTA 1.0.71 failed](https://github.com/urbit/support/wiki/OTA-1.0.71-failed),
[Missing OTA](https://github.com/urbit/support/wiki/Missing-OTA),
[Stuck flow preventing planets from receiving
OTAs](https://github.com/urbit/support/wiki/Stuck-flow-preventing-planets-from-receiving-OTAs),
and [No content shows in Links page after OTA](https://github.com/urbit/support/wiki/No-content-shows-in-Links-page-after-OTA).

## Web interface

On startup, urbit tries to bind to `localhost:80`. If you're already running something on port `80`, or your host OS will not allow urbit to bind port `80`, urbit will try `8080`, then `8081`, `8082`, and so on. For planets only, we also provide subdomains of `arvo.network` for free. Any planet `~your-urbit` is also at `your-urbit.arvo.network`, but only after you [set up DNS](#dns-setup).

Once running, you can sign into your ship’s web interface from `http://localhost` (if bound to port `80`), `http://localhost:8080` (if bound to port `8080`), or `https://your-urbit.arvo.network` if you've set up DNS.

## Moons {#moons}

Planets can spawn moons, which are conceptually meant for connected devices: phones, smart TVs, digital thermostats. The basic idea is that your planet runs permanently in a data center somewhere, while moons run on all your devices. Each planet can issue ~4 billion (`2^32`) moons.

To generate a random moon from your planet, run:

```
~sampel-palnet:dojo> |moon
moon: ~faswep-navred-sampel-palnet
0w5cT5t.wCO6i.~e1xg.Oz0qb.QNO6I.3Kt2T.h9M9F.U3vU~.X3Qu0.gtb19.IYTkY.80kWZ.SIEUE.DXa8i.TiDof.o3-1C.RHLKS.k81M0.ecz5o.ic0Bg.600g1
```

The `moon:` part is the name of the moon, in this case `~faswep-navred-sampel-palnet`. The next line starting with `0w5...` is the private key necessary to boot it.

You can just copy the key (which in this case would be the `0w5[...]600g1` part) to the clipboard, or save it in a `.key` file, for example `faswep-navred-sampel-palnet.key`.

You can use the key and moon name in the same installation flow from the [Command line installation](/getting-started/cli) guide, following the same scheme as for booting a planet. That scheme is:

```sh
$ ./urbit -w <moon-name> -G <key> -c <pier-name>
```

or

```sh
$ ./urbit -w <moon-name> -k <key-file> -c <pier-name>
```

Note the `<moon-name>` excludes the leading `~`. The `-c <piername>` argument is not required, but it is recommended; otherwise, the resulting directory is a rather unwieldy moon name. Moons are automatically synced to their parent `%kids` desk, and can control applications on their parent planet using `|link`.

To factory reset a moon -- that is, to reset its presence on the network so that it's treated as a freshly spawned ship by others -- run from the parent ship:

```
|moon-breach ~faswep-navred-sampel-palnet
```

To cycle the keys of a moon without a factory reset, run:

```
|moon-cycle-keys ~faswep-navred-sampel-palnet
```

You can then run `|rekey` on the moon with the key given by the above command as the argument.

### Maintaining Moons Through A Breach {#restoring-moons}

Moons are [always subordinate to the ship that issued them](/docs/glossary/moon). Their PKI is sent around the network by their parent planet/star/galaxy. As such, if the sponsor planet/star/galaxy of a moon breaches, other urbits on the network who were not aware of the moon prior to the breach (knew its PKI information) will not be able to reach the old moon. Moons can, however, be preserved over the breach of their sponsor and re-added to `jael`. The following guide assumes you are on `[life=n rift=1]` where `n` can be any life #. If you've previously breached your moon and want to preserve it, you'll need to modify the instructions to include setting the appropriate rift using `|moon-breach` from `hood`.

To add an existing moon to `jael` on a breached planet, you'll need the following:

 - Your moon's current life # `+keys ~sampel-monler-dozzod-dozzod` (run on the moon) _and_;
 - Your moon's sponsor's understanding of your moon's current life (same command, run on the sponsor).
 - Your moon's existing keyfile or key-string (`@uw`) _or_ the result of `pub:ex:(nol:nu:crub:crypto .^(@uv %j /=vein=/<life # of moon, per moon, here>))` _and_;
 - Your moon's sponsor's understanding of your moon's existing public key `pass:.^([@ud pass=@uw ~] %j /=deed=/~sampel-monler-dozzod-dozzod/<life # of moon per sponsor here>)`.

If you only have they keyfile or key-string from your moon's last boot, you'll need to derive the `pass` value from that using `pub:ex:(nol:nu:crub:crypto key:(seed:jael:l (cue <your @uw keyfile contents or key-string contents here>)))`. This should produce a long `@ud`.

Once you have all of the requisite elements, you can perform the following on the moon's sponsor:

```
|moon-cycle-keys ~sampel-monler-dozzod-dozzod, =life <life # of moon, per moon, here>, =public-key <result of the existing keyfile conversion to pass or the result of scrying jael on your moon, found above>
```

Eventually, the PKI will populate through the network w/ the correct life #, reconnecting your previously orphaned moon. You can speed this up by `|hi ~zod` and `|hi ~sampel-monler-dozzod-dozzod`-ing from the moon and sponsor, respectively (replace with the appropriate ship names).



## Escaping A Sponsor {#escape}

To use the network as a planet or star, you must be sponsored by an active star
or galaxy, respectively. If your sponsor isn't suiting your needs, you can
escape to a different one. This can be done with
[Bridge](https://bridge.urbit.org/) following the instructions
[here](/using/id/using-bridge#escaping-your-sponsor).

## Life and rift number

You can check your ship's _life_ and _rift_ number by running `+keys our` in
dojo. You can inspect another ship's life and rift number by running `+keys ~sampel-palnet`. For information on what life and rift are, see [Life and Rift](/docs/azimuth/life-and-rift).

## DNS setup {#dns-setup}

We have a system that lets you request a domain name for your ship in the form of `ship.arvo.network`, where `ship` is your ship's name minus the `~`. This allows users to access their ships remotely using Landscape, our graphical web interface. Stars and planets follow the same DNS request process, and galaxies have their own requirements. Moons and comets are not supported.

For a planet or star's DNS request to be made and fulfilled, they must be hosting their ship someplace with a public IP address, and its HTTP server must be listening on port 80.

To initiate a DNS request, run the following thread in your ship's dojo, passing the IP address as an argument with .0.0.0.0 (`@if`) syntax. For example:

```
-dns-address [%if .1.2.3.4]
```

The `%dns-address` thread, running locally, will make an HTTP request to that IP address on port 80 to confirm that it is itself available at that IP and port. If that fails, you'll receive a `couldn't access ship on port 80` message in the terminal; this request will retry a few times. If the self-check is successful, the request is relayed to `~zod`, and you'll receive a message saying, `request for DNS sent to ~zod`. Once `~zod` has acknowledged receipt of the request, the `%dns-address` thread will print a terminal message saying `awaiting response from ~zod`.

The request will make take a little time to be fulfilled, but eventually the `ship.arvo.network` DNS record will be set to the given IP address. Once that's set up, `~zod` will be notified and `~zod` will, in turn, notify your ship. That ship will now try to verify that it can reach itself on `ship.arvo.network` over port 80. If it can't, it'll send a message saying, `unable to access via ship.arvo.network`. If it can, it will configure itself with that domain and say `confirmed access via ship.arvo.network`.

Great! You're set up now. Try accessing your `ship.arvo.network` in your browser to use Landscape; we recommend Chrome or Brave.

### Configuring SSL

To enable SSL on your ship, you must poke the `%acme` agent with the domain encoded in a path and it will request a certificate. The path format is `/tld/your_domain/your_subdomain`, so if your domain is `sampel-palnet.arvo.network`, you'd use it like so:

```
:acme &path /network/arvo/sampel-palnet
```

### Galaxies

Galaxies are already required to have separate DNS entry at galaxy.urbit.org. There's no automated process for getting that binding, so if you're a galaxy-holder, get in touch with us at support@urbit.org.

There is a command for galaxies that will try to re-use their already-necessary Ames DNS entry for HTTPS:

```
> -dns-auto
```

This will make HTTP-requests to self-check availability over `galaxy.$AMES-DOMAIN` (currently galaxy.urbit.org), where `galaxy` is the galaxy's name minus the `~`.

Otherwise, `-dns-auto` works the same as `-dns-address` does with stars and planets: if it's available or unavailable, terminal messages, and so on.

### Ports

The built-in logic for listening on port 80 is to try to bind to port 80; if it cannot, it tries 8080, then increments until it can bind a port. Port 80 is available to unprivileged process on recent versions of macOS. Otherwise, the process needs to either be run as root, or be given special permission (`sudo setcap 'cap_net_bind_service=+ep' /path/to/urbit/binary` on Linux).
