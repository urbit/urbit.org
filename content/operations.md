+++
title = "Operations"
template = "page_indiced.html"
slug = "/operations/"
+++

## Admin and Operations {#urbit-administration}

Your urbit (also called your _ship_) is a persistent Unix process that you
mainly control from the console. For some things, a browser will also work.

### Shutdown

You can turn your urbit off with `Ctrl-d` from the Talk or Dojo prompts.

You can force-quit your urbit with `Ctrl-z` from anywhere.

### Restart

To restart your urbit simply pass the name of your pier:

```
$ urbit some-planet
```

or

```
$ urbit comet
```

### Logging

To log an urbit's command line output to a file, use `script`:

```
$ script urbit.log urbit your-urbit
```

### Moving your pier

Piers are designed to be portable, but it _must_ be done while the urbit
is turned off. Urbit networking is stateful, so you can't run two copies
of the same urbit in two places.

To move a pier, simply move the contents of the directory it lives in.
To keep these files as small as possible we usually use the `--sparse`
option in `tar`. With a pier `your-urbit/`, something like this should work:

```
tar -Scvzf ~/your-urbit.tar.gz ~/your-urbit/
scp your-old-server:~/your-urbit.tar.gz your-new-server:~
```

Then to unzip it, on your other Unix server, run:

```
tar xfvz your-urbit.tar.gz
```

Delete the tar file, and, after installing Urbit on your new server,
start your urbit back up with:

```
urbit your-urbit
```

### Console

Your Urbit terminal is separated into two parts: the prompt (the bottom
line) and the record (everything above that). The record is shared; all
the output from all the apps in your command set appears in it. The
prompt is multiplexed.

In the CLI, Urbit apps can process your input before you hit return. To
see this in action try entering `)` as the first character at the Dojo
prompt. Since there is no Dojo command or Hoon expression that starts
with ')', the Dojo rejects it.

`Ctrl-x` - Switches the prompt between running console apps

`Ctrl-c` - Crash current event.  Processed at the Unix layer and prints a stack
trace.

`Ctrl-d` - From Talk or Dojo, stops your Urbit process.

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

### Web

On startup Urbit tries to bind to `localhost:80`. If you're already
running something on port `80` -- such as any other HTTP server, or another urbit -- you'll find the urbit
that you just started on `8080`, `8081`, and so on. For planets only, we also proxy web
domains through Urbit's own servers. Any planet `~your-urbit` is also at
`your-urbit.arvo.network`, but only after you [set up DNS](../dns-proxying).

Your urbit serves a simple homepage from `http://localhost` or
`https://your-urbit.arvo.network` that should be self-explanatory. Since
our HTTPS isn't audited / battle tested, we just call it "secure" HTTPS.
You can find that on `8443`. Or `8444` (and so on) if you're already
running something on `8443`.

### Moons {#moons}

Planets can spawn moons, which are meant for connected devices: phones, smart
TVs, digital thermostats. The basic idea is: your planet runs permanently in a
data center somewhere and moons run on all your devices.  Each planet can issue
~4 billion (`2^32`) moons.

To generate a random moon from your planet, run:

```
~sampel-palnet:dojo> +moon
moon: ~faswep-navred-sampel-palnet
\/~.0wd.rZU67.3jSny.z1vda.7sr-s.EL1Jt.-76Nj.ugXxY.g6-Bx.HvKZl.G53oV.hPnXe.7U3E3.J4CEe.MEVuq.~08Nt\/
  .zNT0K.k-Ab~.Nn90d.OZ2fT.-XlQQ.Cfrkf.y6~K0.2Do09.EaE3W.BSK--.5Q~9N.y3QIP.eokH-.T6lwz.gg8MX.7LU5
  x.DJROE.IzQsy.OXOLr.IOE3a.-QI40.H5ukK.Cw-u4.uxE-y.V-o1F.Q84g0.effP0.de01g.600g1
\/                                                                                               \/
```

You must manually edit the output of `+moon` to get
the correct format for the `<key>`:

- strip out the `\/`

- combine into one line, omitting spaces

- trim the leading `~.`

`<key>` would be `0wd.rZU67.3jSny.z1vda ... <snip> ... effP0.de01g.600g1`
in this example.

Put `<key>` in a file and that file becomes `<keyfile>`.

Another way of generating `<keyfile>` is:

```
~sampel-palnet:dojo> @moon/key +moon
moon: ~faswep-navred-sampel-palnet
```

`<keyfile>` will be at `path/to/sampel-palnet/.urb/put/moon.key`
and does not need editing to be used with the `-k` option.

You can use the resulting output in the same installation flow from the
[Booting a Ship](@/try.md) guide, following the same scheme as for booting a planet. That scheme is:

```
$ urbit -w <moonname> -G <key> -c <piername>
```

or

```
$ urbit -w <moonname> -k <keyfile> -c <piername>
```

The `-c <piername>` argument is not required, but it is recommended; otherwise,
the resulting directory is a rather unwieldy moon name.

Here's how an example moon might be booted:

```
$ urbit -w faswep-navred-sampel-palnet -G <key> -c mymoon
```

or

```
$ urbit -w faswep-navred-sampel-palnet -k <keyfile> -c mymoon
```

Moons are automatically synced to their parent `%kids` desk, and can control
applications on their parent planet using `|link`.  

### Continuity breaches

While the Urbit network is in this alpha state, we sometimes have to
reboot the whole network. This happens either when major changes need
to be shipped or we hit a bug that can't be fixed over the air.

Because Urbit networking is stateful we call this a _continuity breach_.
Everything has to be restarted from scratch. Your pier will continue to
function after we have breached, but it wont connect to the rest of the
Urbit network.

When this happens, back up any files you'd like to save, shut down your
urbit and recreate it (as if you were starting for the first time).


## Creating a Comet {#creating-a-comet}


**Comets** are urbits whose names are 128-bits or 16 syllables, such as:

`~dasres-ragnep-lislyt-ribpyl--mosnyx-bisdem-nidful-marzod`

Comet names aren't quite as memorable as others, but they're disposable identities that anyone can make for free to join the live network.

