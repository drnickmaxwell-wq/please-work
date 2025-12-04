# Champagne CTA System — Regal Glass–Gold (Preview)

The Regal Glass–Gold CTA system is the preview-only call-to-action language used on `/preview/home`. It exists to keep preview CTAs high-contrast, accessible, and token-driven while preserving the sacred hero artwork and Champagne brand canon.

## Shared classes

These classes live in `components/preview/shared/preview-cta.module.css` and are applied via the `PreviewChampagneCTA` component:

- `.ctaBase` – Pill geometry, weight, spacing, and transition foundation for all preview CTAs.
- `.primary` – Core Regal ink fill with white/text-on-ink foreground and gold keyline.
- `.secondary` – Frosted glass-outline pill with gold keyline and white foreground.
- `.primaryHero` – Hero-sized primary modifier (larger padding, stronger shadow) layered on `.primary`.
- `.secondaryHero` – Hero-sized secondary modifier layered on `.secondary` with deeper frost and shadow.
- `.heroCTAGroup` – Flex container for hero CTA pairs, handling gap/stacking responsive behaviour.

Hero-specific plate and alignment helpers live in `components/preview/home/home-preview.module.css`:

- `.heroCtaPlate` – Glass plate that seats the hero copy and CTA pair for added contrast.
- `.heroCtaRow` – Inline-flex row for the CTA pair inside the plate.
- `.heroCtaPrimary` / `.heroCtaSecondary` – Hero-local CTA hooks used alongside the shared variants.

## Visual specification

- **Primary (Regal ink pill)**: Solid ink background (`var(--cta-primary-bg-ink, var(--ink))`), white/text-on-ink copy, 2px soft-gold rim (`var(--cta-border-gold, var(--champagne-keyline-gold))`), pill radius, min-height ≈48px, generous horizontal padding, subtle elevation and -1px hover lift with a slightly stronger shadow.
- **Secondary (Frosted glass-outline pill)**: Semi-opaque glass mix using existing surface/ink tokens, white foreground, 2px soft-gold outline, pill radius, matching height/padding to the primary, hover adds a teal-tinted glass wash and gentle lift while staying lighter than the primary.
- **Hero CTA plate**: Inline-flex glass surface using champagne glass + ink mix at higher opacity, rounded pill silhouette, roomy padding, elevated shadow, and increased blur so the CTA pair is distinct against the bright hero. The plate wraps `.heroCtaRow`, keeping CTAs aligned to the hero copy with responsive stacking.

## Where it is used

The shared Regal Glass–Gold CTAs are wired into the following preview sections on `/preview/home`:
- Hero ("Your Luxury Smile Awaits")
- Trust strip
- Value trio
- Featured treatments
- Implants spotlight
- Tech strip
- Smile gallery strip
- Testimonials
- Comfort block
- Team teaser
- Patient journey strip
- FAQ
- Final CTA band
- `/preview/treatments/whitening` (Whitening treatment hero + CTAs)

## Implementation notes

- Preview-only: this system is scoped to `/preview/home` and should not be applied to production routes.
- Use the shared `PreviewChampagneCTA` component and the classes above when adding or updating preview CTAs; keep this document in sync with any future Manus or Director adjustments.
- No gradients live inside the CTAs; all colour comes from existing ink, gold, and glass tokens plus subtle shadows/blur for elevation.
