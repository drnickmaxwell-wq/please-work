# Preview Treatments Layout Wiring Audit

The table below lists each `/preview/treatments`-prefixed route, its page file, and the layouts that wrap it (outermost → innermost).

- Route: `/preview/treatments`
  - page file: `app/preview/treatments/page.tsx`
  - layouts (outermost → innermost):
    - `app/preview/layout.tsx` → wrapper: returns `children` directly (no wrapper element)
    - `app/preview/treatments/layout.tsx` → wrapper: `<div className="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-treatment={dataTreatment} data-preview-scope="treatments">`

- Route: `/preview/treatments/whitening`
  - page file: `app/preview/treatments/whitening/page.tsx`
  - layouts (outermost → innermost):
    - `app/preview/layout.tsx` → wrapper: returns `children` directly (no wrapper element)
    - `app/preview/treatments/layout.tsx` → wrapper: `<div className="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-treatment={dataTreatment} data-preview-scope="treatments">`

- Route: `/preview/treatments/implants`
  - page file: `app/preview/treatments/implants/page.tsx`
  - layouts (outermost → innermost):
    - `app/preview/layout.tsx` → wrapper: returns `children` directly (no wrapper element)
    - `app/preview/treatments/layout.tsx` → wrapper: `<div className="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-treatment={dataTreatment} data-preview-scope="treatments">`

- Route: `/preview/treatments/orthodontics`
  - page file: `app/preview/treatments/orthodontics/page.tsx`
  - layouts (outermost → innermost):
    - `app/preview/layout.tsx` → wrapper: returns `children` directly (no wrapper element)
    - `app/preview/treatments/layout.tsx` → wrapper: `<div className="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-treatment={dataTreatment} data-preview-scope="treatments">`

- Route: `/preview/treatments/orthodontics/spark-aligners`
  - page file: `app/preview/treatments/orthodontics/spark-aligners/page.tsx`
  - layouts (outermost → innermost):
    - `app/preview/layout.tsx` → wrapper: returns `children` directly (no wrapper element)
    - `app/preview/treatments/layout.tsx` → wrapper: `<div className="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-treatment={dataTreatment} data-preview-scope="treatments">`

- Route: `/preview/treatments/composite-bonding`
  - page file: `app/preview/treatments/composite-bonding/page.tsx`
  - layouts (outermost → innermost):
    - `app/preview/layout.tsx` → wrapper: returns `children` directly (no wrapper element)
    - `app/preview/treatments/layout.tsx` → wrapper: `<div className="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-treatment={dataTreatment} data-preview-scope="treatments">`

- Route: `/preview/treatments/general`
  - page file: `app/preview/treatments/general/page.tsx`
  - layouts (outermost → innermost):
    - `app/preview/layout.tsx` → wrapper: returns `children` directly (no wrapper element)
    - `app/preview/treatments/layout.tsx` → wrapper: `<div className="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-treatment={dataTreatment} data-preview-scope="treatments">`

- Route: `/preview/treatments/cosmetic`
  - page file: `app/preview/treatments/cosmetic/page.tsx`
  - layouts (outermost → innermost):
    - `app/preview/layout.tsx` → wrapper: returns `children` directly (no wrapper element)
    - `app/preview/treatments/layout.tsx` → wrapper: `<div className="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-treatment={dataTreatment} data-preview-scope="treatments">`

- Route: `/preview/treatments/dental-implants`
  - page file: `app/preview/treatments/dental-implants/page.tsx`
  - layouts (outermost → innermost):
    - `app/preview/layout.tsx` → wrapper: returns `children` directly (no wrapper element)
    - `app/preview/treatments/layout.tsx` → wrapper: `<div className="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-treatment={dataTreatment} data-preview-scope="treatments">`

- Route: `/preview/treatments/technology`
  - page file: `app/preview/treatments/technology/page.tsx`
  - layouts (outermost → innermost):
    - `app/preview/layout.tsx` → wrapper: returns `children` directly (no wrapper element)
    - `app/preview/treatments/layout.tsx` → wrapper: `<div className="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-treatment={dataTreatment} data-preview-scope="treatments">`

- Route: `/preview/treatments/veneers`
  - page file: `app/preview/treatments/veneers/page.tsx`
  - layouts (outermost → innermost):
    - `app/preview/layout.tsx` → wrapper: returns `children` directly (no wrapper element)
    - `app/preview/treatments/layout.tsx` → wrapper: `<div className="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-treatment={dataTreatment} data-preview-scope="treatments">`

- Route: `/preview/treatments/3d-dentistry`
  - page file: `app/preview/treatments/3d-dentistry/page.tsx`
  - layouts (outermost → innermost):
    - `app/preview/layout.tsx` → wrapper: returns `children` directly (no wrapper element)
    - `app/preview/treatments/layout.tsx` → wrapper: `<div className="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-treatment={dataTreatment} data-preview-scope="treatments">`

- Route: `/preview/treatments/[slug]`
  - page file: `app/preview/treatments/[slug]/page.tsx`
  - layouts (outermost → innermost):
    - `app/preview/layout.tsx` → wrapper: returns `children` directly (no wrapper element)
    - `app/preview/treatments/layout.tsx` → wrapper: `<div className="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-treatment={dataTreatment} data-preview-scope="treatments">`

- Route: `/preview/treatments-stubs`
  - page file: `app/preview/(with-shell)/treatments-stubs/page.tsx`
  - layouts (outermost → innermost):
    - `app/preview/layout.tsx` → wrapper: returns `children` directly (no wrapper element)
    - `app/preview/(with-shell)/layout.tsx` → wrapper: `<PreviewShell>` (no additional props)

- Route: `/preview/treatments-light`
  - page file: `app/preview/(with-shell)/treatments-light/page.tsx`
  - layouts (outermost → innermost):
    - `app/preview/layout.tsx` → wrapper: returns `children` directly (no wrapper element)
    - `app/preview/(with-shell)/layout.tsx` → wrapper: `<PreviewShell>` (no additional props)