### Booting a Comet

To boot your comet, go into the command line and run the following command from the directory that was created during Urbit installation:

```
$ urbit -c mycomet
```

This will take a few minutes and will spin out a bunch of boot messages. Toward the end, you'll see something like:

```
ames: on localhost, UDP 31337.
http: live (insecure, public) on 8080
http: live ("secure", public) on 8443
http: live (insecure, loopback) on 12321
~dasres_marzod:dojo>
```


## DNS Proxying {#dns-proxying}

We have a system that lets you request a domain name for your ship in the form of `ship.arvo.network`, where `ship` is your ship's name minus the `~`. This allows users to access their ships remotely using Landscape, our graphical web interface.

Stars and planets follow the same process DNS proxying process, and galaxies have their own requirements. Moons and comets are not supported.

### Planets and Stars

For a planet or star's DNS proxying request to be made and fulfilled, they must be hosting their ship someplace with a public IP address, and its HTTP server must be listening on port 80.

To get `ship.arvo.network` on a planet or star, you must set up DNS routing with its parent ship by starting the `:dns` app.
To do so, simply run this command in your ship's Dojo:

```
> :dns|request
```

You'll then be prompted to enter the public IP address of your ship. You can also pass the IP address as an argument, using the .0.0.0.0 (`@if`) syntax. For example:

```
> :dns|request .1.2.3.4
```

`:dns`, running locally, will make an HTTP request to that IP address on port 80 to confirm that it is itself available at that IP and port. If that fails, you'll receive a `%bail-early` message in `:talk`; this request will retry a few times. If the self-check is successful, the request is relayed to `~zod`, and you'll receive a message saying, `request for DNS sent to ~zod`. Once `~zod` has acknowledged receipt of the request, your local `:dns` app will send a `:talk` message saying `awaiting response from ~zod`.

The request will be picked up shortly, and the `ship.arvo.network` DNS record will be set to the given IP address. Once that's setup, `~zod` will be notified, and `~zod` will, in turn, notify your ship. That ship will now try to verify that it can reach itself on `ship.arvo.network` over port 80. If it can't, it'll send a message saying `unable to access via ship.arvo.network`. If it can, it will configure itself with that domain, and say `confirmed access via ship.arvo.network`.

Great! You're set up now. Try accessing your `ship.arvo.network` in your browser to use Landscape; we recommend using Chrome or Brave.

### Galaxies

Galaxies are already required to have separate DNS entry at galaxy.urbit.org. There's no automated process for getting that binding, so if you're a galaxy-holder, get in touch with us at support@urbit.org.

There is a command for galaxies that will try to re-use their already-necessary Ames DNS entry for HTTPS:

```
> :dns|auto
```

This will make HTTP-requests to self-check availability over `galaxy.$AMES-DOMAIN` (currently galaxy.urbit.org), where `galaxy` is the galaxy's name minus the `~`.

Otherwise, `:dns|auto` works the same as `:dns|ip` does with stars and planets: if it's available or unavailable, talk messages, and so on.

### More Information

Configuring a ship's domain causes the `:acme` app to request an HTTPS certificate for that domain from LetsEncrypt. Note that LetsEncrypt also requires that the HTTP server be listening on port 80. If the certificate request fails, `:acme` will send a `:talk` message with an explanation. Once the certificate is successfully retrieved, `:acme` will install it, causing the HTTP servers to restart. A secure server will be started on port 443 (the HTTPS default) if it's available. Otherwise, it will try 8443, and then increment to the next port until it can successfully bind one.

The built-in logic for listening on port 80 similar. Urbit tries to bind port 80; if it cannot, it tries 8080, then increments until it can bind a port. Port 80 is available to unprivileged process on recent version of macOS. Otherwise, the process needs to either be run as root, or be given special permission (CAP\_NET_BIND on Linux).


## Messaging {#messaging}

Talk is the built-in frontend for the Urbit messaging and notifications
protocol, Hall. Today we use Hall to chat and coordinate, but it's really
a general purpose piece of infrastructure.

For the time being come join us in `~dopzod/urbit-help` by using the
'quickstart' section below. `~dopzod` is the host ship, and `/urbit-help` is the
channel on that ship.

Today, Hall is sort of like a distributed, encrypted Slack that can be
used from the CLI and the browser. There’s no central Hall server.
Any urbit can host one.

Hall is a general purpose tool for both aggregating and publishing
streams of messages. Applications can use Hall as their transport
protocol, API connectors can push disparate data sources into Hall,
and so on. There are lots of things a distributed message protocol can
be used for that we haven't even thought of.

Here we'll be discussing how to operate the default CLI frontend, Talk,
to send and receive messages. For a more in-depth look at Hall's internals,
take a look at its [documentation](@/docs/arvo/hall.md).

### Quickstart

The most common uses of Talk right now are communicating over a public chat channel called `~dopzod/urbit-help` and sending direct messages. Everyone is more than welcome in `~dopzod/urbit-help`. It's the place to get help, ask questions and chat about Urbit in general.

There are two ways of using Talk: from the terminal running the Urbit process, or through the Landscape web UI available at `http://localhost/~~/landscape`.

If you're using Landscape for the first time, you'll need to enter a code to gain access. You can obtain this code by running `+code` from the Dojo.

### Joining a channel

