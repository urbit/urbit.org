# urbit.org Cloudflare Worker

This Worker sits in front of the Vercel-hosted `urbit.org` site.

It does not build or host the Next.js application. It proxies requests to the Vercel origin and sends server-side Umami events for bot and AI-agent requests that would otherwise never execute the browser tracker.

## What this Worker does

- proxies requests to the existing Vercel-hosted site
- preserves the incoming path and query string
- returns upstream redirects directly to the client
- emits best-effort Umami custom events for:
  - machine-facing entrypoints such as `/llms.txt`, `/agents.md`, `/content-index.json`, `/for-agents`, and `/.agents/*`
  - recognized bot or crawler-like requests to normal content pages
- keeps `path_requested` and `path_canonical` separate so you can study which surface an agent chose

## Architecture

```txt
visitor / bot / AI agent
  ↓
Cloudflare DNS / proxied hostname
  ↓
Cloudflare Worker route
  ↓
Vercel deployment
  ↓
best-effort Umami event send
```

## Analytics behavior

Worker-sent events use these coarse event names:

- `ai-entrypoint-hit`
- `bot-page-hit`

They include request properties such as:

- `path_requested`
- `path_canonical`
- `method`
- `status`
- `ua_raw`
- `ua_label`
- `bot_category`
- `capture_reason`
- `source=cloudflare-worker`

The Worker deliberately does **not**:

- dedupe repeated matching requests
- store full query-string values
- store full raw external referer URLs
- add a second storage system in v1

## Production setup for `urbit.org`

1. Confirm the site is deployed on Vercel.
2. Add both `urbit.org` and `www.urbit.org` to the Vercel project.
3. In Vercel, inspect the required DNS records for those domains.
4. In Cloudflare DNS, create the required records and keep them proxied/orange-clouded.
5. In Cloudflare Workers & Pages, create a Worker from Git.
6. Select the `urbit.org` repository.
7. Set the Worker root directory to:

```txt
infra/cloudflare-worker
```

8. Set the production branch to the intended deployment branch.
9. Use deploy command:

```txt
npx wrangler deploy
```

10. Leave build command empty, or use `npm run check` if you want type-checking during builds.
11. Confirm the Worker name in Cloudflare matches `wrangler.jsonc`:

```txt
urbit-org-edge-worker
```

12. Add Worker routes in the Cloudflare dashboard:

```txt
urbit.org/*
www.urbit.org/*
```

13. Leave `ORIGIN_URL` unset for normal production pass-through mode.
14. Set Worker vars in Cloudflare dashboard:

- `UMAMI_API_URL`
- `UMAMI_WEBSITE_ID`

For production, `UMAMI_WEBSITE_ID` should be the **same existing `urbit.org` Umami website/property** already used by the browser tracker.

15. Set `DEBUG_RESPONSES=true` only during testing, then turn it back off.

## Personal/dev deployment setup

1. Fork or clone the `urbit.org` repo.
2. Deploy the fork to Vercel.
3. Use a Node version compatible with the site and worker toolchain. Node 22 is a safe default for personal Vercel builds when a newer runtime is needed.
4. Add a personal test domain or subdomain to the Vercel project, for example:

```txt
urbit-test.example.com
```

5. In Cloudflare DNS for the personal domain, add the Vercel-required record and keep it proxied.
6. In Cloudflare Workers & Pages, create a new Worker from Git.
7. Select the personal fork.
8. Set root directory:

```txt
infra/cloudflare-worker
```

9. If you do not want to edit `wrangler.jsonc`, create the Worker with the same name:

```txt
urbit-org-edge-worker
```

10. If you want a different Worker name, edit `wrangler.jsonc` in your fork.
11. Add a route for your test hostname:

```txt
urbit-test.example.com/*
```

12. Use one of these origin modes:

For best custom-domain fidelity:

