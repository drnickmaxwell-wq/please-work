import breadcrumbsPack from '@/config/seo/schema/Treatments_Breadcrumbs.json';
import type { PreviewBreadcrumbItem } from '@/lib/seo/preview/safe-loader';

const breadcrumbEntries =
  (breadcrumbsPack as {
    breadcrumbs?: Record<string, { itemListElement?: { name?: string; item?: string }[] }>;
  }).breadcrumbs ?? {};

function resolveItems(route: string | undefined, fallbackItems: PreviewBreadcrumbItem[]): PreviewBreadcrumbItem[] {
  if (fallbackItems.length > 0) return fallbackItems;
  if (!route) return [];
  const entry = breadcrumbEntries[route];
  if (!entry || !Array.isArray(entry.itemListElement)) return [];
  return entry.itemListElement.map((item) => ({ name: item.name, item: item.item }));
}

export type BreadcrumbBarProps = {
  route?: string;
  items?: PreviewBreadcrumbItem[];
};

export default function BreadcrumbBar({ route, items = [] }: BreadcrumbBarProps) {
  const crumbs = resolveItems(route, items);
  const hasCrumbs = crumbs.length > 0;

  return (
    <nav aria-label="Breadcrumb" className="tp-breadcrumb">
      <ol>
        {hasCrumbs
          ? crumbs.map((crumb, index) => (
              <li key={`${crumb.item ?? crumb.name ?? index}`}>{crumb.name ?? 'Untitled'}</li>
            ))
          : [
              { label: 'Treatments', key: 'treatments' },
              { label: route ?? 'Preview slug', key: 'slug' },
            ].map((item) => (
              <li className="tp-breadcrumb__placeholder" key={item.key}>
                {item.label}
              </li>
            ))}
      </ol>
    </nav>
  );
}
