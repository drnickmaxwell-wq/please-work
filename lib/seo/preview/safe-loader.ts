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

export type PreviewHowToStep = {
  name?: string;
  text?: string;
};

export type PreviewFaqEntry = {
  question?: string;
  answer?: string;
};

export type PreviewBreadcrumbItem = {
  name?: string;
  item?: string;
};

export type PreviewServiceSummary = {
  name?: string;
  description?: string;
};

export type TreatmentPreviewContent = {
  slug: string;
  route?: string;
  context?: string;
  service: PreviewServiceSummary | null;
  howTo: { name?: string; steps: PreviewHowToStep[] } | null;
  faq: PreviewFaqEntry[];
  breadcrumbs: PreviewBreadcrumbItem[];
  schemaTypes: string[];
  hasSchemaPack: boolean;
  hudStatus: 'ok' | 'partial' | 'missing';
  missing: {
    service: boolean;
    howTo: boolean;
    faq: boolean;
    breadcrumbs: boolean;
  };
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
    const schemaPackMod = await import('@/config/seo/schema/Treatments_Schema_Pack_v2.json')
      .then((m) => m.default)
      .catch(async () =>
        // fallback to v3 if present
        await import('@/config/seo/schema/Treatments_Schema_Pack_v3.json').then((m) => m.default).catch(() => ({})),
      );
    const breadcrumbsMod = await import('@/config/seo/schema/Treatments_Breadcrumbs.json')
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

type SafeRoutesMap = Record<string, unknown>;

function normaliseBreadcrumbItems(route: string | undefined, pack: BreadcrumbPack | undefined): PreviewBreadcrumbItem[] {
  if (!route || !pack || !isJsonObject(pack.breadcrumbs)) return [];
  const entry = (pack.breadcrumbs as Record<string, unknown>)[route];
  if (!isJsonObject(entry)) return [];
  const list = (entry.itemListElement as unknown) ?? [];
  if (!Array.isArray(list)) return [];
  return list
    .map((item) => (isJsonObject(item) ? { name: item.name as string | undefined, item: item.item as string | undefined } : null))
    .filter(Boolean) as PreviewBreadcrumbItem[];
}

function resolveHudStatus(flags: TreatmentPreviewContent['missing']): 'ok' | 'partial' | 'missing' {
  const missingCount = Number(flags.service) + Number(flags.howTo) + Number(flags.faq);
  if (missingCount === 0) return 'ok';
  if (missingCount === 3) return 'missing';
  return 'partial';
}

function extractRouteFromMap(slug: string, routesMap: SafeRoutesMap): string | undefined {
  const desired = `/treatments/${slug}`;
  if (Object.prototype.hasOwnProperty.call(routesMap, desired)) {
    return desired;
  }
  // fallback search for nested slugs (e.g. orthodontics/spark-aligners)
  const nested = Object.keys(routesMap).find((key) => key.endsWith(`/${slug}`));
  return nested;
}

function toPreviewHowToStep(value: unknown): PreviewHowToStep | null {
  if (!isJsonObject(value)) return null;
  return {
    name: typeof value.name === 'string' ? (value.name as string) : undefined,
    text: typeof value.text === 'string' ? (value.text as string) : undefined,
  };
}

export async function loadTreatmentPreviewContent(slug: string): Promise<TreatmentPreviewContent> {
  const fallback: TreatmentPreviewContent = {
    slug,
    route: `/treatments/${slug}`,
    context: DEFAULT_CONTEXT,
    service: null,
    howTo: null,
    faq: [],
    breadcrumbs: [],
    schemaTypes: [],
    hasSchemaPack: false,
    hudStatus: 'missing',
    missing: { service: true, howTo: true, faq: true, breadcrumbs: true },
  };

  try {
    const routesMap = await import('@/reports/schema/routes-map.json')
      .then((m) => (isJsonObject(m.default) ? (m.default as SafeRoutesMap) : ({} as SafeRoutesMap)))
      .catch(() => ({} as SafeRoutesMap));
    const schemaPack = await import('@/config/seo/schema/Treatments_Schema_Pack_v3.json')
      .then((m) => ((isJsonObject(m.default) ? (m.default as SchemaPack) : { routes: {} }) as SchemaPack))
      .catch(() => ({ routes: {} } as SchemaPack));
    const breadcrumbPack = await import('@/config/seo/schema/Treatments_Breadcrumbs.json')
      .then((m) => (isJsonObject(m.default) ? (m.default as BreadcrumbPack) : ({ breadcrumbs: {} } as BreadcrumbPack)))
      .catch(() => ({ breadcrumbs: {} } as BreadcrumbPack));

    const route = extractRouteFromMap(slug, routesMap);
    const breadcrumbs = normaliseBreadcrumbItems(route, breadcrumbPack);

    if (!route) {
      const missingFlags: TreatmentPreviewContent['missing'] = {
        service: true,
        howTo: true,
        faq: true,
        breadcrumbs: breadcrumbs.length === 0,
      };
      return { ...fallback, route: fallback.route, breadcrumbs, missing: missingFlags, hudStatus: resolveHudStatus(missingFlags) };
    }

    const routeEntry = isJsonObject(schemaPack.routes)
      ? ((schemaPack.routes as Record<string, unknown>)[route] as SchemaRouteEntry | undefined)
      : undefined;

    if (!routeEntry || !isJsonObject(routeEntry)) {
      const missingFlags: TreatmentPreviewContent['missing'] = {
        service: true,
        howTo: true,
        faq: true,
        breadcrumbs: breadcrumbs.length === 0,
      };
      return {
        ...fallback,
        route,
        breadcrumbs,
        missing: missingFlags,
        hudStatus: resolveHudStatus(missingFlags),
      };
    }

    const context = typeof routeEntry['@context'] === 'string' ? (routeEntry['@context'] as string) : DEFAULT_CONTEXT;

    const graphNodes = Array.isArray(routeEntry['@graph'])
      ? (routeEntry['@graph'] as unknown[]).filter(isJsonObject)
      : [];

    const serviceNode = graphNodes.find((node) => extractTypes(node['@type']).includes('Service'));
    const howToNode = graphNodes.find((node) => extractTypes(node['@type']).includes('HowTo'));
    const faqNode = graphNodes.find((node) => extractTypes(node['@type']).includes('FAQPage'));

    const service: PreviewServiceSummary | null = serviceNode
      ? {
          name: typeof serviceNode.name === 'string' ? (serviceNode.name as string) : undefined,
          description: typeof serviceNode.description === 'string' ? (serviceNode.description as string) : undefined,
        }
      : null;

    let howTo: TreatmentPreviewContent['howTo'] = null;
    if (howToNode) {
      const stepsCandidate = (howToNode.step as unknown) ?? [];
      const steps = Array.isArray(stepsCandidate)
        ? (stepsCandidate.map(toPreviewHowToStep).filter(Boolean) as PreviewHowToStep[])
        : [];
      howTo = {
        name: typeof howToNode.name === 'string' ? (howToNode.name as string) : undefined,
        steps,
      };
    }

    const faq: PreviewFaqEntry[] = faqNode && Array.isArray(faqNode.mainEntity)
      ? (faqNode.mainEntity as unknown[])
          .map((entity) => {
            if (!isJsonObject(entity)) return null;
            const acceptedAnswer = entity.acceptedAnswer;
            return {
              question: typeof entity.name === 'string' ? (entity.name as string) : undefined,
              answer: isJsonObject(acceptedAnswer) && typeof acceptedAnswer.text === 'string'
                ? (acceptedAnswer.text as string)
                : undefined,
            };
          })
          .filter(Boolean) as PreviewFaqEntry[]
      : [];

    const schemaTypes = new Set<string>();
    if (serviceNode) extractTypes(serviceNode['@type']).forEach((t) => schemaTypes.add(t));
    if (howToNode) extractTypes(howToNode['@type']).forEach((t) => schemaTypes.add(t));
    if (faqNode) extractTypes(faqNode['@type']).forEach((t) => schemaTypes.add(t));
    if (breadcrumbs.length > 0) schemaTypes.add('BreadcrumbList');

    const missingFlags: TreatmentPreviewContent['missing'] = {
      service: !service,
      howTo: !howTo || howTo.steps.length === 0,
      faq: faq.length === 0,
      breadcrumbs: breadcrumbs.length === 0,
    };

    return {
      slug,
      route,
      context,
      service,
      howTo,
      faq,
      breadcrumbs,
      schemaTypes: Array.from(schemaTypes).sort(),
      hasSchemaPack: true,
      hudStatus: resolveHudStatus(missingFlags),
      missing: missingFlags,
    };
  } catch {
    return fallback;
  }
}
