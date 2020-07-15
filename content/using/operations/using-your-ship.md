+++
title = "Using Your Ship"
description = "How to operate your ship, including using your ship's filesystem and messaging applications, starting a moon, or requesting a DNS proxy."
template = "page_indiced.html"
weight = 2
aliases = ["docs/using/arvo-network-dns/", "docs/using/messaging/", "docs/using/shell/", "docs/using/admin/"]
[extra]
hidetitle = "true"
+++

## Using your ship

Your urbit (also called your _ship_) is a persistent Unix process that you mainly control from the console.

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

### Console

Your Urbit terminal is separated into two parts: the prompt (the bottom line) and the record (everything above that). The record is shared; all the output from all the apps in your command set appears in it. The prompt is multiplexed.

In the CLI, Urbit apps can process your input before you hit return. To see this in action try entering `)` as the first character at the Dojo prompt. Since there is no Dojo command or Hoon expression that starts with ')', the Dojo rejects it.

`Ctrl-x` - Switches the prompt between running console apps

`Ctrl-c` - Crash current event.  Processed at the Unix layer and prints a stack
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

### Landscape

On startup Urbit tries to bind to `localhost:80`. If you're already running something on port `80` -- such as any other HTTP server, or another urbit -- you'll find the urbit that you just started on `8080`, `8081`, and so on. For planets only, we also proxy web domains through Urbit's own servers. Any planet `~your-urbit` is also at `your-urbit.arvo.network`, but only after you [set up DNS](#dns-proxying).

Once running, you can sign into Landscape, your ship’s web interface, from `http://localhost` or `https://your-urbit.arvo.network`. Since our HTTPS isn't audited / battle tested, we just call it "secure" HTTPS. You can find that on `8443`. Or `8444` (and so on) if you're already running something on `8443`.

### Moons {#moons}

Planets can spawn moons, which are meant for connected devices: phones, smart TVs, digital thermostats. The basic idea is that your planet runs permanently in a data center somewhere, while moons run on all your devices.  Each planet can issue ~4 billion (`2^32`) moons.

To generate a random moon from your planet, run:

```
~sampel-palnet:dojo> |moon
moon: ~faswep-navred-sampel-palnet
\/0w5cT5t.wCO6i.~e1xg.Oz0qb.QNO6I.3Kt2T.h9M9F.U3vU~.X3Qu0.gtb19.IYTkY.80kWZ.SI\/
  EUE.DXa8i.TiDof.o3-1C.RHLKS.k81M0.ecz5o.ic0Bg.600g1
\/                                                                                                 \/
```

You must manually edit the output of `|moon` to get the correct format for the `<key>`:

- strip out the `\/`

- combine into one line, omitting spaces

`<key>` would be `0w5cT5t.wCO6i.~e1xg.Oz0qb.QNO6I.3Kt2T.h9M9F.U3vU~.X3Qu0.gtb19.IYTkY.80kWZ.SIEUE.DXa8i.TiDof.o3-1C.RHLKS.k81M0.ecz5o.ic0Bg.600g1`
in this example.

Put `<key>` in a file and that file becomes `<keyfile>`.

You can use the resulting output in the same installation flow from the [Installing Urbit](@/using/install.md) guide, following the same scheme as for booting a planet. That scheme is:

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


### Escaping A Sponsor

To use the network as a planet or star, you must be sponsored by an active star or galaxy, respectively. If your sponsor isn't suiting your needs, you can escape to a different one. The [Bridge](https://bridge.urbit.org/) software doesn't yet support escaping. For the time being, however, you can follow this guide.

#### Prerequisites

- A little bit of ETH in your management proxy address to pay for the transaction.
- The identity number of the sponsor you want to escape from.
- The identity number of the sponsor you want to escape to. 

You can find an identity's number by running ``` `@`~marzod ``` in any Dojo, where `~marzod` is the name of the relevant identity.

#### Instructions

