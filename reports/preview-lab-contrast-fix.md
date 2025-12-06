# Preview Lab Contrast Fix

## Files updated
- styles/preview/preview-lab.css (ink canvas, surface, and text contrast tweaks)
- reports/preview-lab-contrast-fix.md (this summary)

## Canvas + classes
- `.preview-lab-page` sets the ink backdrop, color-scheme dark, and shared text variables for the lab scope.
- `.preview-lab-shell` keeps content centered within the canvas.
- Surface classes (`.preview-lab-section`, `.preview-lab-card`, `.preview-lab-panel`, `.preview-lab-chip`) use ink-glass fills and gold keylines for contrast.

## Text colour tokens
- Strong text via `--plab-text-strong`: `color-mix(in srgb, var(--smh-white) 94%, transparent)`.
- Body text via `--plab-text-soft`: `color-mix(in srgb, var(--smh-white) 82%, transparent)`.
- Headings use `var(--smh-white)` on the ink canvas.

## Notes
- Scope remains under `/preview-lab/**`; production and legacy preview routes are unchanged.
- No raw hex values were added; only Champagne tokens are referenced.
