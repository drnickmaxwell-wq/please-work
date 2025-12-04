# Champagne CTA System (Preview)

Preview-only CTA variants keep hero surfaces disciplined while giving sections enough contrast. Use these variants on `/preview` routes only.

## Variants

- **primaryHero**: Ink pill with a soft-gold keyline. Use for the leading action on preview heroes. No gradients allowed.
- **secondaryHero**: Glass-outline pill with soft-gold border and ink/white mix text. Pair with `primaryHero` inside hero glass panels.
- **primarySection**: Champagne gradient pill (135° magenta → teal → soft-gold) for main actions on neutral sections.
- **secondarySection**: Glass-outline pill for secondary actions on neutral sections.
- **primaryClinical**: Ink pill with white text and optional soft-gold border for clinically focused or visually heavy backdrops where gradients would clash.

## Placement rules

- Heroes: Use `primaryHero` and `secondaryHero` only. Gradient CTAs must **never** sit on hero surfaces.
- Neutral sections (white, ink, or calm panels): Use `primarySection` for the main action and `secondarySection` for supporting links.
- Clinical or visually dense sections (deep gradients, layered waves): Prefer `primaryClinical` or `primaryHero` styling instead of gradients to avoid colour conflicts.
- Final CTA bands: Pair `primarySection` with `secondarySection` unless the background is heavy, in which case swap the primary for `primaryClinical`.

## Do / Don’t

**Do**
- Keep gold limited to borders/keylines (≤4% usage) and rely on ink or gradient fills for contrast.
- Use the shared `ChampagneCta` component so future updates stay consistent across preview pages.
- Stay on preview routes; production heroes and `/app/page.tsx` remain untouched.

**Don’t**
- Place gradient CTAs on hero glass panels or layered hero backdrops.
- Introduce new hex codes—always reference existing Champagne tokens.
- Bypass the shared CTA variants with ad-hoc buttons in preview layouts.
