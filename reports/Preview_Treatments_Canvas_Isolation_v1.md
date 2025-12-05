# Preview Treatments Canvas Isolation v1

## Summary
- Introduced a single champagne-dark canvas for all preview treatments via `styles/preview/preview-treatments-canvas.css`.
- Simplified the treatments layout to apply only the unified canvas and typography.
- Neutralised legacy page-level skins that previously overpainted the canvas.

## Neutralised legacy skins
- `styles/preview/treatments-light.css` — `.tl-main` background disabled.
- `styles/preview/treatments.css` — `.tp-main` background disabled.
- `styles/preview/champagne-preview.css` — removed page-level background and overlay rules for `.cpv-page--champagne-dark`.
- `styles/preview/champagne/page.css` — `.preview-champagne-frame` background disabled.
- `components/preview/layout/preview-shell.module.css` — shell, backdrop, and particle backgrounds disabled.

## New canvas
- Lives in `styles/preview/preview-treatments-canvas.css`.
- Scoped exclusively to `.cpv-page--champagne-dark` with dark champagne gradient, ink/magenta/teal radial overlays, and on-dark typography tokens.

## Extension guidelines
- Keep all new treatments canvas adjustments scoped to `.cpv-page--champagne-dark` to avoid leaking outside preview treatments.
- Avoid reintroducing backgrounds on `body`, `.cpv-page`, `.cpvShell`, `.preview-champagne-frame`, `.tl-main`, or `.tp-main`.
- Prefer token-driven colors (`--smh-*`, `--brand-*`) and avoid animations or hero-specific assets.

## Hero engine
Hero Engine is now fully canvas-isolated. Hero tone utilities remain scoped to hero elements and do not affect `.cpv-page` or page-level containers.
