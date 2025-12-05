# Preview Treatments Canvas Wiring — After Changes

## What Changed
- Removed duplicate global preview skin imports from the treatments hub, whitening, and composite bonding pages so the shared `/app/preview/treatments/layout.tsx` remains the sole canvas/preview stylesheet entry point.
- Left the canonical layout wrapper unchanged: `<div className="cpv-page cpv-page--champagne-dark" data-treatment={...}>` applies the dark Champagne canvas to all routes in the subtree.
- Kept the schema preview page’s `styles/preview/treatments.css` only where its `tp-*` section styles are required, while confirming it uses a transparent canvas and on-dark text tokens (no light repaint).
- Verified hero tone CSS stays scoped to hero shells; no hero tone selectors target `.cpv-page` or layout wrappers.

## Canonical Canvas Rule
- Canvas owner: `.cpv-page.cpv-page--champagne-dark` from `styles/preview/champagne-preview.css` (radial/linear dark Champagne gradient + on-dark text tokens).

## QA Checklist
- Hub loads on dark canvas.
- Navigate hub → whitening → hub → composite-bonding → hub → other treatment detail pages: canvas remains the same dark Champagne skin with no light/washed switches.
- Heroes remain visible on each route; tone variations stay inside the hero band only and never recolour the canvas.
- No `/preview/treatments/**` route imports legacy light skins (`treatments-light.css` or extra canvas wrappers), and no page-level wrapper uses `tl-main`/`tp-main` to paint a light background.

