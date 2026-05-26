+++

title = "Developer Preview: %claw"
date = "2026-05-22"
description = "An Urbit-native personal agent harness, and an experimental path toward deterministic LLM inference inside a ship"
summary = "%claw is an experimental Urbit-native agent harness by ~sitful-hatred. It can use hosted LLM providers today and, on the bleeding edge, demonstrates deterministic Qwen3 inference through %maroon, vere64, and CUDA jets."
search_terms = [
    "developer preview claw",
    "%claw",
    "%maroon",
    "sitful hatred",
    "urbit llm",
    "urbit agents",
    "openclaw tlon",
    "tlonbot",
    "deterministic inference",
    "qwen3",
    "vere64 cuda jets",
    "urbit mcp",
    "local llm",
    "sovereign ai"
]

[extra]
ship = "~sarlev-sarsen"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+DP+Claw/Blog_Claw+DP_Social.jpg"
imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+DP+Claw/Blog_Claw+DP_Social+16_9.jpg"
# imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+DP+Claw/Blog_Claw+DP_Banner.jpg "
# imageDark = ""
# imageCardDark = ""
# imageIndexDark = ""
tags = ["developer preview", "agents", "llms", "vere64", "mcp", "claw"]
+++

## Putting a ghost in the shell

If you sign up for Tlon hosting today, your hosted Urbit includes **Tlonbot**: an instance of [OpenClaw](https://openclaw.ai) running alongside a dedicated moon as your personal agent. Through the [Tlon skill](https://github.com/tloncorp/tlon-skill) and [OpenClaw's Tlon plugin](https://docs.openclaw.ai/channels/tlon), it can manage groups, chat with peers, and operate your hosted ship through ordinary messages.

That is already useful. It also still depends on a sidecar Unix process to run OpenClaw. [In the words of `~sitful-hatred`](/blog/contributor-spotlight-sitful-hatred):

> "It works for what it is, but it doesn’t fit very well with how we run ships in hosting. That pushed me toward the conclusion that this should really have a native harness. We shouldn’t be using a third-party system just to let your ship make HTTP requests to a provider or to its own engine."

So the question becomes: what if we put the agent _inside_ the computer?

In addition to working at Tlon and shipping Tlonbot, `~sitful-hatred` has been experimenting in exactly this direction. `%claw` is the baseline: an Urbit-native agent harness inspired by OpenClaw's architecture, but intended to live as a desk on the ship. Instead of making the ship a peripheral controlled by a separate process, `%claw` makes the ship the place where agent state, configuration, permissions, network identity, and eventually inference itself can meet.

You can try the currently distributed version today on a moon or comet that you are willing to treat as an experimental assistant:

```
|install ~matwet %claw
```

The network-distributed version uses [OpenRouter](https://openrouter.ai/) as its inference provider. It also includes a Hoon implementation of lossless context management, a bundled version of [Groundwire's Urbit MCP server](https://github.com/gwbtc/urbit-mcp), and integration with Brave Search so the agent can search the web when answering questions.

But the bleeding edge of the exploration is more ambitious: can the inference itself run inside Urbit?

`~sitful-hatred` has proven the answer is yes with an end-to-end proof of concept in a bleeding edge branch of `%claw`. Granted, it comes with serious qualifiers, like using a *very* small [ternary-quantized](https://arxiv.org/abs/2402.17764) Qwen3 model, and heavier than normal Urbit runtime dependencies. But it demonstrates a path toward deterministic inference through Urbit: model weights, tokenizer, prompt handling, and generation are all coordinated by the ship, with `%maroon` handling local inference and CUDA jets accelerating the math.

The setup below is not a product release. It is a developer preview for people comfortable building experimental runtimes, booting disposable ships, and debugging rough edges. The point is not that this is already the best way to run an LLM, far from it if we are being honest. But it makes a new design space tangible: personal agents whose memory, tools, permissions, identity, and execution environment are native to the user's own computer. And *fully deterministic inference* to boot!

## Running inference in Urbit

The local inference path builds on work by `~lagrev-nocfep` on the [Urbit numerics library](https://github.com/sigilante/numerics). The experimental `%claw` branch uses `%maroon` as the inference engine rather than delegating matrix multiplication—the foundation of LLM inference—to an external service.

To experiment with this path, you will need:

- A branch of `vere64` with CUDA jets. The active [`yapishu/vere` CUDA work](https://github.com/yapishu/vere/tree/reid/64-jets) and potentially the related [PR #1](https://github.com/yapishu/vere/pull/1) are the current starting points.
- An Nvidia GPU with CUDA 12.8 or newer.
- A Linux machine. macOS does not support CUDA, and the Windows Vere runtime is untested for this path.
- Zig 0.15.2, matching the current experimental runtime branch.
- A willingness to use disposable ships. Do not start with an important planet.

Following the instructions below should get you to a slow but working local-inference setup. It has been tested on Nvidia RTX 3060 and RTX 6000 Pro GPUs.

> The following instructions assume you are already familiar with running an Urbit ship. If you are interested in local LLMs or sovereign AI but do not yet have a ship, you can [get a hosted Urbit through Tlon](https://join.tlon.io/0v3.r87kb.fjpft.3k7b5.pbsr5.5em17) or follow the docs to [get started with self-hosting](https://docs.urbit.org/get-on-urbit). Then hop onto the network and tell us what you are trying to build.

Create a working directory for the experiment:

```
mkdir urbit-llm
cd urbit-llm
```

The rest of the shell commands assume you are operating from this directory.

## Build vere64 with CUDA jets

Clone the runtime branch and build it with CUDA support:

```
git clone https://github.com/yapishu/vere
cd vere
git switch reid/64-jets
zig build -Dcuda=true -Dcuda-lib-path=/opt/cuda/lib64
cd ..
```

Depending on your system, you may need to adjust `-Dcuda-lib-path=/opt/cuda/lib64` to point at the directory containing your CUDA runtime libraries.

If you hit the `++sew` / `u3r_mean` assertion described in [PR #1](https://github.com/yapishu/vere/pull/1), apply the PR branch and rebuild:

```
cd vere
git fetch origin pull/1/head:tlat-claw-fixes
git switch tlat-claw-fixes
zig build -Dcuda=true -Dcuda-lib-path=/opt/cuda/lib64
cd ..
```

Copy the new runtime binary into your `urbit-llm` directory. On x86_64 Linux with the glibc CUDA build path, that looks like:

```
cp vere/zig-out/x86_64-linux-gnu/urbit ./urbit
```

## Get %claw and the model files

Clone the `%claw` source and switch to the current local-inference branch:

```
git clone https://github.com/yapishu/claw
cd claw
git switch reid/harness-merge
cd ..
```

Then pull down the Qwen3 model weights and tokenizer:

```
curl -L "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/blobs/qwen3-urbit.tar.gz" | tar -xzf -
```

## Boot a disposable ship

Boot a fakezod for experimentation using the CUDA-enabled runtime:

```
./urbit -F zod --http-port 8080
```

From the fakezod's dojo, create and mount a `%claw` desk:

```
|new-desk %claw
|mount %claw
```

Back in your Unix terminal, copy the `%claw` desk into the fakezod pier:

```
rsync -av --delete claw/desk/ zod/claw/
```

Then commit and install the desk from the dojo:

```
|commit %claw
|install our %claw
```

You should see output like:

```
>   '%maroon initialized — bound at /apps/maroon/chat + /apps/maroon/v1'
```

Grab your [`+code`](https://docs.urbit.org/user-manual/os/shell#code), then visit `http://localhost:8080/apps/claw` in your browser. From the GUI you can change the provider from OpenRouter to `%maroon` and adjust the local model settings. If you are running a fakezod, you will generally want a second fake ship to act as the `%claw` owner's identity. Replace `~sampel-palnet` with that ship.

The explicit dojo configuration looks like this:

```
:claw &claw-action [%set-default-provider %maroon]
:claw &claw-action [%set-local-llm-url 'http://localhost:8080']
:claw &claw-action [%set-max-response-tokens 1.024]
:claw &claw-action [%set-max-context-tokens 8.192]
:claw &claw-action [%add-ship ~sampel-palnet %owner]
```

## Add weights and tokenizer to the desk

Back in the Unix terminal, copy the model files into the mounted `%claw` desk:

```
mkdir -p zod/claw/weights
cp qwen3-urbit/qwen3-bonsai.jam zod/claw/weights/qwen3-bonsai.jam
cp qwen3-urbit/qwen3-tokenizer.jam zod/claw/weights/qwen3-tokenizer.jam
```

Commit the desk again so Clay can see the newly added files:

```
|commit %claw
```

At this stage, it is wise to make a checkpoint. Shut down the fakezod:

```
|exit
```

Then copy the pier and restart it:

```
cp -a zod zod-llm-checkpoint
./urbit zod
```

## Load local weights into %maroon

Generate and poke the model weights from the dojo:

```
=payload +claw!maroon-load-qwen3
:maroon &maroon-load-qwen3 payload

=tok +claw!maroon-load-qwen3-tokenizer
:maroon &maroon-load-tokenizer tok
```

If this worked, you should see output resembling:

```
>   "loaded qwen3-bonsai.jam (537.974.372 bytes)"
> =payload +claw!maroon-load-qwen3
>   "loading qwen3: d=2.048 heads=16 kv-heads=8 layers=28 vocab=151.669"
>   '%maroon qwen3 model loaded successfully'
>   "%maroon: warmed 703 weights into VRAM"
> :maroon &maroon-load-qwen3 payload
>=
>   "loaded qwen3-tokenizer.jam (5.361.920 bytes)"
> =tok +claw!maroon-load-qwen3-tokenizer
>   "loading tokenizer..."
>   '%maroon tokenizer loaded successfully'
> :maroon &maroon-load-tokenizer tok
>=
```

You can then test the tokenizer:

```
> .^(* %gx /=maroon=/encode/hi/noun)
[6.023 0]
```

And directly test the one-token generation path:

```
> .^(* %gx /=maroon=/qwen3-say/hi/noun)
[25 58]
```

Depending on the details of your setup, you may now find yourself at the edge of the trodden path: responses technically work, but generation is painfully slower than you would want for day-to-day use. Congratulations—that is exactly where useful optimization work begins.

Some of the obvious next targets, for anyone willing to tackle them:

- Improvements in Vere, `%maroon`, and `%claw` so jetted paths are hit all the way through generation.
- Improved CUDA kernels, including FlashAttention-style prefill optimizations.
- Faster vocabulary sampling, including a greedy fast path.
- Async jobs in Vere so inference tasks do not block the ship.
- Tokenizer and prompt caching for multi-turn performance.

There is a lot to debate here: should weights live in the loom? What should async jobs in Vere look like? What model architecture get the most optimized paths?

The answers will not come from one prototype. They will come from people building, measuring, breaking things on disposable ships, and reporting what they find.

## Optimization test paths

The following requests exercise different parts of the local inference stack. Benchmark them, make a change, and see whether you improved the path you intended to improve.

### 1. Test the production %maroon HTTP path

This exercises the tick-based generation path rather than only the debug scry:

```
curl -N -sS \
  -X POST http://localhost:8080/apps/maroon/chat \
  -H 'Content-Type: application/json' \
  --data '{"tokens":[6023,0],"n":1,"temperature":"1","top_p":"1","repetition_penalty":"1"}'
```

With tokenizer prompt input:

```
curl -N -sS \
  -X POST http://localhost:8080/apps/maroon/chat \
  -H 'Content-Type: application/json' \
  --data '{"prompt":"hi","n":4,"temperature":"1","top_p":"1","repetition_penalty":"1"}'
```

### 2. Test the OpenAI-compatible path

```
curl -sS \
  -X POST http://localhost:8080/apps/maroon/v1/chat/completions \
  -H 'Content-Type: application/json' \
  --data '{"model":"qwen3","messages":[{"role":"user","content":"hi"}],"max_tokens":1,"temperature":"1","top_p":"1","stream":false}'
```

This is closer to `%claw`'s chat request shape.

### 3. Test direct %maroon-chat-req

In the dojo:

```
=body '{"model":"qwen3","messages":[{"role":"user","content":"hi"}],"max_tokens":1,"temperature":"1","top_p":"1"}'
=meta [[%direct ~] ~]
:maroon &maroon-chat-req ['manual-001' meta body]
```

This uses the same direct-poke path `%claw` uses, bypassing HTTP.

### 4. Test a direct %claw prompt

```
:claw &claw-action [%set-default-provider %maroon]
:claw &claw-action [%set-max-response-tokens 16]
:claw &claw-action [%prompt 'hi']
```

### 5. Test a DM

After the above paths work, DM the `%claw` ship from the owner identity you configured. If you need to add or change the owner ship:

```
:claw &claw-action [%add-ship ~sampel-palnet %owner]
```

Replace `~sampel-palnet` with the `@p` of your second fake ship.

## Why this matters

Today, the practical agent stack usually looks like this: a model runs somewhere else, a harness runs on Unix, credentials live in local files or cloud services, and your personal server becomes one more integration target.

Urbit suggests a different shape. Your ship is already an identity, a persistent event log, a network endpoint, a permissioning surface, and a place for durable personal state. `%claw` asks what happens when the agent harness moves into that environment. `%maroon` asks what happens when inference starts moving there too.

Even if the first working model is small, slow, and strange, the architectural direction is clear: an agent should not merely have access to your computer. It should belong to your computer.

---agent---

# Agent companion: Developer Preview, %claw

This companion is for AI agents helping a human reproduce or explore the `%claw` developer preview. The human-facing article is narrative and explanatory. Use this section as the operational checklist.

## Safety profile

- Default to a disposable comet, fake ship, or moon. Do not run this experiment first on a valuable planet.
- Treat `%claw`, `%maroon`, and the CUDA-enabled `vere64` branch as experimental software.
- Never ask the user to paste real `+code` values, `urbauth-*` cookies, OpenRouter keys, Brave Search keys, or other credentials into chat.
- If a credential is needed, tell the user exactly which local config field or UI field to fill in themselves.
- Do not commit model weights, auth cookies, API keys, pier state, generated logs, or local configuration files to Git.
- If an install, build, poke, scry, or MCP tool call fails, stop and surface the exact error. Do not silently switch branches or invent alternate commands.
- If connected over MCP, remember that state-changing tools may materially alter the ship. Explain every state-changing action before taking it.

## Known references at drafting time

Use these as starting points, not immutable guarantees:

| Component | Reference | Notes |
| --- | --- | --- |
| `%claw` network install | `|install ~matwet %claw` | Uses external provider path by default. |
| `%claw` source | `https://github.com/yapishu/claw`, branch `reid/harness-merge`, observed head `59c554d1ea15616555816a0a95b1693d0b95297e` | Local `%maroon` integration branch. |
| CUDA `vere64` | `https://github.com/yapishu/vere`, branch `reid/64-jets`, observed head `337dd1136ffc7939fc5a3a8be70bed2101e129f0` | Runtime branch with CUDA jet work. |
| CUDA `vere64` PR fix | `https://github.com/yapishu/vere/pull/1`, observed head `d281deaf648e0054b379bd49571e9e819b810d16` | Fixes a `++sew` / `u3r_mean` assertion path. |
| Qwen3 tarball | `https://s3.us-east-1.amazonaws.com/urbit.orgcontent/blobs/qwen3-urbit.tar.gz` | Contains `qwen3-bonsai.jam` and `qwen3-tokenizer.jam`. |
| Urbit MCP | `https://github.com/gwbtc/urbit-mcp` | `%claw` includes a bundled version for agent interaction. |

Before executing commands, ask the user to confirm whether they want:

1. **Hosted-provider `%claw` only** — install `%claw` and configure OpenRouter / Brave Search.
2. **Local `%maroon` inference** — build CUDA `vere64`, install experimental `%claw`, load Qwen3 weights, and test local generation.
3. **Agent/MCP-assisted setup** — user gives the agent controlled access to a disposable ship through an MCP endpoint.

## Environment checks

For local `%maroon` inference, ask the user to verify:

- Linux host.
- Nvidia GPU.
- CUDA 12.8 or newer.
- Zig 0.15.2.
- Sufficient disk space for a pier, source trees, build artifacts, and model tarball.
- An unused HTTP port, defaulting to `8080` in the article.
- A disposable ship target.

Do not attempt to solve missing CUDA, Nvidia driver, or Zig installation by guessing. Ask the user for their distro/package preference or point them to the branch's build docs.

## Human-run setup checklist

If the user wants to run the commands manually, give them this ordered checklist.

### A. External-provider %claw
> (OPTIONAL: if they want to experiment with a working version without local inference)

In a disposable ship's dojo:

```
|install ~matwet %claw
```

Then have the user open `/apps/claw` and configure:

- default provider: OpenRouter, unless they are explicitly doing `%maroon`
- OpenRouter key: entered by the user only
- Brave Search key: optional, entered by the user only
- owner ship: the user's controlling `@p`

### B. Local %maroon inference

From a new Unix working directory:

```
mkdir urbit-llm
cd urbit-llm
git clone https://github.com/yapishu/vere
cd vere
git switch reid/64-jets
zig build -Dcuda=true -Dcuda-lib-path=/opt/cuda/lib64
cd ..
cp vere/zig-out/x86_64-linux-gnu/urbit ./urbit
git clone https://github.com/yapishu/claw
cd claw
git switch reid/harness-merge
cd ..
curl -L "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/blobs/qwen3-urbit.tar.gz" | tar -xzf -
./urbit -F zod --http-port 8080
```

In the fakezod dojo:

```
|new-desk %claw
|mount %claw
```

Back in Unix:

```
rsync -av --delete claw/desk/ zod/claw/
```

In dojo:

```
|commit %claw
|install our %claw
```

Back in Unix:

```
mkdir -p zod/claw/weights
cp qwen3-urbit/qwen3-bonsai.jam zod/claw/weights/qwen3-bonsai.jam
cp qwen3-urbit/qwen3-tokenizer.jam zod/claw/weights/qwen3-tokenizer.jam
```

In dojo:

```
|commit %claw
```

Recommend a checkpoint before loading weights:

```
|exit
```

Back in Unix:

```
cp -a zod zod-llm-checkpoint
./urbit zod
```

Configure `%claw` for `%maroon` from dojo:

```
:claw &claw-action [%set-default-provider %maroon]
:claw &claw-action [%set-local-llm-url 'http://localhost:8080']
:claw &claw-action [%set-max-response-tokens 1.024]
:claw &claw-action [%set-max-context-tokens 8.192]
:claw &claw-action [%add-ship ~sampel-palnet %owner]
```

Replace `~sampel-palnet` with the second fake ship or owner identity.

Load weights and tokenizer:

```
=payload +claw!maroon-load-qwen3
:maroon &maroon-load-qwen3 payload

=tok +claw!maroon-load-qwen3-tokenizer
:maroon &maroon-load-tokenizer tok
```

Verify:

```
.^(* %gx /=maroon=/encode/hi/noun)
.^(* %gx /=maroon=/qwen3-say/hi/noun)
```

Expected reference outputs:

```
[6.023 0]
[25 58]
```

## MCP-assisted operation

If the user wants an AI agent to operate the ship directly, the MCP-enabled flow has two phases: first put the disposable ship and `%claw` desk into a usable state, then connect the external agent harness through Groundwire's `%mcp` desk.

### C. Prepare the disposable ship and %claw desk for MCP

1. Ask the user to use a disposable ship, not a valuable planet.
2. Boot the ship and keep its dojo available. The article examples use fakezod on port `8080`:

   ```
   ./urbit -F zod --http-port 8080
   ```

3. In the disposable ship's dojo, create the `%claw` desk and commit the empty desk before copying files into it:

   ```
   |new-desk %claw
   |commit %claw
   ```

4. If the `%claw` desk is not visible in the pier as `zod/claw/`, mount it:

   ```
   |mount %claw
   ```

5. From Unix, rsync the experimental `%claw` source into the pier:

   ```
   rsync -av --delete claw/desk/ zod/claw/
   ```

6. Back in dojo, commit and install `%claw`:

   ```
   |commit %claw
   |install our %claw
   ```

After this point, switch to the `%mcp` setup rather than asking the user to keep manually running every `%claw` poke. Once MCP is connected, the agent should be able to use MCP tools to commit files and poke Gall agents.

### D. Install and configure Groundwire's Urbit MCP desk

Follow the README in [github.com/gwbtc/urbit-mcp](https://github.com/gwbtc/urbit-mcp). The shape is:

1. In the same disposable ship's dojo, create and mount the `%mcp` desk:

   ```
   |new-desk %mcp
   |mount %mcp
   ```

2. In the `urbit-mcp` repo, build and copy the desk into the ship's pier:

   ```
   git clone https://github.com/gwbtc/urbit-mcp
   cd urbit-mcp
   ./build.sh -p /path/to/zod/mcp
   ```

3. In dojo, commit and install `%mcp`:

   ```
   |commit %mcp
   |install our %mcp
   ```

4. Have the user get their ship's web login code locally:

   ```
   +code
   ```

5. Have the user authenticate from Unix and extract the `urbauth-*` cookie from the `set-cookie` header. Do not ask them to paste the real code or cookie into chat:

   ```
   curl -i http://localhost:8080/~/login -X POST -d "password=<your-code-here>"
   ```

6. Have the user put the cookie directly into their local agent harness configuration. For Claude Code, the README shape is:

   ```
   claude mcp add --transport http zod http://localhost:8080/mcp \
     --header "Cookie: urbauth-~your-ship=<session-cookie>" \
     --scope user
   ```

   For Codex, use `mcp-proxy` in `~/.codex/config.toml`:

   ```toml
   [mcp_servers.zod]
   command = "uvx"
   args = [
     "mcp-proxy",
     "--transport", "streamablehttp",
     "--headers", "Cookie", "urbauth-~your-ship=<session-cookie>",
     "http://localhost:8080/mcp"
   ]
   ```

7. Confirm the MCP tool list before taking state-changing actions. The relevant default tools should include the ability to commit desks and poke agents.

### E. Use MCP to finish %claw setup

Once MCP is connected, use MCP tools rather than asking for manual dojo commands where practical:

- use file/desk tools to insert or copy files into `%claw`
- use the commit desk tool after changing `%claw`
- use the poke tool for `%claw` and `%maroon` configuration commands

Useful `%claw` pokes once access is confirmed:

```
:claw &claw-action [%set-default-provider %maroon]
:claw &claw-action [%set-local-llm-url 'http://localhost:8080']
:claw &claw-action [%set-max-response-tokens 1.024]
:claw &claw-action [%set-max-context-tokens 8.192]
:claw &claw-action [%add-ship ~sampel-palnet %owner]
```

Optional only if the user has a Brave key and enters it through an approved secret path:

```
:claw &claw-action [%set-brave-key '<user-managed-secret>']
```

Do not fill in a real key yourself. For every state-changing poke, report the exact command and expected effect before calling it.

## Troubleshooting ladder

- **Build fails before linking:** verify Zig version, CUDA headers, CUDA library path, and branch.
- **CUDA link failure:** have the user confirm the directory passed to `-Dcuda-lib-path` contains `libcudart.so`.
- **`++sew` / `u3r_mean` assertion:** apply the PR #1 head branch and rebuild, then retry from a clean checkpoint.
- **`|commit %claw` misses weights:** confirm the files are in `zod/claw/weights/` and run `|commit %claw` again.
- **`%maroon` does not initialize:** confirm `%claw` was installed from the experimental branch and inspect dojo output.
- **Tokenizer scry fails:** confirm tokenizer was loaded and that the `%maroon` app is running.
- **Generation path hangs or slows severely:** reduce `max_response_tokens`, test the direct scry path first, then HTTP, then `%claw`.
- **Owner DM does not trigger:** confirm `%claw` owner ship, DM source `@p`, and that the second fake ship can talk to the fakezod.

When reporting errors back to the user, include:

- command run
- ship name and HTTP port, if relevant
- desk name
- branch/commit if relevant
- full error text
- whether the failure happened in Unix, dojo, Eyre HTTP, or MCP
