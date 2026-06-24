# MCP Desk Workflow

Use this reference when a Hoon experiment needs a real Urbit desk context and an MCP-enabled ship is already available.

This is a side-effecting development workflow. Keep source-of-truth files in a normal repository and treat mounted pier files as generated copies.

## Required inputs

- MCP ship/tool prefix.
- Approved disposable pier path.
- Repo-side desk source directory.
- Target scratch desk name.

## Process

### 1. Keep source in the repo

Create a repo-side desk tree such as:

```text
desk/
  app/
  gen/
  lib/
  mar/
  sur/
  tests/
```

Do not make the pier mount the only copy of source code.

### 2. Create and mount the desk

Use the available MCP tools for the target ship to create and mount the scratch desk.

The exact tool names differ by MCP server configuration, but the operations should be equivalent to:

```text
new-desk desk=<desk>
mount-desk desk=<desk>
```

### 3. Copy files into the mounted desk

Copy from the repo-side desk tree into the mounted desk directory under the disposable pier.

Create missing directories first. If a mounted file is edited during debugging, copy the final version back to the repo-side source before treating it as complete.

### 4. Merge `%base` only when needed

If tests import system files, merge `%base` into the scratch desk and prefer local scratch-desk files on conflict.

This is heavier than a default scratch desk. Do it on one test ship at a time and wait for the ship to settle before committing or testing.

### 5. Commit for build feedback

After every copy or merge, commit the scratch desk with the MCP tool or equivalent Clay workflow.

Prefer commit feedback as the first build signal because targeted single-file build tools may return terse errors.

### 6. Run targeted tests

Start with a tiny smoke test, then run protocol- or app-specific tests.

Record:

- the exact desk name
- files copied
- commit result
- test command or MCP operation
- pass/fail output
- any remaining blocker

## Completion checklist

- [ ] Source-of-truth files live outside the pier.
- [ ] Mounted desk was committed after each copy.
- [ ] Smoke tests pass before larger tests.
- [ ] `%base` merge, if used, was deliberate and documented.
- [ ] Final production tests do not require MCP connectivity unless MCP is part of the product.
