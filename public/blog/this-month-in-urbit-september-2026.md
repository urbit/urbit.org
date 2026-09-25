# This Month in Urbit: September 2026

September 2026 brings quick comet booting, Orraah, Talon calls, Grubbery mail and calendar apps, %harness, an Urbit-native browser, Lattice, and %lift.

- Date: 2026-09-25
- Author: ~sarlev-sarsen

![September 2026 This Month in Urbit artwork placeholder](/images/urbit-dither-placeholder.png)

Welcome to This Month in Urbit, our series for sharing recent happenings from around the Urbit network. To fully participate, you will need to know how to run an Urbit ship. If you don't know how to do that yet, point your favorite AI agent at this page and it will help get you started. Or [check out the getting started documentation](https://docs.urbit.org/get-on-urbit) to do it the old-school way. Or, read on for more new ways to get started running urbits—it is getting easier by the day!

This guide is written to be human-friendly, allowing you to follow along and learn something new. Embedded in this page are also instructions for your agent; share the link and your agent should help you through getting the enclosed items up and running. The AI landscape is fast-moving and variable, so we can't guarantee everything will work smoothly, but we try to test across various models and agent harnesses. If you or your agents ever get stuck, just give a shout in [The Urbit Foundation group on Tlon Messenger](https://join.tlon.io/0v3.r87kb.fjpft.3k7b5.pbsr5.5em17) and we'll help you out.

## September boot methods

As a slight departure from the quickstart sections of past "This Month in Urbit" posts, there are two new methods for running urbit ships worth mentioning:

