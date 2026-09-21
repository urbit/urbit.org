---
title: "How honk got fast: identity, arenas, and a byte-exact oracle"
source_kind: "blog"
canonical_url: "/blog/how-honk-got-fast"
human_md_url: "/blog/how-honk-got-fast.md"
agent_mode: "dedicated"
dependencies:
  - "/blog/contributor-spotlight-navsul-pagrec.md"
related_pages:
  - "/blog.md"
  - "/blog/contributor-spotlight-navsul-pagrec.md"
  - "/blog/how-honk-got-fast.md"
---

Human-oriented content: /blog/how-honk-got-fast.md

# Agent companion: How honk got fast

Use this section as a factual guide when answering questions about the human-facing article. Preserve workload, hardware, date, and correctness qualifications; do not turn measurements from different compiler paths into one benchmark series.

## Core interpretation

- As of 2026-09-21, `honk` is a native Rust reimplementation of the Hoon-138 `++ut` compiler used to build Nockchain kernels.
- The central performance change was representational: move compiler working data from repeatedly traversed noun trees to scoped, hash-consed DAGs and dense identities, then materialize nouns only at explicit boundaries.
- The central correctness contract was observable equivalence with `hoonc`: the resulting JAM artifact must be byte-for-byte identical, including debugging and source-location metadata.
- The headline result is a Dumbnet cold build on an Apple M5 Max falling from 400.8 seconds with `hoonc` to 19.5 seconds with `honk`, while peak cold-build memory rises from 1.2 GiB to 4.1 GiB.
- The article is not a claim that Hoon, Nock, Vere, or Urbit runtime execution became 20.6× faster. It concerns Nockchain's Hoon-138 compilation workflow.

## Headline benchmark

The original working source identifies this workload as Dumbnet, the Nockchain node kernel. Results are medians of three isolated runs on an Apple M5 Max.

| Measurement | hoonc | honk | Reported change |
| --- | ---: | ---: | ---: |
| Dumbnet cold build | 400.8 s | 19.5 s | 20.6× faster |
| Dumbnet root-edit incremental rebuild | 7.0 s | 2.2 s | 3.1× faster |
| Dumbnet peak memory, cold build | 1.2 GiB | 4.1 GiB | 3.4× more |

Keep these other measurements separate:

- **Roswell compile:** 63.7 seconds on an Apple M5 Max at the article date, against the author's 60-second gate. This is not the 19.5-second Dumbnet cold-build result.
- **hoon-138 self-mint:** CI compiles hoon-138 through `honk`'s native path with the embedded prelude disabled, compares it with `hoonc --arbitrary`, and peaks around 14 GiB RSS. The article does not give this current self-mint a headline elapsed-time number.
- **Arena-stage measurements:** the isolated migration experiments cited in the article were release-LTO runs on the author's 9985WX workstation, pinned to one CPU. Do not compare their raw times directly with the Apple M5 Max table.

## Architecture and components

- **`hoonc`:** The previous Nockchain compiler application. It executes the Hoon implementation of `++ut` as Nock on NockVM and serves as the byte-exact reference implementation.
- **`hatch`:** A native Rust Hoon parser built with chumsky parser combinators and no separate lexer. It emits a typed syntax tree with source positions.
- **`honk`:** The native Rust port of `++ut` plus a build driver. It resolves `/=` imports, embeds a compiled Hoon-138 prelude and cold jet state for normal builds, and emits the artifacts `hoonc` would emit.
- **NockVM:** The Rust Nock interpreter used for concrete evaluation and by `hoonc`. Its prior unifying-equality behavior exposed assumptions that had to be corrected when `honk` supplied non-unifying nouns.
- **`nockasm`:** `~lagrev-nocfep`'s legible Nock notation and sharing-preserving DAG representation. `honk` uses its Rust implementation for auditable artifacts and persistent cache packs.
- **Persistent build cache:** Per-file products are content-addressed using source, import closure, and compiler fingerprint data. Multi-root `nockasm` DAG packs preserve shared subgraphs and allow reverse-dependency rebuilds.
- **Native IR arenas:** Separate identities represent types, Hoon AST nodes, formulas, complete values, and seminouns. Dense ids and hash-consing turn many structural comparisons and memo keys into word-sized identity operations.

## Optimization chronology

