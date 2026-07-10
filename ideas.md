# Ideas

Parking lot for design/interaction ideas approved for later. Copy any section into a fresh Claude conversation and it should be enough context to implement.

---

## Kinetic type — cycling final word

**Status:** approved, not built.

**Where:** `src/views/Landing/index.tsx` — the `Subhead` block that currently reads:

```
Software Developer,
Engineer & Technology Enthusiast.
```

**What:** Keep the first line static. On the second line, the final word cycles through a small list every ~1.8s, with a vertical wipe transition (new word slides up from below, old word slides out the top). Uses the existing `Display` / `Subhead` primitive — no new styles.

**Reference implementation:** A working POC lived at `src/views/Lab/KineticType.tsx` (delete after implementation if the Lab folder is gone by then). It uses Motion's `AnimatePresence` with `mode="wait"`, `initial={{ y: '0.6em', opacity: 0 }}`, `animate={{ y: 0, opacity: 1 }}`, `exit={{ y: '-0.6em', opacity: 0 }}`, `transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}`.

**Word list to cycle:** decide with the user. Candidates: `engineer`, `builder`, `explorer`, `operator`, `craftsman`. The current copy uses `Engineer` in title case — kinetic version should stay in the same case as the rest of the Subhead.

**Constraints:**

- Respect `prefers-reduced-motion` — freeze on the first word if reduced motion is set (the POC handles this).
- Cycle only while the hero is in the viewport, so it isn't a background CPU tax while scrolling deep pages.
- Do not touch other Landing hero behaviour — landing interactivity is a separate planned change.
- No layout shift as words change width — either pick words of similar length, or reserve the widest word's width with a `min-width` measured once.
