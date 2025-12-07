# Preview header/footer normalisation
- Remove production `StickyHeader`/`FooterLuxe` from all `/preview/lux/**` pages (gallery, technology, smile-ai, referrals, team, team/[slug], legal, privacy, cookies, terms, locations, patient-stories) because `PreviewShell` already supplies champagne header/footer.
- Drop `ChampagneLayout` from `/preview/skeleton` when running inside `PreviewShell` to avoid double champagne chrome.
- For `/preview/footer-luxe`, rely on shell footer when testing to prevent double footers.

# Preview background normalisation
- Align `/preview/lux/**` pages with the dark preview canvas by removing `bg-white` wrappers that conflict with `data-theme="preview-dusk"`.
- Tone down light overlays in `/preview/why-hero-grey`, `/preview/brand-live`, and `/preview/manus-manifest` to avoid glass-on-dark clashes.
- Ensure treatments routes keep the `cpv-page` canvas and avoid adding ad-hoc `bg-white` utilities when new sections are added.

# Legacy or redundant preview routes
- `/preview-v2/treatments/**` is labeled legacy in `app/preview-v2/layout.tsx`; it duplicates newer `/preview/treatments/**` flows and could likely be retired after confirming no external references.
- `/preview/footer-luxe` is a standalone footer test inside the shell; consider replacing with storybook-like tooling instead of a full preview route.
- `/preview/treatments-stubs` appears to be a stub-only prototype; confirm usage before keeping.

# Suggested refactor plan (no code yet)
1. Standardise all `/preview/**` routes on `PreviewShell` without embedding production headers/footers; strip `StickyHeader`, `FooterLuxe`, and `ChampagneLayout` where the shell is already present.
2. Normalize preview backgrounds by removing `bg-white`/light overlays on preview pages and rely on shell theming or `.cpv-page` surfaces.
3. Audit navigation and manifests to remove links to `/preview-v2/treatments/**`, `/preview/footer-luxe`, and `/preview/treatments-stubs` if unused; archive prototypes.
4. Add a small preview guideline doc to prevent reintroducing production chrome or light canvases into shell-backed previews.
