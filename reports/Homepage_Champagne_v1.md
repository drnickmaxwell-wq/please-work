# Homepage Champagne v1 Report

## Sections implemented
- Sacred hero: updated headline, calm subheading, and CTA pairing (Book a consultation / Take the AI Smile Quiz).
- Clinic tour band: glass-framed video placeholder with wave/grain overlays, reduced-motion friendly.
- Most requested treatments rail: veneers, implants, orthodontics, whitening cards linking to treatment hubs.
- Technology highlight: bullet-led overview of digital/3D capabilities with CTAs.
- Patient stories teaser: three-story grid with CTA to /patient-stories.
- AI Smile Quiz teaser: benefit list and CTA to /ai-smile-quiz.
- Patient portal teaser: glass band linking to /portal.
- Local proof & map placeholder: Shoreham-by-Sea mention, review score callout, map reserve, LocalBusiness schema.
- Micro-FAQ rail: four zero-click-friendly FAQs with FAQPage JSON-LD.

## Limitations / TODOs
- Clinic tour uses a placeholder; replace `practiceTourVideoSrc` with the final practice tour asset when available.
- Existing lint issues remain outside homepage scope (e.g., legacy require() imports, unused vars). See lint output below.

## Test outcomes
- `pnpm lint` — fails due to pre-existing repo warnings/errors outside homepage changes (require() imports, unused vars, img warnings). See terminal chunk `dd945e` for full list.
- `pnpm test` — passed (brand manifest test).
- `pnpm brand:guard` — passed after removing rogue hex fallbacks.
- `node scripts/guard-rogue-hex.mjs` — passed.
