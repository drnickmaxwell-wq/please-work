# Guard Fix Report

## Relocated preview scaffolds
- Moved composite bonding sections to `app/preview/treatments/composite-bonding/_sections/*`.
- Shifted shared scaffolds into `components/preview/**` and updated section imports accordingly.
- Added a preview showcase page banner and metadata to enforce noindex behaviour.

## Updated references
- `app/preview/treatments/composite-bonding/page.tsx` now renders each section from the preview namespace.
- `reports/Manus_Section_Catalog.json` paths now target `/app/preview/**` with `stage: "preview"` for every composite bonding entry.
- `reports/Scaffold_Report.md` documents the relocation and promotion plan, and `/app/preview/treatments/composite-bonding/README.md` outlines the release handoff.

## Guard status
- `pnpm run brand:guard`
- `node scripts/guard-rogue-hex.mjs`
- `node scripts/guard-preview-only.mjs`
- `node scripts/guard-manifest-sync.mjs`
- `node scripts/guard-asset-size.mjs`
- `node scripts/guard-sacred-routes.mjs`

All guard commands pass locally after the relocation.

## Next steps
- When the sections are approved, branch from `main` using `release/composite-bonding-stage-1`.
- Promote the preview components into the production `app/treatments/composite-bonding` route and update the Manus catalog stage to `live`.
