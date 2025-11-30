# Champagne Lux Preview Components

This folder tracks the preview-only “lux” components that live under `components/preview/lux` and styles in `styles/champagne/lux`. They are meant for experimentation within `/preview/**` routes and should not be wired into production paths until explicitly promoted.

## Scope
- Components: CTA bars, dividers, and card systems designed for the Champagne preview canvas.
- Styles: Shared utilities in `styles/champagne/lux/components.css` that reuse existing Champagne tokens (no raw hex values).
- Helpers: Optional class name exports in `lib/champagne/lux.ts` for preview compositions.

## Motion Language
All motion follows Champagne Motion Language v1: soft hover blooms, shimmer limited to edges, and PRM fallbacks via `prefers-reduced-motion` to disable shimmer/scale while retaining colour and glass treatments.

## Preview-only placement
- Use these components only under `app/preview/**` and `components/preview/**`.
- Do not import into hero or production surfaces; hero-freeze and colour token discipline still apply.
