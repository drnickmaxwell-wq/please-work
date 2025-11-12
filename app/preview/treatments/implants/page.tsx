// Preview-only clone. No hard hexes. Do not edit production pages.
export const dynamic = 'force-static';
export const revalidate = 0;

import PreviewTreatmentHero from '@/components/preview/PreviewTreatmentHero';
import '@/styles/preview/preview-treatments-hero.css';

import DentalImplantsPreviewPage from '../dental-implants/page';

export default function ImplantsPreviewLanding() {
  return (
    <>
      <PreviewTreatmentHero
        section="implants"
        title="Dental implants in Shoreham-by-Sea"
        eyebrow="Treatments preview"
      />
      <main className="preview-content">
        <DentalImplantsPreviewPage />
      </main>
    </>
  );
}
