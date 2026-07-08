My personal website hosted on [georgehajjar.com](https://georgehajjar.com/)

## Stack

Vite · React 19 · TypeScript 5 · Tailwind CSS 4 · Motion · Firebase Hosting

## Scripts

```bash
yarn install
yarn dev        # dev server at http://localhost:5173
yarn build      # type-check + production build → build/
yarn preview    # serve the production build locally
yarn typecheck  # tsc --noEmit
```

## Deploy

CI/CD is handled by GitHub Actions:

- `.github/workflows/firebase-hosting-merge.yml` — deploys `main` to the live channel on push.
- `.github/workflows/firebase-hosting-pull-request.yml` — builds a preview channel for each PR.

To deploy manually:

```bash
firebase login
firebase deploy
```
