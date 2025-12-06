# Preview Treatments Dark Canvas Fix

## Summary of cause
- Tone-specific hero rules in `styles/champagne/hero-engine.css` were painting backgrounds directly on the hero wrapper. When tone classes escaped their intended scope during navigation, the background declarations could repaint the preview canvas.
- The treatments canvas relied on class-based styling from `styles/preview/champagne-preview.css` without an authoritative override, so stale tone styles occasionally won the cascade after client transitions.

## Changes made
- Scoped hero tone backgrounds to the hero’s internal surface layer via `--hero-surface` and a dedicated `::before` painter, removing direct background paints from `.hero-tone--*` wrappers.
- Locked the treatments preview canvas to a dark surface with a preview-only stylesheet (`styles/preview/preview-treatments-canvas.css`) imported by `app/preview/treatments/layout.tsx`.
- Documented the current tone application points and canvas ownership inside `components/preview/treatments/ChampagneTreatmentTemplate.tsx` for future debugging.

## How the fixes prevent the bug
- Tone classes now only influence the hero’s internal paint layer, so even if a tone class lands on an unexpected element, it cannot recolour the page background.
- The new preview canvas rule applies an explicit dark background (with a fallback token) at high priority for `[data-preview-scope="treatments"]`, insulating the treatments hub and detail pages from stray styles.

## TODOs / follow-ups
- Monitor navigation between hub and detail previews to confirm no further tone leakage; if any remains, tighten tone class assignment in the hero rendering pipeline.
- Consider adding an automated visual regression check for the treatments hub to catch future light/dark flips early.