0. If you have your management proxy in Metamask, you can use Etherscan [here](https://etherscan.io/address/ecliptic.eth#writeContract). Skip steps 1-4.
1. Go to either myetherwallet.com or mycrypto.com. Since this is a low-risk operation, and you're signing with a low-value key, it's fine to use their online versions. Sign in with your management mnemonic. (They may still force you to download their tool to log in like this.)
2. Navigate to the "interact with contract" page of the tool you're using.
3. Specify a contract address of `0x6ac07B7C4601B5CE11de8Dfe6335B871C7C4dd4d`.
4. Copy the "contract ABI" from [here](https://etherscan.io/address/ecliptic.eth#code) and paste it into the "ABI/JSON interface" field.
5. Select the `escape()` function, passing in two arguments: your identity number, and the number of your desired sponsor.
6. Sign and submit the transaction.
7. Get in touch with your prospective sponsor, since they won't be notified otherwise. You can do this by contacting them on the network via chat, or joining `~/~dopzod/urbit-help` and asking around.
8. Wait for your request to be accepted by the prospective sponsor. 
9. If your request is not accepted by your prospective sponsor, a last resort, you can make a request to escape to `~marzod`, which is operated by Tlon, the company leading the development of Urbit.

### Continuity breaches

While the Urbit network is in this alpha state, we sometimes have to reboot the whole network. This happens either when major changes need to be shipped or we hit a bug that can't be fixed over the air.

Because Urbit networking is stateful we call this a _continuity breach_. Everything has to be restarted from scratch. Your pier will continue to function after we have breached, but it won’t connect to the rest of the Urbit network.

When this happens, back up any files you'd like to save, shut down your urbit, and recreate it (as if you were starting for the first time).

### Life and rift number

You can check your ship's _life_ and _rift_ number by running `+keys our` in
dojo. You can inspect another ship's life and rift number by running `+keys
~sampel-palnet`. For information on what life and rift are, see [Guide to Breaches](@/docs/tutorials/guide-to-breaches.md).

## DNS proxying {#dns-proxying}

We have a system that lets you request a domain name for your ship in the form of `ship.arvo.network`, where `ship` is your ship's name minus the `~`. This allows users to access their ships remotely using Landscape, our graphical web interface.

Stars and planets follow the same process DNS proxying process, and galaxies have their own requirements. Moons and comets are not supported.

### Planets and Stars

For a planet or star's DNS proxying request to be made and fulfilled, they must be hosting their ship someplace with a public IP address, and its HTTP server must be listening on port 80.

To get `ship.arvo.network` on a planet or star, you must set up DNS routing with its parent ship by starting the `:dns` app.

To do so, simply run this command in your ship's Dojo, passing the IP address as an argument, using the .0.0.0.0 (`@if`) syntax. For example:

```
> -dns-address &dns-address [%if .1.2.3.4]
```

`:dns`, running locally, will make an HTTP request to that IP address on port 80 to confirm that it is itself available at that IP and port. If that fails, you'll receive a `%bail-early` message in `:chat-cli`; this request will retry a few times. If the self-check is successful, the request is relayed to `~zod`, and you'll receive a message saying, `request for DNS sent to ~zod`. Once `~zod` has acknowledged receipt of the request, your local `:dns` app will send a `:chat-cli` message saying `awaiting response from ~zod`.

The request will be picked up shortly, and the `ship.arvo.network` DNS record will be set to the given IP address. Once that's set up, `~zod` will be notified and `~zod` will, in turn, notify your ship. That ship will now try to verify that it can reach itself on `ship.arvo.network` over port 80. If it can't, it'll send a message saying, `unable to access via ship.arvo.network`. If it can, it will configure itself with that domain and say `confirmed access via ship.arvo.network`.

Great! You're set up now. Try accessing your `ship.arvo.network` in your browser to use Landscape; we recommend Chrome or Brave.

### Galaxies

Galaxies are already required to have separate DNS entry at galaxy.urbit.org. There's no automated process for getting that binding, so if you're a galaxy-holder, get in touch with us at support@urbit.org.

There is a command for galaxies that will try to re-use their already-necessary Ames DNS entry for HTTPS:

```
> -dns-auto
```

This will make HTTP-requests to self-check availability over `galaxy.$AMES-DOMAIN` (currently galaxy.urbit.org), where `galaxy` is the galaxy's name minus the `~`.

Otherwise, `-dns-auto` works the same as `:dns|ip` does with stars and planets: if it's available or unavailable, Chat messages, and so on.

### More information

Configuring a ship's domain causes the `:acme` app to request an HTTPS certificate for that domain from LetsEncrypt. Note that LetsEncrypt also requires that the HTTP server be listening on port 80. If the certificate request fails, `:acme` will send a `:chat-cli` message with an explanation. Once the certificate is successfully retrieved, `:acme` will install it, causing the HTTP servers to restart. A secure server will be started on port 443 (the HTTPS default) if it's available. Otherwise, it will try 8443, and then increment to the next port until it can successfully bind one.

The built-in logic for listening on port 80 is similar. Urbit tries to bind port 80; if it cannot, it tries 8080, then increments until it can bind a port. Port 80 is available to unprivileged process on recent version of macOS. Otherwise, the process needs to either be run as root, or be given special permission (CAP\_NET_BIND on Linux).

## Messaging {#messaging}

Let’s get started using the `:chat-cli` application, also known more simply as _Chat_. It's the simplest way to talk to people using the command line interface.

### Quickstart

The most common uses of `:chat-cli` right now are communicating over a public chat channel on `~/~dopzod/urbit-help.` Everyone is more than welcome in `~/~dopzod/urbit-help`. It's the place to get help, ask questions and chat about Urbit in general.

Note that largely equivalent functionality is also available through Chat's web UI in landscape. This is available from your ship’s URL address, mentioned earlier in this guide.

### Joining a chat

In `:chat-cli`, any kind of medium for a message is called a _chat_. There are four "types" of chats, but for now we'll be dealing with the _channel_, a publicly accessible chatroom for general use. We'll discuss the other three kinds in the [chat management](#chat-management) section later on.

Let's join the `~/~dopzod/urbit-help` channel. Use `ctrl-x` to switch from the Dojo prompt to the Chat prompt.

Then:

```
~sampel-palnet:chat-cli/ ;join ~/~dopzod/urbit-help
```

Now that you're in, try post a line to `~/~dopzod/urbit-help`:

```
~sampel-palnet:chat-cli= Hello, world!
```

You'll see your message printed below messages from others that came before it. You can always type `;chats` in the `chat-cli` prompt to list all the chats you're in:

```
~sampel-palnet:chat-cli= ;chats
~dopzod/urbit-help
```

Glyphs will be automatically assigned to channels, but have the option of binding a glyph (single non-alphanumeric character) to the channel you're joining; the syntax is in the form of `;join ~/~dopzod/books +`. The chosen glyph will be the symbol that ends your prompt, and it will be what you use as a shortcut to switch to this channel.

```
~sampel-palnet:chat-cli= ;+
~sampel-palnet:chat-cli+
```

Use `;leave` to unsubscribe from a channel:

```
~sampel-palnet:chat-cli= ;leave ~/~dopzod/urbit-help
```

Now, let's create a channel we can invite some friends to:

```
~sampel-palnet:chat-cli= ;create channel /my-channel
```

Now you can tell your friends to `;join ~/~your-urbit/my-channel`.

In order to see messages in `:chat-cli` you may need to do the following in Dojo:

```
:chat-cli %connect
```

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

### Creating and managing chats {#chat-management}

As mentioned before, any urbit can host any number of chats. Existing chats can be deleted or modified with various commands. All commands in this section should be sent from the `chat-cli>` prompt.

#### Create

Syntax: `;create [type] /name +`, where `+` represents an optional glyph.

Creates and joins a chat, where `[type]` is any of the following:
- `channel`: public chat. Has a blacklist for write control.
- `village`: invite-only chat.
- `journal`: publicly readable, invite-only for writing.
- `mailbox`: publicly writeable, invite-only for reading.

Let's create an example mailbox:

```
~sampel-palnet:chat-cli> ;create mailbox /coolbox ^
```

#### Delete

Syntax: `;delete /name`

Deletes a chat.

#### Permission management

You can permit and ban people from reading and/or writing to the chats you host, using `;invite` and `;banish` command respectively.

Syntax: `;invite [rw] /name ~ships`

Where `rw` is either `r`, `w`, or `rw`, representing "read" and "write" permissions.  
And where `~ships` is a comma-seperated list of ships to invite.

For example, to grant two people full access to a `village` we created:

```
~sampel-palnet:chat-cli> ;invite rw /hidden-village ~ravmel-ropdyl, ~rapfyr-diglyt
```

Similarly, if we later want to revoke the writing permissions for one of them, but still allow them to read new messages, we can run:

```
~sampel-palnet:chat-cli> ;banish w /hidden-village ~rapfyr-diglyt
```

#### Chat glyphs

Glyphs are found at the end of your prompt, as a quick indicator of where
your messages will be sent.

Glyphs are assigned by chat hash out of the following list:

```
! @ # $ % ^ & ( ) - = _ + [ ] { } ; ' \ : " , . < > ?
```

Alphanumeric characters and `|#/*~` are reserved; all others can be manually assigned.

For example, `-` the glyph at the end of the prompt below might indicates that
messages sent from this prompt will go to some chat with that glyph:

```
~sampel-palnet:chat-cli-
```

To see what chat is bound to a glyph, use the `;what` command followed by the
glyph in question, or use `;what` without specifying a glyph to see all of your
subscriptions which are bound to glyphs. For example, to see `=`:

```
~sampel-palnet:chat-cli> ;what =
~dopzod/urbit-help
```

To see all of your glyph bindings:

```
~sampel-palnet:chat-cli> ;what
> ~paldev/numismatic-forum
. ~middev/ny-martians
= ~dopzod/urbit-help
```

When the messaging target doesn't have a glyph, we see their name at the end of
the prompt instead. Here we're talking into `~dannum-mitryl/homework`:

```
~sampel-palnet:chat-cli[~dannum-mitryl/homework]
```

#### Bind

Syntax: `;bind [glyph] ~host/chat-name`

Assigns the chosen glyph to a chat.

For example:

```
~sampel-palnet:chat-cli> ;bind + ~dopzod/urbit-help
```

#### Unbind

Syntax: `;unbind [glyph] ~host/chat-name`

Unassigns the chosen glyph from a chat owned by your ship.

For example:

```
~sampel-palnet:chat-cli> ;unbind + ~dopzod/urbit-help
```

If you don't specify a chat, all bindings for that glyph are removed.

#### Prefixes

Received posts are prefixed with a glyph to let you know what the
audience is. You can activate an individual post to see the full
audience.

There are a few special-purpose "glyphs":

- `|` - Informational messages
- `*` - Posts to a target you don't have a glyph binding for


### Configuration

#### Set audience

`;~ship/chat`

Set audience to `~ship/chat`.

#### Set audience by glyph

Syntax: `;[glyph]`

Set audience to the chat previously bound to the chosen glyph.

#### Set audience to own chat

Syntax: `;/chat`

Set audience to a chat on your own ship.

### Miscellaneous configuration

#### Change timezone

Syntax: `;set timezone [+/-][hours]`

Adjust the display of timestamps to a specific timezone. Relative to UTC.

#### Set width

Syntax: `;set width [number]`

Set the rendering width of `:chat-cli` to a specific number of characters.
(Minimum of 30.)

#### Show timestamps

Syntax: `;set showtime`

Show the timestamp for each message. This is set by default.

#### Hide timestamps

Syntax: `;unset showtime`

Stop showing the timestamp for each message.

#### Sound notification on

Syntax: `;set notify`

Emit a terminal bell sound if your six-syllable ship name is mentioned in
a message. This is set by default.

#### Sound notification off

Syntax `;unset notify`

Do not notify when your ship name is mentioned.


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

Hoon uses something called [the subject](@/docs/tutorials/hoon/the-subject-and-its-legs.md).
The Dojo has its own subject and that's where Hoon's equivalent of variables,
called faces, are stored.

Use `=var` to save faces to the Dojo subject.

```
~your-urbit:dojo> =foo (add 2 2)
```

Note, however, that `=var` is Dojo syntax, not Hoon syntax. You cannot bind a
face in a `.hoon` file in this way.

#### System commands

Use `=dir` to set the current working directory:

```
~your-urbit:dojo> =dir %/gen
```

(`%` represents your current directory. For a complete explanation on urbit
paths, see the [filesystem section](#filesystem).)

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

Retrieves data from a URL. Accepts a `tape`. Similar to Unix `curl`.

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
~your-urbit:dojo> +ls %/gen
~your-urbit:dojo> +ls /~talsur-todres/home/2/gen/program
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
~your-urbit:dojo> +tree %/sys
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

### Dojo manual

#### Sources and sinks

A Dojo command is either a **source** or a **sink**. A source is just something
that can be printed to your console or the result of some computation. A
sink is an **effect**: a change to the filesystem, a network message, a
change to your environment, or a typed message to an app.

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

#### Special variables

There are a few special variables that the Dojo maintains.

#### `:` - Send to app

`:app` goes to a local `app`, `:~ship/app` goes to the `app` on `~ship`.

Send a `helm-hi` message to `hood`:

```
~your-urbit:dojo> :hood &helm-hi 'hi'
```

Apps usually expect marked data, so `&` is often used here.

#### `*` - Save in `%clay`

Save a new `.hoon` file in `gen`:

```
~your-urbit:dojo> *%/gen/foo/hoon '# hello'
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

Convert between marks using `&`, with the destination mark first. You can stack multiple mark conversions together, and some marks can only be converted to specific other marks. In this example, [Udon](@/docs/tutorials/sail-and-udon.md#udon) is converted to `&hymn` (a mark which supplies the `html`, `head`, `body`, and closing tags) first, before being converted to HTML:

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

#### `dir`

Current working `%clay` desk and revision. Read / write.

**Examples:**

```
~your-urbit:dojo> =dir %/gen
~your-urbit:dojo> +ls %
404/hoon docs/ dojo/hoon lib/ listen/hoon md static/udon talk/ testing/udon tree/main/ unmark/ womb/
```

#### `lib`

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

#### `sur`

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

#### `now`

The current (128-bit `@da`) time. Read-only.

**Example:**

```
~your-urbit:dojo> now
~2016.3.21..21.10.57..429a
```

#### `our`

The current urbit ship. Read-only.

**Example:**

```
~your-urbit:dojo> our
~your-urbit
```

#### `eny`

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

The most common way to use Clay is to mount a Clay node in a Unix directory. The mounted directory is always at the root of your pier directory.

### Quickstart

This quick-start guide will walk you through some common commands. Follow along
using your Dojo. When you get a `>=` message after entering a command, this means
that the command was successful.

It's important to note that whenever you want to sync changes from your Unix
directory to your ship, you must use the `|commit %desk` command, where `%desk`
is the desk that you'd like to sync to.

When developing it's a good idea to use a separate desk. Create a `%sandbox`
desk based on the `%home` desk:

```
~your-urbit:dojo> |merge %sandbox ~your-urbit %home
```

Running `our` produces your ship-name, meaning that you can run the following
command instead of typing out the entire thing. Useful for comets due to their
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

### Clay manual

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

The above command uses substitution to use your current `ship` and
`case`; only the `desk` argument, which is located between the other two, is
given something new. Without substitution, you would need to write:

```
~your-urbit:dojo> =dir /~your-urbit/sandbox/85
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
address hierarchy – which, if you recall, is just a `list` – the above command
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
|unmount %/gen
```

Unmounts the Clay path `%/gen` from whatever name it was mounted as.

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
`plot-desk` can specify the remote `desk` name. When omitted it defaults
to being the same as `desk`. Non-comet urbits have
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
|label desk name
```

Label the current version of `desk` `name`.

Example:

```
|label %home release
```

### Merge strategies

`%init` - used if it's the first commit to a desk. Also can be used to
"reinitialize" a desk – revision numbers keep going up, but the new
revision isn't necessarily a descendent of the previously numbered
version, allowing merges to be rerun.

`%this` - keep what's in Bob's desk, but join the ancestry.

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
fail. A merge between different types of changes – for example,
deleting a file vs changing it – is always a conflict. If we succeed,
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

Remove the data at `path`. `Path` must be a path to the actual node, not a
'directory'.

#### `|cp`

Syntax: `|cp to from`

Copy the file at `from` into the path `to`.

#### `|mv`

Syntax: `|mv to from`

Move the file at `from` into the path `to`.

In Clay, `|mv` is just a shorthand for `|cp` then `|rm`. The `|rm`
doesn't happen unless the `|cp` succeeds.
