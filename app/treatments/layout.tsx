import type { ReactNode } from 'react';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import { SchemaInjector } from '@/lib/schema-injector';

export default function TreatmentsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="legacy-surface">
      <SchemaInjector />
      <Breadcrumbs />
      {children}
    </div>
  );
}
