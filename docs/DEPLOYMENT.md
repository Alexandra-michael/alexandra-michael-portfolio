# Deploying to Cloudflare Pages

The site is a static Vite build (`pnpm build` → `dist/`). Merging a pull request into `main` runs
typecheck, tests and build, then publishes `dist/` to Cloudflare Pages with `wrangler pages deploy`.
The workflow creates the Pages project on its first run, so nothing needs to be created in the dashboard.

Live URL: `https://<CF_PAGES_PROJECT>.pages.dev` (for example `https://alexandra-michael.pages.dev`)

## Branching

| Branch | Purpose |
| ------ | ------- |
| `main` | Production. Only changes via PR from `dev`. Merging deploys. |
| `dev`  | Day-to-day work. Every push and PR runs CI (no deploy). |

## One-time setup

1. **Push the repo** to GitHub (`main` and `dev`).
2. **Create an API token**: Cloudflare dashboard → My Profile → API Tokens → Create Custom Token →
   Permission **Account → Cloudflare Pages → Edit**. Copy it (shown once).
3. **Copy your Account ID** from the Workers & Pages overview sidebar.
4. **Add GitHub secrets** (Settings → Secrets and variables → Actions → Secrets):
   `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
5. **Add a GitHub variable** (same page, Variables tab): `CF_PAGES_PROJECT` = `alexandra-michael`.
   This becomes the `.pages.dev` subdomain. Do not create a project by hand in the dashboard: the dashboard
   now creates Workers projects (`*.workers.dev`), which are not the same thing.
6. **Protect `main`** (Settings → Branches): require a PR and the `verify` check.

## Day-to-day
Work on `dev`, push (CI runs), open a PR `dev → main`, merge. The **Deploy to Cloudflare** workflow
publishes the site. Closing a PR without merging does not deploy.

## Custom domain
Workers & Pages → the Pages project → Custom domains → Set up a domain.
After changing the domain, update `VITE_SITE_URL` in `.env` so link previews use it.

## Troubleshooting
- **"Project not found"**: `CF_PAGES_PROJECT` is missing or the token cannot create Pages projects.
- **Authentication error**: token lacks *Cloudflare Pages: Edit*, or the Account ID is wrong.
- **`--frozen-lockfile` error**: run `pnpm install` locally and commit `pnpm-lock.yaml`.
