# This Month in Urbit: April 2026

Experiments from around the Urbit ecosystem, including MCP, app distribution, storage, mail, local LLM routing, and mobile clients

- Date: 2026-05-01
- Author: ~sarlev-sarsen

Welcome to _This Month in Urbit_, a new series for sharing the experimentation happening around the ecosystem and helping you experiment yourself. We'll include other news and happenings from around the network as well, but Urbit is a peer-to-peer and end-to-end encrypted network, so there are no promises of omniscience here—just a little taste of what we've caught wind of recently.

To fully participate, you will need to know how to run an Urbit ship. If you don't know how to do that yet, point your favorite AI agent at this page and it will help get you started. Or check out the [getting started documentation](https://docs.urbit.org/get-on-urbit) to do it the old school way. Not quite ready to run your own ship? Many of these experiments can still be experienced if you have a hosted ship, but please note that most should not be considered stable software, so they could negatively impact your ship's functionality.

Given the range of maturity for the experiments in this series, we'll share recommendations on whether you should use a fresh ship, a disposable identity, or any other special considerations. By default, we intend to make a monthly pill available with the mentioned software pre-installed; when that pill is not available, the individual install commands below are the source of truth.

This guide is written to be human-friendly, allowing you to follow along and learn something new. Embedded in this page are also instructions for your agent, should you choose to send it their way and get help with it. The AI landscape is fast-moving and variable, so we can't guarantee everything will work smoothly, but we try to test across various models (OpenAI, Anthropic, and open source options) as well as agent harnesses (Claude Code, Codex, OpenCode, OpenClaw, and Hermes). If you or your agents ever get stuck, just give a shout in [The Urbit Foundation group on Tlon Messenger](https://join.tlon.io/0v3.r87kb.fjpft.3k7b5.pbsr5.5em17) and we'll help you out.

To get started with this month's features, try booting a moon. In the dojo of your planet, run `|moon` and you'll get a moon networking key. You can do this from the webterm on a Tlon-hosted planet.

Get the runtime for your OS:

```
curl -fsSL https://urbit.org/get-runtime.sh | sh
```

Then boot your moon:

```
urbit -w <moon-name> -G <moon-key> --http-port 8899
```

## Agentic Urbit

