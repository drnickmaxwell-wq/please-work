# Preview Treatments Canvas Fix

## Canvas Class Stack
- Shared wrapper: `<div class="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-preview-scope="treatments" …>` from `app/preview/treatments/layout.tsx`.
- Preview shell now tags treatments routes with `data-preview-scope="treatments"` via `PreviewShell`, keeping the canvas on the dark Champagne surface.
- Styles enforced in `styles/preview/champagne-preview.css` for `.cpv-page.cpv-page--champagne-dark.cpv-page--treatments`.

## Neutralised Canvas-Level Overrides
- `components/preview/layout/preview-shell.module.css` now explicitly drops the shell background and particles whenever `data-preview-scope="treatments"` is present, removing reliance on `:has()` timing.

## What caused the flip
- The preview shell defaulted to its own gradient until `:has(.cpv-page--treatments)` evaluated, so client-side navigations briefly showed the lighter shell before the treatments canvas applied.

## What changed
- `PreviewShell` now detects `/preview/treatments` routes and sets `data-preview-scope="treatments"` on the shell immediately.
- CSS targets that attribute to keep the shell transparent and particle-free for all treatments routes, eliminating dark/light flicker during navigation.

## Hero Engine containment
- Hero engine assets remain untouched; tone handling stays scoped inside the hero components, and the outer canvas is fixed by the layout + shell attribute pairing above.
