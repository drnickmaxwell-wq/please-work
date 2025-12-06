# Preview Treatments Canvas Lock

## Canvas Owner Selector
The treatments canvas is now locked by:

```
.cpv-page.cpv-page--champagne-dark.cpv-page--treatments[data-preview-scope="treatments"]
```

## Stylesheet Loading Order
- Imported in `app/preview/treatments/layout.tsx` after all other preview styles.
- Positioned last to ensure the treatments canvas surfaces override time-of-day or hero-adjacent styles without altering production routes.

## Theme Selector Fencing
- Reviewed `styles/brand/theme-manager.css`, `styles/champagne/time-of-day.css`, and `styles/preview/dusk.css`; no selectors targeting `.cpv-page--treatments` required narrowing.

## Verified Navigation Flows (code review)
- hub → whitening → hub
- hub → composite-bonding → hub
- hub → whitening → composite-bonding → hub

For each flow, the canvas background remains governed by the locked selector above and is not affected by global theme or time-of-day CSS.
