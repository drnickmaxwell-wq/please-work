import type { Metadata } from 'next';

import { HeroEngine } from '@/components/champagne/hero/HeroEngine';
import { composite_bonding_hero } from '@/lib/champagne/hero-presets';
import { CompositeBondingAiTools } from '@/components/preview/treatments/composite-bonding/CompositeBondingAiTools';
import { CompositeBondingCTA } from '@/components/preview/treatments/composite-bonding/CompositeBondingCTA';
import { CompositeBondingClinicianInsight } from '@/components/preview/treatments/composite-bonding/CompositeBondingClinicianInsight';
import { CompositeBondingFaq } from '@/components/preview/treatments/composite-bonding/CompositeBondingFaq';
import { CompositeBondingOverview } from '@/components/preview/treatments/composite-bonding/CompositeBondingOverview';
import { CompositeBondingStories } from '@/components/preview/treatments/composite-bonding/CompositeBondingStories';
import styles from '@/components/preview/treatments/composite-bonding/composite-bonding-preview.module.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'https://www.stmaryshousedental.co.uk';
const canonicalBase = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
const pageUrl = `${canonicalBase}/treatments/composite-bonding`;

export const metadata: Metadata = {
  title: 'Composite Bonding in Shoreham-by-Sea | St Mary’s House Dental',
  description:
    'Discover hand-sculpted composite bonding finished in a single visit at St Mary’s House Dental in Shoreham-by-Sea.',
  alternates: { canonical: pageUrl },
};

export default function CompositeBondingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.heroBand}>
        <HeroEngine schema={composite_bonding_hero} allowNonPreview />
      </div>

      <main className={styles.main} role="main">
        <CompositeBondingOverview />
        <CompositeBondingAiTools />
        <CompositeBondingClinicianInsight />
        <CompositeBondingStories />
        <CompositeBondingFaq />
        <CompositeBondingCTA />
      </main>
    </div>
  );
}