```txt
Leave ORIGIN_URL unset.
Make sure your Cloudflare DNS for urbit-test.example.com points to Vercel.
Make sure urbit-test.example.com is added to the Vercel project.
```

For quick preview testing:

```txt
Set ORIGIN_URL=https://your-vercel-project.vercel.app
Route a Cloudflare-controlled hostname to the Worker.
Expect the origin to see the vercel.app host unless the app handles forwarded host headers.
```

13. Set Umami vars for the Worker. You may use either:

- the same Umami instance as the site, if permitted
- your own Umami instance / website ID

## Native Git integration notes

Cloudflare can connect a GitHub or GitLab repo to a Worker and deploy on push.

Typical setup path:

```txt
Workers & Pages
  → Create application
  → Import a repository
  → select repository
  → configure project
  → Save and Deploy
```

For an existing Worker, use:

```txt
Worker
  → Settings
  → Builds
  → Connect
```

## Vercel + Cloudflare reverse proxy caveat

Vercel discourages putting an external reverse proxy such as Cloudflare in front of a Vercel deployment because it can reduce Vercel Firewall/Bot Protection visibility, introduce additional latency, and create cache-management complexity.

This Worker intentionally uses that architecture because the project needs Cloudflare edge behavior in front of the site.

Do not add Worker-level caching until there is an explicit caching strategy. Vercel already manages its own edge cache, and a second cache layer can serve stale content if not purged carefully.

## Well-known paths

The Worker should not block, rewrite specially, or cache these validation paths:

```txt
/.well-known/acme-challenge/*
/.well-known/vercel/*
```

`/.well-known/llms.txt` is still treated as a normal compatibility AI entrypoint for analytics.

## Local development

```bash
cd infra/cloudflare-worker
npm install
cp .dev.vars.example .dev.vars
npm run dev
```

Then test:

```bash
curl -I http://localhost:8787/llms.txt
```

Local development usually uses `ORIGIN_URL` because pass-through mode depends on deployed Cloudflare DNS/routing behavior.

## Build environment notes

This Worker project expects a Node 20+ environment.

The repo includes a local `.node-version` file for the Worker project and a package `engines.node` requirement so Cloudflare Builds can use a modern Node runtime for this subproject.

If the Cloudflare build UI is still defaulting to an older Node version, set the build environment variable:

```txt
NODE_VERSION=22.16.0
```

The Worker project also defines:

```txt
npm run build
```

as a simple alias for `npm run check`, so leaving the default Cloudflare build command in place will still succeed.

## Validation checklist

- [ ] `npm install` succeeds in `infra/cloudflare-worker`.
- [ ] `npm run check` succeeds.
- [ ] `npm run dev` starts Wrangler locally.
- [ ] Requests preserve path and query string.
- [ ] `/.well-known/*` paths pass through.
- [ ] No secrets are committed.
- [ ] Cloudflare Worker name matches `wrangler.jsonc`.
- [ ] Cloudflare Git integration root directory is `infra/cloudflare-worker`.
- [ ] Production/personal route hostnames have proxied Cloudflare DNS records.
- [ ] Vercel has the corresponding custom domain configured.
- [ ] Requests to `/llms.txt`, `/agents.md`, and `/content-index.json` produce Umami events.
- [ ] Captured `HEAD` requests also produce Umami events when they meet the same capture rules as `GET`.
- [ ] Machine-facing variants preserve `path_requested` and derive `path_canonical` when possible.
- [ ] Event payloads use `query_present` only and do not include full query-string values.
- [ ] Event payloads use sanitized referer fields only and do not include full raw external referer URLs.
- [ ] Event payloads include both `ua_raw` and `ua_label`.
- [ ] Captured requests still emit Umami events when the upstream response is `404` or `500`.

## Notes on implementation scope

This Worker intentionally optimizes for a simple first rollout:

- Umami only
- no D1 / R2 / Analytics Engine / Logpush
- no request deduping
- no in-page behavior reconstruction
- no full query or full external referer capture
