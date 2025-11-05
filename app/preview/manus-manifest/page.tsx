export const runtime = "nodejs";

import Link from "next/link";
import { readFile, stat } from "fs/promises";
import { join } from "path";

type LoadedManifest = {
  fileName: string;
  absolutePath: string;
  bytes: number | null;
  data: unknown;
  error: string | null;
};

type ComponentInfo = {
  id: string;
  previewRoute: string | null;
};

const BRAND_DIR = join(process.cwd(), "public", "brand");
const CHAMPAGNE_MANIFEST = "champagne_machine_manifest_full.json";
const MANUS_MANIFEST = "manus_import_unified_manifest_20251104.json";

async function loadManifest(fileName: string): Promise<LoadedManifest> {
  const absolutePath = join(BRAND_DIR, fileName);

  try {
    const fileStat = await stat(absolutePath);
    const bytes = fileStat.size;
    const raw = await readFile(absolutePath, "utf8");

    if (bytes === 0 || raw.length === 0) {
      return { fileName, absolutePath, bytes, data: null, error: "File is empty." };
    }

    try {
      const data = JSON.parse(raw);
      return { fileName, absolutePath, bytes, data, error: null };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        fileName,
        absolutePath,
        bytes,
        data: null,
        error: `Failed to parse JSON: ${message}`,
      };
    }
  } catch (error: unknown) {
    const message =
      typeof error === "object" && error && "code" in error && (error as { code?: string }).code === "ENOENT"
        ? "File not found."
        : error instanceof Error
          ? error.message
          : String(error);
    return { fileName, absolutePath, bytes: null, data: null, error: message };
  }
}

function normaliseComponentList(data: unknown): ComponentInfo[] {
  if (!data || typeof data !== "object") {
    return [];
  }

  const manifest = data as Record<string, unknown>;
  const rawComponents = manifest.components as unknown;

  if (Array.isArray(rawComponents)) {
    return rawComponents
      .map((entry) => {
        if (!entry || typeof entry !== "object") {
          return null;
        }
        const item = entry as Record<string, unknown>;
        const id = typeof item.id === "string" ? item.id : null;
        if (!id) {
          return null;
        }
        const previewRouteRaw = item.preview_route ?? item.previewRoute;
        const previewRoute = typeof previewRouteRaw === "string" ? previewRouteRaw : null;
        return { id, previewRoute } satisfies ComponentInfo;
      })
      .filter((value): value is ComponentInfo => Boolean(value));
  }

  if (rawComponents && typeof rawComponents === "object") {
    return Object.entries(rawComponents).flatMap(([key, value]) => {
      if (typeof key !== "string" || !key) {
        return [] as ComponentInfo[];
      }
      if (value && typeof value === "object") {
        const record = value as Record<string, unknown>;
        const previewRouteRaw = record.preview_route ?? record.previewRoute;
        const previewRoute = typeof previewRouteRaw === "string" ? previewRouteRaw : null;
        return [{ id: key, previewRoute } satisfies ComponentInfo];
      }
      return [{ id: key, previewRoute: null } satisfies ComponentInfo];
    });
  }

  return [];
}

function countAssets(data: unknown): number {
  if (!data || typeof data !== "object") {
    return 0;
  }
  const manifest = data as Record<string, unknown>;
  const directAssets = manifest.assets as unknown;

  if (Array.isArray(directAssets)) {
    return directAssets.length;
  }

  const summary = (manifest.assets_summary ?? manifest.assetsSummary) as unknown;
  if (summary && typeof summary === "object") {
    return Object.values(summary).reduce((total, value) => {
      if (Array.isArray(value)) {
        return total + value.length;
      }
      return total;
    }, 0);
  }

  return 0;
}

function countGuards(data: unknown): number {
  if (!data || typeof data !== "object") {
    return 0;
  }

  const manifest = data as Record<string, unknown>;
  const guards = manifest.guards as unknown;

  if (!guards) {
    return 0;
  }

  if (Array.isArray(guards)) {
    return guards.length;
  }

  if (typeof guards === "object") {
    return Object.values(guards).reduce((total, value) => {
      if (Array.isArray(value)) {
        return total + value.length;
      }
      return total + 1;
    }, 0);
  }

  return 0;
}

function componentIds(components: ComponentInfo[]): string[] {
  return components.map((component) => component.id);
}

function formatBytes(bytes: number | null): string {
  if (bytes == null) {
    return "n/a";
  }
  if (bytes < 1024) {
    return `${bytes} bytes`;
  }
  const kilobytes = bytes / 1024;
  if (kilobytes < 1024) {
    return `${kilobytes.toFixed(1)} KB`;
  }
  const megabytes = kilobytes / 1024;
  return `${megabytes.toFixed(2)} MB`;
}

