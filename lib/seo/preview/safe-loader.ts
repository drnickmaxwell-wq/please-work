// preview-safe loader: no top-level await, no fs, no throwing
export type JsonLd = Record<string, unknown>;

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

export type BreadcrumbStatus = 'pack' | 'generated' | 'missing';

export type PreviewSchemaStatus = {
  route: string;
  context?: string;
  schemas: JsonLd[];
  schemaTypes: string[];
  breadcrumbStatus: BreadcrumbStatus;
  hasPrimarySchemas: boolean;
  missing: { howTo: boolean; faq: boolean };
};

const DEFAULT_CONTEXT = 'https://schema.org';

function isJsonObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}
function extractTypes(v: unknown): string[] {
  if (typeof v === 'string') return [v];
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === 'string');
  return [];
}
function normaliseGraphNodes(nodes: unknown): JsonLd[] {
  if (!Array.isArray(nodes)) return [];
  return nodes.filter(isJsonObject).filter((n) => !extractTypes(n['@type']).includes('BreadcrumbList')) as JsonLd[];
}
function collectSchemaTypes(schemas: JsonLd[]): string[] {
  const set = new Set<string>();
  for (const s of schemas) {
    extractTypes(s['@type']).forEach((t) => set.add(t));
    const g = (s as Record<string, unknown>)['@graph'];
    if (Array.isArray(g)) {
      g.forEach((node) => {
        if (isJsonObject(node)) extractTypes(node['@type']).forEach((t) => set.add(t));
      });
    }
  }
  return Array.from(set).sort();
}
function resolveBreadcrumbStatus(candidate: BreadcrumbStatus, types: string[]): BreadcrumbStatus {
  if (candidate !== 'missing') return candidate;
  return types.includes('BreadcrumbList') ? 'generated' : 'missing';
}

export async function loadPreviewSchemaStatuses(): Promise<PreviewSchemaStatus[]> {
  try {
    // load packs safely at runtime (server), catch all failures
    const routesMapMod = await import('@/reports/schema/routes-map.json').then((m) => m.default).catch(() => ({}));
    const schemaPackMod = await import('@/reports/schema/Treatments_Schema_Pack_v2.json')
      .then((m) => m.default)
      .catch(async () =>
        // fallback to v3 if present
        await import('@/reports/schema/Treatments_Schema_Pack_v3.json').then((m) => m.default).catch(() => ({})),
      );
    const breadcrumbsMod = await import('@/reports/schema/Treatments_Breadcrumbs.json')
      .then((m) => m.default)
      .catch(() => ({}));

    const routesMap = isJsonObject(routesMapMod) ? (routesMapMod as Record<string, unknown>) : {};
    const schemaPack = isJsonObject(schemaPackMod) ? (schemaPackMod as SchemaPack) : { routes: {} };
    const breadcrumbPack = isJsonObject(breadcrumbsMod) ? (breadcrumbsMod as BreadcrumbPack) : { breadcrumbs: {} };

    const treatmentsRoutes = Object.keys(routesMap).filter((k) => k.startsWith('/treatments')).sort();

    const schemaRoutes = isJsonObject(schemaPack.routes) ? (schemaPack.routes as Record<string, SchemaRouteEntry>) : {};
    const breadcrumbRoutes = isJsonObject(breadcrumbPack.breadcrumbs)
      ? (breadcrumbPack.breadcrumbs as Record<string, JsonLd>)
      : {};

    const statuses: PreviewSchemaStatus[] = [];

    for (const route of treatmentsRoutes) {
      const entry = schemaRoutes[route];
      const primarySchemas: JsonLd[] = [];
      let context = DEFAULT_CONTEXT;

      if (entry && isJsonObject(entry)) {
        const ctx = typeof entry['@context'] === 'string' ? (entry['@context'] as string) : DEFAULT_CONTEXT;
        context = ctx;
        const graphSchemas = normaliseGraphNodes(entry['@graph']);
        if (graphSchemas.length > 0) {
          const { ['@context']: _c, ['@graph']: _g, ...rest } = entry;
          primarySchemas.push({ '@context': ctx, '@graph': graphSchemas, ...rest });
        } else {
          const { ['@context']: _c, ['@graph']: _g, ...rest } = entry;
          if (isJsonObject(rest) && Object.keys(rest).length > 0) {
            primarySchemas.push({ '@context': ctx, ...rest });
          }
        }
      }

      let breadcrumbStatus: BreadcrumbStatus = 'missing';
      const crumb = breadcrumbRoutes[route];
      let breadcrumbSchema: JsonLd | undefined;
      if (crumb && isJsonObject(crumb)) {
        breadcrumbSchema = { '@context': DEFAULT_CONTEXT, ...crumb };
        breadcrumbStatus = 'pack';
      }

      const schemas = [...primarySchemas];
      if (breadcrumbSchema) schemas.push(breadcrumbSchema);

      const schemaTypes = collectSchemaTypes(schemas);
      breadcrumbStatus = resolveBreadcrumbStatus(breadcrumbStatus, schemaTypes);

      const missing = { howTo: !schemaTypes.includes('HowTo'), faq: !schemaTypes.includes('FAQPage') };

      statuses.push({
        route,
        context,
        schemas,
        schemaTypes,
        breadcrumbStatus,
        hasPrimarySchemas: primarySchemas.length > 0,
        missing,
      });
    }

    return statuses;
  } catch {
    // absolutely never throw from preview loader
    return [];
  }
}
