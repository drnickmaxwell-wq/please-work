// This page reads manifests from /public/brand so Vercel can serve them.
// Keep champagne_machine_manifest_full.json and manus_import_unified_manifest_20251104.json mirrored here.
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

const CHAMPAGNE_MANIFEST_PATH = "/brand/champagne_machine_manifest_full.json";
const MANUS_MANIFEST_PATH = "/brand/manus_import_unified_manifest_20251104.json";

type ManifestLoadResult = {
  ids: Set<string>;
  total: number;
  error?: string;
};

type FetchJsonResult<T = unknown> =
  | { ok: true; json: T; url: string; status: number; statusText: string }
  | { ok: false; status: number; statusText: string; url: string };

async function fetchJson<T = unknown>(url: string): Promise<FetchJsonResult<T>> {
  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      return { ok: false, status: res.status, statusText: res.statusText, url };
    }

    const json = (await res.json()) as T;
    return { ok: true, json, url, status: res.status, statusText: res.statusText };
  } catch (error) {
    const statusText = error instanceof Error ? error.message : "Fetch error";
    return { ok: false, status: 0, statusText, url };
  }
}

const champagneUrl = CHAMPAGNE_MANIFEST_PATH;
const manusUrl = MANUS_MANIFEST_PATH;

async function loadChampagneComponents(
  response: FetchJsonResult<unknown>,
): Promise<ManifestLoadResult> {
  const { manifest, error } = await resolveManifest<unknown>(response, CHAMPAGNE_MANIFEST_PATH);

  if (!manifest) {
    return {
      ids: new Set(),
      total: 0,
      error: error ?? "missing",
    };
  }

  let pages: ChampagnePage[] = [];

  if (Array.isArray(manifest)) {
    pages = manifest as ChampagnePage[];
  } else if (typeof manifest === "object" && manifest && Array.isArray((manifest as { pages?: unknown }).pages)) {
    pages = (manifest as { pages: ChampagnePage[] }).pages;
  }

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
    error,
  };
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

async function loadManusComponents(
  response: FetchJsonResult<{ components?: unknown }>,
): Promise<ManifestLoadResult> {
  const { manifest, error } = await resolveManifest<{ components?: unknown }>(
    response,
    MANUS_MANIFEST_PATH,
  );

  if (!manifest) {
    return {
      ids: new Set(),
      total: 0,
      error: error ?? "missing",
    };
  }

  const components = Array.isArray(manifest.components) ? (manifest.components as ManusComponent[]) : [];
  const ids = new Set<string>();

  for (const component of components) {
    const id = getManusComponentId(component);

    if (id) {
      ids.add(id);
    }
  }

  const manifestError = components.length === 0 ? "Manus manifest contained no component entries" : undefined;

  return {
    ids,
    total: ids.size,
    error: combineErrors(error, manifestError),
  };
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

async function resolveManifest<T>(
  response: FetchJsonResult<T>,
  relativePath: string,
): Promise<{ manifest: T | null; error?: string }> {
  if (response.ok) {
    return { manifest: response.json };
  }

  const statusLabel = formatStatus(response.status, response.statusText);

  if (process.env.NODE_ENV !== "production") {
    const fallback = await readManifestFromFs<T>(relativePath);

    if (fallback) {
      return { manifest: fallback, error: `Fetch failed (${statusLabel}); using local file` };
    }
  }

  console.error(`Manifest load failed for ${relativePath}: ${statusLabel}`);
  return { manifest: null, error: `Fetch failed (${statusLabel})` };
}

async function readManifestFromFs<T>(relativePath: string): Promise<T | null> {
  const localPath = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
  const filePath = path.join(process.cwd(), "public", localPath);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function formatStatus(status: number, statusText: string): string {
  const parts: string[] = [];

  if (Number.isFinite(status)) {
    parts.push(String(status));
  }

  if (statusText) {
    parts.push(statusText);
  }

  return parts.join(" ").trim();
}

function combineErrors(...messages: Array<string | undefined>): string | undefined {
  const filtered = messages.filter((message): message is string => Boolean(message));

  if (filtered.length === 0) {
    return undefined;
  }

  return filtered.join(" — ");
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
  const [champagneResponse, manusResponse, reportExists] = await Promise.all([
    fetchJson<unknown>(champagneUrl),
    fetchJson<{ components?: unknown }>(manusUrl),
    getReportAvailability(root),
  ]);
  const [champagne, manus] = await Promise.all([
    loadChampagneComponents(champagneResponse),
    loadManusComponents(manusResponse),
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
        <p className="text-xs text-neutral-500">Audit loads manifests from /public/brand.</p>
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

      {/* Diagnostics panel */}
      <div className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-6 text-sm">
        <h3 className="font-semibold">Diagnostics</h3>
        <ul className="ml-5 list-disc">
          <li>
            Champagne: {champagneResponse.ok ? "OK" : `Fetch failed (${formatStatus(champagneResponse.status, champagneResponse.statusText)})`} —
            {" "}
            {champagneUrl}
          </li>
          <li>
            Manus: {manusResponse.ok ? "OK" : `Fetch failed (${formatStatus(manusResponse.status, manusResponse.statusText)})`} — {manusUrl}
          </li>
        </ul>
      </div>

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
