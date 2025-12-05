# Preview Treatments Layout and Shell Map v2

## Layout chain for treatments previews
- **app/preview/layout.tsx** → wraps all preview routes in `<PreviewShell>` (imports dusk + champagne theme CSS). PreviewShell renders a `.cpvShell` div with header/footer and a `<main>` slot.
- **app/preview/treatments/layout.tsx** → nests inside PreviewShell. Adds a `<div class="cpv-page cpv-page--champagne-dark cpv-page--treatments">` with `data-treatment` and `data-preview-scope` attributes derived from the slug.
- **Additional wrappers**
  - `PreviewShell` component (`components/preview/layout/PreviewShell.tsx`) adds `.cpvShell`, `.cpvBackdrop`, and `.cpvParticles` layers plus `.cpvInner` flex column.
  - Individual treatment pages add their own local containers (e.g., `.previewCanvas` for the hub, `.page` for whitening/composite) but these sit inside the `.cpv-page` wrapper.

## Canvas class stacks currently applied
- **/preview/treatments (hub)**
  - `<PreviewShell>` → `<div class="cpvShell ..." data-theme="preview-dusk">` → `<div class="cpvBackdrop"/>` + `<div class="cpvParticles"/>` → `<div class="cpvInner">` → `<div class="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-treatment="general" data-preview-scope="treatments">` → `<div class="[module] previewCanvas">` → `<main class="cpv-main"> ...`.
- **/preview/treatments/whitening**
  - Same PreviewShell chain → `.cpv-page cpv-page--champagne-dark cpv-page--treatments` (data-treatment="whitening") → `<div class="[module] page">` → `<main class="[module] main"> ...`.
- **/preview/treatments/composite-bonding**
  - Same PreviewShell chain → `.cpv-page cpv-page--champagne-dark cpv-page--treatments` (data-treatment="composite") → `<div class="[module] page">` → `<main class="[module] main"> ...`.
- **Other routes using ChampagneTreatmentTemplate (veneers, implants, orthodontics, etc.)**
  - Same PreviewShell chain → `.cpv-page cpv-page--champagne-dark cpv-page--treatments` → `<main class="cpv-main">` within the template sections.

## Shell / background sources
- **PreviewShell usage**: Applied to all `/preview/*` routes via `app/preview/layout.tsx`. Treatments inherit its `.cpvShell` gradient backdrop, particles, and inner container.
- **Page-level backgrounds**:
  - `.cpvShell` gradient and particle overlays from `components/preview/layout/preview-shell.module.css` paint the full viewport unless a `.cpv-page--treatments` descends (currently still present but backdrop hidden via `:has`).
  - `.cpv-page.cpv-page--champagne-dark.cpv-page--treatments` in `styles/preview/champagne-preview.css` provides the Champagne dark canvas and gradients for treatments pages.
- **Preview shell gradients**: Defined in `components/preview/layout/preview-shell.module.css` (`.cpvShell`, `.cpvBackdrop`, `.cpvParticles`).
- **Light treatment surfaces**: Legacy light skins live in `styles/preview/treatments-light.css` and are imported by `app/preview/treatments-light/page.tsx` and `components/treatments-light` helpers; the current `/preview/treatments/**` pages do not import them. Older classes like `tl-main`/`tp-main` are part of those light styles but are not present in the active treatments pages.
