# Preview Treatments Layout Extraction Report

## Layout Changes
- Added `app/preview/layout.tsx` as a pass-through wrapper so route groups can control their own shells.
- Added `app/preview/(with-shell)/layout.tsx` to keep `PreviewShell` for non-treatment preview routes.
- Updated `app/preview/treatments/layout.tsx` to provide a dedicated Champagne dark canvas without `PreviewShell`.

## Layout Stack for /preview/treatments/**
- Global `app/layout.tsx` (unchanged)
- `app/preview/layout.tsx` (pass-through)
- `app/preview/treatments/layout.tsx` (Champagne dark canvas wrapper)
- Treatment page (e.g., `whitening`, `composite-bonding`)

## PreviewShell Exclusion
- `PreviewShell` now only renders inside `app/preview/(with-shell)/layout.tsx`, which does not apply to `/preview/treatments/**`, ensuring treatments are no longer wrapped by the shell.

## Hero Engine Confirmation
- No changes were made to Hero Engine components or presets; treatment pages continue to render heroes via their existing `HeroEngine` wiring.

## Route Behavior
- `/preview/treatments`: Renders on the new Champagne dark canvas without `PreviewShell` while keeping treatment-specific styling.
- `/preview/treatments/whitening`: Renders whitening hero via `HeroEngine` on the dedicated dark canvas without shell flicker.
- `/preview/treatments/composite-bonding`: Renders composite bonding hero via `HeroEngine` on the dedicated dark canvas without shell flicker.

## Notes on Legacy Previews
- `/preview-v2/treatments/**` remain untouched and should be treated as archived preview experiments.
