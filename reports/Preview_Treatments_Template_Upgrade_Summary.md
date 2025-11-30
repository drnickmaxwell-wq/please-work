# Preview Treatments Template Upgrade Summary

## Files touched
- reports/Preview_Treatment_Template_Adoption_Report.md (updated table for template/schema coverage)
- reports/Preview_Treatments_Template_Upgrade_Summary.md (this log)

## Route-by-route notes
- **/preview/treatments/veneers** — Template wired with slug `veneers`, schema key `veneers-process`, finance plan group `veneers`, gallery and 3D viewer placeholders flagged; schema pack provides service/howto/faq.
- **/preview/treatments/implants** — Template wired with slug `implants`, schema key `implant-process`, finance plan group `implants`, gallery + viewer toggles active; implant schema supplies service/howto/faq graphs.
- **/preview/treatments/dental-implants** — Alias route mirrors implants props (schema key `implant-process`, finance plan `implants`, gallery + viewer toggles) to stay aligned with shared implant schema pack.
- **/preview/treatments/whitening** — Template wired with slug `whitening`, schema key `whitening-process` placeholder, finance plan group `whitening`; TODOs remain for schema binding and finance mapping.
- **/preview/treatments/orthodontics** — Template wired with slug `orthodontics`, schema key `aligner-process`, finance group `aligners`; aligns to spark-aligners schema pack while holding gallery TODOs.
- **/preview/treatments/orthodontics/spark-aligners** — Template wired with slug `orthodontics/spark-aligners`, schema key `aligner-process`, finance group `aligners`, gallery + 3D viewer toggles on; bound to aligner schema pack (service/howto/faq).
- **/preview/treatments/3d-dentistry** — Template wired with slug `3d-dentistry`, schema key `3d-dentistry`, finance group `3d-dentistry`, 3D viewer toggle on; awaiting schema pack and tech card assets.
- **/preview/treatments/technology** — Template wired with slug `technology`, schema key `technology`, finance group `technology`, 3D viewer toggle on; awaiting schema pack and asset mapping.
- **/preview/treatments/general** — Template wired with slug `general`, schema key `general`, finance group `general`; TODOs for schema binding and benefits copy remain.
- **/preview/treatments/cosmetic** — Template wired with slug `cosmetic`, schema key `cosmetic`, finance group `cosmetic`; TODOs for schema binding, gallery, and finance mapping remain.

## Confirmations
- No production routes under `/app/treatments/**` were modified.
- No sacred heroes or hero assets were touched.
- All targeted preview treatment routes continue to share `ChampagneTreatmentTemplate` for layout consistency.

## Report tidy
- Duplicate adoption table removed; the 4-column schema/content version is now canonical.
