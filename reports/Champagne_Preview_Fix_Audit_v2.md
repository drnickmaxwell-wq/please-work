# Champagne Preview Fix Audit v2

## Files Changed
- `styles/preview/champagne-preview.css`
- `reports/Champagne_Preview_Fix_Audit_v2.md`

## Hero Before/After
- **Before:** Preview heroes layered extra ink/multiply overlays that muted the canonical gradient and softened the wave texture.
- **After:** Heroes now rely solely on the canonical gradient (`linear-gradient(135deg, var(--brand-magenta) 0%, var(--brand-teal) 60%, var(--brand-gold) 100%)`) with a clearer wave on top and brighter glass content cards mixed from ink and white tokens for a closer match to the home hero.

## Card Surfaces Before/After
- **Before:** Large preview cards and tiles used full-gradient fills with heavy teal/magenta presence, competing with the hero brightness.
- **After:** Cards sit on softened ink-and-white glass mixes with subdued edge shading and gradient borders as accents, keeping interiors lighter than the frame and reserving full gradient power for the hero.

## Canonical + Guard Compliance
- All gradients that reference Champagne canon use the exact string above.
- No new hex codes were added; token file `styles/tokens/smh-champagne-tokens.css` remains unchanged.
- Updates stay confined to the preview stylesheet and audit note.
