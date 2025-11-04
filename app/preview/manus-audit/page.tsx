import Link from "next/link";
import path from "node:path";
import { promises as fs } from "node:fs";

type ChampagneSection = {
  type?: string;
  id?: string;
};

type ChampagnePage = {
  page_guess?: string;
  sections?: ChampagneSection[];
};

type ManusComponent = Record<string, unknown>;

type ManifestLoadResult = {
  ids: Set<string>;
  total: number;
  error?: string;
};

async function loadChampagneComponents(root = process.cwd()): Promise<ManifestLoadResult> {
  const filePath = path.join(root, "brand", "champagne_machine_manifest_full.json");

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const startIndex = raw.indexOf("[");

    if (startIndex === -1) {
      return {
        ids: new Set(),
        total: 0,
        error: "Champagne manifest missing JSON payload",
      };
    }

    const jsonText = raw.slice(startIndex);
    const endIndex = jsonText.lastIndexOf("]");
    const trimmed = endIndex >= 0 ? jsonText.slice(0, endIndex + 1) : jsonText;
    const pages = JSON.parse(trimmed) as ChampagnePage[];

    const ids = new Set<string>();

    for (const page of pages) {
      const pageId = typeof page.page_guess === "string" && page.page_guess.length > 0 ? page.page_guess : "unknown";

      for (const section of page.sections ?? []) {
        const sectionKey = getSectionKey(section);
        ids.add(`${pageId}::${sectionKey}`);
      }
    }

    return {
      ids,
      total: ids.size,
    };
  } catch (error) {
    return {
      ids: new Set(),
      total: 0,
      error: `Failed to load Champagne manifest: ${(error as Error).message}`,
    };
  }
}

function getSectionKey(section: ChampagneSection): string {
  if (typeof section.id === "string" && section.id.length > 0) {
    return section.id;
  }

  if (typeof section.type === "string" && section.type.length > 0) {
    return section.type;
  }

  return "unknown";
}

async function loadManusComponents(root = process.cwd()): Promise<ManifestLoadResult> {
  const filePath = path.join(root, "brand", "manus_import_unified_manifest_20251104.json");

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const json = JSON.parse(raw) as { components?: unknown };
    const components = Array.isArray(json.components) ? (json.components as ManusComponent[]) : [];
    const ids = new Set<string>();

    for (const component of components) {
      const id = getManusComponentId(component);

      if (id) {
        ids.add(id);
      }
    }

    return {
      ids,
      total: ids.size,
      error: components.length === 0 ? "Manus manifest contained no component entries" : undefined,
    };
  } catch (error) {
    return {
      ids: new Set(),
      total: 0,
      error: `Failed to load Manus manifest: ${(error as Error).message}`,
    };
  }
}

function getManusComponentId(component: ManusComponent): string | null {
  const priorityKeys = ["id", "component_id", "componentId", "slug"];

  for (const key of priorityKeys) {
    const value = component[key];

    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  const page = pickString(component, ["page", "page_guess", "context"]);
  const section = pickString(component, ["section", "type", "variant"]);

  if (page && section) {
    return `${page}::${section}`;
  }

  return null;
}

function pickString(record: ManusComponent, keys: string[]): string | null {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return null;
}

async function getReportAvailability(root = process.cwd()): Promise<boolean> {
  const reportPath = path.join(root, "scripts", "reports", "compare-manus-to-champagne.json");

  try {
    await fs.access(reportPath);
    return true;
  } catch {
    return false;
  }
}

export default async function ManusAuditPage() {
  const root = process.cwd();
  const [champagne, manus, reportExists] = await Promise.all([
    loadChampagneComponents(root),
    loadManusComponents(root),
    getReportAvailability(root),
  ]);

  const missingInManus = Array.from(champagne.ids).filter((id) => !manus.ids.has(id)).sort();
  const unexpectedInManus = Array.from(manus.ids).filter((id) => !champagne.ids.has(id)).sort();

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Preview</p>
        <h1 className="text-3xl font-semibold">Manus audit overview</h1>
        <p className="text-sm text-neutral-500">
          Quick comparison between the Manus delivery package and the Champagne canon manifest.
        </p>
      </header>

      <section className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-medium">Component totals</h2>
        <dl className="grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-neutral-500">Champagne reference</dt>
            <dd className="text-lg font-semibold">{champagne.total}</dd>
            {champagne.error && <p className="mt-1 text-xs text-amber-400">{champagne.error}</p>}
          </div>
          <div>
            <dt className="text-neutral-500">Manus package</dt>
            <dd className="text-lg font-semibold">{manus.total}</dd>
            {manus.error && <p className="mt-1 text-xs text-amber-400">{manus.error}</p>}
          </div>
        </dl>
      </section>

      <section className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-medium">Missing from Manus</h2>
        {missingInManus.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {missingInManus.map((id) => (
              <li key={`missing-${id}`}>{id}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-neutral-500">No gaps detected between the manifests.</p>
        )}
      </section>

      <section className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-medium">Unexpected or mismatched entries</h2>
        {unexpectedInManus.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {unexpectedInManus.map((id) => (
              <li key={`unexpected-${id}`}>{id}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-neutral-500">No Manus-only entries detected.</p>
        )}
      </section>

      <section className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-medium">Report</h2>
        {reportExists ? (
          <Link className="text-sm font-medium text-sky-300 underline" href="/scripts/reports/compare-manus-to-champagne.json">
            View JSON comparison report
          </Link>
        ) : (
          <p className="text-sm text-neutral-500">
            Run: <code className="rounded bg-neutral-900 px-2 py-1 text-neutral-100">pnpm exec node scripts/compare-manus-to-champagne.mjs</code>
          </p>
        )}
      </section>
    </main>
  );
}
