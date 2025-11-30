# Implants Golden Route Promotion Report

## Files created/updated
- `app/treatments/dental-implants/page.tsx` updated to mount the Champagne treatment experience while keeping existing Service and FAQ JSON-LD.
- `components/treatments/ChampagneTreatmentTemplate.tsx` introduced as the shared Champagne template for production and preview routes.
- `components/treatments/champagne-treatment-template.module.css` moved to a shared location for template styling.
- `components/treatments/ImplantsPage.tsx` created to configure the implants route against the Champagne template.
- `components/preview/treatments/ChampagneTreatmentTemplate.tsx` now wraps the shared template with HUD and schema rendering for preview-only context.

## Production mapping to ChampagneTreatmentTemplate
- `/treatments/dental-implants` (and `/treatments/implants` via alias) now render `ImplantsPage`, which passes the same slug (`implants`), schema key (`implant-process`), finance group (`implants`), gallery flag, FAQ key, and 3D viewer slot flags used by the preview route.
- The shared `ChampagneTreatmentTemplate` preserves the preview section order (hero, benefits, how-it-works tabs + 3D viewer, finance band, gallery placeholder, testimonials, FAQ, CTA) and Champagne glass styling.
- Preview HUD/schema hooks remain isolated to preview routes through the `renderHud` and `renderSchema` slots, keeping production patient-facing.

## Remaining TODOs
- Replace finance placeholders with live finance plan mapping for the `implants` finance group.
- Swap gallery placeholders with approved before/after assets once available.
- Connect the 3D viewer to the final implant GLB/model asset when ready.
- Refine FAQ content when schema-aligned entries are finalised.

## Integrity checks
- No hero assets or token files were modified.
- No new raw hex colour values were added; all styling reuses existing Champagne tokens and utilities.
