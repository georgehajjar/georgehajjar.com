My personal website hosted on [georgehajjar.com](https://georgehajjar.com/)

## Stack

Vite · React 19 · TypeScript 5 · Tailwind CSS 4 · Motion · Firebase Hosting

## Scripts

```bash
yarn install
yarn dev            # dev server at http://localhost:5173
yarn build          # typecheck + production build → build/
yarn preview        # serve the production build locally
yarn typecheck      # tsc --noEmit
yarn lint           # oxlint
yarn lint:fix       # oxlint --fix
yarn format         # prettier --write src
yarn format:check   # prettier --check src
yarn analyze        # bundle treemap → build/stats.html
```

Pre-commit hook (via husky + lint-staged) runs `oxlint --fix` and `prettier --write` on staged files.

## Design system

Every reusable primitive lives in `src/components/`. Visit [`/stylesheet`](https://georgehajjar.com/stylesheet) for the live reference.

## Deploy

CI/CD is handled by GitHub Actions:

- `.github/workflows/checks.yml` — runs typecheck / lint / format:check / build on every push and PR.
- `.github/workflows/firebase-hosting-merge.yml` — same checks then deploys `main` to the live channel.
- `.github/workflows/firebase-hosting-pull-request.yml` — same checks then builds a preview channel for each PR.

To deploy manually:

```bash
firebase login
firebase deploy
```
