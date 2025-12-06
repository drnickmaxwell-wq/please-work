# Preview treatments dark canvas stabilisation

## Files updated
- app/preview/treatments/layout.tsx
- app/preview/treatments/page.tsx
- app/preview/treatments/[slug]/page.tsx
- styles/preview/preview-treatments-canvas.css
- styles/preview/treatments.css

## Canonical dark canvas
Introduced `styles/preview/preview-treatments-canvas.css` with `.cpv-page--champagne-dark` and `.cpv-treatments-canvas` ensuring a consistent ink-based surface using existing Champagne tokens (`var(--bg-ink)`, `var(--smh-ink)`, `var(--smh-white)`). The treatments layout now pins the canvas to ink via inline styles on the shared wrapper.

## Hero tone override
Scoped overrides neutralise `.hero-frame.hero-tone--*` backgrounds inside the preview treatments canvas to prevent light leaks without touching the hero engine.

## Notes
- Preview hub and detail pages now apply the shared `cpv-treatments-canvas` hook and inline ink tokens so navigation cannot resurrect lighter preview shells.
- Scoped overrides also force `.cpv-page` backgrounds to ink within the canvas, countering gradients pulled in via shared champagne preview CSS.
- Automated tests require Node >=20; current container uses Node 18, so upstream runs should verify with the expected runtime.