1. There is [a new 'quickstart comet' method from `~migrev-dolseg`](https://hawk.computer/-#installation-) that will rapidly boot you into a comet identity:

```
uv run https://hawk.computer/-/try
```

This script only requires `uv` on your machine and otherwise smoothly handles all the steps to boot a comet, drop you into an authenticated browser window running `%hawk` as your homepage, and close things down when you close the terminal. Want to turn your comet back on? Just run the command again and it restarts your comet and drops you back into the browser.

Lightweight and easy, this is probably the quickest way to boot a self-hosted urbit. It doesn't pretend to give you all the bells and whistles, but if you are aiming to poke around `%hawk` for the first time without making grand commitments, it is a great place to start.

2. There is also a new, more robust, desktop GUI ship manager from `~fidzod-fidfes`: [Orraah](https://orraah.com) ('aura' as the zoomers in the audience would pronounce it).

Orraah is a ship manager and runner that supports managing the size of your ship's loom, runtime updates, and scheduling of automatic maintenance. Currently it supports booting a comet, a new planet from a keyfile, or running a ship in an arbitrary pier on your local machine. In the future, `~fidzod-fidfes` aims to provide a 'Planet Store' where new users can purchase Urbit IDs with a credit card and smoothly onboard to a peer-to-peer commerce platform and app store.

Today, it is an easy way to get a graphical user interface for running your ships, if all the command line stuff isn't quite your speed. And it works on Linux, Mac, *and Windows*. The walls are closing in on the people who are still holding on to excuses for why they aren't on Urbit.

As always, you can run your urbit in the more classic way as well. Get the latest runtime by running:

```
curl -fsSL https://urbit.org/get-runtime.sh | sh
```

If you want to boot a fresh ship with the September TMIU pill, we recommend using a moon. To get a moon networking key, just run `|moon` in your planet's dojo. You can do this from the webterm on a Tlon-hosted planet. Then boot your moon with the September TMIU pill:

```
urbit -w <moon-name> -G <moon-key> -u https://s3.us-east-1.amazonaws.com/urbit.orgcontent/tmiu-pills/tmiu-september.pill --http-port 8899
```

(If you don't have moon keys, replace the moon arguments with `-c tmiu-september-comet` to get started with a comet.)

As usual, the pill also includes `%mcp` from [The Groundwire Foundation](https://groundwire.io), [`%obelisk` from `~nomryg-nilref`](/blog/obelisk-beta-release), `%pals` from `~palfun-foslup`, and `%hawk` from `~migrev-dolseg`.

## More `%groups` clients, and more than `%groups` in your clients

Tlon continues to ship updates to their `%groups` application and native mobile apps. This month they made the jump on iOS to styling more in line with Apple's 'Liquid Glass'. So if you've kept up to date with iOS updates (you should, as [they recently fixed some large security flaws](https://cryptobriefing.com/safari-zero-day-exploit-iphone-crypto-wallets/)), this will be a welcome unification to the look and feel of your mobile experience.

[Talon](https://talon.nisfeb.com), an alternative cross-platform Urbit client from `~ricsul-bilwyt` of `~nisfeb` Software, is also continually shipping updates that enable you to interact with your urbit's `%groups` protocol. In addition to being a fully featured `%groups` client, Talon is expanding out to serve as a client to other parts of your urbit.

One such creation is `%trunk`, a bit of connective tissue that enables the 'party line' feature in Talon. What is the 'party line', you ask? It builds on top of `%groups` to enable peer-to-peer calling connected to a group. If you are in a group where the host has party line enabled (and `%trunk` installed), you can click a button and join into a video call room. `%trunk` mediates peer-to-peer client connections over `%ames` and, if needed, utilizes a TURN service from `~nisfeb` to ensure a smooth experience. The host can record the call, generate transcriptions, and more. A great tool for digital communities looking for a more direct way to connect.

## Grubbery at the bleeding edge

The other endeavor you will implicitly discover by installing and using the Talon client: `~ricsul-bilwyt` is starting to build on top of `%grubbery` (from `~niblyx-malnus` and the Groundwire Foundation). Two apps that will jump out at you, in particular: Mail and Calendar. Both are built on top of the `%grubbery` application model and add excellent capabilities to your Urbit. To install and use them, look for the envelope and calendar icons in the Talon sidebar and approve the app installs. Give it an 'urbit second' to install, and then explore your newfound powers.

Mail, built on the `%auspex` protocol, is an Urbit-native threaded conversation application. In many ways—including in having [a Thunderbird client available for installation](https://github.com/nisfeb/auspex/tree/master/thunderbird)—it behaves as a classic email experience: threaded and possibly branching conversations, adding and removing discussion participants ("Moving `~sampel-palnet` to cc so we don't clog up his inbox" remains a lovely and respectful pattern to use with your peers), and forwarding messages to others are all available. There's even a size limit for attached files, in case you missed having your email client yell at you about files >35MB (to be removed in the coming months as `vere64` launches, naturally).

Full legacy-email compatibility was even considered during the protocol design stage. But for a new era, one where *"Nock is the only legal form of computing"*, breaking compatibility was determined to be the better path. In the words of `~ricsul-bilwyt`, "I really value this communication form and want it to exist so it does. I recommend having longer, slower, branching, threaded conversations."

Calendar, also a `%grubbery` app, is... What it says on the tin. A calendar with events, recurrences, timezones, and sharing. It also includes syncing and import options for your Earth calendar, e.g. as ICS or CalDAV, or even fully syncing your Google Calendar via an OAuth client. It isn't necessarily something *new* in a grand sense, but just one more step in the direction of Urbit being able to be the place you do your computing, hold your data, and make your network connections work for you. And of course you can access it via the desktop or mobile Talon clients, or on any machine from which you access your urbit in the browser.

As you might imagine, this porting of legacy protocols (and legacy-protocol-inspired tooling) is massively accelerated by both `%grubbery` as an experimental application model (currently implemented inside of Gall), and AI tooling. One could make the case that there is lots of 'hype' in the AI space, like with "Jev" and possible application interactions enabled by very fast and low-latency AI interactions. And of course, that skepticism isn't always wrong. But we will take this as the opportunity to make the case that [the benefits of a tiny, deterministic, networked, typed, self-sovereign state machine](https://x.com/urbit/status/2103185879770734975?s=20) are just starting to spread their wings. That all that work to make something small and perfect is paying off in a world which is experiencing wild expansion of code generation and excitement. Take, for example, this interaction on the network from a few days ago:

```
~sarlev @ 12:10 AM: what could you do with this + a grubbery: https://x.com/anishfn/status/2102327334485557422?s=20
~niblyx-malnus @ 3:32 AM: pointing a clanker at it now
~niblyx-malnus @ 5:59 AM: Built it, that was easy. Doesn't even need jev.
```

And the result, [an interaction mode that creates mini grub apps](https://drive.google.com/file/d/14xOaj3S41tDZcEzHM8KCD6q9V9RUdg-k/view?usp=sharing) which can then be shared and collaborated on with your friends across the network. Now, this isn't a polished product. And sure, lots of people are building things fast with AI. But, as the coming months are going to show, the foundations that Urbit has built are strong for exactly the kind of bespoke, *sharable*, and *collaborative* digital experiences that people are yearning for. Things that are only possible when you have a peer-to-peer personal server that comes with identity and networking baked in.

## Agents in Gall, Gall in Agents

Not to let the `%grubbery` enthusiasts have all the fun, the ever-prolific `~mopfel-winrux` and `~sitful-hatred` continue to both enable—and be enabled by—AI agent development in Gall. Starting to leak their way into the shared Urbit consciousness, `urbit-browser` and `%harness` are both projects that are built with the assistance of agents, and for the purpose of putting your agents in your urbit.

*While the Talon client and the various on-ship protocols listed above are in use on many users' primary livenet ships, we'll make the note that these projects are a bit more 'in-flight' so it would be best to experiment with them on a moon.*

`%harness` is an ongoing experiment to put the entirety of a modern LLM harness into your ship. Why? You could say, "So we can have Meta's Muse, minus all the walled gardens and spyware." So your agents can be *yours*. And of course since Urbit isn't just a decentralized peer-to-peer chat app, or a bloated systemd process running in some sort of messy tailnet or `libp2p` swarm, you can get all of the things that a MEGACORP-managed cloud VM offers—granular controls over agent conversations, collaborative [projects](https://www.anthropic.com/news/projects), publishable artifacts, and of course direct access to all of your past sessions. All in a way that is purely *yours*.

If you didn't boot from the September TMIU pill, pick it up from `~sitful-hatred`'s moon:

```
|install ~sovsef-risfex-sitful-hatred %harness
```

Sign in with your ChatGPT subscription, add an Anthropic or OpenRouter API key, or set up your own endpoint and get to chatting with your ship. Experiment around and see what you find—and what you can make!

As a subset of this effort, `~mopfel-winrux`'s [urbit-native headless browser](https://github.com/mopfel-winrux/urbit-browser) is a feat in its own right. A web browser, in your urbit. Designed to be included in `%harness`, having a headless browser inside your self-hosted urbit offers an amazing benefit in the world of "AI Agents with a Virtual Machine": your agent's browser requests look like they are coming from a home IP, and thus are less likely to get flagged as spam and blocked from accessing resources on the legacy internet. To pull this off it runs entirely within Urbit, requesting pages via `%iris` and then processing them in a JavaScript page runtime via [UrWASM](https://urbitsystems.tech/article/v01-i01/the-urwasm-webassembly-interpreter-suite-on-urbit). An absolutely impressive undertaking that builds on years of critical core development efforts.

As with `%matpro`, `%urgit`, and `%atpro` before them, it is a fascinating example of using AI Agents to implement earth protocols and tooling into Urbit, enabling more and more of your digital life to come more directly under your control.

## Native Clients are no longer just for `%groups`

Long the focal point of the Urbit native application experience were mobile clients "from Tlon, by Tlon, For Tlon's `%groups`." But again, in the age of agents, we can do so much more. The openness of Urbit as a platform, and as a peer-to-peer protocol runner, is really starting to shine. So while most of the polish has gone into the Talon application, `~ricsul-bilwyt` has also built [Lattice](https://lattice.nisfeb.com), a client and `%lick` sidecar to the similarly named `%lattice` protocol, implemented as a `%grubbery` app. Lattice is "a personal knowledge platform that runs on your own urbit ship." `~ricsul-bilwyt` built it for solving his own problems around context management and has used it for the past few months for things like a shared memory layer between LLM agents running on multiple different machines. After making it solve his immediate problems, agents have then made it practical to polish and release to a broader audience. You can use it as you might use something like Obsidian, or you can even use it to save web pages from your browser into your ship. Put knowledge into it, look at it later, and give access to your agents as you see fit.

## Touch grass, pick up heavy things, and share with `%pals`

Now, maybe you are wanting an escape from the AI psychosis and the pace of acceleration. We get it. In that case, we *won't* tell you about `~littel-wolfur`'s urbit-native harness. We'll save that for another day. But we will tell you about what he built with it: `%lift`. An app for tracking your lifts and sharing them with your `%pals`. Go outside. Lift some weights. Be in your body. And only just for a moment when you get home, share it with your internet friends.
