# Preview V2 Treatments Lab Report

## Routing + Layout
- New entry point: `/preview-v2/layout.tsx` wraps all V2 pages in `cpv-v2-shell cpv-v2-shell--champagne-dark`.
- Treatments subtree: `/preview-v2/treatments/layout.tsx` wraps treatment pages with `<main class="cpv-v2-treatments">`.
- Hub route: `/preview-v2/treatments` lists treatment previews; child routes include:
  - `/preview-v2/treatments/whitening`
  - `/preview-v2/treatments/composite-bonding`
  - `/preview-v2/treatments/implants`
  - `/preview-v2/treatments/veneers`
  - `/preview-v2/treatments/orthodontics`

## Canvas + Shell Notes
- Outer wrapper uses `cpv-v2-shell cpv-v2-shell--champagne-dark` from `styles/preview/preview-v2-treatments.css` to provide a dark champagne canvas (radial + linear gradients) with on-dark text tokens and page padding.
- No PreviewShell, `tl-main`, or `tp-main` wrappers are imported anywhere in `/preview-v2/**`.
- Existing `/preview/treatments/**` files remain untouched.

## Hero Engine Wiring
- `/preview-v2/treatments/whitening` → `whitening_hero` via `HeroEngine`.
- `/preview-v2/treatments/composite-bonding` → `composite_bonding_hero`.
- `/preview-v2/treatments/implants` → `implants_hero`.
- `/preview-v2/treatments/veneers` → `veneers_hero`.
- `/preview-v2/treatments/orthodontics` → `ortho_hero` (orthodontics preset alias).

## Body Structure
- Hub page uses `cpv-card cpv-card--soft` cards in a responsive grid to link to each treatment preview.
- Whitening and composite bonding pages include a short intro, "Your journey" list, and Regal Glass–Gold CTA band built with CTA v2 classes (`cta-primary-ink-light`, `cta-secondary-glass-gold`).
- Implants, veneers, and orthodontics pages render the hero with a simple supporting paragraph to keep the focus on the canvas and hero engine.

## Checks
- `pnpm lint` *(failed: pnpm unavailable in container)*.
- `npm run lint` *(failed: npm unavailable in container)*.