In Hall, a medium for a message is called a _circle_. There are four types of circles, but we for now we'll be dealing with the _channel_: a publicly accessible chatroom for general use. We'll discuss the other three kinds in the [manual](#manual) section.

Let's join the `~dopzod/urbit-help` channel. Use `ctrl-x` to switch from Dojo to Talk.

Then:

```
~your-urbit:talk> ;join ~dopzod/urbit-help
```

Scrolling down your terminal window, you'll probably see the playback of
previous `~dopzod/urbit-help` messages that you missed.

Post a line to `~dopzod/urbit-help:`

```
~your-urbit:talk= Hello, world!
```

You'll see your message printed below messages from others that came before it:

```
~your-urbit= Hello, world!
```

### Subscribing to a channel in Landscape

In Landscape, you can always navigate to a channel by opening the menu, or using the shortcut `cmd-k`, then typing `go ~host-urbit/channel-name`. However, if you want to see messages in your inbox, you'll need to join from the Talk terminal.

Again, that's:

```
;join ~dopzod/urbit-help
```

Now, navigate to `localhost/~~/landscape`. You should see recent messages under the "Recent" tab, and if you navigate to the "All" tab, you should see your subscription to `~dopzod/urbit-help` under "Chats".

### Direct Messaging

To send a direct message to someone, first set your audience:

```
~your-urbit:talk= ;~talsur-todres
```

You'll see your prompt change:

```
~your-urbit:talk[~talsur-todres]
```

Now you and `~talsur-todres` can exchange messages directly.

```
~your-urbit:talk[~talsur-todres] Hey buddy!
```

To set your audience back to `~dopzod/urbit-help`:

```
~your-urbit:talk[~talsur-todres] ;~dopzod/urbit-help
```

You'll see your prompt change back:

```
~your-urbit:talk=
```

You can also use the ASCII "glyph" assigned to your `~dopzod/urbit-help` circle as a shortcut:

```
~your-urbit:talk[~talsur-todres] ;=
~your-urbit:talk=
```

(Your ship may have a different glyph than `=` for your circle)

Use `;leave` to unsubscribe from a channel:

```
~your-urbit:talk= ;leave ~dopzod/urbit-help
```

The web UI ships as compiled JavaScript on your urbit, but has its own
source repo [here](https://github.com/urbit/talk).

Last, let's create a channel we can invite some friends to:

```
~your-urbit:talk= ;create channel %my-channel 'Some description.'
```

Now you can tell your friends to `;join ~your-urbit/my-channel`.

---

### Manual

Hall's design is similar in spirit to
[NNTP](https://en.wikipedia.org/wiki/Network_News_Transfer_Protocol),
the underlying protocol for Usenet.

Our design is pretty simple: Hall messages are called _posts_. Posts
go to _circles_. Any urbit can host or subscribe to any number of circles.

There are four kinds of circles: a write-only `%mailbox` for direct
messages, an invite-only `%village` for private conversation, a read-only
`%journal` for curated content, and a public-access `%channel` for
general use.

#### Posts

A post can be a variety of different data structures. Let's look at the
ones you can use from within Talk: lines, URLs, Hoon and replies.

#### Lines

A line is simply a string of text. Depending on the filtering rules set
by the circle's host, these may or may not include uppercase and Unicode
characters (see [filter](#filter)).

If the line starts with `@`, it's an action (like `/me` in IRC).

```
~your-urbit:talk= @sends a message.
```

will print as

```
~your-urbit sends a message.
```

#### URLs

A URL is any valid URL.

```
~your-urbit:talk= https://example.com/
```

#### Hoon

You can use Talk to evaluate Hoon code and share the result with everyone in a
Hall circle. To do so, preface your Hoon with `#`.

```
~your-urbit:talk= #(add 2 2)
```

will print as

```
~your-urbit# (add 2 2)
4
```

#### Replies

To indicate what you're saying is in direct response to a specific message, select the message (see Activating Lines below) and type your response.

```
~some-urbit= Hello! How are you?
~your-urbit:talk= ; Well, thanks!
```

will print as

```
~your-urbit=^ Well, thanks!
```

#### Activating Lines

A line number identifying the **subsequent** line is displayed every 5
lines.

```
---------[0]
~your-urbit= This is my message.
~your-urbit= This is another message.
~your-urbit sends a message.
~your-urbit/ http://example.com/
~your-urbit# (add 2 2)
             4
---------[5]
~your-urbit=^ That's my message!
```

You can use a line number to **activate** a line:

```
~your-urbit:talk= ;5
```

which prints the number, line identifier, timestamp, sender, audience,
and contents:

```
? 0
0v3.hl51p.jhege.amhec.vb37r.3rejr at ~2016.6.24..04.48.21..a235
~your-urbit to ~another-urbit
in reply to: ~your-urbit:
> This is my message.
That's my message!
```

If information got truncated — like what happens for long URLs or expressions,
or if there's additional information available — as is the case with
replies and attachments (e.g. stack traces) — activating the message will show
you all the details.

You can also activate the most recent line with `;`, the second-most recent
with `;;`, and so on.

### Creating and managing circles

As mentioned before, any urbit can host any number of circles. Existing circles
can be deleted or modified with various commands. All commands in this section
shoild be sent from the `talk>` prompt.

#### Create

Syntax: `;create [type] %name 'description'`

Creates and joins a circle, where `[type]` is any of the following:
- `channel`: public circle. Has a blacklist for write control.
- `village`: invite-only circle.
- `journal`: publicly readable, invite-only for writing.
- `mailbox`: publicly writeable, can only be read by its host.

Let's create an example mailbox:

```
sampel-palnet:talk> ;create mailbox %coolbox 'cool messages only'
```

Something like this should print:

```
--------------| ;create mailbox %coolbox 'cool messages only'
--------------| :: onn %coolbox
--------------| bound '>' {[hos=~sampel-palnet nom=%coolbox]}
--------------| %coolbox: see ~sampel-palnet hear
--------------| new > %coolbox
--------------| %coolbox: cap: cool messages only
--------------| %coolbox: fit: caps:Y unic:â
```

#### Delete

Syntax: `;delete %name 'optional reason'`

Deletes a circle. If a reason is specified, that gets sent to all
subscribers before the circle gets deleted.

To delete our example above:

```
sampel-palnet:talk> ;delete %coolbox 'people sent uncool messages'
```

#### Change Description

Syntax: `;depict %name 'description'`

Changes the description of an existing circle `%name`.

For example:

```
sampel-palnet:talk> ;depict %coolbox 'cool messages only. NO EXCEPTIONS.'
```


#### Filter

Syntax: `;filter %name [capitals] [unicode]`

Configures the message filter for circle `%name`: whether to allow
capital and/or unicode characters. `y`/`&`/`true` for allowed,
`n`/`|`/`false` for disallowed.

So, to allow capital letters and disallow unicode in the circle `%coolbox`:

```
sampel-palnet:talk> ;filter %coolbox & |
```
or
```
sampel-palnet:talk> ;filter %coolbox y n
```

And we get the output:

```
--------------| ;filter %coolbox & |
--------------| %coolbox: fit: caps:Y unic:n
```

#### Invite

Syntax: `;invite %name ~someone`

Invites someone into your circle `%name`. If they were previously banished,
removes them from the blacklist.
Can also invite multiple ships at once, `~comma, ~separated`.

For example:

```
~sampel-palnet:talk> ;invite %coolbox ~lodleb-ritrul
```

#### Banish

Syntax: `;banish %name ~someone`

Removes someone from your circle `%name`. If they were previously invited,
removes them from the whitelist.
Can also banish multiple ships at once, `~comma, ~separated`.

#### Source

Syntax: `;source %name ~other/circle`

Adds `~other/circle` as a source for circle `%name`. This causes all
messages sent to `~other/circle` to also appear in `%name`.

For example:

```
~sampel-palnet:talk> ;source %coolbox ~marzod/urbit-help
```

#### Unsource

Syntax: `;unsource %name ~other/circle`

Removes `~other/circle` as a source for circle `%name`.

For example:

```
~sampel-palnet:talk> ;unsource %coolbox ~marzod/urbit-help
```

#### Circle Membership

If you have joined a circle, you can make this information publicly
available to help others find that circle as well.

#### Show Membership

Syntax: `;show ~some/circle`

Adds a circle to your public membership list on your Hall profile. Hall profiles
are not used yet.

#### Hide Membership

Syntax: `;hide ~some/circle`

Removes a circle from your public membership list on your Hall profile. Hall
profiles are not used yet.

### Status

You'll see status notifications when people enter or leave circles you're
subscribed to.

#### Notifications Off

Syntax: `;set quiet`

Turn off status (and config) notifications.

#### Notifications On

Syntax: `;unset quiet`

Turn on status (and config) notifications.

#### Who

Syntax: `;who`

List everyone in all your subscribed circles. Optionally specify a
specific circle to list members of just those: `;who ~some/circle`

For example:

```
~sampel-palnet:talk> ;who ~marzod/urbit-help
```

#### Attend

Syntax: `;attend ~some/circle [presence]`

Manually set your presence to show up as one of the following. (In the
future, a sufficiently advanced client can automatically set these for
you.)

- `talk` - typing
- `hear` - listening
- `idle` - inactive
- `gone` - not present

For example:

```
~sampel-palnet:talk> ;attend ~marzod/urbit-help idle
```

#### Set Display Name

Syntax: `;name ~some/circle 'my handle'`

Set a handle ("name") for yourself in a specific circle. It will display
to users who have done `;set nicks`, but gets truncated if it's longer
than 14 characters.

### Audience

An audience consists of one or more messaging targets. These can be
circles or ships. (In the latter case, it's secretly the `~ship/inbox`
circle.)

#### Circle Glyphs

Glyphs are found at the end of your prompt to as a quick indicator of where
your messages will be sent.

Glyphs are assigned by circle hash out of the following list:

```
> = + - } ) , . " ' ^ $ % & @
```

Alphanumeric characters and `|#;:*~_` are reserved; all others (the
above list, and `\/!?({<`) can be manually assigned.

For example, `-` the glyph at the end of the prompt below might indicates that
messages sent from this prompt will go to some circle with that glyph:

```
~sampel-palnet:talk-
```

To see what circle is bound to a glyph, use the `;what` command followed by the
glyph in question, or use `;what` without specifying a glyph to see all of your 
subscriptions which are bound to glyphs. For example, to see `=`:

```
~sampel-palnet:talk> ;what =
~dopzod/urbit-help
```

To see all of your glyph-bound subscriptions:

```
~sampel-palnet:talk> ;what
> ~paldev/numismatic-forum
. ~middev/ny-martians
= ~dopzod/urbit-help
```

Not every audience has a glyph, however. When the audience doesn't have a glyph,
such as in the case of direct-messaging a ship, we see their name at the end of
the prompt instead. Here we're talking directly to `~dannum-mitryl`:

```
~sampel-palnet:talk[~dannum-mitryl]
```

#### Bind

Syntax: `;bind [glyph] /circle-name`

Assigns the chosen glyph to a circle owned by your ship.

For example:

```
~sampel-palnet:talk> ;bind + /my-circle
```

#### Unbind

Syntax: `;unbind [glyph] /circle-name`

Unassigns the chosen glyph from a circle owned by your ship.

For example:

```
~sampel-palnet:talk> ;unbind + /my-circle
```

#### Prefixes

Received posts are prefixed with a glyph to let you know what the
audience is. You can activate an individual post to see the full
audience.

There are a few special-purpose glyphs:

- `|` - Informational messages
- `:` - Posts directly to you
- `;` - Posts to you and others (a multiparty conversation)
- `*` - Posts to a complex audience that doesn't directly include you.


### Configuration

#### Set Audience

`;~ship/circle`

Set audience to `~ship/circle`.

#### Set Audience by Glyph

Syntax: `;[glyph]`

Set audience to the circle previously bound to the chosen glyph.

#### Set Audience to Ship

syntax `;~ship`

Set audience to another ship.

#### Set Audience to Own Circle

Syntax: `;%circle`

Set audience to a circle on your own ship

#### Set Audience + Send Message

Syntax: `;~dannum-mitryl this is a private message`

Set the audience and send a post in the same line. This works for all of the
above audience commands.

Your audience is configured with regard to the following rules (in order):

- if you manually set the audience, that audience.
- if you activated a post, the post you activated.
- audience of the last post sent.

### Local nicknames

#### See Nicknames

Syntax: `;nick`

List all local nicknames.

#### Find Nickname

Syntax: `;nick ~some-urbit`

Look up a nickname using the known ship-name.

#### Reverse Find Nickname

syntax: `;nick plato`

Find a ship's name using its nickname.

#### Set Nickname

Syntax: `;nick ~some-urbit plato`

Create a new nickname.

#### Clear Nickname

Syntax: `;nick ~some-urbit ~`

Clear an assigned nickname.

#### Display Nicks, Not Ship-Names

Syntax: `;set nicks`

Show nicknames instead of ship-names. If no local nickname is set, uses
that user's handle. If the user has no handle, just the urbit name.

#### Display Ship-Names, Not Nicks

Syntax: `;unset nicks`

Show ship-names instead of nicknames.

Nicknames and handles longer than 14 character will be truncated in
output. Nicknames are strictly local - like the names on entries in a
phonebook.

### Miscellaneous configuration

#### Show Timestamps

Syntax: `;set showtime`

Show the timestamp for each message.

#### Hide Timestamps

Syntax: `;unset showtime`

Stop showing the timestamp for each message.

#### Change Time Zone

Syntax: `;set timezone [+/-][hours]`

Adjust the display of the timestamps to a specific timezone. Relative to UTC.

#### Sound Notification On

Syntax: `;set notify`

Emit a terminal bell sound if your six-syllable ship name is mentioned in
a message.

#### Sound Notification Off

Syntax `;unset notify`

Do not notify when your ship name is mentioned.

#### Set Width

Syntax: `;set width [number]`

Set the rendering width of `:talk` to a specific number of characters.
(Minimum of 30.)


## Shell {#using-the-shell}

The Dojo is our shell; it processes system commands and returns output. It's a
good place to quickly experiment with Urbit. On the surface the Dojo is just a
Hoon REPL. On the inside, the Dojo is a system for operating on and transforming
data in Urbit.


### Quickstart

You can use the Dojo to run arbitrary Hoon code, as well as non-Hoon system
commands.

#### Math

Evaluate a Hoon expression (whitespace matters):

```
~your-urbit:dojo> (add 2 2)
~your-urbit:dojo> %+  add  2  2
```

Tall-form Hoon may require multiple lines:

```
~your-urbit:dojo> %+  add
~your-urbit:dojo< 2
~your-urbit:dojo< 2
```

Hoon uses something called [the subject](@/docs/hoon/hoon-tutorial/the-subject-and-its-legs.md).
The Dojo has its own subject, and that's where Hoon's equivalent of variables,
called faces, are stored.

Use `=var` to save faces to the Dojo subject.

```
~your-urbit:dojo> =foo (add 2 2)
```

Note, however, that `=var` is Dojo syntax, not Hoon syntax. You cannot bind a
face in a `.hoon` file in this way.

#### System Commands

Use `=dir` to set the current working directory:

```
~your-urbit:dojo> =dir %/web
```

(`%` represents your current directory. For a complete explanation on urbit
paths, see the [filesystem section](@/operations.md))

Generators (files in `/gen`) are run with `+`:

```
~your-urbit:dojo> +hello 'world'
```

Save output to a file in `%clay` with `*`:

```
~your-urbit:dojo> *some/file/path/hoon 'hello world'
```

Run system commands from `:hood`, like `reload`, using `|`:

```
~your-urbit:dojo> |reload %eyre
```

### Generators

Generators are short Hoon scripts, saved as `.hoon` files in the `/gen`
directory. Many Dojo commands exist in the form of generators. The syntax for
running a generator is `+genname` for a generator saved as `genname.hoon`.

#### `+cat`

Accepts a path and displays the file. Similar to Unix `cat`.

```
~your-urbit:dojo> +cat %/gen/curl/hoon
```

#### `+code`

Generates a code that is used to remotely log into your ship. No
arguments.

```
~your-urbit:dojo> +code
```

#### `+curl`

Retrives data from a URL. Accepts a `tape`. Similar to Unix `curl`.

```
~your-urbit:dojo> +curl "http://nyt.com"
```

#### `+hello`

Just prints the argument. Accepts a `@ta`.

```
~your-urbit:dojo> +hello 'mars'
```

#### `+ls`

Similar to Unix `ls`. Accepts a path.

```
~your-urbit:dojo> +ls %/web
~your-urbit:dojo> +ls /~talsur-todres/home/2/web/notes
```

#### `+moon`

Generates a random moon from a planet. No arguments.

```
~your-urbit:dojo> +moon
```

#### `+solid`

Compile the current state of the kernel and output a
noun. Usually downloaded to a file in unix. No arguments.

```
~your-urbit:dojo> .urbit/pill +solid
```

#### `+test`

Testrunner. Can test multiple generators at once, conventionally ones
in the `/test` folder. Takes a path.

```
~your-urbit:dojo> +test /lib
```

#### `+ticket`

Generate a ticket for an urbit ship. Takes an urbit name (`@p`).


```
~your-urbit:dojo> +ticket ~talsur-todres-your-urbit
```

#### `+tree`

Generate a recursive directory listing. Takes a path.

```
~your-urbit:dojo> +tree %/web
```

### Hood

The hood is the system daemon. See `gen/hood` and `app/hood`.

`|hi` - Sends a direct message. Sort of like Unix `write`. Accepts
an urbit name (`@p`) and a string (`tape`, which is text wrapped with double-quotes).

```
~your-urbit:dojo> |hi ~binzod "you there?"
```

`|link` / `|unlink` - Link / unlink a remote app. Accepts an
Urbit name and an app name.

```
~your-urbit:dojo> |link ~talsur-todres %octo
```

`|mass` - Prints the current memory usage of all the kernel modules.
No arguments.

```
~your-urbit:dojo> |mass
```

`|reload` - Reloads a kernel module (vane) from source. Accepts any
number of vane names.

```
~your-urbit:dojo> |reload %clay %eyre
```

`|reset` - Reloads `hoon.hoon` and all modules. No arguments.

```
~your-urbit:dojo> |reset
```

`|start` - Starts an app. Accepts an app name.

```
~your-urbit:dojo> |start %curl
```

---

### Manual

#### Sources and sinks

A Dojo command is either a **source** or a **sink**. A source is just something
that can be printed to your console or the result of some computation. A
sink is an **effect**: a change to the filesystem, a network message, a
change to your environment, or typed message to an app.

Sources can be chained together, but we can only produce one effect per
command.

#### Sinks

#### `=` - Set variable

Set any environment variable:

```
~your-urbit:dojo> =foo 42
~your-urbit:dojo> (add 2 foo)

44
```

Make sure to note that `=var` is Dojo syntax, not Hoon syntax. You cannot bind a
variable in a `.hoon` file in this way.

#### Special Variables

There are a few special variables that the Dojo maintains.

#### `:` - Send to app

`:app` goes to a local `app`, `:~ship/app` goes to the `app` on `~ship`.

Send a `helm-hi` message to `hood`:

```
~your-urbit:dojo> :hood &helm-hi 'hi'
```

Apps usually expect marked data, so `&` is often used here.

#### `*` - Save in `%clay`

Save a new `.udon` ([Udon](@/docs/arvo/sail-and-udon.md)) file in `web`:

```
~your-urbit:dojo> *%/web/foo/udon '# hello'
```

The last component of the path is expected to be the mark (or mime
type).

#### `.` - Export to Unix

Export a noun to Unix with `.`:

```
~your-urbit:dojo> .foo/bar/baz (add 2 2)
```

Which creates a file at `pier/.urb/put/foo/bar.baz`.

This is very often used with `+solid`:

```
~your-urbit:dojo> .urbit/pill +solid
```

Which outputs a new `urbit.pill` to `pier/.urb/put/urbit.pill`

### Sources

#### `&` - Mark conversion

Convert between marks using `&`, with the destination mark first. You can stack multiple mark conversions together, and some marks can only be converted to specific other marks. In this example, [Udon](@/docs/arvo/sail-and-udon.md#udon) is converted to `&hymn` (a mark which supplies the `html`, `head`, `body` and closing tags) first, before being converted to HTML:

```
~your-urbit:dojo>&html &hymn &udon ';h1#hello: hello'
'<html><head></head><body><h1 id="hello">hello</h1></body></html>'
```

Performing a conversion straight from Udon to the `&hymn` mark reveals a bit more about its mark conversion:

```
~your-urbit:dojo>&hymn &udon ';h1#hello: hello'
[[%html ~] [[%head ~] ~] [[%body ~] [g=[n=%h1 a=~[[n=%id v="hello"]]] c=~[[g=[n=%$ a=~[[n=%$ v="hello"]]] c=~]]] ~] ~]
```

As does converting straight from Udon to HTML:

```
~your-urbit:dojo>&html &udon ';h1#hello: hello'
';h1#hello: hello'
```

#### `_` - Run a function

Use `_` to run a gate (or function):

Write an arbitrary function and pass data to it:

```
~your-urbit:dojo> _|=([a=@] (mul a 3)) 3
9
```

Use a function to get the status code from an http request:

```
~your-urbit:dojo> _|=([p=@ud q=* r=*] p) +http://google.com
301
```

#### `+` `-` - HTTP requests

`+http[s]://example.com` - sends a GET request

`+http[s]://example.com &json [%s 'hi']` - sends a POST request with the
JSON `"hi"` in the body.

`-http[s]://example.com &json [%s 'hi']` - sends a PUT request with the
JSON `"hi"` in the body.

Note that the first of these is a source while the last two are sinks.

#### `+` - Generators

Generators are simple Hoon scripts loaded from the filesystem. They live
in `gen/`.

An example of a generator that is built into your urbit is `+code`. It produces
the code needed to log into your ship remotely.

```
~your-urbit:dojo> +code
fintyr-haldet-fassev-solhex
```

### Variables

You can use `=` to set an environment variable in Dojo, but there are
a few reserved names that have special uses.

#### dir

Current working `%clay` desk and revision. Read / write.

**Examples:**

```
~your-urbit:dojo> =dir %/web
~your-urbit:dojo> +ls %
404/hoon docs/ dojo/hoon lib/ listen/hoon md static/udon talk/ testing/udon tree/main/ unmark/ womb/
```

#### lib

Current set of libraries (`/lib`) in your environment. Can be set
with `/+`. Read / write.

**Examples:**

```
~your-urbit:dojo> /+  number-to-words
```
Now we can use arms from lib/number-to-words.hoon
```
~your-urbit:dojo> (to-words:eng-us:number-to-words 123.456)
```

#### sur

Current set of structures (`/sur`) in your environment. Can be set
with `/-`. Read / write.

**Examples:**

```
~your-urbit:dojo> /-  sole
```
Now we can use arms in sur/sole.hoon.
```
~your-urbit:dojo> `sole-effect:sole`[%bel ~]
```

#### now

The current (128-bit `@da`) time. Read-only.

**Example:**

```
~your-urbit:dojo> now
~2016.3.21..21.10.57..429a
```

#### our

The current urbit ship. Read-only.

**Example:**

```
~your-urbit:dojo> our
~your-urbit
```

#### eny

512 bits of entropy. Read-only.

**Example:**

```
~your-urbit:dojo> eny
\/0vnt.d474o.gpahj.jcf3o.448fh.2lamb.82ljm.8ol8u.b02vi.mrvvp.b7et2.knb7m.l8he\/
  8.8qb9s.drm36.77n9b.a0qst.30g03.l5lb5.nvsbc.v39tn
\/
```

### Troubleshooting

If you encounter `%dy-edit-busy` while entering commands, it is
because your Dojo is blocked on a timer or an HTTP request. Type backspace
and your Dojo will end the blocked command.


## Filesystem {#filesystem}

Urbit has its own revision-controlled filesystem, Clay. Clay is a typed, global,
referentially transparent namespace. An easy way to think about it is like typed
`git`.

The most common way to use Clay is to mount a Clay node in a Unix directory. The mounted directory is always at the root of your
pier directory.

### Quickstart

This quick-start guide will walk you through some common commands. Follow along
using your Dojo. When you get a `>=` message after entering a command, this means
that the command was successful.

When developing it's a good idea to use a separate desk. Create a `%sandbox`
desk based on the `%home` desk:

```
~your-urbit:dojo> |merge %sandbox ~your-urbit %home
```

Running `our` produces your ship-name, meaning that you can run the following
command instead of typing out the entire thing. Useful for comets, due to their
very long names.

```
~your-urbit:dojo> |merge %sandbox our %home
```

Most of the time we want to use Clay from Unix.  Mount the entire contents of
your `sandbox` desk to Unix:

```
~your-urbit:dojo> |mount /=sandbox=
```

To explore the filesystem from inside Urbit `+ls` and `+cat` are useful. `+ls`
displays files in the current directory, and `+cat` displays the contents of
a file.

We can use `%` to mean "current directory." The result of the command below
is just like using `ls` in a Unix terminal.

```
~your-urbit:dojo> +ls %
```

Notice how `+cat %` does the same thing. That's because everything in Clay,
including directories, is a file.

Let's explore the `/web` directory of the `%sandbox` desk.

```
~your-urbit:dojo> +ls /=sandbox=/web
```

Let's see the contents of `/=sandbox=/web/404/hoon`:

```
~your-urbit:dojo> +cat /=sandbox=/web/404/hoon
```

Now let's navigate to `/web` on `%sandbox` using `=dir`, which is like `cd` in Unix.

```
~your-urbit:dojo> =dir /=sandbox=/web
```

You'll notice that your prompt is now
`~your-urbit:dojo/=/sandbox/~2018.10.2..00.35.44..d7e8/web>`.

```
~your-urbit:dojo/=/sandbox/~2018.10.2..00.35.44..d7e8/web> +ls %
```

To change back to our home directory, we use `=dir` without any path.

```
~your-urbit:dojo/=/sandbox/~2018.10.2..00.35.44..d7e8/web> =dir
```

Sync from your friend `~some-ship`'s `%experiment` desk to your
`%sandbox` desk:

```
~your-urbit:dojo> |sync %sandbox ~some-ship %experiment
```

If and when your sync is successful, you will receive a message:

```
activated sync from %experiment on ~some-ship to %sandbox
```

The ship that you sync from will get their own message indicating that you're
both connected as peers:

```
; ~your-urbit is your neighbor.
```

---

### Manual

#### Paths

A path in Clay is a list of URL-safe text, restricted to the characters
`[a z]`,`[0 9]`, `.`, `-`, `_`, and `~`. Formally this is a `(list knot)`,
meaning that each segment, delineated by `/`, is of the `knot` ASCII-text type.
In other words, paths are expressed as `/foo/bar/baz`. File extensions are
separated from file names with `/`, not `.`. Extensions are syntactically
identical to subdirectories, except that they must terminate the path.

Paths begin with a piece of data called a `beak`. A beak is formally a
`(p=ship q=desk r=case)`; it has three components, and might look like
`/~dozbud-namsep/home/11`.

The first `beak` component is `ship`, which is, as you might guess, the name of
an Urbit ship. The second component is `desk`, which is a workspace meant to
contain other directories; the default desk is `%home`. The third component is
`case`, which represents version information in various ways: date and time;
a version sequence, which is a value incremented by one whenever a file on the
given `desk` is modified; or an arbitrary plaintext label.

You can find what your `beak` is at any given moment by
typing `%` in the Dojo and looking at the first three results.

We use `beak`s because, unlike the current internet, the Urbit network uses a
global namespace. That means that a file named `example.hoon` in the `/gen`
directory on the `%home` desk of your ship `~lodleb-ritrul` would have a
universal address to anyone else on the network:
`/~lodleb-ritrul/home/186/gen/example/hoon`. That, of
course, doesn't mean that everyone on the network has privileges to access that
path.

The structure that combines a `beak` with further path information is called a
`beam`.

#### Relative paths

The `%` command, which we gestured at in the above section, represents the
**relative path**, which is the path where you are currently working. If your
working directory is just your home desk, indicated by the
prompt `~your-planet:dojo>`, then running the command below will print your
working directory's `beam` information: your `beak`, and a `~` that represents
the empty list since no path is present.

```
~your-urbit:dojo> %
```

`%`s can be stacked to indicate one level further up in the hierarchy for each
additional `%`. Try the following command:

```
~your-planet:dojo> %%%
```

You'll probably notice that it only has your ship name and the empty list. The
two additional `%`s abandoned the `case` and the `desk` information by moving
up twice the hierarchy.

There are no local relative paths. `/foo/bar` must be written as
`%/foo/bar`.

#### Substitution

You don't need to write out the explicit path every time you want to reference
somewhere outside of your working directory. You can substitute `=` for the
segments of a path.

Recall that a full address in the the Urbit namespace is a `beam`: the
`/ship/desk/case/path`. If you've switched to another desk before, you're
already familiar with substitution syntax:

```
~your-urbit:dojo> =dir /=sandbox=
```

The above command substitutes uses substitution to use your current `ship` and
`case`; only the `desk` argument, which is located between the other two, is
given something new. Without substitution, you would need to write:

```
~your-urbit:dojo> =dir /~your-urbit/home/85
```

Substitutions work the same way in `beak`s (the `ship/desk/case` part) and
paths. For example, if you are in the `/gen` directory, you can reference a file
in the `/app` directory like below. (`+cat` displays the contents of a file).

```
~your-urbit:dojo> =dir %/gen
~your-urbit:dojo/=/=/~2018.10.2..00.35.44..d7e8/gen> +cat /===/app/curl/hoon
```

Note what was substituted out, and note that we don't need to separate `=` with
`/`.

If we changed our working directory to something called `/gen/gmail`, we could
access a file called

```
~your-urbit:dojo/=/=/~2018.10.2..00.35.44..d7e8/gen> =dir %/gmail
~your-urbit:dojo/=/=/~2018.10.2..00.35.44..d7e8/gen/gmail> +cat /===/app/=/split/hoon
```

Because both paths share a directory named `/gmail` at the same position in the
address hierarchy -- which, if you recall, is just a `list` -- the above command
works!

We can do the same thing between desks. If `%sandbox` has been merged with
`%home`, the following command will produce the same results as the above
command.

```
~your-urbit:dojo/=/=/~2018.10.2..00.35.44..d7e8/gen/gmail> +cat /=sandbox=/app/=/split/hoon
```

Most commonly this is used to avoid having to know the current revision
number in the `dojo`: `/~lodleb-ritrul/home/~2018.10.2..00.35.44..d7e8/gen/example/hoon`

#### Changing directories

Change the working directory with `=dir`. It's our equivalent of the Unix `cd`.

For example, the syntax to navigate to `/home/gen/ask` is:

```
~your-urbit:dojo> =dir /=home=/gen/ask
```

This command will turn your prompt into something like this:

```
~your-urbit:dojo/=/=/~2018.10.2..00.35.44..d7e8/gen/ask>
```

Using `=dir` without anything else uses the null path, which returns you to
your home desk.

```
~your-urbit:dojo/=/=/~2018.10.2..00.35.44..d7e8/gen/ask> =dir
```

Your dojo prompt will turn back into `~your-urbit:dojo>`.

To go up levels in the path hierarchy, recall the relative path expression
`%`. Stacking them represents another level higher in the hierarchy than
the current working directory for each `%` beyond the initial. The command below
brings you one level up:

```
~your-urbit:dojo> =dir %/gen
~your-urbit:dojo/=/=/~2018.10.2..00.35.44..d7e8/gen> =dir %%
```

### Revision-control

#### Mount

Syntax: `|mount /clay/path [Unix-name]`

Mount the `clay-path` at the Unix mount point `Unix-name`.

**Examples:**

```
|mount %/web
```

Mounts `%/web` to `/web` inside your pier directory.

```
|mount %/gen generators
```

Mounts `%/gen` to `/generators` inside your pier directory.

#### Unmount

```
|unmount [clay-path || Unix-name]
```

Unmount the path or name from Unix.

**Examples:**

```
|unmount %/web
```

Unmounts the path `%/web` from whatever name it was mounted as.

```
|unmount %generators
```

Unmounts the Unix path `/generators`.

#### Merge

```
|merge desk beak[, =gem strategy]
```

Merges a `beak` into a `desk` using an optional merge `strategy`.

A `beak` is a ship-desk-case triple, encoded as a
path(`/~dozbud/home/2`)

**Examples:**

```
|merge %home-work /=home=, =gem %fine
```

Merge `/=home=` into `%home-work` using merge strategy `%fine`.

```
|merge %examples ~wacbex-ribmex %examples
```

Merge the `%examples` desk from `~waxbex-ribmex`

#### Sync

```
|sync desk plot [plot-desk]
```

Subscribe to continuous updates from remote `plot` on local `desk`.
`plot-desk` can specify the remote `desk` name. When omitted it is
defaulted to being the same as `desk`. Non-comet urbits have
`|sync %home ~parent %kids` automatically set up (where `~parent` is the
planet that issued a moon, the star that issued a planet, or the galaxy
that issued a star).

**Examples:**

```
|sync %home-local ~dozbud %home

|sync %home ~doznec
```

#### Unsync

```
|unsync desk plot [plot-desk]
```

Unsubscribe from updates from remote `plot` on local `desk` with
optional `plot-desk`. Arguments must match original `|sync` command.

Example:

```
|unsync %home-local ~dozbud %home
```

#### Label

```
|label desk name`
```

Label the current version of `desk` `name`.

Example:

```
|label %home release
```

### Merge strategies

`%init` - Used if it's the first commit to a desk. Also can be used to
"reinitialize" a desk -- revision numbers keep going up, but the new
revision isn't necessarily a descendent of the previously numbered
version, allowing merges to be rerun.

`%this` - Keep what's in Bob's desk, but join the ancestry.

`%that` - take what's in Alice's desk, but join the ancestry. This is
the reverse of `%this`. This is different from `%init` because the new
commit has both sides in its ancestry.

`%fine` - "fast-forward" merge. This succeeds if and only if one head is in the
ancestry of the other.

`%meet`, `%mate`, and `%meld` - find the most recent common ancestor to
use as our merge base.

A `%meet` merge only succeeds if the changes from the merge base to
Alice's head (hereafter, "Alice's changes") are in different files than
Bob's changes. In this case, the parents are both Alice's and Bob's
heads, and the data is the merge base plus Alice's changed files plus
Bob's changed files.

A `%mate` merge attempts to merge changes to the same file when both
Alice and Bob change it. If the merge is clean, we use it; otherwise, we
fail. A merge between different types of changes -- for example,
deleting a file vs changing it -- is always a conflict. If we succeed,
the parents are both Alice's and Bob's heads, and the data is the merge
base plus Alice's changed files plus Bob's changed files plus the merged
files.

A `%meld` merge will succeed even if there are conflicts. If there are
conflicts in a file, then we use the merge base's version of that file,
and we produce a set of files with conflicts. The parents are both
Alice's and Bob's heads, and the data is the merge base plus Alice's
changed files plus Bob's changed files plus the successfully merged
files plus the merge base's version of the conflicting files.

`%auto` - meta-strategy. Check to see if Bob's desk exists, and if it
doesn't we use an `%init` merge. Otherwise, we progressively try
`%fine`, `%meet`, and `%mate` until one succeeds. If none succeed, we
merge Bob's desk into a scratch desk. Then, we merge Alice's desk into
the scratch desk with the `%meld` option to force the merge. Finally, we
annotate any conflicts, if we know how.

### Manipulation

#### `+cat`

Syntax: `+cat path [path ...]`

Similar to Unix `cat`. `+cat` takes one or more `path`s, and prints their
contents. If that `path` is a file, the contents of the file is printed. If the
`path` terminates in a directory, the list of names at that path is produced.

#### `+ls`

Syntax: `+ls path`

Similar to Unix `ls`. `+ls` takes a single `path`.

Produces a list of names at the `path`.

```
~your-urbit:dojo> +cat %/our/home/gen/curl/hoon
```

#### `|rm`

Syntax: `|rm path`

Remove the data at `path`. `path` must be a path to actual node, not a
'directory'

#### `|cp`

Syntax: `|cp to from`

Copy the file at `from` into the path `to`.

#### `|mv`

Syntax: `|mv to from`

Move the file at `from` into the path `to`.

In Clay, `|mv` is just a shorthand for `|cp` then `|rm`. The `|rm`
doesn't happen unless the `|cp` succeeds.
