# Preview Treatments Canvas Isolation v3 – Final

## File changes
- `reports/Preview_Treatments_Layout_and_Shell_Map_v2.md`
- `app/preview/layout.tsx`
- `app/preview/treatments/layout.tsx`
- `app/preview/treatments/[slug]/page.tsx`

## Route wrapper summaries
- **/preview/treatments**: `<PreviewLayout>` → `<TreatmentsLayout>` → `<div class="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-preview-scope="treatments">` → `<div class="previewCanvas">` → `<main class="cpv-main"> …`.
- **/preview/treatments/whitening**: `<PreviewLayout>` → `<TreatmentsLayout>` → `<div class="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-preview-scope="treatments">` → `<div class="page">` → `<main class="main"> …`.
- **/preview/treatments/composite-bonding**: `<PreviewLayout>` → `<TreatmentsLayout>` → `<div class="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-preview-scope="treatments">` → `<div class="page">` → `<main class="main"> …`.

## Canvas outcomes
- `/preview/treatments/**` now bypasses `PreviewShell`; the top-level canvas for the subtree is solely `.cpv-page.cpv-page--champagne-dark.cpv-page--treatments` in `app/preview/treatments/layout.tsx`.
- No `tl-main`, `tp-main`, or other light wrappers remain on `/preview/treatments/**`; detail preview now uses `cpv-main` with neutral inner shells.
- Background sources for treatments come only from `champagne-preview.css` via the treatments layout; no additional full-page shells are applied.

## Checks
- `pnpm lint` – not run (Node/pnpm executables unavailable in the environment).
- `pnpm build` – not run (Node/pnpm executables unavailable in the environment).
- `pnpm brand:guard` – not run (Node/pnpm executables unavailable in the environment).
- `node scripts/guard-rogue-hex.mjs` – not run (Node executable unavailable in the environment).
- `node scripts/guard-manifest-sync.mjs` – not run (Node executable unavailable in the environment).
