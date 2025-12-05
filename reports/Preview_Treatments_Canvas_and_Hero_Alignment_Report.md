# Preview Treatments Canvas and Hero Alignment Report

## Layout structure
- `app/preview/treatments/layout.tsx` now wraps all treatment preview routes in a shared wrapper: `<div className="cpv-page cpv-page--treatment-dark cpv-page--treatment-hub" data-treatment={...}>`.
- The layout resolves `data-treatment` from route params (mapping composite-bonding → composite, dental-implants → implants, defaulting to general) so every treatment path inherits consistent canvas variables.
- Shared preview CSS (`champagne-preview`, preview layout/typography, treatments preview skin) is loaded once in the layout for the entire subtree.

## Canvas class stack
- Unified canvas classes: `cpv-page cpv-page--treatment-dark cpv-page--treatment-hub`.
- Individual pages no longer apply `cpv-page` or tonal modifiers directly; they render inside the shared canvas.

## Hero tone containment
- Hero tone classes remain scoped to hero components only; no hero tone utilities are attached to `.cpv-page` or other page-level wrappers.
- The canvas styling now ignores tonal pack variants at the page level, keeping hero-only tone effects.

## Navigation behaviour (whitening & composite bonding)
- Whitening and composite bonding preview pages render on the shared dark Champagne canvas via the layout while keeping their hero presets and CTA System v2 styling.
- Navigating hub → whitening → composite bonding → hub retains the same dark canvas without light/washed transitions because page-level wrappers no longer override backgrounds.

## Neutralised tonal/background overrides
- Removed the hub-specific background override from `preview-treatments.module.css` so tonal experiments no longer repaint the canvas.
- Standardised the base `.cpv-page` background to a neutral ink-led gradient while `.cpv-page--treatment-dark` provides the dedicated dark Champagne treatment canvas.

ALL /preview/treatments routes now share a stable dark Champagne canvas; hero tones are constrained to the hero band only.
