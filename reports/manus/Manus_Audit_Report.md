[Manus_Audit_Report (3).md](https://github.com/user-attachments/files/23471292/Manus_Audit_Report.3.md)
# Manus Audit Report — Champagne Ecosystem

Canon enforced: tokens-only, gradient law 135°, motion PRM, layer stack.

## Compliance Table

| Route | Section | Status | Schema | Notes |
|---|---|---|---|---|
| / | hero | ready | Organization, LocalBusiness, WebSite, FAQPage, BreadcrumbList, AggregateRating | Compliant structure; ensure tokenised colours and AA contrast. |
| / | value-trio | missing |  | Missing assets in packs; author or map from existing FX. |
| / | patient-stories | missing | ItemList | Missing assets in packs; author or map from existing FX. |
| / | priority-treatments | missing | Service | Missing assets in packs; author or map from existing FX. |
| / | 3d-ar | ready | VideoObject | Compliant structure; ensure tokenised colours and AA contrast. |
| / | ai-concierge | ready | SoftwareApplication | Compliant structure; ensure tokenised colours and AA contrast. |
| / | teleconsult | missing | HowTo | Missing assets in packs; author or map from existing FX. |
| / | finance | missing | Offer | Missing assets in packs; author or map from existing FX. |
| / | faq | missing | FAQPage | Missing assets in packs; author or map from existing FX. |
| / | local-proof | missing | LocalBusiness | Missing assets in packs; author or map from existing FX. |
| / | footer | ready |  | Compliant structure; ensure tokenised colours and AA contrast. |
| /treatments/[slug] | hero | missing | Service, BreadcrumbList | Missing assets in packs; author or map from existing FX. |
| /treatments/[slug] | symptoms-benefits | missing | Service | Missing assets in packs; author or map from existing FX. |
| /treatments/[slug] | how-it-works | missing | HowTo, VideoObject | Missing assets in packs; author or map from existing FX. |
| /treatments/[slug] | eligibility | missing |  | Missing assets in packs; author or map from existing FX. |
| /treatments/[slug] | results | missing |  | Missing assets in packs; author or map from existing FX. |
| /treatments/[slug] | gallery | missing | ImageObject, ItemList | Missing assets in packs; author or map from existing FX. |
| /treatments/[slug] | pricing | missing | Offer | Missing assets in packs; author or map from existing FX. |
| /treatments/[slug] | 3d-ar | missing | VideoObject | Missing assets in packs; author or map from existing FX. |
| /treatments/[slug] | experts | missing | Person | Missing assets in packs; author or map from existing FX. |
| /treatments/[slug] | faqs | missing | FAQPage | Missing assets in packs; author or map from existing FX. |
| /treatments/[slug] | cta | missing |  | Missing assets in packs; author or map from existing FX. |
| /technology | hero | missing | BreadcrumbList | Missing assets in packs; author or map from existing FX. |
| /technology | tech-grid | missing | Product | Missing assets in packs; author or map from existing FX. |
| /technology | demo | missing | VideoObject | Missing assets in packs; author or map from existing FX. |
| /technology | cases | missing |  | Missing assets in packs; author or map from existing FX. |
| /technology | faq | missing | FAQPage | Missing assets in packs; author or map from existing FX. |
| /technology | cta | missing |  | Missing assets in packs; author or map from existing FX. |
| /about | hero | missing | Organization | Missing assets in packs; author or map from existing FX. |
| /about | team | missing | Person | Missing assets in packs; author or map from existing FX. |
| /about | tour | missing | VideoObject | Missing assets in packs; author or map from existing FX. |
| /about | values | missing |  | Missing assets in packs; author or map from existing FX. |
| /about | safety | missing |  | Missing assets in packs; author or map from existing FX. |
| /about | press | missing |  | Missing assets in packs; author or map from existing FX. |
| /about | faq | missing | FAQPage | Missing assets in packs; author or map from existing FX. |
| /about | cta | missing |  | Missing assets in packs; author or map from existing FX. |
| /patient-stories | filters | missing |  | Missing assets in packs; author or map from existing FX. |
| /patient-stories | grid | missing | CollectionPage | Missing assets in packs; author or map from existing FX. |
| /patient-stories | pagination | missing |  | Missing assets in packs; author or map from existing FX. |
| /ai-smile-quiz | intro | missing |  | Missing assets in packs; author or map from existing FX. |
| /ai-smile-quiz | steps | missing | HowTo | Missing assets in packs; author or map from existing FX. |
| /ai-smile-quiz | results | missing | SoftwareApplication, FAQPage | Missing assets in packs; author or map from existing FX. |
| /portal | overview | missing | SoftwareApplication | Missing assets in packs; author or map from existing FX. |
| /portal | cta | missing |  | Missing assets in packs; author or map from existing FX. |
| /contact | smart-contact | missing | ContactPoint | Missing assets in packs; author or map from existing FX. |
| /contact | map-hours | missing | LocalBusiness | Missing assets in packs; author or map from existing FX. |
| /contact | faq | missing | FAQPage | Missing assets in packs; author or map from existing FX. |
| /blog | hubs | missing | CollectionPage | Missing assets in packs; author or map from existing FX. |
| /blog | posts | missing | Blog | Missing assets in packs; author or map from existing FX. |

## Fix Notes for Drift
- Replace any non-token colours with `var(--smh-*)` tokens and `var(--smh-gradient)` for bands.
- Keep parallax ≤ 6px; hover scale ≤ 1.03; use easing `cubic-bezier(0.645,0.045,0.355,1)`; honour PRM throughout.
- Grain 4–10% opacity; particles 6–12%; gold accents limited (≤ 4% coverage per page).

## Compression Targets
- Hero/LCP ≤ 120KB WEBP/AVIF, set dimension attributes, `fetchpriority=high`.
- Gallery cards ≤ 120KB; thumbs ≤ 40KB; posters ≤ 60KB; lazy-load below fold.
- Videos: WEBM + H.264 fallback; captions; avoid autoplay sound.
- 3D: Draco/meshopt; idle-load; static poster for PRM.
