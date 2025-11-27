# Champagne Preview MoodMap Phase1B

## Summary of visual changes
- Applied dusk-lounge page backdrops using MoodMap v1 depth to mix ink and white with warm/teal/gold veils so each treatment now reads distinct while staying under the sacred hero hue range.
- Enriched preview heroes with on-brand gradient tints, deeper vignettes, and sheen overlays that bias warmth/teal/gold per treatment without altering canonical gradient stops.
- Refreshed cards, FAQs, and link tiles with smoked-glass layering, stronger dual shadows, and mood-aware gradient borders for clearer contrast against the darker canvas.
- Mapped MoodMap motion intensity directly to wave, shimmer, particle, and grain opacities while preserving prefers-reduced-motion fallbacks.

## Per-treatment mood wiring
MoodMap v1 values remain intact for all preview treatments via existing `data-treatment` selectors:
- composite, implants, veneers, cosmetic, orthodontics, whitening, general, technology, and reserved anxiety.
- Technology/implants lean cooler and deeper; whitening stays brighter and lighter; composite/veneers/cosmetic carry warmer sheen.

## Guard results
- `node scripts/guard-rogue-hex.mjs` – **pass** (no rogue hexes).
- `pnpm brand:guard` – **pass**.
- `pnpm guard:hero` – **pass** (derived grain asset validated).
- `node scripts/guard-manifest-sync.mjs` – **pass**.
- `node scripts/guard-preview-only.mjs` – **expected fail** in this environment (origin/main unavailable).

## Files touched
- `styles/preview/champagne-preview.css`

## Follow-up suggestions (Phase 2)
- Consider per-route copy hints or subtle iconography to further differentiate technology vs implants without new colors.
- Explore optional sparkle density toggles for whitening and cosmetic previews when motion is allowed.
- Add lightweight visual regression captures for the preview grid to guard the dusk background balance.
