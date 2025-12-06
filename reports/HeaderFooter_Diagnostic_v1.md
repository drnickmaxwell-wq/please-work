# Header & Footer Diagnostic (v1)

## Header inventory and mounting
- **Root layout (`app/layout.tsx`)** mounts `<StickyHeader />` ahead of the main content for all non-preview routes.
- **PerformanceOptimizedLayout (`components/layout/performance-optimized-layout.tsx`)** also renders `<StickyHeader />` by default inside the page wrapper, which stacks a second header on production routes that use this layout.
- **ChampagneHeader (`components/navigation/ChampagneHeader.tsx`)** appears when pages opt into `ChampagneLayout` (preview skeletons and luxe previews) and is independent of the primary StickyHeader.

### Why two headers appear
The global `app/layout.tsx` renders `StickyHeader`, and `PerformanceOptimizedLayout` renders another `StickyHeader` when `showHeader` is left at its default `true` value. Pages wrapped with `PerformanceOptimizedLayout` therefore display two headers unless the inner header is disabled.

## Footer files and stylesheets
- **Production footer:** `components/layout/FooterLuxe.tsx` exported via `components/layout/footer.tsx` with inline styling blocks.
- **Shared stylesheet:** `components/footer-luxe.module.css` (used by preview/footer-luxe route) and legacy `styles/footer/footer-lux.css` referenced in audits.
- **Preview scaffolds:** `components/footer-luxe.tsx` plus `components/preview/FooterLuxePreview.tsx` and route `app/preview/footer-luxe/page.tsx` for QA.

## Manus footer manifest
- Manifest snapshot lists the Champagne footer entry at `reports/Manus_Manifests_Snapshot.json` under id `footer-champagne`, mapping to `components/imports/footer-champagne/Footer.tsx` with `styles/champagne/footer.css` and wave mask assets.

## Refactor targets (future work only)
- Deduplicate `StickyHeader` by toggling `showHeader={false}` when wrapping pages with `PerformanceOptimizedLayout`, or centralise header responsibility in one shell.
- Align production footer with the manifest-backed `footer-champagne` implementation to reduce divergence between preview and live shells.
- Consolidate footer styling between `FooterLuxe` inline CSS, `components/footer-luxe.module.css`, and `styles/footer/footer-lux.css` to avoid drift.

## Guard status
- `pnpm brand:guard` failed: pnpm CLI not available in the environment.
- `node scripts/guard-rogue-hex.mjs` failed: `node` command unavailable.
- `node scripts/guard-manifest-sync.mjs` failed: `node` command unavailable.
