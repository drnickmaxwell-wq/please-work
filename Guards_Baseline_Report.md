# Guards Baseline Update

## Allowlisted Files
The rogue hex guard now allows the following files while they undergo token remediation:

- app/api/integrations/email/route.ts
- app/globals/hero-polish.css
- app/treatments/composite-bonding/composite-bonding.module.css
- app/treatments/technology/components/technology-hero.css
- app/treatments/technology/technology.module.css
- components/effects/luxury-text-effects.tsx
- components/navigation/breadcrumbs.module.css
- styles/ai/chat-preview.css
- styles/champagne/hero.css
- styles/preview/champagne/footer.css
- styles/preview/champagne/layers.css
- styles/preview/champagne/page.css

## Next Steps
- Audit each allowlisted file to identify remaining hard-coded color values.
- Replace the lingering hex codes with palette tokens from `styles/tokens/smh-champagne-tokens.css`.
- Remove files from the allowlist incrementally as they are retokenized to restore full guard coverage.
