# SEO Schema Index

This index mirrors the structured data plan captured in [`schema-map.json`](../../config/seo/schema-map.json). Each route lists the schema.org types that should be hydrated from the MDX content pack along with where they should be injected and the key properties to populate.

## `/`
- **Organization**
  - Inject in: `hero`
  - Properties: `name`, `url`, `logo`, `sameAs`, `foundingDate`, `award`
  - Entity targets: `St Mary’s House Dental`, `AI Concierge`
  - Review signals: `AggregateRating`, `reviewCount`
  - Tracking: `cta_book_click`, `quiz_start`
- **LocalBusiness**
  - Inject in: `local-proof`
  - Properties: `@id`, `name`, `address`, `geo`, `openingHoursSpecification`, `telephone`
  - Entity targets: `Shoreham-by-Sea dental clinic`
  - Review signals: `ratingValue`, `reviewCount`
  - Tracking: `map_interact`, `call_click`
- **WebSite**
  - Inject in: `footer`
  - Properties: `url`, `potentialAction`
  - Entity targets: `SearchAction`
  - Review signals: _(none)_
  - Tracking: `site_search`
- **FAQPage**
  - Inject in: `faq`
  - Properties: `mainEntity`
  - Entity targets: `Treatment affordability`, `Booking options`
  - Review signals: _(none)_
  - Tracking: `faq_expand`

## `/treatments/[slug]`
- **Service**
  - Inject in: `hero`
  - Properties: `name`, `description`, `areaServed`, `provider`, `offers`
  - Entity targets: `veneers`, `implants`, `Invisalign`, `composite bonding`
  - Review signals: `ratingValue`, `reviewCount`
  - Tracking: `cta_book`, `faq_expand`
- **HowTo**
  - Inject in: `how-it-works`
  - Properties: `name`, `step`, `supply`, `tool`
  - Entity targets: `Smile makeover steps`, `Implant process`
  - Review signals: _(none)_
  - Tracking: `step_view`
- **Person**
  - Inject in: `experts`
  - Properties: `name`, `jobTitle`, `identifier`, `knowsAbout`
  - Entity targets: `clinicians`, `GDC numbers`
  - Review signals: `author`, `reviewedBy`
  - Tracking: `expert_profile_view`
- **FAQPage**
  - Inject in: `faqs`
  - Properties: `mainEntity`
  - Entity targets: `Treatment duration`, `Pain expectations`, `Cost`
  - Review signals: _(none)_
  - Tracking: `faq_expand`

## `/technology`
- **Product**
  - Inject in: `tech-grid`
  - Properties: `name`, `brand`, `manufacturer`, `image`
  - Entity targets: `CBCT scanner`, `3D printer`, `Intraoral scanner`
  - Review signals: _(none)_
  - Tracking: `product_card_view`
- **TechArticle**
  - Inject in: `cases`
  - Properties: `headline`, `author`, `datePublished`
  - Entity targets: `AI planning`, `Digital dentistry`
  - Review signals: _(none)_
  - Tracking: `scroll_depth`

## `/about`
- **Organization**
  - Inject in: `hero`
  - Properties: `name`, `slogan`, `foundingDate`, `memberOf`
  - Entity targets: `St Mary’s House Dental mission`
  - Review signals: `award`, `affiliation`
  - Tracking: `scroll_to_team`
- **Person**
  - Inject in: `team`
  - Properties: `name`, `jobTitle`, `identifier`, `affiliation`, `knowsAbout`
  - Entity targets: `Dr Nick Maxwell`, `Dr Sandra Forde`
  - Review signals: `author`, `reviewedBy`
  - Tracking: `bio_open`

## `/patient-stories`
- **CollectionPage**
  - Inject in: `grid`
  - Properties: `name`, `about`, `hasPart`
  - Entity targets: `cosmetic dentistry cases`, `orthodontics`
  - Review signals: `AggregateRating`
  - Tracking: `filter_apply`, `story_click`
- **Review**
  - Inject in: `grid`
  - Properties: `author`, `reviewBody`, `itemReviewed`, `datePublished`
  - Entity targets: `veneers case`, `implant patient story`
  - Review signals: `E-E-A-T`
  - Tracking: `story_read`

## `/ai-smile-quiz`
- **HowTo**
  - Inject in: `steps`
  - Properties: `name`, `step`, `supply`, `tool`
  - Entity targets: `AI smile quiz process`
  - Review signals: _(none)_
  - Tracking: `quiz_step_change`
- **SoftwareApplication**
  - Inject in: `results`
  - Properties: `name`, `applicationCategory`, `operatingSystem`, `privacyPolicy`
  - Entity targets: `AI Smile Quiz`
  - Review signals: _(none)_
  - Tracking: `result_view`, `treatment_click`

## `/portal`
- **SoftwareApplication**
  - Inject in: `overview`
  - Properties: `name`, `applicationCategory`, `operatingSystem`, `url`, `offers`
  - Entity targets: `Patient Portal App`
  - Review signals: _(none)_
  - Tracking: `login_click`

## `/contact`
- **LocalBusiness**
  - Inject in: `map-hours`
  - Properties: `name`, `address`, `geo`, `openingHoursSpecification`
  - Entity targets: `St Mary’s House Dental`
  - Review signals: `AggregateRating`
  - Tracking: `map_interact`, `call_click`
- **ContactPoint**
  - Inject in: `smart-contact`
  - Properties: `contactType`, `telephone`, `email`
  - Entity targets: `emergencies`, `bookings`
  - Review signals: _(none)_
  - Tracking: `form_submit`

## `/blog`
- **Blog**
  - Inject in: `posts`
  - Properties: `name`, `publisher`, `author`
  - Entity targets: `cosmetic dentistry`, `aligners`
  - Review signals: `author`, `reviewedBy`
  - Tracking: `post_click`
- **FAQPage**
  - Inject in: `posts`
  - Properties: `mainEntity`
  - Entity targets: `dental care`, `smile tips`
  - Review signals: _(none)_
  - Tracking: `faq_expand`
