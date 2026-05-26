# Developer Preview: %claw

An Urbit-native personal agent harness, and an experimental path toward deterministic LLM inference inside a ship

- Date: 2026-05-22
- Author: ~sarlev-sarsen

If you sign up for Tlon hosting today, your hosted Urbit includes **Tlonbot**: an instance of [OpenClaw](https://openclaw.ai) running on a dedicated moon as your personal agent. Through the [Tlon skill](https://github.com/tloncorp/tlon-skill) and [OpenClaw's Tlon plugin](https://docs.openclaw.ai/channels/tlon), it can manage groups, chat with peers, and operate your hosted ship through ordinary messages.

That is already useful. It also still depends on a sidecar Unix process to run OpenClaw. In the words of [`~sitful-hatred`](/blog/contributor-spotlight-sitful-hatred):

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
