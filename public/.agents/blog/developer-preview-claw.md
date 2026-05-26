---
title: "Developer Preview: %claw"
source_kind: "blog"
canonical_url: "/blog/developer-preview-claw"
human_md_url: "/blog/developer-preview-claw.md"
agent_mode: "dedicated"
dependencies:
  - "/blog/contributor-spotlight-sitful-hatred.md"
related_pages:
  - "/blog.md"
  - "/blog/contributor-spotlight-sitful-hatred.md"
  - "/blog/developer-preview-claw.md"
---

Human-oriented content: /blog/developer-preview-claw.md

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
