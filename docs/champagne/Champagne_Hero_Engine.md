# Champagne Hero Engine

`ChampagneHeroFrame` is a preview-only hero frame that preserves the layered Champagne look (gradient, wave mask, particles, caustics, dust, grain) while allowing visual tuning via variants.

## API

```tsx
import { ChampagneHeroFrame } from "@/components/preview/home/HomeHero";

<ChampagneHeroFrame
  variant="home"
  title="Your Luxury Smile Awaits"
  description="Private dental care with calm precision, comfort-first technology, and a signature Manus AI finish."
  eyebrow="Cosmetic treatment"
  primaryCtaHref="/book"
  primaryCtaLabel="Book a consultation"
  secondaryCtaHref="/treatments"
  secondaryCtaLabel="Explore treatments"
/>
```

- `variant` controls the visual tuning for layers; defaults to `home`.
- `title`, `description`, and CTA props keep the sacred CTA plate and typography intact.
- `eyebrow` adds an optional kicker above the heading.

## Current variants

- `home` — the canonical homepage hero (magenta → teal → gold at 135°) with the existing wave mask, caustics, dust, static particles, and grain balance.
- `whitening` — brighter gradient mix using the same canon hues, with higher caustics/particle sparkle, softened dust, and a gentle vignette lift for the whitening preview route.

## Adding a new variant

1. Extend `HERO_VARIANTS` in `components/preview/home/HomeHero.tsx` with a new key (e.g. `noir`, `dusk`, `teal_lux`).
2. Reuse existing Champagne tokens for gradients (no raw hex) and existing assets from `/public/brand/waves/`, `/public/brand/particles/`, or the Champagne motion layers under `/public/assets/champagne/`.
3. Tune only CSS variables in the config (opacities, brightness/contrast, vignette strength, particle fields) instead of introducing new PNG backgrounds.
4. Render the new variant with `<ChampagneHeroFrame variant="your_variant" />` in preview-only routes.

Staying inside the config map keeps every hero aligned with the Champagne canon while letting us iterate on mood safely.
