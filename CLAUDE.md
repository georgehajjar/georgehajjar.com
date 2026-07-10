# Claude working notes — georgehajjar.com

Read this before making changes. Rules here are load-bearing.

## Design-system discipline

**Every reusable visual element is a primitive, exported from `src/components/`, and demoed on `/stylesheet` (`src/views/Stylesheet/index.tsx`). Never create a one-off UI element inside a view file.**

This rule exists because the site is small enough that any drift compounds fast. Once a bespoke pill/button/link lives inside `views/Work/index.tsx`, the next change to that pattern has two homes to update, then three, then it's a redesign to consolidate.

### What counts as a reusable element

- Anything with visual identity: buttons, pills, chips, cards, headings, nav items, toggles, tooltips, badges, dividers
- Anything that could plausibly appear in more than one view — even if it currently only appears in one
- Anything that carries locked styling decisions (colour, size, spacing, motion) you'd want to enforce

Rule of thumb: if you're writing `className="rounded-... border-... bg-... hover:..."` in a view file, stop and extract.

### Every new primitive checklist

1. Create the component under `src/components/<Name>/index.tsx`
2. Export from `src/components/index.ts`
3. Add a row (or a full section if the component has variants) to `src/views/Stylesheet/index.tsx` so the primitive is visible on `/stylesheet`
4. Consume it from views by importing from `'../../components'`
5. Never re-implement the same visual pattern locally in a view

### Locked-styling primitives

The typography primitives (`Display`, `SectionTitle`, `Subhead`, `CardTitle`, `Tagline`, `Body`, `Meta`, `Label`) lock font, size, colour, and opacity at the source — they intentionally have no `className` slot. Extend them rather than override.

## Theme system

- Themes are driven by a `data-theme='dark' | 'light'` attribute on `<html>`
- `src/lib/theme.ts` exposes the `useTheme()` hook (returns `{ theme, toggle, setTheme }`)
- Initial theme is applied by an inline `<script>` in `index.html` before hydration (avoids flash)
- CSS variables that swap per theme live in `src/index.css`: `--color-ink`, `--color-surface`, `--color-mint`, `--color-purple`, `--color-fg`
- Tailwind v4 custom variants `dark:` and `light:` are wired to the attribute (defined at the top of `src/index.css`) — use them for theme-conditional utilities

### Colour usage rules

- Never hardcode `text-white/N`, `bg-white/N`, `border-white/N`, etc. Use `text-fg/N`, `bg-fg/N`, `border-fg/N` — these follow the theme's `--color-fg` variable
- `bg-ink`, `bg-surface`, `text-mint`, `text-purple` are all theme-aware
- Icons that need to render on both themes should use `currentColor` (drop the inline `color` style) so they inherit from the surrounding text colour
- Coloured brand icons (React blue, TypeScript blue, etc.) can hardcode their brand hex — those work on both themes

## Motion

- All animation uses [Motion](https://motion.dev) (imported from `'motion/react'`), not framer-motion directly
- Respect `prefers-reduced-motion` via `useReducedMotion()` — either freeze the animation or skip it entirely
- Default timing: `duration: 0.3` with `ease-out` for interactions, longer with custom cubic-bezier for cinematic moments

## Deps we've explicitly removed — do not reintroduce without asking

- `three`, `@react-three/fiber`, `@react-three/postprocessing`, `@types/three` — 3D exploration didn't land
- `@tsparticles/react`, `@tsparticles/slim` — replaced by custom `StarField` canvas
- `@paper-design/shaders-react` — shader direction dropped

## Verify before finishing

Every change ships through `yarn typecheck && yarn lint`. Both must pass.
