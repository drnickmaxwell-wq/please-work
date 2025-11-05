export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { readFile } from "fs/promises";
import { join } from "path";

type ManifestComponent = {
  id?: unknown;
  preview_route?: unknown;
  [key: string]: unknown;
};

type ManifestData = {
  components?: unknown;
  assets_summary?: unknown;
  guards?: unknown;
  [key: string]: unknown;
};

type ManifestLoadSuccess = {
  ok: true;
  fileName: string;
  bytes: number;
  text: string;
  data: ManifestData;
};

type ManifestLoadFailureReason = "read" | "empty" | "parse";

type ManifestLoadFailure = {
  ok: false;
  fileName: string;
  bytes: number;
  text: string;
  error: string;
  reason: ManifestLoadFailureReason;
};

type ManifestLoadResult = ManifestLoadSuccess | ManifestLoadFailure;

const BRAND_DIR = join(process.cwd(), "public", "brand");

const CHAMPAGNE_MANIFEST = "champagne_machine_manifest_full.json";
const MANUS_MANIFEST = "manus_import_unified_manifest_20251104.json";

type ManifestSummary = {
  components: { id: string; previewRoute: string | null }[];
  componentIds: Set<string>;
  componentCount: number;
  assetCount: number;
  guardCount: number;
};

async function loadManifest(fileName: string): Promise<ManifestLoadResult> {
  const absPath = join(BRAND_DIR, fileName);

  try {
    const buffer = await readFile(absPath);
    const bytes = buffer.byteLength;
    const text = buffer.toString("utf8");

    if (!bytes || !text.trim()) {
      return {
        ok: false,
        fileName,
        bytes,
        text,
        error: "Manifest file is empty (0 bytes).",
        reason: "empty",
      };
    }

    try {
      const data = JSON.parse(text) as ManifestData;
      return {
        ok: true,
        fileName,
        bytes,
        text,
        data,
      };
    } catch (error: unknown) {
      return {
        ok: false,
        fileName,
        bytes,
        text,
        error: String((error as { message?: unknown })?.message ?? error),
        reason: "parse",
      };
    }
  } catch (error: unknown) {
    return {
      ok: false,
      fileName,
      bytes: 0,
      text: "",
      error: String((error as { message?: unknown })?.message ?? error),
      reason: "read",
    };
  }
}

function toStringId(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  if (typeof value === "number") {
    return String(value);
  }

  return null;
}

function collectAssets(assetsSummary: unknown): number {
  if (!assetsSummary || typeof assetsSummary !== "object") {
    return 0;
  }

  let total = 0;

  for (const value of Object.values(assetsSummary as Record<string, unknown>)) {
    if (Array.isArray(value)) {
      total += value.length;
    }
  }

  return total;
}

function collectGuards(guards: unknown): number {
  if (!guards || typeof guards !== "object") {
    return 0;
  }

  let total = 0;

  for (const entry of Object.values(guards as Record<string, unknown>)) {
    if (Array.isArray(entry)) {
      total += entry.length;
    } else if (entry && typeof entry === "object") {
      total += Object.values(entry as Record<string, unknown>).filter((value) =>
        typeof value === "string" && value.trim()
      ).length;
    } else if (typeof entry === "string" && entry.trim()) {
      total += 1;
    }
  }

  return total;
}

function summariseManifest(manifest: ManifestData | null): ManifestSummary {
  const components: { id: string; previewRoute: string | null }[] = [];
  const componentIds = new Set<string>();

  if (manifest && manifest.components && Array.isArray(manifest.components)) {
    for (const entry of manifest.components as ManifestComponent[]) {
      if (!entry || typeof entry !== "object") {
        continue;
      }

      const id = toStringId((entry as ManifestComponent).id);

      if (!id) {
        continue;
      }

      const preview = (entry as ManifestComponent).preview_route;
      const previewRoute = typeof preview === "string" && preview.trim() ? preview.trim() : null;

      components.push({ id, previewRoute });
      componentIds.add(id);
    }
  }

  const assetCount = collectAssets(manifest?.assets_summary ?? null);
  const guardCount = collectGuards(manifest?.guards ?? null);

  return {
    components,
    componentIds,
    componentCount: components.length,
    assetCount,
    guardCount,
  };
}

