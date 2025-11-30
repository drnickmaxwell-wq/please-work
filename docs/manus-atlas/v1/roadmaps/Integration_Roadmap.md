# Integration Roadmap

[Integration_Roadmap.md](https://github.com/user-attachments/files/23839670/Integration_Roadmap.md)
# Integration Roadmap
Champagne Ecosystem — St Mary’s House Dental

## Goal
Describe how to turn Manus + Champagne design assets into real, reusable components
in the Next.js Champagne repo (App Router + Tailwind tokens).

## Build Order

1. Global Effects & Tokens
   - Install wave masks, particles, film grain, glass overlays.
   - Implement gradient generator using Champagne tokens (no raw hex).
   - Add motion defaults (PRM-safe).

2. Canonical Hero Component
   - Create components/hero/ChampagneHero.tsx.
   - Use restored home/composite hero as visual reference.
   - Props: title, subtitle, CTAs, badges, media slots, flags for waves/particles/grain.

3. Layout Shell
   - Create components/layout/ChampagneLayout.tsx.
   - Includes header, footer, cookie/GDPR, scroll restore, theme toggle.

4. Card System
   - Implement TreatmentCard, AIWidgetCard, TestimonialCard, TeamCard.
   - Use composite polished body & AI cards as master reference.

5. FAQ Component
   - Implement components/faq/ChampagneFAQ.tsx.
   - AA compliant, schema-ready, accordion pattern.

6. CTA Component
   - Implement components/cta/ChampagneCTA.tsx.
   - Dual CTA layout (gradient + glass).

7. Testimonials
   - Implement ChampagneTestimonial + ChampagneTestimonialCarousel.

8. AI Tools
   - Implement CostEstimator, TimePredictor, ARSmileTryOn components.

9. 3D Viewer Slot
   - Implement components/3d/Champagne3DViewer.tsx as a wrapper for model/AR integrations.

## Page Assembly

- Home: ChampagneHero + SignatureTreatmentGrid + TechnologyStrip + Testimonials + FAQ + CTA.
- Composite Bonding: ChampagneHero + TabsOverview + AI tools + Testimonials + FAQ + CTA.
- Technology: ChampagneHero + 3DViewer section + Tech card grid + CTA.

## Exclusions
- Do not import Manus raw heroes or early CTA/Faq variants.
- Archive but do not use outdated cards and gradients.

## Codex Process
- Read this roadmap + JSON catalogs.
- Create components and wire them into app/ routes.
- Run brand/motion/colour guards.

End of Integration Roadmap.
