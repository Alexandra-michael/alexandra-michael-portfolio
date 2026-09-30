# Alexandra Michael — Portfolio

Personal portfolio for Alexandra Michael, Software QA Engineer. Static site built with Vite and TypeScript, deployed on Cloudflare Pages.

Live: https://alexandra-michael.pages.dev

## Stack

- TypeScript, Vite, no UI framework
- Vitest for unit tests
- pnpm
- GitHub Actions and Cloudflare Pages

## Getting started

```bash
pnpm install
pnpm dev        # local dev server
pnpm test       # unit tests
pnpm typecheck  # tsc --noEmit
pnpm build      # production build to dist/
pnpm preview    # serve the production build
```

## Architecture

Clean architecture with MVVM. Dependencies point inward.

```
src/
  domain/          entities, repository interfaces, use cases (no DOM, no data source)
  data/            content and repository implementations
  presentation/
    core/          Observable, View contract, DOM helper
    viewmodels/    state and actions, no DOM access
    views/         render view-model state to the DOM
  main.ts          composition root, wires everything together
  styles/          global stylesheet
```

To change the copy on the site, edit `src/data/content.ts`.

## Content and assets

- Copy, roles, metrics and skills: `src/data/content.ts`
- Photos and the CV PDF: `public/` (the CV is served at `/Alexandra-Michael-CV.pdf`; replace the file to update it)
- Site URL used for link previews (`og:image`, canonical): `VITE_SITE_URL` in `.env`. Update it if the domain changes.
- Static pages and files: `public/404.html`, `public/robots.txt`, `public/_headers`

## Branching and workflow

- `dev`: day-to-day work. CI runs typecheck, tests and build on every push and PR.
- `main`: production. Changes arrive only through a PR from `dev`.

Flow: commit on `dev` → push → open a PR `dev` into `main` → CI passes → merge.

Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `ci:`, `chore:`, `style:`).

## CI and deployment

| Workflow | Trigger | What it does |
| -------- | ------- | ------------ |
| `ci.yml` | PRs into `main` or `dev`, pushes to `dev` | typecheck, test, build |
| `deploy.yml` | PR into `main` is merged | typecheck, test, build, then deploy `dist/` to Cloudflare Pages (creates the project on first run) |

Closing a PR without merging does not deploy.

Required in the GitHub repo (Settings → Secrets and variables → Actions):

- Secrets: `CLOUDFLARE_API_TOKEN` (permission: Account → Cloudflare Pages → Edit), `CLOUDFLARE_ACCOUNT_ID`
- Variable: `CF_PAGES_PROJECT` = `alexandra-michael`

Step-by-step setup and troubleshooting: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).
