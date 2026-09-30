# Alexandra Michael — Portfolio

Personal portfolio for Alexandra Michael, Software QA Engineer. Static site built with Vite and TypeScript, deployed on Cloudflare Pages.

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

## Branching and deployment

- `dev`: day-to-day work. CI runs typecheck, tests and build on every push and PR.
- `main`: production. Merging a PR into `main` runs the checks and deploys to Cloudflare Pages.

Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `ci:`, `chore:`).

Full setup steps are in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).
