# Champagne Preview Fix Audit

## Files Changed
- styles/preview/champagne-preview.css
- reports/Champagne_Preview_Fix_Audit.md

## Hero Before/After
- **Before:** Hero surfaces layered the canonical gradient with an ink overlay and variable wave opacity, tinting the background away from the unmodified Champagne Canon.
- **After:** Hero surfaces use only the canonical Champagne gradient (`linear-gradient(135deg, var(--brand-magenta) 0%, var(--brand-teal) 60%, var(--brand-gold) 100%)`) with the soft-light wave at fixed 0.12 opacity; no additional color-mix overlays are applied to the hero background.

## Cards Before/After
- **Before:** Cards stacked multiple dusk gradients and radial accents over teal-leaning mixes, with lighter blur and extra overlays.
- **After:** Cards, subcards, FAQ items, and link cards all share the canonical Champagne gradient as their background-image, paired with an ink glass veil (`color-mix(in srgb, var(--brand-ink) 18%, transparent)`) and 24px blur for smoked-glass depth. Gradient waves/textures on cards are removed.

## Canon Confirmation
- All preview gradients now reference the Champagne Canon string exactly where used.
- No changes were made to `styles/tokens/smh-champagne-tokens.css`.
- No new hex values were introduced; guards confirm the palette remains token-only.

## Guard Status
- `node scripts/guard-rogue-hex.mjs`
- `pnpm brand:guard`
- `pnpm guard:hero`
