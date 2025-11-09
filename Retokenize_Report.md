# Retokenize Report — Rogue Tailwind Hues

## Files updated
- app/api/integrations/email/route.ts
- app/globals/hero-polish.css
- app/treatments/composite-bonding/composite-bonding.module.css
- app/treatments/technology/components/technology-hero.css
- app/treatments/technology/technology.module.css
- components/ai/luxury-chatbot.tsx
- components/effects/luxury-text-effects.tsx
- components/navigation/breadcrumbs.module.css
- styles/ai/chat-preview.css
- styles/champagne/hero.css
- styles/champagne/manifest.json
- styles/preview/champagne/footer.css
- styles/preview/champagne/layers.css
- styles/preview/champagne/page.css
- docs/token-mapping.md (new)

## Guard runs
- `pnpm run brand:guard` → ✅ No rogue hex detected; manifests OK (4/4).
- `pnpm run guard:hero` → ✅ Hero freeze verified and film grain checksum confirmed.

## Suggested next clean-ups
- Audit remaining `rgba(0, 0, 0, …)` shadow utilities across the repo to see if they should also funnel through a shared tokenized helper.
- Ensure future email templates load CSS variables (e.g., centralised `<style>` block) so inline brand gradients are token-driven without inline repetition.
- Add documentation on acceptable `color-mix` usage patterns to help designers translate palette tweaks into token-safe expressions.
