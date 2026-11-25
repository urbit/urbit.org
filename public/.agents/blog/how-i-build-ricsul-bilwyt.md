---
title: "How I build, with ~ricsul-bilwyt"
source_kind: "blog"
canonical_url: "/blog/how-i-build-ricsul-bilwyt"
human_md_url: "/blog/how-i-build-ricsul-bilwyt.md"
agent_mode: "fallback"
dependencies:
  - "/blog/contributor-spotlight-ricsul-bilwyt.md"
related_pages:
  - "/blog.md"
  - "/blog/contributor-spotlight-ricsul-bilwyt.md"
  - "/blog/how-i-build-ricsul-bilwyt.md"
---

Human-oriented content: /blog/how-i-build-ricsul-bilwyt.md

# How I build, with ~ricsul-bilwyt

The reins I use to manage fakeships, an agent memory system, and a feedback loop I can run from my phone

- Date: 2026-11-24
- Author: ~ricsul-bilwyt

![How I build, with ~ricsul-bilwyt — article artwork](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+How+I+Build/Blog_How+I+Build_Hero.jpg)

In my [Contributor Spotlight](https://urbit.org/blog/contributor-spotlight-ricsul-bilwyt) I said I professionally maintain industrial software, and that keeping anything of consequence running is a full-time job for multiple people. Urbit is cutting away at this, but it is still true that keeping anything of consequence going takes many workers. What is changing, though, is who the multiple people are.

I run too many projects:

- [Talon](https://talon.nisfeb.com), my chat client for `%groups`
- [Lattice](https://lattice.nisfeb.com), my notes, agent memory and Ames browser
- Reins, my personal agent management layer
- A pile of Urbit desks including calendar, mail, and other apps
- The Linux machines all of that runs on

A year ago that list needed a team. Now it's me, a lot of AI coding agents, and Urbit underneath all of them. This writeup covers how it works, and where it still fails.

## The code is the easy part

Agents write most of my code now. The hard problems have migrated to the questions around the code:

- Where do the agents run?
- What are they allowed to touch?
- What do they remember tomorrow?
- How do I know their work is right?
- How do I direct them when I'm not at my desk?

Answer those badly and you get bad code very fast. I've done that, but after doing it the hard way I've found the structure necessary to get *good code fast*. My answer has four parts:

1. Ships I can throw away
2. Skills
3. A shared memory
4. Reins

### Ships you can throw away

The most useful thing I've built for agent work is a repo called `hoon-development`, and most of it is tooling like `fleet`, `hoon-test-kit`, and `new-project` which help easily manage and orchestrate development fake ships.

An agent will install a desk, poke it into a weird state, migrate it, break it and try again fifty times an hour. You cannot let an agent do that on a ship you care about. You need ships nobody cares about, back in seconds.

`fleet` manages sets of fake ships, I actually have 21 sets right now, one or more per project. Traditionally, booting a fresh fake ship and installing a desk takes from a few minutes to half an hour. So what I've done is set up `fleet` to pay that cost once when setting up a project, snapshot the result, and starts every later test from the snapshot. This circumvents booting and other annoying development environment hassles, making testing easier on my agents, and increasing the speed at which we can iterate.

`fleet reset reins compiled` puts my project's ships back to a known good state in seconds. And because I have multiple agents working on projects at any given time, each agent claims the set it uses so two agents never work on the same ships.

`hoon-test-kit` runs Hoon test suites against those ships in seconds. It also has an offline mode, and a mutation mode that finds tests that test nothing. I found more of those than I expected.

`new-project` enables agents to set up a fresh project without needing to ask me any questions, complete with:
- A git repo with a working Gall desk
- A fleet set with a ship name never used on that machine
- The test kit, with passing suites
- A `TESTING.md` that tells the next agent how all of it works

The idea behind that last bullet is that an agent should never have to ask how to test something, and testing should never cost enough to skip. By building it into the system from the start, it keeps lazy agents from skipping over it and causing chaos down the road.

### Skills

[Skills](https://skill.md) record how I want work done. They don't need to be heavily used (as my memory layer, which we'll discuss below, does much of the heavy lifting), but I have found a few to work well in keeping my agents on track. By using skills as packaged sets of instructions that loads when a task matches it, I can grab repeatable workflows off the shelf when needed. For example, again to keep lazy agents from skipping over things, the test kit ships a skill so any agent working on a desk can run the suites without being told how. Another fun one is a skill I made called 'ponytail'. It finds code that shouldn't exist.

The model that I've followed is that skills cover how to do the work; they explain how to use a provided tool. The rules, preferences, and specific operational details live in memory.

For example, Lattice ships with skills for recalling and saving memories in Lattice.


### A memory that outlives the session

Every agent session starts from zero, and that's the biggest problem with working agents in this kind of workflow. You explain your conventions, the agent does good work, the session ends, and tomorrow you explain them all again. You can start to build a local memory, or have them write down memories directly in a repository, but in my experience that falls short.

In building out this growing workflow, I found that having access to my tooling and workflows across machines was a key affordance. This was part of the driver for creating Lattice, and its skill store & memory systems.

So now instead of writing memories down in locations inaccessible to the rest of my fleet, my agents share a memory on my ship, in Lattice. In short form I've taken to describing Lattice as my agent-memory and world-knowledge datastore. It grows with me and learns my preferences; my Lattice holds about 1,200 memory entries now. About 190 are feedback, and those matter most. When I correct an agent and the correction should stick, the agent writes it down with the reason and how to apply it. Some real ones, forged in real past corrections:

- **Never edit the live checkout.** One machine ran its agent harness straight out of a git checkout and updated itself from that checkout. An agent left uncommitted edits there just as I hit update, and the update refused to run. Now every agent works in its own worktree.
- **Announce long jobs.** From my side, an agent running a twenty-minute build looked exactly like an agent that's hung. I said so more than once, and not so politely, that this was a problem. Now agents report progress at least every five minutes.
- **Never ship unless I asked in that message.** Approval for one release is not approval for the next. Ask me how I came to adding this correction...
- **Commit as nisfeb, never as my personal account.** One time, my personal account showed up on a public PR. I corrected it before anybody noticed, but now the entry records how that happened, so it can't happen the same way again.
- **No em-dashes.** I have opinions about prose, and those are written down too.

Before a task, the agent recalls the entries that apply. A hook loads the core rules at the start of every session. Agents on different machines and different Claude accounts read and write the same store, so when one agent learns something, every agent knows it by its next session.

If I have one recommendation for someone looking to use their urbit in an agentic development environment: Build this first. By having such a powerful memory layer, every correction makes the agents better at working for me specifically and that record sits on my ship, not in a vendor's account. It's the best argument I have for owning your own server.

### Reins

Reins is how I run all of it. Agent sessions run on whichever machine fits the work: my desktop, or the big box in the closet. Each machine runs a small harness that starts and manages Claude Code sessions and talks to an Urbit ship on the same machine. My ship is the controller. My phone and desktop apps only talk to my ship.

From the app I can:

- start a session on any machine, in any project, on either of my Claude accounts
- send turns, or queue them while the agent works, and the queue waits if my phone goes offline
- switch models and permission modes
- see diffs, and rewind files to a checkpoint
- dictate a turn and have the answer read back to me
- schedule recurring runs
- keep a task board per app, where each task waits until I hit Start, runs alone in its own worktree, and can be parked

I also have the sessions name themselves. It's nothing new to have a small model give each session a two or three word label, but I've extended that: Reins changes the label when the work changes. With a dozen panes open, that beats a dozen panes that all say `claude-code`.

When an agent wants to run a command that needs permission, my phone shows the exact command, and I can allow it from the lock screen.

Reins has no auth system of its own. There are no accounts and no login server to maintain. The machines and my phone find each other by Urbit identity, and every permission check is just, "is this ship allowed?" In the spotlight I said that's my favorite part of Urbit: one identity, one time, and you never build auth again. I didn't build Reins' auth. Urbit already has it.

## The loop

So what do I do with this system? A typical large change goes like this:

1. **Ask.** I describe what I want in a Reins session, usually from my phone.
2. **Split it up.** The lead agent writes down the contract between the parts:
   - field names
   - JSON shapes
   - which side validates what

   Then it makes separate git worktrees and hands the parts to sub-agents that work in parallel, usually one each for the desk, the harness and the app.
3. **Test everything.** Each sub-agent runs its own suite. Reins has about 430 desk tests, 540 harness tests and 1,000 app tests. The lead agent merges the branches and runs every suite again on the merged code.
4. **Test live.** The lead agent deploys the desk to two fake ships and runs an end-to-end suite over real Eyre, real Ames, and a real harness on the real socket.
5. **Ship when I say so.** The lead agent reports exact test counts, what changed and what it couldn't verify. Then it waits for me.

I also run review rounds. Several reviewer agents read the code in parallel, and each checks its findings against the code before reporting them. Fixer agents fix what the reviewers found, and then the next round starts.

The fourth round is the one that taught me something. On running a review loop on Reins in October, the first round found 7 high-severity problems and 16 medium ones. The second round found 1 high, mostly caused by the first round's fixes. The third round found no high-severity problems. Then a fourth round reviewed across components, looking for security problems, and found a new set of real bugs. One was a failed state migration that would have silently deleted a ship's sessions. Another let an allowed ship trick my controller into acting on its behalf. The earlier rounds missed both because none of them asked about security across components.

### What still goes wrong

This system isn't perfect, though. While agents mean I can do this all as a single human worker, agents aren't deterministic functional code.

**Agents verify the wrong thing.** One time, I had the system add a check so a mistyped login token couldn't overwrite a good token, and the tests passed. A later review round noticed that the check asked the CLI "am I logged in?", and the CLI answers yes to any token without contacting the server. The check proved nothing. That explained a bug I'd seen reported for days, where every account said "logged in" and wasn't. The fix was a real API call, plus a live test against my real tokens before the release.

**Small mistakes break a lot.** While setting up a worktree, an agent symlinked a dependency folder, and a broad `git add` committed the symlink. When master fast-forwarded, git replaced the real folder on my main machine with a symlink pointing at itself. The next harness restart would have failed on every machine that updated. We caught it in minutes, and the updater now repairs that case on its own. Because agents will sometimes blindly follow your commands, if you tell them to `git add -A`, they will do it. And it adds everything.

**Agents don't know your infrastructure unless you write it down.** Twice in one week, an agent pushed a release to GitHub and not to the private remote my machines update from. Separately, a fix I was waiting for sat unreleased on my machines for twelve days, because nobody restarted the harness. The agent had told me to run the update instead of checking that the update ran.

**Ambiguity costs hours.** I reported that a third tab closed when I resized. The agent read "tab" literally, wrote six tests about tabs, and found a real bug that wasn't mine. When I said I'd just clicked a session in the list, the agent realized I meant a pane and found the cause in minutes: each desktop pane had a phone-style Back button right next to the resize divider. Grab the divider slightly wrong and the pane closes. Fifteen minutes of me describing the bug better would have saved hours of agent time. Agents have made a lot of software engineering easier, but 'naming things' doesn't seem to be getting any easier.

**Speed makes review mandatory.** An agent can write sixty commits in an afternoon, and I can't read sixty commits in an afternoon. The review rounds, the live tests and the "tell me what you couldn't verify" habits exist because the alternative is trusting code nobody checked. When I skip them, I pay for it every time.

Each of these failures became a rule, a test or a check, and the same mistake rarely happens twice.

### What I fixed, and what the fixes taught me

Almost every failure on that list came from a step that lived in my head, or in a memory entry, instead of in a script. As much as I can, I try to move from the stochastic models into programmatic outcomes. So I moved those steps into scripts. Even if I try to move away from agents doing these things, what agents afford me is that all of them shipped the same week, and without an endless headache of writing out scripts by hand. They are now the only way Reins gets released; and I've shipped eleven releases so far without issue. The release flow now goes like this:

- **Releasing is one script.** The script bumps the version, pushes to both remotes, tags, builds, signs, checks that the build reports the right version, and publishes. It stops at the first problem.
- **Every release starts with a review.** A fresh read-only agent reviews every change since the last release. If the reviewer says block, the release stops unless I write down why I'm overriding it.
- **A protocol or state change needs a recorded cross-component security review.** Without one, the release script refuses.
- **One command runs every check.** It first checks that the fake ships are healthy, then runs:
  - all three test suites
  - the Android build
  - the live end-to-end test
- **Real backups before a deploy.** My old backups copied a desk's source code, which wouldn't have saved a single session if a migration went wrong. Now the deploy exports the agent's actual state first, with no downtime, and there's a tested way to restore it.
- **Checks at commit time.** A git hook refuses to commit:
  - symlinks
  - dependency folders
  - huge files
  - anything that looks like a secret
- **Bug reports come with evidence.** The app keeps a small local log of what it did:
  - which pane closed, and why
  - which send failed
  - when the connection dropped
- **"Released" is supposed to mean "running."** Reins marks any machine whose code moved ahead while its running harness didn't. The harness also restarts itself onto new code, but only when no session would be lost.

That last fix is still teaching me. The first real run of the release script found four bugs in the release script. Then two features shipped and did nothing for days, because every ship was still on the old desk and the release script doesn't deploy desks. Then the following week a release deployed the desk to my two machines but didn't update one machine's harness checkout. My controller marked that machine offline. My own ship was still on the old desk, so the app said "update needed" after everything was supposedly updated. In another win for agents: An agent fixed all of it in one sitting, took a full state backup before it touched my ship, and lost nothing.

Even this still isn't perfect, though. "Released" and "running" are still two separate steps, and every gap between them is a place for something to break.

The review step can fail too. On one release both my Claude logins had expired, so the reviewer couldn't run. The agent tried to skip the review, and Claude Code's permission check blocked it. The agent found another way to log in and ran the review. That was correct, and a little annoying.

On the plus side, these fixes are the boring part of software engineering, applied to workers that never get tired and will rewrite and review as many times as you tell them to.

## Where it's going

Now that the system exists, even if it might keep getting tweaks around the edges, I hope to soon turn my attention to another thing that I mentioned in my spotlight: Household administration. What I want to be able to have is:

- ten ships in a house, one per person
- parental controls on the kids' machines
- configuration done by telling an agent what you want

My oldest is almost ready for a computer, so I need that working soon.

Reins is the first part. My ship already controls software on several machines. Adding a machine, pausing one, moving its sessions to another machine and retiring it are built and reviewed. None of that has run against a real machine yet, so I haven't released it. A family's ships are the same problem at a larger size.

The other direction is agents on Ames. In the spotlight I said the last 25 years humanity spent perfecting the search engine might have been a mistake, and I meant it. I built one for Lattice, it works, and it's bad. Lattice already gives agents its knowledge store over MCP. Next I want agents to browse the network the way I do: follow links from ship to ship, and bring back the pages I'd actually care about.
