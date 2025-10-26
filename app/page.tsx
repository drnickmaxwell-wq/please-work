import type { Metadata } from 'next';

import HomePageClient from '@/components/home/home-page-client';
import HeroLuxury from '@/components/sections/HeroLuxury';
import SmileJourney from '@/components/sections/SmileJourney';
import { JsonLd, schema } from '@/lib/seo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'https://www.stmaryshousedental.co.uk';

const localBusinessJson = schema.localBusiness({
  name: "St Mary's House Dental",
  url: siteUrl,
  telephone: '+44 1273 123456',
  address: {
    street: "1 St Mary's House",
    city: 'Shoreham-by-Sea',
    postalCode: 'BN43 5ZA',
    country: 'GB',
  },
  geo: { lat: 50.8333, lng: -0.2667 },
  sameAs: [
    'https://www.facebook.com/stmaryshousedental',
    'https://www.instagram.com/stmaryshousedental',
  ],
});

export const metadata: Metadata = {
  title: "St Mary’s House Dental | Shoreham-by-Sea",
  description:
    'Experience luxury coastal dental care in Shoreham-by-Sea with advanced 3D dentistry, porcelain veneers, dental implants, and anxiety-free treatments.',
  alternates: {
    canonical: siteUrl,
  },
};

export default function Home() {
  return (
    <>
      <JsonLd json={localBusinessJson} />
      <main id="main-content" className="min-h-screen overflow-hidden relative">
        <HeroLuxury />
        <SmileJourney />
        <HomePageClient />
      </main>
    </>
  );
}
