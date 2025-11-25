# Champagne Preview Fix Audit v2

## Files Changed
- `styles/preview/champagne-preview.css`
- `reports/Champagne_Preview_Fix_Audit_v2.md`

## Hero Before/After
- **Before:** Preview heroes layered extra ink/multiply overlays that muted the canonical gradient and softened the wave texture.
- **After:** Heroes now render the canonical gradient (`linear-gradient(135deg, var(--brand-magenta) 0%, var(--brand-teal) 60%, var(--brand-gold) 100%)`) directly with the wave texture on top at higher clarity, no darkening overlays, and a lighter glass card using ink + soft gold neutrals.

## Card Surfaces Before/After
- **Before:** Large preview cards and tiles used full-gradient fills with heavy teal/magenta presence, competing with the hero brightness.
- **After:** Cards sit on ink-led dusk surfaces with subtle edge shading, gradient borders for accents, and lighter glass interiors; waves removed from cards to keep them feeling like smoked glass panels rather than mini heroes.

## Canonical + Guard Compliance
- All gradients that reference Champagne canon use the exact string above.
- No new hex codes were added; token file `styles/tokens/smh-champagne-tokens.css` remains unchanged.
- Updates stay confined to the preview stylesheet and audit note.
