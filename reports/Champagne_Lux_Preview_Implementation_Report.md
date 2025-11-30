# Lux Components Preview Implementation Report

## Files touched
- `styles/champagne/lux/components.css`
- `lib/champagne/lux.ts`
- `components/preview/lux/GoldRefractCtaBar.tsx`
- `components/preview/lux/gold-refract-cta-bar.module.css`
- `components/preview/lux/FloatingSignatureCards.tsx`
- `components/preview/lux/floating-signature-cards.module.css`
- `components/preview/lux/ChampagneDuskDivider.tsx`
- `components/preview/lux/SilentHorizonDivider.tsx`
- `components/preview/treatments/ChampagneTreatmentTemplate.tsx`
- `app/preview/treatments/veneers/page.tsx`
- `app/preview/treatments/implants/page.tsx`
- `app/preview/lux/team/page.tsx`
- `app/preview/lux/patient-stories/page.tsx`
- `docs/champagne/Champagne_Luxury_Component_Registry.md`
- `docs/champagne/lux/README.md`

## Preview routes updated
- `/preview/treatments/veneers`: Uses Dusk divider before FAQ and the Gold Refract CTA Bar.
- `/preview/treatments/implants`: Uses Silent Horizon divider before FAQ and the Gold Refract CTA Bar.
- `/preview/lux/team`: Demonstrates Floating Signature Cards for four team members.
- `/preview/lux/patient-stories`: Includes the Silent Horizon Divider between hero and stories grid.

## Notes / TODOs for V1.5/V2
- Extend CTA bar to support contextual icons and surface analytics hooks when promoted.
- Add avatar sourcing for Floating Signature Cards once approved assets are available.
- Consider wiring dividers into additional preview treatments (orthodontics, whitening) after QA.
- Evaluate Silent Horizon particle density against Motion Language v1 when broader routes adopt it.