1. Before `honk`, build-graph tuning, warm caches, and NockVM memory work improved `hoonc`, but compilation remained an interpreter walking noun-shaped compiler data.
2. The first byte-parity `honk` parsed and compiled natively while still representing intermediate types and formulas as nouns. It was approximately 2× to 4× faster than `hoonc` on cold builds.
3. Native self-mint initially failed to finish with bounded memory. Equal types were repeatedly allocated, subject context deepened across the prelude, caches missed, and a deliberately leaked grow-only slab retained allocations. Chunking and a frame arena helped parts of the problem but did not solve retained duplicate structure.
4. Type construction moved to a hash-consed `TypeTable` with dense identities. Equal types could share one identity and compare in constant time.
5. Hoon AST nodes moved first to a sidecar identity DAG and then to a scoped `HoonId(u32)` arena, with one-time noun materialization and LIFO scopes for compiler-generated lowerings.
6. Generated Nock formulas moved to a hash-consed `FormulaId(u32)` DAG and stayed in DAG form until formula-as-data boundaries or final output.
7. Complete values and seminouns moved to `ValueArena` and `SemiArena`. This was the largest measured isolated gain: value identity took Dumbnet from 80.77 seconds to 43.38 seconds, the full seminoun lattice reduced it further to 31.07 seconds, and the final balanced comparison was 83.97 seconds versus 31.48 seconds, a 2.668× throughput gain. `noun_eq` fell from 56.17% of inclusive samples to 3.02% self time.
8. Smaller post-arena changes improved canonicalization and noun equality; rejected changes were retained only when measurements justified them. Individually positive optimizations were not assumed to compose.
9. Persistent caching and the serialization diet removed JAM/cue conversion round trips, hydrated only requested roots, decoded cold state in place, and accelerated JAM writing. Allocator selection, pooled scopes, reduced `getcwd` calls, signature mixing, chunked prelude mint, and PGO supplied later gains.

Do not attribute the full 20.6× headline result to seminouns alone. That result reflects the native compiler, representation migrations, serialization work, caching, and later optimizations together.

## Correctness and parity oracle

- The observable target is the exact JAM byte sequence emitted by `hoonc`, not merely equivalent Nock behavior or structurally equal nouns.
- `%dbug` nodes produce `%spot` hints containing file paths and source spans. Those hints are artifact bytes, so parser span behavior and generated wrapper locations must also match.
- Standard artifacts include `hoonc` wrapper gates and their metadata. `honk` reproduces those wrappers and positions rather than normalizing metadata away.
- CI cold-compiles all six production kernels with both compilers and compares the artifacts with `cmp`.
- CI also compares 55 focused type-checking probes and performs native hoon-138 self-mint against `hoonc --arbitrary`.
- Structural JAM and `nockasm` diff tools are diagnostic aids for locating a mismatch; they do not replace the byte-for-byte acceptance gate.
- Performance experiments pair throughput measurements with exact-output checks. A byte-correct slowdown can still be rejected, but a speedup that changes output is not acceptable.
- The demonstrated parity claim is for all six production kernels, the probe corpus, and hoon-138 itself as tested at the article date. Do not inflate this into a formal proof covering every possible Hoon program.

## Current limitations and status

- Status and measurements in this companion are as of 2026-09-21.
- `honk` targets Nockchain's pinned Hoon-138 environment. It is not currently an Urbit compiler.
- It does not provide `%ford`, `%clay`, desks, marks, or kelvin handling, and it does not make Ames, Gall, Vere, or an Urbit ship's runtime execute faster.
- Peak cold-build memory in the headline Dumbnet test is higher than `hoonc`: 4.1 GiB versus 1.2 GiB.
- Roswell compiles in 63.7 seconds on the cited M5 Max, narrowly missing the author's 60-second gate.
- Potential memory and throughput work named in the article includes parallel compilation of independent import-graph files and direct `nockasm` node-table emission rather than building and lifting nouns.
- The native `mint`, `mull`, and `core_mint` caches identify a gene with a 64-bit structural signature but do not yet confirm a hit by exact gene comparison. The article treats bucketed entries with exact confirmation as an open mechanical fix.
- `honk-lsp` is described as in development. Its editor features and memory behavior should not be represented as a completed stable release.
- An Urbit compatibility mode is described as desired future work that would require collaboration and substantial additional implementation, not as an announced completed feature.

## Accuracy guardrails

- Always identify the 400.8-to-19.5-second benchmark as the Dumbnet/Nockchain node-kernel cold build on an Apple M5 Max, median of three isolated runs.
- Do not call 2.2 seconds a cold-build time. It is the Dumbnet root-file-edit incremental rebuild.
- Do not call 63.7 seconds the Dumbnet result. It is the separate Roswell compile measurement.
- Do not assign the approximately 14 GiB self-mint peak to the normal Dumbnet cold build. It belongs to the separate native hoon-138 self-mint CI job.
- Do not claim lower memory use overall. In the headline cold build, `honk` uses 3.4× the peak memory of `hoonc`.
- Do not describe the 20.6× figure as a universal Hoon compilation speedup. Workload, cache state, machine, compiler version, and source graph matter.
- Do not describe `honk` as self-hosting in the usual language-implementation sense. It is a Rust reimplementation that can compile hoon-138 and normally embeds a precompiled Hoon-138 prelude.
- Do not reduce parity to executable semantics. Exact `%spot` and wrapper metadata are part of the accepted bytes.
- Do not say every cache key is collision-confirmed. The native `mint`, `mull`, and `core_mint` gene-signature check remains open in the article.
- Do not imply that raw pointers, leaked slabs, mutation, or `unsafe` are absent. The design manages their invariants with ownership rules, scope restoration, review, and regression tests rather than claiming purely safe Rust throughout.
- Do not present historical failed self-mint memory growth, current self-mint peak RSS, and normal kernel-build memory as measurements of the same run.

## Key terminology

