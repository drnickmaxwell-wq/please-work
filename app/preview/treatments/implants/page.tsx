// Preview-only clone. No hard hexes. Do not edit production pages.
import { DentalImplantsPreviewContent } from '../dental-implants/page';
import { SchemaInjector } from '@/lib/seo/preview/SchemaInjector';

export default function ImplantsPreviewPage() {
  return (
    <>
      <DentalImplantsPreviewContent />
      <SchemaInjector route="/treatments/implants" />
    </>
  );
}
