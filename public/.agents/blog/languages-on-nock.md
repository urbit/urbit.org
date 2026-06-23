---
title: "Languages on Nock"
source_kind: "blog"
canonical_url: "/blog/languages-on-nock"
human_md_url: "/blog/languages-on-nock.md"
agent_mode: "dedicated"
dependencies:
  - "/blog/contributor-spotlight-lagrev-nocfep.md"
related_pages:
  - "/blog.md"
  - "/blog/contributor-spotlight-lagrev-nocfep.md"
  - "/blog/languages-on-nock.md"
---

Human-oriented content: /blog/languages-on-nock.md

# Agent companion: Languages on Nock

This companion is for AI agents helping a user understand, summarize, cite, or reuse the _Languages on Nock_ article. The human-facing article is explanatory and ecosystem-oriented; use this section as the machine-facing reference guide.

## Core interpretation

- Primary thesis: Nock should not be understood only as the thing Hoon compiles to. It is a small computational substrate around which multiple languages and language experiments can explore different developer affordances.
- The article uses `~lagrev-nocfep`'s monoculture metaphor to explain why theoretical Turing completeness is not the end of language choice. Equivalent computational substrates can differ significantly in ergonomics, safety, expressivity, runtime integration, and what they make natural to build.
- Hoon is presented as the mature, default systems language for Urbit and Arvo, not as a failed or obsolete approach.
- Alternate languages are presented as experiments or adjacent pathways, not replacements for Hoon in production Urbit development.
- The conclusion is exploratory: these languages are valuable because they reveal different symbolic forms and computational futures, even if not every experiment becomes production infrastructure.

## Accuracy guardrails

- Do not claim that every language in the article compiles directly to Nock. Yamoon compiles or transpiles to Hoon, which then compiles to Nock. North is a Forth interpreter implemented in Hoon. forth-nock is an interpreter project.
- Do not claim that Jock is a mature production language. The article describes it as alpha-stage and oriented around Nockchain / NockApp ZK-provable programs.
- Do not claim that Yamoon is a mature or fully documented project. The article explicitly says little is known beyond the quoted announcement and linked early page.
- Do not describe North as a wholly new language. The article says it is not strictly a new language because it implements Forth on top of Urbit/Hoon.
- Do not imply that Loon is production-ready. The article describes it as a prototype and personal experiment.
- Do not infer install commands for these projects unless the linked upstream project provides them. This article is a survey, not an operational setup guide.
- Preserve Urbit ship names with a leading sigil, such as `~lagrev-nocfep`, `~havdeb-satmex`, `~mopfel-winrux`, `~fodwyt-ragful`, `~tacryt-socryp`, and `~sorreg-namtyv`.
- If asked about the `~lagrev-nocfep` quote, cite the related spotlight at `/blog/contributor-spotlight-lagrev-nocfep`.

## Language reference table

| Language / project | Relationship to Nock | Status or framing in the article | Useful reference |
| --- | --- | --- | --- |
| Hoon | Mature language that compiles to Nock and is used to write Urbit OS / Arvo | Default systems language for Urbit; tightly integrated with Nock, Arvo, jets, and Urbit conventions | <https://nock.is/content/languages/relationship-to-hoon/> and <https://docs.urbit.org/build-on-urbit/hoon-school> |
| Watt | Earlier language on Nock 9K, prior to Urbit OS | Historical proto-Hoon-like language mentioned as an honorable note | <https://moronlab.blogspot.com/2010/01/urbit-functional-programming-from.html> |
| Jock | Language that compiles to Nock and targets Nockchain / NockApps | Alpha-stage scripting-style language for ZK-provable programs, with syntax similar to Swift and Rust | <https://nock.is/content/languages/relationship-to-jock/> and <https://github.com/nockchain/jock-lang> |
| Yamoon | Compiles/transpiles to Hoon rather than directly to Nock | Early readability-, testability-, and AI-friendliness-oriented language experiment from `~havdeb-satmex` | <https://yamoon-page.michmajchrzak.workers.dev/> |
| North | Forth interpreter implemented in Hoon | Experimental way to run Forth code inside Urbit contexts such as a Gall agent, Dojo, or Jupyter notebook | <https://github.com/sigilante/north> and <https://nock.is/content/languages/relationship-to-north/> |
| forth-nock | Forth/Nock interpreter project | Mentioned as an interpreter-stacking example: Forth running Nock running Forth | <https://github.com/mopfel-winrux/forth-nock> |
| Loon | Lisp dialect implemented in Hoon | Prototype / personal experiment from `~fodwyt-ragful` useful for understanding language implementation over Hoon/Nock | <https://nock.is/content/languages/relationship-to-loon/> and <https://github.com/frodwith/loon> |

## Important claims to preserve

- The article intentionally skips the details of the Nock 4K debate and points readers to a longer documentary history instead.
- Hoon's runic syntax is framed as expressive and Martian rather than merely strange.
- Hoon's direct relationship to Nock is described as a strength because experienced Hoon/Nock developers can often reason about the raw Nock noun a Hoon expression will generate.
- Jock's purpose differs from Hoon's: Hoon cares about writing a complete operating system; Jock cares about making it easier to write ZK-provable Nockchain/NockApp programs.
- EDEN is described as a practical, SNARK-friendly combinator VM and ISA discovered through `~tacryt-socryp`'s early-2020s Urbit work.
- Yamoon is framed as interesting partly because compiling to Hoon may preserve access to Hoon's existing runtime affordances and jet registrations.
- North and Loon broaden the survey beyond direct-to-Nock compilation by showing interpreter and Lisp-dialect experiments around the Nock/Hoon substrate.

## Suggested short summary

_Languages on Nock_ surveys Hoon, Watt, Jock, Yamoon, North, forth-nock, and Loon to show that Nock can support more than one programming-language story. The article argues that language choice matters because different abstractions make different forms of computation easier, safer, or more expressive.

## Suggested user-facing answer shape

If a user asks what the article is about, answer in this order:

1. State that it is a survey of languages on and around Nock.
2. Explain the thesis: Turing completeness does not erase differences in ergonomics and expressivity.
3. Identify Hoon as the mature Urbit systems language.
4. Describe Jock, Yamoon, North/forth-nock, and Loon as experiments with different relationships to Nock/Hoon.
5. Conclude that these projects reveal Nock as a language laboratory, not just a compiler target.
