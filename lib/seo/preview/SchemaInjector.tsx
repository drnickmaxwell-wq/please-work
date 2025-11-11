import { Fragment } from 'react';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

import routesMap from '@/reports/schema/routes-map.json';
import schemaPack from '@/reports/schema/Treatments_Schema_Pack_v2.json';
import breadcrumbsPack from '@/reports/schema/Treatments_Breadcrumbs.json';

const DEFAULT_CONTEXT = 'https://schema.org';

type JsonLd = Record<string, unknown>;

type SchemaRouteEntry = {
  ['@context']?: string;
  ['@graph']?: unknown;
} & JsonLd;

type SchemaPack = {
  generated?: string;
  routes?: Record<string, SchemaRouteEntry>;
};

type BreadcrumbPack = {
  generated?: string;
  breadcrumbs?: Record<string, JsonLd>;
};

type BreadcrumbStatus = 'pack' | 'generated' | 'missing';

export type PreviewSchemaStatus = {
  route: string;
  context?: string;
  schemas: JsonLd[];
  schemaTypes: string[];
  breadcrumbStatus: BreadcrumbStatus;
  hasPrimarySchemas: boolean;
  missing: {
    howTo: boolean;
    faq: boolean;
  };
};

type StatusByRoute = Map<string, PreviewSchemaStatus>;

const treatmentsRoutes = Object.keys(routesMap as Record<string, unknown>)
  .filter((key) => key.startsWith('/treatments'))
  .sort();

const schemaRoutes = ((schemaPack as SchemaPack).routes ?? {}) as Record<string, SchemaRouteEntry>;
const breadcrumbRoutes = ((breadcrumbsPack as BreadcrumbPack).breadcrumbs ?? {}) as Record<string, JsonLd>;

const statusByRoute: StatusByRoute = new Map();

function isJsonObject(value: unknown): value is JsonLd {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function extractTypes(value: unknown): string[] {
  if (typeof value === 'string') {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.filter((entry): entry is string => typeof entry === 'string');
  }

  return [];
}

function normaliseGraphNodes(nodes: unknown): JsonLd[] {
  if (!Array.isArray(nodes)) {
    return [];
  }

  return nodes
    .filter(isJsonObject)
    .filter((node) => {
      const types = extractTypes(node['@type']);
      return !types.includes('BreadcrumbList');
    })
    .map((node) => ({ ...node }));
}

function normaliseSchemaEntry(route: string): {
  primarySchemas: JsonLd[];
  context?: string;
} {
  const entry = schemaRoutes[route];

  if (!entry) {
    return { primarySchemas: [] };
  }

  const context = typeof entry['@context'] === 'string' ? entry['@context'] : DEFAULT_CONTEXT;
  const graphSchemas = normaliseGraphNodes(entry['@graph']);

  if (graphSchemas.length > 0) {
    const { ['@context']: _, ['@graph']: __, ...rest } = entry;
    const payload: JsonLd = {
      '@context': context,
      '@graph': graphSchemas,
      ...rest,
    };

    return { primarySchemas: [payload], context };
  }

  const { ['@context']: _, ['@graph']: __, ...rest } = entry;

  if (!isJsonObject(rest) || Object.keys(rest).length === 0) {
    return { primarySchemas: [], context };
  }

  return { primarySchemas: [{ '@context': context, ...rest }], context };
}

function normaliseBreadcrumb(route: string): { breadcrumbSchema?: JsonLd; status: BreadcrumbStatus } {
  const breadcrumb = breadcrumbRoutes[route];
  if (!breadcrumb || !isJsonObject(breadcrumb)) {
    return { status: 'missing' };
  }

  const payload: JsonLd = {
    '@context': DEFAULT_CONTEXT,
    ...breadcrumb,
  };

  return { breadcrumbSchema: payload, status: 'pack' };
}

function collectSchemaTypes(schemas: JsonLd[]): string[] {
  const types = new Set<string>();

  schemas.forEach((schema) => {
    extractTypes(schema['@type']).forEach((type) => types.add(type));

    const graph = schema['@graph'];
    if (Array.isArray(graph)) {
      graph.forEach((node) => {
        if (isJsonObject(node)) {
          extractTypes(node['@type']).forEach((type) => types.add(type));
        }
      });
    }
  });

  return Array.from(types).sort();
}

function resolveBreadcrumbStatus(candidate: BreadcrumbStatus, types: string[]): BreadcrumbStatus {
  if (candidate !== 'missing') {
    return candidate;
  }

  return types.includes('BreadcrumbList') ? 'generated' : 'missing';
}

treatmentsRoutes.forEach((route) => {
  const { primarySchemas, context } = normaliseSchemaEntry(route);
  const { breadcrumbSchema, status: rawBreadcrumbStatus } = normaliseBreadcrumb(route);

  const schemas = [...primarySchemas];

  if (breadcrumbSchema) {
    schemas.push(breadcrumbSchema);
  }

  const schemaTypes = collectSchemaTypes(schemas);
  const breadcrumbStatus = resolveBreadcrumbStatus(rawBreadcrumbStatus, schemaTypes);

  const missing = {
    howTo: !schemaTypes.includes('HowTo'),
    faq: !schemaTypes.includes('FAQPage'),
  };

  statusByRoute.set(route, {
    route,
    context,
    schemas,
    schemaTypes,
    breadcrumbStatus,
    hasPrimarySchemas: primarySchemas.length > 0,
    missing,
  });
});

function buildIntegrationStatusPayload(statuses: PreviewSchemaStatus[]) {
  return {
    updated: new Date().toISOString(),
    routes: statuses.map(({ route, schemaTypes, breadcrumbStatus, missing }) => ({
      route,
      schemaTypes,
      breadcrumbStatus,
      missing,
    })),
  };
}

export function getPreviewSchemaStatus(route: string): PreviewSchemaStatus | undefined {
  return statusByRoute.get(route);
}

export function getAllPreviewSchemaStatuses(): PreviewSchemaStatus[] {
  return Array.from(statusByRoute.values());
}

export function logPreviewSchemaIntegration(): void {
  if (typeof process === 'undefined') {
    return;
  }

  const integrationPath = join(process.cwd(), 'reports/schema/Integration_Status_Treatments.json');
  const payload = buildIntegrationStatusPayload(getAllPreviewSchemaStatuses());

  writeFileSync(integrationPath, `${JSON.stringify(payload, null, 2)}\n`);
}

export type SchemaInjectorProps = {
  route: string;
};

export function SchemaInjector({ route }: SchemaInjectorProps) {
  const status = getPreviewSchemaStatus(route);

  if (!status || status.schemas.length === 0) {
    return null;
  }

  return (
    <Fragment>
      {status.schemas.map((schema, index) => (
        <script
          key={`${route}-schema-${index}`}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Fragment>
  );
}