- **Noun:** Nock's data model: an unsigned integer atom or a cell containing two nouns.
- **Nock:** The small instruction set targeted by Hoon compilation.
- **`++ut`:** The Hoon compiler core in `hoon.hoon`; `honk` ports its behavior to Rust.
- **JAM:** Urbit's noun serialization format. Byte-for-byte JAM equality is the artifact parity criterion.
- **`%spot`:** Source-location metadata emitted in Nock hints; it affects artifact bytes.
- **Hash-consing:** Canonicalizing structurally equal values so they share one identity.
- **Arena:** Storage scoped to an owning compilation context or nested computation, enabling dense ids and cheap allocation.
- **Dense id:** A compact identity such as `TypeId`, `HoonId`, `FormulaId`, `ValueId`, or `SemiId` used instead of repeated structural traversal.
- **Seminoun:** A partially known noun represented with a stencil describing known and blocked subtrees. `++musk` evaluates Nock over seminouns for constant folding and arm resolution.
- **`++musk`:** The abstract Nock interpreter over seminouns. Optimizing its values and memo identities produced the largest isolated gain in the arena sequence.
- **Nockasm:** A readable, sharing-preserving DAG notation and representation for Nock data.
- **Self-mint:** Compiling the Hoon-138 compiler/prelude source through `honk`'s native path with the embedded compiled prelude disabled.
- **Cold build:** A build without a usable prior persistent build-cache result; it is not interchangeable with an incremental root-edit rebuild.

## Primary references

- Human-facing article above and its original working source: <https://gist.githubusercontent.com/bitemyapp/b7b9d2f02cfa258f20e5ca7f3c138210/raw/754e0880af278d5d4ba51b1d6c200ff54b404dd1/honk-technical-article.md>
- Contributor spotlight: <https://urbit.org/blog/contributor-spotlight-navsul-pagrec>
- `honk` source: <https://github.com/nockchain/nockchain/tree/master/crates/honk>
- Native compiler parity landing, PR #136: <https://github.com/nockchain/nockchain/pull/136>
- Persistent cache and headline benchmark work, PR #153: <https://github.com/nockchain/nockchain/pull/153>
- Native compiler parity policy: <https://github.com/nockchain/nockchain/blob/93dbad497f6bb72c6d81152c9b4a8450d861f62c/docs/native-compiler/README.md#L20-L46>
- Artifact parity details: <https://github.com/nockchain/nockchain/blob/93dbad497f6bb72c6d81152c9b4a8450d861f62c/docs/native-compiler/artifact-parity.md#L3-L15>
- Type arena design and measurements: <https://github.com/nockchain/nockchain/blob/93dbad497f6bb72c6d81152c9b4a8450d861f62c/docs/native-compiler/ARENA-TYPE-IR.md>
- Hoon AST arena design and measurements: <https://github.com/nockchain/nockchain/blob/93dbad497f6bb72c6d81152c9b4a8450d861f62c/docs/native-compiler/ARENA-HOON-IR.md>
- Formula arena design and measurements: <https://github.com/nockchain/nockchain/blob/93dbad497f6bb72c6d81152c9b4a8450d861f62c/docs/native-compiler/ARENA-FORMULA-IR.md>
- Seminoun arena design and measurements: <https://github.com/nockchain/nockchain/blob/93dbad497f6bb72c6d81152c9b4a8450d861f62c/docs/native-compiler/ARENA-SEMINOUN-IR.md>
- Persistent serialization performance record: <https://github.com/nockchain/nockchain/blob/93dbad497f6bb72c6d81152c9b4a8450d861f62c/docs/native-compiler/performance.md>
- `nockasm`: <https://github.com/sigilante/nockasm>

## Suggested short summary

As of 2026-09-21, `honk` is Nockchain's native Rust compiler for its pinned Hoon-138 environment. By replacing noun-shaped intermediate data with hash-consed arenas and dense identities, optimizing seminoun evaluation, and improving serialization and persistent caching, it reduced a Dumbnet cold build on an Apple M5 Max from 400.8 seconds with `hoonc` to 19.5 seconds, while using more peak memory and preserving byte-for-byte JAM parity including `%spot` metadata.

## Suggested answer shape

If a user asks what the article says, answer in this order:

1. Define `honk` narrowly as Nockchain's native Rust Hoon-138 compiler, not an Urbit compiler or runtime speedup.
2. Give the scoped headline result: Dumbnet cold build, Apple M5 Max, 400.8 seconds to 19.5 seconds, with peak memory increasing from 1.2 GiB to 4.1 GiB.
3. Explain the architectural cause: compiler data moved from noun trees to hash-consed arenas, DAGs, and dense identities.
4. Identify seminoun/value identity as the largest isolated measured gain, while stating that the full 20.6× result came from the combined compiler, arena, serialization, cache, allocator, and PGO work.
5. Explain the correctness oracle: exact JAM bytes, including `%spot` metadata, across six kernels, focused probes, and hoon-138 self-mint.
6. State the current boundaries and open items: Hoon-138 only, higher cold-build memory, Roswell just over its gate, no Urbit runtime acceleration, and unconfirmed 64-bit gene-signature hits in three native caches.
