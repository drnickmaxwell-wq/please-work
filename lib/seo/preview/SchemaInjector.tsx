import { Fragment } from 'react';
import { join } from 'path';
import { writeFileSync } from 'fs';

export const dynamic = 'force-static';
export const revalidate = 0;

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

const routesMapModule = await import('@/reports/schema/routes-map.json')
  .then((mod) => mod.default)
  .catch(() => ({}));

const schemaPackModule = await import('@/reports/schema/Treatments_Schema_Pack_v2.json')
  .then((mod) => mod.default)
  .catch(() => ({}));

const breadcrumbsPackModule = await import('@/reports/schema/Treatments_Breadcrumbs.json')
  .then((mod) => mod.default)
  .catch(() => ({}));

const routesMap = isJsonObject(routesMapModule) ? (routesMapModule as Record<string, unknown>) : {};

const schemaPack = isJsonObject(schemaPackModule) ? (schemaPackModule as SchemaPack) : ({} as SchemaPack);
const breadcrumbPack = isJsonObject(breadcrumbsPackModule)
  ? (breadcrumbsPackModule as BreadcrumbPack)
  : ({} as BreadcrumbPack);

const treatmentsRoutes = Object.keys(routesMap)
  .filter((key) => key.startsWith('/treatments'))
  .sort();

const schemaRoutesCandidate = schemaPack?.routes;
const schemaRoutes = isJsonObject(schemaRoutesCandidate)
  ? (schemaRoutesCandidate as Record<string, SchemaRouteEntry>)
  : {};

const breadcrumbRoutesCandidate = breadcrumbPack?.breadcrumbs;
const breadcrumbRoutes = isJsonObject(breadcrumbRoutesCandidate)
  ? (breadcrumbRoutesCandidate as Record<string, JsonLd>)
  : {};

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

  const payload = buildIntegrationStatusPayload(getAllPreviewSchemaStatuses());

  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
    const integrationPath = join(process.cwd(), 'reports/schema/Integration_Status_Treatments.json');
    try {
      writeFileSync(integrationPath, JSON.stringify(payload, null, 2));
    } catch (err) {
      console.warn('Preview schema write skipped:', err);
    }
  }
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
