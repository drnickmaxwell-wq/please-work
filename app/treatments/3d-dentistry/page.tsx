import type { Metadata } from 'next';

import { SchemaInjector } from '@/lib/schema-injector';
import ThreeDDentistryPageContent from './page-content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'https://www.stmaryshousedental.co.uk';
const canonicalBase = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
const pageUrl = `${canonicalBase}/treatments/3d-dentistry`;

export const metadata: Metadata = {
  title: '3D Digital Dentistry in Shoreham-by-Sea | St Mary’s House Dental',
  description:
    'Discover cutting-edge 3D digital dentistry at St Mary’s House Dental. Same-day crowns, ultra-precise planning, and comfortable treatments in Shoreham-by-Sea.',
  alternates: { canonical: pageUrl },
};

export default function ThreeDDentistryPage() {
  return (
    <>
      <SchemaInjector route="/treatments/3d-dentistry" />
      <ThreeDDentistryPageContent />
    </>
  );
}
