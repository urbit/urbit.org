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

## Connect an agent to Cloudflare MCP

Use Cloudflare MCP when you want an agent to inspect or change Cloudflare configuration: Worker deployments, routes, DNS records, build status, bindings, or observability. Use Wrangler for local development and deploy commands; use MCP for account and dashboard operations that are easier to verify through the API.

For OpenCode, add the Cloudflare remote MCP servers to the project-level `.opencode.jsonc` or the user-level OpenCode config:

```jsonc
{
  "mcp": {
    "cloudflare": {
      "type": "remote",
      "url": "https://mcp.cloudflare.com/mcp",
      "enabled": true
    },
    "cloudflare-docs": {
      "type": "remote",
      "url": "https://docs.mcp.cloudflare.com/mcp",
      "enabled": true
    },
    "cloudflare-builds": {
      "type": "remote",
      "url": "https://builds.mcp.cloudflare.com/mcp",
      "enabled": true
    },
    "cloudflare-observability": {
      "type": "remote",
      "url": "https://observability.mcp.cloudflare.com/mcp",
      "enabled": true
    },
    "cloudflare-bindings": {
      "type": "remote",
      "url": "https://bindings.mcp.cloudflare.com/mcp",
      "enabled": true
    }
  }
}
```

Then:

1. Start OpenCode from the repository or Worker directory.
2. Run `opencode mcp list` and confirm the Cloudflare servers are enabled.
3. Ask the agent to call a Cloudflare tool, for example: `List Workers deployments for this account`.
4. Complete the browser OAuth flow when prompted by Cloudflare.
5. Grant the narrowest permissions that cover the task: Workers Scripts/Builds for deployments, DNS/Zone for routes and records, and Logs/Observability for debugging.
6. Ask the agent to verify the active account, zone, Worker script name, routes, and bindings before it changes anything.

Do not commit Cloudflare API tokens or OAuth credentials to the repo. The remote MCP flow should authorize through Cloudflare OAuth. If an agent or CLI needs a token outside OAuth, provide it through the local shell or secret manager only.

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

Umami's ingest endpoint drops requests that use bot-like `User-Agent` headers. The Worker therefore sends Umami requests with a neutral browser-style ingest `User-Agent` while preserving the original request user agent in `ua_raw` and the normalized label in `ua_label`.

The Worker deliberately does **not**:

- dedupe repeated matching requests
- store full query-string values
- store full raw external referer URLs
- add a second storage system in v1

## Step-by-step: set up the Worker from this repo

These steps assume Vercel remains the origin and Cloudflare only runs the reverse-proxy Worker plus DNS/routing.

### 1. Prepare the repository

```bash
git clone https://github.com/urbit/urbit.org.git
cd urbit.org/infra/cloudflare-worker
npm ci
npm run check
```

Use Node 22 for the Worker toolchain. The Worker directory includes `.node-version`, and Cloudflare Builds should set `NODE_VERSION=22.16.0` if the dashboard defaults to an older runtime.

### 2. Pick the Worker script name

The default `wrangler.jsonc` name is:

```txt
urbit-org-edge-worker
```

If you are updating an existing Cloudflare Worker, make the script name match the existing Worker before deployment. For example, the current testing deployment may use a shorter script name such as `urbit-org`. The important rule is that the Worker script name, Cloudflare routes, and Git build project all point at the same Worker.

### 3. Connect the domain to Vercel and Cloudflare

1. Confirm the site is deployed on Vercel.
2. Add the target hostname(s) to the Vercel project, for example `urbit.org` and `www.urbit.org`, or a testing hostname such as `next-urbit.org`.
3. In Vercel, copy the required DNS record targets.
4. In Cloudflare DNS, create the Vercel-required records.
5. Keep the DNS records proxied/orange-clouded so Worker routes can run.

### 4. Create or connect the Worker in Cloudflare

In the Cloudflare dashboard:

1. Go to **Workers & Pages**.
2. Create a Worker from Git, or open the existing Worker and connect its Git build.
3. Select the `urbit.org` repository.
4. Set root directory:

```txt
infra/cloudflare-worker
```

5. Set the production branch to the branch you want Cloudflare to deploy.
6. Set install command:

```txt
npm ci
```

7. Set build command:

```txt
npm run build
```

`npm run build` is intentionally just `npm run check`, so Cloudflare type-checks the Worker before deploy.

8. Set deploy command:

```txt
npx wrangler deploy
```

9. Set build environment variable:

```txt
NODE_VERSION=22.16.0
```

### 5. Configure Worker variables

Set these Worker variables in the Cloudflare dashboard:

```txt
UMAMI_API_URL=https://cloud.umami.is/api/send
UMAMI_WEBSITE_ID=<umami-website-id>
```

For production, `UMAMI_WEBSITE_ID` should be the same existing `urbit.org` Umami website/property already used by the browser tracker. For a testing domain, use the corresponding testing Umami property.

Optional variables:

```txt
ORIGIN_URL=https://your-vercel-project.vercel.app
DEBUG_RESPONSES=true
```

Leave `ORIGIN_URL` unset for normal production pass-through mode where Cloudflare DNS already points the requested hostname at Vercel. Use `ORIGIN_URL` only for preview or custom test setups where the Worker route hostname is not directly configured in Vercel.

Set `DEBUG_RESPONSES=true` only during testing. Turn it off after validation because it adds an `X-Urbit-Edge-Worker` response header.

`wrangler.jsonc` has `keep_vars: true` so deploys do not erase dashboard-managed variables.

### 6. Attach Worker routes

In the Cloudflare zone, add routes for each hostname that should pass through the Worker:

```txt
urbit.org/*
www.urbit.org/*
```

For a testing deployment, use testing routes instead:

```txt
next-urbit.org/*
www.next-urbit.org/*
```

Confirm each route targets the same Worker script name you deployed in step 2.

### 7. Verify the deployment

Run content probes:

```bash
curl -I https://next-urbit.org/llms.txt
curl -I https://next-urbit.org/.agents/overview.md
curl -I -A 'ClaudeBot' https://next-urbit.org/llms.txt
curl -I -A 'GPTBot' https://next-urbit.org/overview.md
```

Expected result: HTTP 200 or the same status the Vercel origin would return for that path. Captured requests should still send best-effort Umami events regardless of whether the upstream status is 200, 404, or 500.

To verify analytics through the Umami API, export a read API key and query the target website for recent events named `ai-entrypoint-hit` and `bot-page-hit`. For Umami Cloud, the read API base is `https://api.umami.is/v1`, while Worker ingestion uses `https://cloud.umami.is/api/send`.

You can also ask a Cloudflare-MCP-enabled agent to verify:

1. the Worker script exists;
2. the latest deployment timestamp is recent;
3. `UMAMI_API_URL` and `UMAMI_WEBSITE_ID` bindings exist;
4. the expected routes point to the Worker;
5. recent Worker logs have no Umami send failures.

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
npm ci
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

- [ ] `npm ci` succeeds in `infra/cloudflare-worker`.
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
