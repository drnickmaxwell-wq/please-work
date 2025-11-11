import type { Metadata } from 'next';

import { SchemaInjector } from '@/lib/schema-injector';
import ImplantsPageContent from '../implants/page-content';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'https://www.stmaryshousedental.co.uk';
const canonicalBase = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
const pageUrl = `${canonicalBase}/treatments/dental-implants`;

export const metadata: Metadata = {
  title: 'Dental Implants in Shoreham-by-Sea | St Mary’s House Dental',
  description:
    'Restore your smile with precision dental implants at St Mary’s House Dental in Shoreham-by-Sea. Advanced planning delivers natural-looking, long-lasting results.',
  alternates: { canonical: pageUrl },
};

export default function DentalImplantsPage() {
  return (
    <>
      <SchemaInjector route="/treatments/dental-implants" />
      <ImplantsPageContent />
    </>
  );
}
