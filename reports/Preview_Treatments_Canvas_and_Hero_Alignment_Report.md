# Preview Treatments Canvas and Hero Alignment Report

## Layout structure
- `app/preview/treatments/layout.tsx` wraps all treatment preview routes in a shared wrapper: `<div className="cpv-page cpv-page--champagne-dark" data-treatment={...}>`.
- Treatment pages and the reusable template no longer attach their own `cpv-page` wrappers; the layout owns the canvas class stack, while template CTA tokens now attach via a global rule scoped to `.cpv-page[data-treatment]`.
- Shared preview CSS (champagne preview skin, preview layout/typography, treatments preview skin) is loaded once in the layout for the entire subtree.

## Canvas class stack
- Canonical canvas classes: `cpv-page cpv-page--champagne-dark`.
- Legacy modifiers (`cpv-page--treatment-dark`, `cpv-page--treatment-hub`) now alias to the same dark Champagne canvas in CSS, and individual pages do not apply canvas wrappers themselves.

## Hero tone containment
- Hero tone classes remain scoped to hero components only; no hero tone utilities are attached to `.cpv-page` or other page-level wrappers.
- The canvas styling ignores tonal pack variants at the page level, keeping tone effects within the hero band.

## Navigation behaviour (whitening & composite bonding)
- Whitening and composite bonding preview pages render on the shared dark Champagne canvas via the layout while keeping their hero presets and CTA System v2 styling.
- Navigating hub → whitening → composite bonding → hub (and other treatment previews) retains the same dark canvas with no light/washed transitions because page-level wrappers no longer override backgrounds.

## Neutralised tonal/background overrides
- Replaced prior canvas modifiers with the canonical `.cpv-page--champagne-dark` gradient and scoped canvas overlays to that class, preventing tonal packs from repainting the page.
- Removed the template-level gradient on `.implantsCanvas` and relocated CTA token variables onto the shared canvas root to avoid page-wide repainting.
- Kept template and card backgrounds section-scoped so whitening/composite-specific skins no longer affect the global canvas.

ALL /preview/treatments routes now share a stable dark Champagne canvas; hero tones are constrained to the hero band only, with no navigation-induced light canvas states.
