# Preview Treatments Layout Map v2

| Route | Layout Stack (outer → inner) | Hero component | CTA variants present |
| --- | --- | --- | --- |
| `/preview/treatments` (index + slug variants) | `PreviewShell` → `.cpv-page cpv-page--champagne-dark cpv-page--treatments` (`data-treatment` resolved per slug) | N/A (list view) | CTA modules in cards inherit preview CTA styles if present |
| `/preview/treatments/whitening` | `PreviewShell` → `.cpv-page...` → `<div className={styles.page}>` → `<WhiteningHero>` wrapper | `HeroEngine(schema=whitening_hero)` | Regal Glass–Gold CTAs via preset (`cta-primary-ink-light`, `cta-secondary-glass-gold`) inside hero CTA plate【F:components/preview/treatments/whitening/WhiteningHero.tsx†L1-L12】【F:lib/champagne/hero-presets.ts†L6-L55】 |
| `/preview/treatments/composite-bonding` | `PreviewShell` → `.cpv-page...` → `<div className={styles.page}>` → `<CompositeBondingHero>` wrapper | `HeroEngine(schema=composite_bonding_hero)` | Regal Glass–Gold CTAs via preset; hero CTA plate wraps CTA row【F:components/preview/treatments/composite-bonding/CompositeBondingHero.tsx†L1-L12】【F:components/champagne/hero/HeroCTABar.tsx†L9-L31】 |
| `/preview/treatments/[slug]` fallback | `PreviewShell` → `.cpv-page...` with `data-treatment` from `resolveTreatmentSlug` | Depends on slug implementation; hero engine not invoked directly in generic fallback | CTA presence depends on slot content |

## Layout notes
- `app/preview/layout.tsx` is pass-through; all preview styling is injected from `app/preview/treatments/layout.tsx` imports (`dusk.css`, `champagne-preview.css`, `champagne theme`, preview typography, treatments preview CSS).【F:app/preview/treatments/layout.tsx†L1-L23】【F:app/preview/layout.tsx†L1-L5】
- `PreviewShell` (`components/preview/layout/PreviewShell.tsx`) adds dusk theme data attribute, backdrop, particle layers, and positions header/footer around the main region hosting the hero + treatment sections.【F:components/preview/layout/PreviewShell.tsx†L1-L18】
- Composite bonding also has supporting hero-like section (`CompositeBondingHeroSection`) within the page content, but the actual hero above uses HeroEngine with preset. Whitening page follows the same pattern of hero then stacked sections.【F:app/preview/treatments/composite-bonding/_sections/CompositeBondingHeroSection.tsx†L1-L18】【F:app/preview/treatments/whitening/page.tsx†L19-L38】
