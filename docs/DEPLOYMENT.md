# Deploying to Cloudflare

The site is a static Vite build (`pnpm build` → `dist/`). It is served by Cloudflare Workers static
assets, configured in `wrangler.jsonc` (worker name `alexandra-michael`). Merging a pull request into
`main` runs typecheck, tests and build, then `wrangler deploy` publishes `dist/`. The first deploy
creates the worker automatically, so nothing needs to be created by hand in the dashboard.

Live URL: `https://alexandra-michael.<account-subdomain>.workers.dev`

## Branching

| Branch | Purpose |
| ------ | ------- |
| `main` | Production. Only changes via PR from `dev`. Merging deploys. |
| `dev`  | Day-to-day work. Every push and PR runs CI (no deploy). |

## One-time setup

1. **Push the repo** to GitHub (`main` and `dev`).
2. **Create an API token**: Cloudflare dashboard → My Profile → API Tokens → Create Token →
   use the **Edit Cloudflare Workers** template. Copy it (shown once).
3. **Copy your Account ID** from the Workers & Pages overview sidebar.
4. **Add GitHub secrets** (Settings → Secrets and variables → Actions → Secrets):
   `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. No variables are needed.
5. **Protect `main`** (Settings → Branches): require a PR and the `verify` check.

If a worker named `alexandra-michael` already exists in the account (for example the Hello World one
created from the dashboard), the first deploy replaces its code. To use another name, change `name` in `wrangler.jsonc`.

## Day-to-day
Work on `dev`, push (CI runs), open a PR `dev → main`, merge. The **Deploy to Cloudflare** workflow
publishes the site. Closing a PR without merging does not deploy.

## Custom domain
Workers & Pages → the worker → Settings → Domains & Routes → Add → Custom domain.
The `*.workers.dev` subdomain is per account and cannot be renamed per project.
After changing the domain, update `VITE_SITE_URL` in `.env` so link previews use it.

## Troubleshooting
- **Authentication error / code 10000**: token lacks Workers edit permission, or the Account ID is wrong.
- **`--frozen-lockfile` error**: run `pnpm install` locally and commit `pnpm-lock.yaml`.
