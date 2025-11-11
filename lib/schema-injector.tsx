'use client';

import { useMemo } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

import schemaPackV2 from '@/reports/schema/Treatments_Schema_Pack_v2.json';
import legacySchemaPack from '@/reports/schema/Treatments_Schema_Pack.json';
import breadcrumbPack from '@/reports/schema/Treatments_Breadcrumbs.json';

const SOURCE_BASES = ['https://smhdental.co.uk', 'https://www.smhdental.co.uk'];
const defaultSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'https://www.stmaryshousedental.co.uk';
const canonicalSiteUrl = defaultSiteUrl.endsWith('/') ? defaultSiteUrl.slice(0, -1) : defaultSiteUrl;

const SCHEMA_ORDER = ['BreadcrumbList', 'Service', 'HowTo', 'FAQPage'] as const;

type SchemaEntry = Record<string, unknown>;
type SchemaPack = {
  routes?: Record<string, { '@context'?: string; '@graph'?: SchemaEntry[] }>;
};
type BreadcrumbPack = {
  breadcrumbs?: Record<string, SchemaEntry>;
};

type SchemaType = (typeof SCHEMA_ORDER)[number];

type Summary = {
  entries: SchemaEntry[];
  types: SchemaType[];
  missing: SchemaType[];
};

const packV2 = schemaPackV2 as SchemaPack;
const packLegacy = legacySchemaPack as SchemaPack;
const breadcrumbs = breadcrumbPack as BreadcrumbPack;

const ROUTE_ALIASES: Record<string, string> = {
  '/treatments/dental-implants': '/treatments/implants',
};

const normaliseRoute = (route: string): string => {
  if (!route) {
    return '/treatments';
  }
  const withLeadingSlash = route.startsWith('/') ? route : `/${route}`;
  if (withLeadingSlash === '/') {
    return '/';
  }
  return withLeadingSlash.endsWith('/') && withLeadingSlash.length > 1
    ? withLeadingSlash.slice(0, -1)
    : withLeadingSlash;
};

const formatSegment = (segment: string): string => {
  return segment
    .split('-')
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
    .join(' ');
};

const cloneEntry = (entry: SchemaEntry): SchemaEntry => {
  return JSON.parse(JSON.stringify(entry));
};

const normaliseString = (value: string): string => {
  if (value.startsWith('#')) {
    return value;
  }

  for (const source of SOURCE_BASES) {
    if (value.startsWith(source)) {
      return `${canonicalSiteUrl}${value.slice(source.length)}`;
    }
  }

  if (value.startsWith('/')) {
    return `${canonicalSiteUrl}${value}`;
  }

  return value;
};

const normaliseEntry = (entry: SchemaEntry, route: string, fallbackId: string): SchemaEntry => {
  const cloned = cloneEntry(entry);

  const walk = (value: unknown): unknown => {
    if (Array.isArray(value)) {
      return value.map((item) => walk(item));
    }

    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([key, child]) => [key, walk(child)]),
      );
    }

    if (typeof value === 'string') {
      return normaliseString(value);
    }

    return value;
  };

  const normalised = walk(cloned) as SchemaEntry;

  if (!normalised['@id']) {
    normalised['@id'] = `${canonicalSiteUrl}${route}${fallbackId}`;
  }

  return normalised;
};

const collectGraphEntries = (route: string): Summary => {
  const normalisedRoute = normaliseRoute(route);
  const entriesByType = new Map<SchemaType, SchemaEntry>();

  const breadcrumbSource = breadcrumbs.breadcrumbs?.[normalisedRoute];

  if (breadcrumbSource) {
    entriesByType.set(
      'BreadcrumbList',
      normaliseEntry(breadcrumbSource, normalisedRoute, '#breadcrumb'),
    );
  } else if (normalisedRoute.startsWith('/treatments')) {
    const segments = normalisedRoute.split('/').filter(Boolean);
    if (segments.length >= 1) {
      const basePosition = 1;
      const items = [] as SchemaEntry[];

      items.push({
        '@type': 'ListItem',
        position: basePosition,
        name: segments.length === 1 ? 'Dental Treatments' : 'Treatments',
        item: `${canonicalSiteUrl}/treatments`,
      });

      const childSegments = segments.slice(1);
      childSegments.forEach((segment, index) => {
        const href = `/treatments/${childSegments.slice(0, index + 1).join('/')}`;
        items.push({
          '@type': 'ListItem',
          position: basePosition + index + 1,
          name: formatSegment(segment),
          item: `${canonicalSiteUrl}${href}`,
        });
      });

      entriesByType.set('BreadcrumbList', {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalSiteUrl}${normalisedRoute}#breadcrumb`,
        itemListElement: items,
      });
    }
  }

  const packs = [packV2, packLegacy];
  const candidateRoutes = [normalisedRoute];
  const aliasRoute = ROUTE_ALIASES[normalisedRoute];
  if (aliasRoute && !candidateRoutes.includes(aliasRoute)) {
    candidateRoutes.push(aliasRoute);
  }

  for (const pack of packs) {
    for (const routeKey of candidateRoutes) {
      const graphEntries = pack.routes?.[routeKey]?.['@graph'] ?? [];

      for (const entry of graphEntries) {
        if (!entry || typeof entry !== 'object') {
          continue;
        }

        const typeValue = (entry['@type'] ?? null) as unknown;
        const type = Array.isArray(typeValue)
          ? (typeValue[0] as SchemaType)
          : (typeValue as SchemaType | null);

        if (!type || !SCHEMA_ORDER.includes(type)) {
          continue;
        }

        if (entriesByType.has(type)) {
          continue;
        }

        const fallbackId = `#${type.toLowerCase()}`;
        entriesByType.set(type, normaliseEntry(entry, normalisedRoute, fallbackId));
      }
    }
  }

  const orderedEntries: SchemaEntry[] = [];
  const presentTypes: SchemaType[] = [];

  for (const key of SCHEMA_ORDER) {
    const entry = entriesByType.get(key);
    if (entry) {
      orderedEntries.push(entry);
      presentTypes.push(key);
    }
  }

  const missingTypes = SCHEMA_ORDER.filter((key) => !entriesByType.has(key));

  return {
    entries: orderedEntries,
    types: presentTypes,
    missing: missingTypes,
  };
};

export function generateSchema(route: string) {
  const normalisedRoute = normaliseRoute(route);
  const { entries } = collectGraphEntries(normalisedRoute);

  if (!entries.length) {
    return null;
  }

  const payload = {
    '@context': 'https://schema.org',
    '@graph': entries,
  };

  const scriptId = `schema-${normalisedRoute === '/' ? 'root' : normalisedRoute.slice(1).replace(/[^a-z0-9-]+/gi, '-')}`;

  return (
    <Script id={scriptId} type="application/ld+json" role="none" strategy="beforeInteractive">
      {JSON.stringify(payload)}
    </Script>
  );
}

export function SchemaInjector({ route }: { route?: string }) {
  const pathname = usePathname();
  const targetRoute = normaliseRoute(route ?? pathname ?? '/treatments');

  const schemaNode = useMemo(() => generateSchema(targetRoute), [targetRoute]);

  return <>{schemaNode}</>;
}

export function describeSchema(route: string): Summary {
  return collectGraphEntries(route);
}