function ManifestSummary({
  title,
  manifest,
}: {
  title: string;
  manifest: LoadedManifest;
}) {
  const components = normaliseComponentList(manifest.data);
  const componentCount = components.length;
  const assetCount = countAssets(manifest.data);
  const guardCount = countGuards(manifest.data);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-base font-semibold text-slate-900">{title}</h3>
      <dl className="space-y-1 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">File</dt>
          <dd className="text-right font-mono text-xs text-slate-700">/{manifest.fileName}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Size</dt>
          <dd className="text-right text-slate-900">{formatBytes(manifest.bytes)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Components</dt>
          <dd className="text-right text-slate-900">{componentCount}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Assets</dt>
          <dd className="text-right text-slate-900">{assetCount}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Guards</dt>
          <dd className="text-right text-slate-900">{guardCount}</dd>
        </div>
        {manifest.error ? (
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Status</dt>
            <dd className="text-right text-amber-700">{manifest.error}</dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}

function ComponentList({ title, components }: { title: string; components: ComponentInfo[] }) {
  if (!components.length) {
    return (
      <section>
        <h3>{title}</h3>
        <p>No components to list.</p>
      </section>
    );
  }

  return (
    <section>
      <h3>{title}</h3>
      <ul>
        {components.map((component) => (
          <li key={component.id}>
            <code>{component.id}</code>
            {component.previewRoute ? (
              <>
                {" "}·{" "}
                <Link href={component.previewRoute} className="text-sm text-blue-600 hover:text-blue-500">
                  {component.previewRoute}
                </Link>
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function DiffList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      {items.length ? (
        <ul className="mt-1 space-y-1 text-sm">
          {items.map((item) => (
            <li key={item}>
              <code>{item}</code>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500">None 🎉</p>
      )}
    </div>
  );
}

export default async function ManusManifestExplorer() {
  const [champagne, manus] = await Promise.all([
    loadManifest(CHAMPAGNE_MANIFEST),
    loadManifest(MANUS_MANIFEST),
  ]);

  const champagneComponents = normaliseComponentList(champagne.data);
  const manusComponents = normaliseComponentList(manus.data);

  const champagneIds = new Set(componentIds(champagneComponents));
  const manusIds = new Set(componentIds(manusComponents));

  const missingFromManus = champagneComponents
    .map((component) => component.id)
    .filter((id) => !manusIds.has(id))
    .sort();

  const extraInManus = manusComponents
    .map((component) => component.id)
    .filter((id) => !champagneIds.has(id))
    .sort();

  const warnings: string[] = [];

  if (champagne.error) {
    warnings.push(`${CHAMPAGNE_MANIFEST}: ${champagne.error}`);
  }
  if (champagne.bytes === 0) {
    warnings.push(`${CHAMPAGNE_MANIFEST} is 0 bytes.`);
  }
  if (manus.error) {
    warnings.push(`${MANUS_MANIFEST}: ${manus.error}`);
  }
  if (manus.bytes === 0) {
    warnings.push(`${MANUS_MANIFEST} is 0 bytes.`);
  }

  const canDiff = champagneComponents.length > 0 && manusComponents.length > 0;

  return (
    <main className="prose mx-auto max-w-5xl p-6">
      <h1>Manus manifest explorer</h1>
      <p className="lead">
        Quick read-only peek at the champagne canon manifest alongside the latest Manus import package.
      </p>

      {warnings.length ? (
        <div className="not-prose mb-8 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-yellow-900">
          <h2 className="text-base font-semibold">Heads up</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <section className="not-prose mb-10 grid gap-4 md:grid-cols-2">
        <ManifestSummary title="Champagne manifest" manifest={champagne} />
        <ManifestSummary title="Manus manifest" manifest={manus} />
      </section>

      <section>
        <h2>Component diff</h2>
        {canDiff ? (
          <div className="not-prose grid gap-4 md:grid-cols-2">
            <DiffList title="Missing from Manus" items={missingFromManus} />
            <DiffList title="Extra in Manus" items={extraInManus} />
          </div>
        ) : (
          <p>
            Diff is available once both manifests load successfully with component data. Check the warnings above for any issues.
          </p>
        )}
      </section>

      <div className="mt-10 space-y-8">
        <ComponentList title="Champagne components" components={champagneComponents} />
        <ComponentList title="Manus components" components={manusComponents} />
      </div>
    </main>
  );
}
