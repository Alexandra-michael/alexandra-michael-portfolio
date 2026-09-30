# Deploying to Cloudflare Pages

The site is a static Vite build (`pnpm build` → `dist/`). Deploys are driven by GitHub Actions:
merging a pull request into `main` runs typecheck, tests and build, then publishes `dist/`.

## Branching

| Branch | Purpose |
| ------ | ------- |
| `main` | Production. Only changes via PR from `dev`. Merging deploys. |
| `dev`  | Day-to-day work. Every push and PR runs CI (no deploy). |

Flow: work on `dev` (or a feature branch off it) → PR into `dev` → PR `dev` into `main` → merge → live.

## One-time setup

### 1. Push the repo
```bash
git remote add origin git@github.com:<owner>/<repo>.git
git push -u origin main dev
```

### 2. Create the Cloudflare Pages project
1. Sign in at https://dash.cloudflare.com (free account is fine).
2. **Workers & Pages → Create → Pages → Upload assets** (not "Connect to Git"; GitHub Actions does the deploys).
3. Name the project, e.g. `alexandra-michael`. Upload any file to finish creating it; the first real deploy replaces it.
4. Your site will be at `https://<project-name>.pages.dev`.

### 3. Create an API token
1. Cloudflare dashboard → **My Profile → API Tokens → Create Token → Create Custom Token**.
2. Permission: **Account → Cloudflare Pages → Edit**. Scope it to your account.
3. Copy the token (shown once).
4. Copy your **Account ID** from the right sidebar of **Workers & Pages**.

### 4. Add GitHub secrets and variable
Repo → **Settings → Secrets and variables → Actions**:

- Secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- Variables: `CF_PAGES_PROJECT` = the project name from step 2

### 5. Protect `main` (recommended)
Repo → **Settings → Branches → Add rule** for `main`:
- Require a pull request before merging
- Require status check **verify** (from the CI workflow) to pass

## Day-to-day
```bash
git switch dev
pnpm install
pnpm dev            # local preview
pnpm test           # unit tests
git push origin dev # CI runs
```
When ready, open a PR `dev → main`. CI must pass. Merge it and the **Deploy to Cloudflare Pages** workflow publishes the site (watch it under the **Actions** tab).

Closing a PR **without** merging does not deploy.

## Custom domain
Cloudflare → your Pages project → **Custom domains → Set up a domain**. Follow the DNS prompts. Once live, update the `og:image` in `index.html` to an absolute URL (`https://yourdomain/images/portrait-studio.jpg`).

## Troubleshooting
- **Deploy fails with "Project not found"**: `CF_PAGES_PROJECT` doesn't match the project name exactly.
- **Authentication error**: token missing *Cloudflare Pages: Edit*, or wrong Account ID.
- **`--frozen-lockfile` error**: run `pnpm install` locally and commit `pnpm-lock.yaml`.
