import type { Metadata } from 'next';

import HeroLuxury from '@/components/sections/HeroLuxury';
import SmileJourney from '@/components/sections/SmileJourney';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'https://www.stmaryshousedental.co.uk';

export const metadata: Metadata = {
  title: "St Mary’s House Dental | Shoreham-by-Sea",
  description:
    'Experience luxury coastal dental care in Shoreham-by-Sea with advanced 3D dentistry, porcelain veneers, dental implants, and anxiety-free treatments.',
  alternates: {
    canonical: siteUrl,
  },
};

export default function HomePage() {
  return (
    <>
      <HeroLuxury />
      <SmileJourney />
    </>
  );
}
