---
title: Obelisk
app: "%obelisk"
reference_type: app-overview
app_metadata_reference: "README.md"
clearweb_url: null
distribution:
  availability: manual
  source: "repo desk copy"
  desk: "%obelisk"
  install_command: "|install our %obelisk"
  notes: "Mount %obelisk, copy the repo's desk/ contents into the mounted desk, then commit and install."
github_repo: "https://github.com/jackfoxy/obelisk"
tlon_group:
  id: "~pitlyn-mintul-nomryg-nilref/obelisk"
  url: null
related_references:
  - "urql/README.md"
  - "urql/examples.md"
  - "testing.md"
  - "../hawk/README.md"
dependencies:
  - app: "%hawk"
    role: "optional ui"
    reference: "../hawk/README.md"
---

# Obelisk

## When to use this reference

Use this reference when you need the app-level picture of `%obelisk`: what it is, how it is distributed today, how to install it, and which deeper references to read next.

## What it is

Obelisk is a relational database engine for Urbit.

Key properties called out by the upstream repo:

- time-traveling database state
- atomic scripts
- set-based query results
- no `NULL` values
- a SQL-derived query language called `urQL`

## Distribution and installation

The current upstream README describes `%obelisk` as an alpha release that requires manual installation from the repository.

Typical flow:

```dojo
|new-desk %obelisk
|mount %obelisk
```

Copy the desk contents from the repo into the mounted desk, then:

```dojo
|commit %obelisk
|install our %obelisk
```

The upstream README notes that a future beta release is planned to move onto standard Urbit OTA distribution, but that is not yet the current install path.

## `%hawk` dependency for UI

Obelisk can be used directly as an agent, but its upstream docs also describe an optional Hawk-based UI.

For that workflow:

- install `%hawk` from `~dister-migrev-dolseg`
- create an Obelisk Hawk file beside the Hawk manual in your namespace
- use the Obelisk Hawk template from `https://hawk.computer/~~/templates/` or `templates/hawk.txt` in the Obelisk repo

This is why `%hawk` is listed as an optional UI dependency in the frontmatter.

## Read these related references next

- [Obelisk urQL](urql/README.md) for the query language itself
- [Obelisk urQL examples](urql/examples.md) for working scripts
- [Obelisk testing](testing.md) for the test helper conventions
- [Hawk](../hawk/README.md) if you are using the optional Obelisk UI

## Gotchas

- The current release path is still manual, not ordinary OTA installation.
- The upstream README warns that current and previous alpha releases are not compatible.
- If you want a UI instead of raw scripts and pokes, you should plan around the optional Hawk integration.

## Sources

- `https://github.com/jackfoxy/obelisk`
- upstream repository README, FAQ, and desk documentation
