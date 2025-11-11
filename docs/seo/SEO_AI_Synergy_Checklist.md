[SEO_AI_Synergy_Checklist.md](https://github.com/user-attachments/files/23471264/SEO_AI_Synergy_Checklist.md)
# SEO × AI Synergy Checklist (Champagne System)

## Global
- [ ] JSON‑LD on every route using Next.js `generateMetadata`/`Viewport` and route‑level components.
- [ ] Organization + LocalBusiness (Dentist) with NAP, `openingHoursSpecification`, `geo`, `hasMap`, and `sameAs` (GMB, Instagram, Facebook).
- [ ] WebSite + SearchAction for sitelinks search box.
- [ ] Review/AggregateRating eligible on home and patient‑stories hub (follow Google review snippet policies).
- [ ] FAQPage blocks injected via CMS per route (max 2–4 per page for quality).

## Home `/`
- [ ] LCP image preloaded (`fetchpriority=high`, width/height set).
- [ ] Hero copy answers “who/what/where” in 15 words for AI Overviews.
- [ ] Add mini‑HowTo card linking to veneers/aligners process.

## Treatments `/treatments/:slug`
- [ ] Service or MedicalProcedure schema; include `areaServed`, `offers`, `provider`.
- [ ] HowTo steps with clear `name`, `step`, and `supply`/`tool` as applicable.
- [ ] Speakable headings: “What does [treatment] cost?”, “How long does it take?”
- [ ] VideoObject (when present) with `thumbnailUrl`, `uploadDate`, `duration`.
- [ ] Internal links: to patient stories and related services.

## Technology `/technology`
- [ ] Product markup for named devices; link to manufacturer where allowed.
- [ ] FAQPage: radiation dose, sterilisation, calibration, maintenance.

## About `/about`
- [ ] Person (embedded) for each clinician (GDC #, `knowsAbout`, `affiliation`).
- [ ] Organization `foundingDate`, `award`, `memberOf`, `slogan`.

## Patient Stories `/patient-stories`
- [ ] Each story uses Review or CreativeWork with `author` and consented images (ImageObject).
- [ ] Add `medicalSpecialty` mappings (cosmeticDentistry, prosthodontics, orthodontics).

## AI Smile Quiz `/ai-smile-quiz`
- [ ] HowTo (steps) + FAQ on privacy and photo use; SoftwareApplication if exposing features.
- [ ] Return result pages with canonical links to treatment pages.

## Portal `/portal`
- [ ] SoftwareApplication with `applicationCategory` “HealthApplication”; security FAQ.

## Contact `/contact`
- [ ] LocalBusiness with `ContactPoint` entries (`contactType`: bookings, emergencies).

## Lighthouse & CWV
- [ ] LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.
- [ ] Fonts: Montserrat/Lora/Inter with `font-display: swap` and subsetted ranges.
- [ ] Script islands for heavy widgets (3D viewer, chatbot) with idle hydration.
- [ ] image `loading=lazy` below the fold; all media dimensioned to avoid CLS.

## E‑E‑A‑T
- [ ] Author boxes (clinicians) on posts with credentials and links to GDC.
- [ ] Clear ownership, address, complaints policy, and medical disclaimers.
- [ ] Last‑reviewed dates and reviewer (clinician) on clinical pages.