function DiffList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (!items.length) {
    return (
      <section className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-neutral-500">None 🎉</p>
      </section>
    );
  }

  return (
    <section className="space-y-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="max-h-72 overflow-auto rounded border border-neutral-200 bg-white/80 p-3 text-sm">
        {items.map((item) => (
          <li key={item} className="py-1">
            <code>{item}</code>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ComponentList({
  label,
  summary,
  loadResult,
}: {
  label: string;
  summary: ManifestSummary;
  loadResult: ManifestLoadResult;
}) {
  return (
    <section className="space-y-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">{label}</h2>
        <p className="text-sm text-neutral-500">
          components: <span className="font-medium text-neutral-900">{summary.componentCount}</span> · assets: <span className="font-medium text-neutral-900">{summary.assetCount}</span> · guards: <span className="font-medium text-neutral-900">{summary.guardCount}</span>
        </p>
        <p className="text-xs text-neutral-400">
          file: <code>{loadResult.fileName}</code> ({loadResult.bytes.toLocaleString()} bytes)
        </p>
      </div>

      {loadResult.ok ? null : (
        <div className="rounded border border-yellow-400 bg-yellow-100 p-4 text-sm text-yellow-900">
          <p className="font-semibold">Unable to fully parse {label} manifest.</p>
          <p className="mt-1 break-words">
            {loadResult.reason === "empty" ? "The manifest file is empty." : "Error: "}
            {loadResult.reason === "empty" ? null : <code>{loadResult.error}</code>}
          </p>
        </div>
      )}

      {summary.components.length ? (
        <ul className="max-h-96 space-y-2 overflow-auto rounded border border-neutral-200 bg-white/80 p-4 text-sm">
          {summary.components.map((component) => (
            <li key={component.id} className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-neutral-800">{component.id}</span>
              {component.previewRoute ? (
                <a
                  className="text-sky-600 hover:text-sky-500"
                  href={component.previewRoute}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {component.previewRoute}
                </a>
              ) : (
                <span className="text-xs text-neutral-400">(no preview)</span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-neutral-500">No components listed.</p>
      )}
    </section>
  );
}

export default async function ManusManifestExplorerPage() {
  const [champagneResult, manusResult] = await Promise.all([
    loadManifest(CHAMPAGNE_MANIFEST),
    loadManifest(MANUS_MANIFEST),
  ]);

  const champagneData = champagneResult.ok ? champagneResult.data : null;
  const manusData = manusResult.ok ? manusResult.data : null;

  const champagneSummary = summariseManifest(champagneData);
  const manusSummary = summariseManifest(manusData);

  const missingFromManus = [...champagneSummary.componentIds]
    .filter((id) => !manusSummary.componentIds.has(id))
    .sort();

  const extraInManus = [...manusSummary.componentIds]
    .filter((id) => !champagneSummary.componentIds.has(id))
    .sort();

  const showYellowNote = [champagneResult, manusResult].some(
    (result) => !result.ok && (result.reason === "empty" || result.reason === "parse")
  );

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Manus manifest explorer</h1>
        <p className="text-neutral-600">
          Read-only comparison of the Champagne canon manifest and the Manus import manifest. Useful for spotting gaps
          before wiring routes.
        </p>
      </header>

      {showYellowNote ? (
        <div className="rounded-lg border border-yellow-400 bg-yellow-100 p-6 text-yellow-900">
          <p className="text-lg font-semibold">Heads up!</p>
          <p className="mt-2 text-sm">
            One or more manifest files could not be parsed or were empty. Counts below may be incomplete until the
            underlying JSON issues are resolved.
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ComponentList label="Champagne manifest" summary={champagneSummary} loadResult={champagneResult} />
        <ComponentList label="Manus manifest" summary={manusSummary} loadResult={manusResult} />
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Component diff</h2>
        <p className="text-sm text-neutral-600">
          Comparing <code>components[].id</code> between Champagne and Manus manifests.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <DiffList title="Missing from Manus" items={missingFromManus} />
          <DiffList title="Extra in Manus" items={extraInManus} />
        </div>
      </section>
    </main>
  );
}

