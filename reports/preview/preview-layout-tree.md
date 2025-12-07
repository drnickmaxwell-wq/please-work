# Preview layout tree

## Root chain
- `app/layout.tsx` applies global fonts and sets a dark body background (`bg-[var(--smh-ink)]`), but only renders the production `StickyHeader` + `Footer` when `usePreviewShell` is false. Preview routes (those under `/preview` and `/champagne-preview`) skip the production header/footer and render children directly within a dark wrapper.
- `app/preview/layout.tsx` is a pass-through wrapper for all `/preview/**` segments.
- `app/preview/(with-shell)/layout.tsx` wraps grouped preview routes with `PreviewShell` and imports both `styles/preview/dusk.css` and `styles/champagne/theme.css`.
- `app/preview/treatments/layout.tsx` wraps all `/preview/treatments/**` routes with `PreviewShell`, adds champagne + dusk styles, and wraps content in `.cpv-page.cpv-page--champagne-dark.cpv-page--treatments`.
- `app/preview-v2/layout.tsx` (legacy) also wraps children with `PreviewShell` plus champagne + dusk styles, tagging the scope as `treatments` and `preview-v2`.

### Additional nested layouts
- `/preview/hero-gilded` adds `app/preview/(with-shell)/hero-gilded/layout.tsx`, which imports `styles/champagne/hero-gilded-polish.css` but otherwise passes children through.
- `/preview-v2/treatments` adds `app/preview-v2/treatments/layout.tsx` (wraps children in a `.cpv-v2-shell cpv-v2-shell--champagne-dark` container).

## Per-route layout chains
- `/preview/*` routes inside `(with-shell)`: `app/layout.tsx` → `app/preview/layout.tsx` → `app/preview/(with-shell)/layout.tsx` → page (e.g., `/preview/technology`, `/preview/home`, `/preview/champagne`, `/preview/brand-live`, `/preview/chat`, `/preview/champagne-phase2`, `/preview/skeleton`, `/preview/ai24-home`, `/preview/brand-lock`, `/preview/treatments-stubs`, `/preview/footer-luxe`, `/preview/manus-audit`, `/preview/champagne-skin`, `/preview/why-hero-grey`, `/preview/treatments-light`, `/preview/hero-gilded`, `/preview/champagne`, `/preview/manus-manifest`).
- `/preview/lux/**` routes share the same chain: `app/layout.tsx` → `app/preview/layout.tsx` → `app/preview/(with-shell)/layout.tsx` → page (including `/preview/lux`, `/preview/lux/gallery`, `/preview/lux/technology`, `/preview/lux/smile-ai`, `/preview/lux/referrals`, `/preview/lux/team`, `/preview/lux/team/[slug]`, `/preview/lux/legal`, `/preview/lux/legal/privacy`, `/preview/lux/legal/cookies`, `/preview/lux/legal/terms`, `/preview/lux/locations/*`, `/preview/lux/patient-stories`).
- `/preview/treatments/**` routes: `app/layout.tsx` → `app/preview/layout.tsx` → `app/preview/treatments/layout.tsx` → page (hub page and specific treatments including dynamic `[slug]`).
- `/preview-v2/**` routes: `app/layout.tsx` → `app/preview-v2/layout.tsx` → `app/preview-v2/treatments/layout.tsx` (for treatment pages) → page.
