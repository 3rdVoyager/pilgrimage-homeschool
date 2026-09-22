# Production deployment (Cloudflare Pages)

This site uses the **same Astro runtime everywhere**: `@astrojs/cloudflare` in
[`astro.config.mjs`](../astro.config.mjs) for local `npm run dev` and for
production. We do **not** switch between Node and Cloudflare adapters by
environment.

## Cloudflare Pages (GitHub)

Connect the GitHub repo and use these build settings:

| Setting | Value |
| -------- | ----- |
| Production branch | Your main deploy branch (e.g. `main` or `migrate-to-tina` until merged) |
| Framework preset | None (or Astro if offered) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | **22.12.0** or newer (matches `package.json` `engines`) |

The build runs `tinacms build` first (generates admin UI and GraphQL client),
then `astro build` (Cloudflare Worker + static assets in `dist/`).

## Environment variables

Set these in **Cloudflare Pages → Settings → Environment variables** for
**Production** (and **Preview** if editors should use Tina on preview URLs).

| Variable | Where to get it | Notes |
| -------- | ---------------- | ----- |
| `NEXT_PUBLIC_TINA_CLIENT_ID` | [TinaCloud](https://app.tina.io) project | Public client id |
| `TINA_TOKEN` | TinaCloud → Tokens | Read-only token for builds; use a separate token for preview if you prefer |

Do not commit tokens. Local development can use a `.env` file (already gitignored).

Optional (if TinaCloud needs the branch name during CI):

| Variable | Example |
| -------- | ------- |
| `GITHUB_BRANCH` or `HEAD` | Cloudflare often sets `CF_PAGES_BRANCH`; Tina config also reads `GITHUB_BRANCH`, `VERCEL_GIT_COMMIT_REF`, and `HEAD` |

## TinaCloud

1. Create or link a TinaCloud project to this GitHub repo.
2. Set the branch Tina should use for content (usually `main`).
3. After Pages is live, set the site URL in TinaCloud so auth redirects work.

Editors use `/admin/` on the deployed site (built into `public/admin` during
`tinacms build`). Content changes commit through TinaCloud to Git.

## Wrangler

[`wrangler.jsonc`](../wrangler.jsonc) sets `nodejs_compat` and project name.
Astro’s Cloudflare adapter merges in Worker entry and assets paths when you run
`astro build` (output under `dist/`). Do not point `main` at `./dist/...` in
the root config before a build exists, or local builds can fail.

Git-connected Pages deploys use the **build output** (`dist`). Wrangler is
optional for manual `wrangler deploy` workflows.

## Verify before publish

With **no dev server** running on port 9000 (Tina datalayer):

```sh
npm run build
```

If you see `Tina Dev server is already in use`, stop the existing `npm run dev`
process and run the build again.

If `tinacms build` fails with **Missing clientId, token**, set
`NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` in the shell or `.env` (same as
Pages). Local `npx astro build` can verify the Cloudflare adapter only after
Tina has generated `tina/__generated__` via a prior `tinacms dev` or successful
`tinacms build`.

## Checklist

- [ ] Pages build command and output directory match the table above
- [ ] Node 22.12+ selected in Pages build settings
- [ ] `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` set in Pages env
- [ ] TinaCloud project linked to the repo and branch
- [ ] Production branch pushed; deployment succeeds
- [ ] `/`, `/about/`, and `/admin/` load on the `*.pages.dev` URL
