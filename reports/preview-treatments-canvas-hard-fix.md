# Preview treatments canvas hard lock

## Files touched
- `app/preview/treatments/layout.tsx`
- `styles/preview/treatments.css`

## Inline background lock
- Added `.cpv-treatments-canvas-lock` wrapper in the preview treatments layout with inline `backgroundColor: var(--smh-ink)` and `color: var(--smh-white)` to keep the canvas dark for all preview treatment pages.

## Verification notes
- Inline dark lock applied at the layout root to prevent light canvas regressions after navigation.
- Hero tone backgrounds neutralised only within the treatments preview scope to avoid leaking light backgrounds.
- Preview-only styles isolated; production routes unaffected.
