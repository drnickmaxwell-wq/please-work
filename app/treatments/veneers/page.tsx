import type { Metadata } from 'next';

import { SchemaInjector } from '@/lib/schema-injector';
import VeneersPageContent from './page-content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'https://www.stmaryshousedental.co.uk';
const canonicalBase = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
const pageUrl = `${canonicalBase}/treatments/veneers`;

export const metadata: Metadata = {
  title: 'Porcelain Veneers in Shoreham-by-Sea | St Mary’s House Dental',
  description:
    'Design your dream smile with bespoke porcelain veneers at St Mary’s House Dental in Shoreham-by-Sea. Discover confidence-building cosmetic dentistry.',
  alternates: { canonical: pageUrl },
};

export default function VeneersPage() {
  return (
    <>
      <SchemaInjector route="/treatments/veneers" />
      <VeneersPageContent />
    </>
  );
}