The project `~bonbud-macryg` and `~niblyx-malnus` alluded to in their [Contributor Spotlight](./contributor-spotlight-niblyx-malnus-and-bonbud-macryg) is the first of our features this month. A native Urbit MCP server from Groundwire, [`%mcp`](https://github.com/gwbtc/urbit-mcp) allows you to connect any compatible MCP client to your Urbit through the [Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro), enabling you to interact with your ship through your agent.

This means everything from creating your own Urbit apps without writing Hoon yourself to running threads, diagnostics, and developer feedback loops. It works best with Anthropic's Opus 4.7 and OpenAI's GPT-5.5 models, but you may find it worthwhile to experiment with smaller or open weight models as well. Smaller models are likely to struggle a bit more with Hoon, but we encourage experimentation regardless—your only limitation is your personal agency and creative appetite.

If you installed `%mcp` on your ship, you'll need to grab a session cookie. Get your `+code` from the dojo, and then run:

```
curl -i http://localhost:8899/~/login -X POST -d "password=<your-code-here>"
```

This will return an authentication token that you can use in your preferred MCP client's authentication headers. Every MCP client is different, so you may need to follow a dedicated flow, but as an example this is what it would look like in an OpenCode configuration file:

```json
{
  "mcp": {
    "my-ship": {
      "type": "remote",
      "url": "http://localhost:8899/mcp",
      "enabled": true,
      "oauth": false,
      "headers": {
        "Cookie": "urbauth-~your-ship=<session-cookie>"
      }
    }
  }
}
```

You can manually install and get started using the instructions in [Groundwire's GitHub repo](https://github.com/gwbtc/urbit-mcp) if you want to put `%mcp` on an existing ship. The software is relatively robust and some Urbit developers run it on their main ships, but note that it is a powerful tool when deciding what LLM you connect it to, as it can materially modify the state of your ship.

What exactly does `%mcp` enable? One of the biggest unlocks is a massively streamlined developer feedback loop. Or, you could even say, an improved "agent experience." By calling the `commit-desk` endpoint, an agent can update code and get errors directed back into its context. Pair this with a project that has a clear specification—or perhaps even existing Earth-side implementations and tests—and translating existing protocols, app ideas, or tools into Gall applications becomes a practice in steering rather than carpal tunnel generation.

## Over the network

This software generation pipeline, and the ability to then easily distribute newly generated code across Urbit's network, makes fertile ground for app experiments. `~mopfel-winrux` looked at the forthcoming `vere64` and the already-possible 16GB loom and asked: what if my Urbit _was_ the S3 bucket?

The result is [`%jars`](https://github.com/mopfel-winrux/jars), which implements the elements of the S3 API used by Tlon Messenger. Instead of needing an S3 bucket, anyone running `%jars` can put images directly into their ship.

Install it with:

```
|install ~nattyv %jars
```

Carrying on with experiments to implement Earth-side software on Urbit, `~mopfel-winrux` also built [`%bide`](https://github.com/mopfel-winrux/bide), an idle RPG inspired by [Melvor Idle](https://melvoridle.com/). It lets you build skills, amass resources, and level up your character by choosing what you want to train or hoard.

```
|install ~nattyv %bide
```

As an honorable mention for Claude-enabled tinkering, `~hanfel-dovned` put together `%monsters`. And even if you aren't ready to install `%mcp`, he notes: "Lately I've found that having Claude just run a fakeship in a tmux session and copy everything itself works great too."

```
|install ~hanfel-dovned %monsters
```

## Experiments for the intrepid

While `%bide` and `%jars` are relatively constrained projects, and other Gall apps are becoming available over the network on a weekly basis, there are some rumblings of other ways Urbit contributors are looking to use their ships in more involved ways. These are early experiments, but as examples of what is possible, they may serve as inspiration for what you might build.

`~rolrup` slid in with an ambitious play to give every Urbit an email address. While not purely Urbit-side software, [Mail](https://github.com/rolrup/mail) helps bridge the gap. It is community-scale infrastructure in three parts: an Urbit app for the average user, a Python bridge for running the gateway, and a Cloudflare Worker for serverless routing of mail. `~rolrup` is running one such gateway, giving users access to email at `their-ship@urmail.com` and serving as the sharp tip of the spear for stars-as-service-providers.

If you want to run the client:

```
|install ~dister-poster-midnev %mail
```

Another Urbit star operator building cool Earth<>Mars connectors is `~topdys`, who is working on [`%sovnas`](https://github.com/wground/sovnas), effectively a way of managing files colocated with a ship. Similar to `~rolrup`'s email implementation, `%sovnas` includes a Python bridge alongside a Gall app. By connecting to the `%lick` vane, the Python process can manage files on the host computer while your Urbit straightforwardly serves you a frontend from wherever you host your ship.

Next up, `~datryn-ribdun` came out of hiding with an exciting tool for anyone interested in local LLMs: [`urbit-llmproxy`](https://github.com/mybropro/urbit-llmproxy). What does it do? Simple: it lets you share an OpenAI API compatible endpoint over the Urbit network. Running a Qwen3.6 model on your M4 Mac mini and want to share access with your friends? No need to struggle with Tailscale, Cloudflare Tunnels, or opening ports on your home network. Just connect a local ship and share your connection across the Urbit network as simply as permissioning a `@p`.

Last but not least, `~nisfeb` released [Talon](https://github.com/nisfeb/talon/releases), an alternative mobile client for Urbit with a focus on interfacing with Tlon's `%groups` backend. Optimized for Android users, the code is open source and regular releases are available on GitHub. Rumors abound of a branch that supports iOS, as well...

## Notable mentions

Other notable mentions from the broader Urbit network this month include:

- [Groundwire Alpha's launch](https://x.com/GroundwireBTC/status/2039486671008252204?s=20)
- An overhaul of [Tlon's website](https://tlon.io/)
- `~ravmel-ropdyl` going on the [Stack Overflow Podcast](https://stackoverflow.blog/2026/04/03/seizing-the-means-of-messenger-production/)
- `~sorreg-namtyv` getting into [debates at BTC 2026](https://www.youtube.com/watch?v=wvhJsSJZZgs)
