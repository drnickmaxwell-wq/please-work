## Files Updated
- styles/preview/champagne-preview.css

## Hero Background Before/After
- Before: Preview heroes were muted by ink-heavy mixes that softened the Champagne gradient and obscured the wave texture.
- After: Heroes use the canonical 135° magenta→teal→gold gradient with a single soft-light `/brand/waves-bg-1920.webp` mask and ink-weighted dusk variant, keeping saturation high without mint or pastel drift.

## Card Background Before/After
- Before: Luxe cards appeared flat and dark with limited Champagne colour, drifting toward mint/pastel highlights.
- After: Cards now use smoked-ink gradients driven by magenta/teal/soft-gold tokens with softened keylines, restoring dusk warmth and eliminating the mint cast across hubs and detail sections.

## Token Usage
- All hues draw directly from the canonical set: #C2185B (magenta), #40C4B4 (teal), #D4AF37 (gold), #F9E8C3 (soft gold), #0B0D0F (ink), and #FFFFFF for text/highlights.
- No additional brand colours were introduced; gradients and keylines are composed via existing token variables and color-mix overlays.

## After v2 Adjustments
- Hero surfaces switched to the canonical magenta→teal→gold gradient with the single soft-light `/brand/waves-bg-1920.webp` texture, ensuring the wave stays visible without muting colour.
- Preview cards share an ink-to-Champagne gradient with ink mixing capped at 40% and a soft-gold keyline, restoring dusk glow without brown casts.
- Mint/pastel casts were removed by deepening the hero glass base (`--cpv-hero-card-bg`) and re-weighting `--cpv-card-gradient` toward magenta/teal ink mixes while keeping gold as a subtle edge.

## After v3 Adjustments
- Further rebalanced the hero glass and card gradients to reduce mint bias: increased ink weight, lowered radial highlight strength, and kept gradient stops anchored to magenta/teal/gold tokens.
- Wave texture remains the single soft-light `/brand/waves-bg-1920.webp` mask; colour now comes entirely from token-driven gradients with no added tints.

## After v4 Adjustments
- Normalised hero and card gradients to ink-weighted magenta/teal/gold mixes, clamping ink blends and reducing highlights to eliminate the remaining mint/pastel cast.
- Confirmed all gradients and keylines pull strictly from canonical tokens with no new hex values, keeping Balanced Dusk consistent across preview routes.
