# Preview Treatment Template Adoption Report

This report tracks where the Champagne treatment template is applied across preview routes and what content/schema gaps remain (from `config/champagne/page-architecture.json`).

| preview_route | template_status | schema_status | content_todos |
| --- | --- | --- | --- |
| /preview/treatments/veneers | Uses `ChampagneTreatmentTemplate` | Bound to veneers schema pack (service, howto, faq) | gallery_assets, finance_plan_mapping, 3d_viewer_asset |
| /preview/treatments/implants | Uses `ChampagneTreatmentTemplate` | Bound to implants schema pack (service, howto, faq) | implant_glb_asset, finance_plan_mapping, gallery_assets |
| /preview/treatments/dental-implants | Uses `ChampagneTreatmentTemplate` | Alias to implants schema pack via implant-process | implant_glb_asset, finance_plan_mapping, gallery_assets |
| /preview/treatments/whitening | Uses `ChampagneTreatmentTemplate` | TODO: schema_pack_binding | benefits_copy, finance_plan_mapping, gallery_assets |
| /preview/treatments/orthodontics | Uses `ChampagneTreatmentTemplate` | Aligner schema pack via spark-aligners route | benefits_copy, gallery_assets, aligner_schema_verification |
| /preview/treatments/orthodontics/spark-aligners | Uses `ChampagneTreatmentTemplate` | Bound to aligner schema pack (service, howto, faq) | aligner_howto_schema_sync, gallery_assets, 3d_viewer_asset |
| /preview/treatments/3d-dentistry | Uses `ChampagneTreatmentTemplate` | TODO: schema_pack_binding | tech_cards, howto_schema, 3d_viewer_asset, finance_plan_mapping, gallery_assets |
| /preview/treatments/technology | Uses `ChampagneTreatmentTemplate` | TODO: schema_pack_binding | tech_cards, schema_map, 3d_viewer_asset, finance_plan_mapping, gallery_assets |
| /preview/treatments/general | Uses `ChampagneTreatmentTemplate` | TODO: schema_pack_binding | benefits_copy, finance_plan_mapping |
| /preview/treatments/cosmetic | Uses `ChampagneTreatmentTemplate` | TODO: schema_pack_binding | benefits_copy, gallery_assets, finance_plan_mapping |
