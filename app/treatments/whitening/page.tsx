import type { Metadata } from 'next';

import { HeroEngine } from '@/components/champagne/hero/HeroEngine';
import { JsonLd, schema } from '@/lib/seo';
import { whitening_hero } from '@/lib/champagne/hero-presets';
import { WhiteningAiTools } from '@/components/preview/treatments/whitening/WhiteningAiTools';
import { WhiteningCTA } from '@/components/preview/treatments/whitening/WhiteningCTA';
import { WhiteningClinicianInsight } from '@/components/preview/treatments/whitening/WhiteningClinicianInsight';
import { WhiteningFaq } from '@/components/preview/treatments/whitening/WhiteningFaq';
import { WhiteningOverview } from '@/components/preview/treatments/whitening/WhiteningOverview';
import { WhiteningStories } from '@/components/preview/treatments/whitening/WhiteningStories';
import styles from '@/components/preview/treatments/whitening/whitening-preview.module.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'https://www.stmaryshousedental.co.uk';
const canonicalBase = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
const pageUrl = `${canonicalBase}/treatments/whitening`;

const serviceJson = schema.service({
  name: 'Professional Teeth Whitening',
  url: pageUrl,
  areaServed: ['Shoreham-by-Sea', 'Brighton', 'Worthing'],
  offers: { priceCurrency: 'GBP' },
});

const faqJson = schema.faqPage([
  {
    q: 'How long does teeth whitening last?',
    a: 'Professional whitening can brighten your smile for 12-18 months, especially with top-up gels and good oral hygiene.',
  },
  {
    q: 'Will whitening make my teeth sensitive?',
    a: 'We tailor each treatment to minimise sensitivity and use desensitising serums where needed.',
  },
  {
    q: 'Is whitening safe for enamel?',
    a: 'Yes, dentist-supervised whitening uses regulated gels that safely lift stains without damaging enamel.',
  },
]);

export const metadata: Metadata = {
  title: 'Teeth Whitening in Shoreham-by-Sea | St Mary’s House Dental',
  description:
    'Achieve a brighter smile with professional teeth whitening at St Mary’s House Dental. Custom treatment plans deliver stunning results safely and comfortably.',
  alternates: { canonical: pageUrl },
};

export default function WhiteningPage() {
  return (
    <>
      <JsonLd json={serviceJson} />
      <JsonLd json={faqJson} />

      <div className={styles.page}>
        <div className={styles.heroBand}>
          <HeroEngine schema={whitening_hero} allowNonPreview />
        </div>

        <main className={styles.main} role="main">
          <WhiteningOverview />
          <WhiteningAiTools />
          <WhiteningClinicianInsight />
          <WhiteningStories />
          <WhiteningFaq />
          <WhiteningCTA />
        </main>
      </div>
    </>
  );
}
