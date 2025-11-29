# Preview Canvas Polish v4

## Files touched
- app/preview/home/page.tsx
- app/preview/treatments/page.tsx
- components/preview/preview-layout.css
- components/preview/preview-typography.css
- components/preview/sections/treatments/TreatmentPreviewPage.tsx
- components/preview/sections/technology/PreviewEquipmentGallery.tsx
- components/preview/sections/technology/PreviewWorkflow.tsx
- components/preview/sections/technology/preview-technology.module.css
- styles/champagne/footer-preview.css
- styles/preview/treatments-preview.css

## Before/After notes
- **Preview home**: adopted the shared preview layout + typography imports so hero and downstream sections inherit the new card shells and consistent eyebrow/lead sizing for better readability on the dusk gradient.
- **Treatments hub**: concern rail and detail cards now sit on unified glass shells with stronger kickers, softer shadows, and hover keylines; section padding flows through the shared layout utilities for clearer separation.
- **Example treatment (veneers)**: benefits, how-it-works, tech rail, stories, and 3D placeholder now reuse the same cpv-card surfaces/frames with brighter text and dashed glass framing around the viewer placeholder.

## Canonical preview styles
- Card family: `.cpv-card`, `.cpv-card--soft`, `.cpv-card--bright`, with `--cpv-card-surface`/`--cpv-card-border` tokens supplying glass backgrounds, gold keylines, and soft ambient shadow.
- Typography: `.text-eyebrow`, `.text-lead`, `.text-body` aligned to `--cpv-page-text` and `--cpv-page-text-soft` for consistent headings, leads, and body contrast across preview pages.
