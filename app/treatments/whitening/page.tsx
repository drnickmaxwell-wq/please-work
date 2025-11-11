import type { Metadata } from 'next';

import { SchemaInjector } from '@/lib/schema-injector';
import WhiteningPageContent from './page-content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'https://www.stmaryshousedental.co.uk';
const canonicalBase = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
const pageUrl = `${canonicalBase}/treatments/whitening`;

export const metadata: Metadata = {
  title: 'Teeth Whitening in Shoreham-by-Sea | St Mary’s House Dental',
  description:
    'Achieve a brighter smile with professional teeth whitening at St Mary’s House Dental. Custom treatment plans deliver stunning results safely and comfortably.',
  alternates: { canonical: pageUrl },
};

export default function WhiteningPage() {
  return (
    <>
      <SchemaInjector route="/treatments/whitening" />
      <WhiteningPageContent />
    </>
  );
}
