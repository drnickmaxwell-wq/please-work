export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { headers } from "next/headers";

type ComponentEntry = {
  id: string;
  previewRoute?: string;
};

type ManifestSummary = {
  componentsCount: number;
  assetsCount: number;
  guardsCount: number;
  componentIds: string[];
};

type ManifestSuccess = {
  ok: true;
  url: string;
  status: number;
  statusText: string;
  summary: ManifestSummary;
  data: unknown;
  components: ComponentEntry[];
};

type ManifestFailure = {
  ok: false;
  url: string;
  status: number;
  statusText: string;
  summary: ManifestSummary;
  error: string;
  components: ComponentEntry[];
};

type ManifestLoad = ManifestSuccess | ManifestFailure;

type DiffResult = {
  missing: string[];
  extra: string[];
};

type UnknownRecord = Record<string, unknown>;

const CHAMPAGNE_MANIFEST_FILE = "champagne_machine_manifest_full.json";
const MANUS_MANIFEST_FILE = "manus_import_unified_manifest_20251104.json";

const EMPTY_SUMMARY: ManifestSummary = {
  componentsCount: 0,
  assetsCount: 0,
  guardsCount: 0,
  componentIds: [],
};

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function normaliseString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function extractComponents(manifest: unknown): {
  ids: Set<string>;
  list: ComponentEntry[];
  assets: Set<string>;
} {
  const ids = new Set<string>();
  const list: ComponentEntry[] = [];
  const assets = new Set<string>();

  if (!isRecord(manifest)) {
    return { ids, list, assets };
  }

  const seenForList = new Set<string>();
  const rawComponents = manifest.components;

  const recordComponent = (id: string | undefined, previewRoute: string | undefined) => {
    if (!id) return;
    ids.add(id);
    if (!seenForList.has(id)) {
      if (previewRoute) {
        list.push({ id, previewRoute });
      } else {
        list.push({ id });
      }
      seenForList.add(id);
    }
  };

  const recordAssets = (entry: unknown) => {
    if (!isRecord(entry)) return;
    const componentAssets = entry.assets;
    if (Array.isArray(componentAssets)) {
      for (const asset of componentAssets) {
        if (!asset) continue;
        if (typeof asset === "string") {
          const path = normaliseString(asset);
          if (path) assets.add(path);
        } else if (isRecord(asset)) {
          const path = normaliseString(asset.path) ?? normaliseString(asset.file);
          if (path) {
            assets.add(path);
          }
        }
      }
    }
  };

  if (Array.isArray(rawComponents)) {
    for (const entry of rawComponents) {
      if (typeof entry === "string") {
        recordComponent(normaliseString(entry), undefined);
        continue;
      }
      if (isRecord(entry)) {
        recordComponent(normaliseString(entry.id), normaliseString(entry.preview_route));
        recordAssets(entry);
      }
    }
  } else if (isRecord(rawComponents)) {
    for (const [key, value] of Object.entries(rawComponents)) {
      recordComponent(normaliseString(key), isRecord(value) ? normaliseString(value.preview_route) : undefined);
      recordAssets(value);
    }
  }

  return { ids, list, assets };
}

function computeSummary(manifest: unknown): ManifestSummary {
  const { ids, assets } = extractComponents(manifest);

  let guardsCount = 0;
  if (isRecord(manifest)) {
    const guards = manifest.guards;
    if (isRecord(guards)) {
      for (const value of Object.values(guards)) {
        if (!value) continue;
        if (Array.isArray(value)) {
          guardsCount += value.length;
        } else if (isRecord(value)) {
          for (const inner of Object.values(value)) {
            if (Array.isArray(inner)) {
              guardsCount += inner.length;
            }
          }
        }
      }
    }

    const assetsSummary = manifest.assets_summary;
    if (isRecord(assetsSummary)) {
      for (const value of Object.values(assetsSummary)) {
        if (!value) continue;
        if (Array.isArray(value)) {
          for (const item of value) {
            if (!item) continue;
            if (typeof item === "string") {
              const path = normaliseString(item);
              if (path) assets.add(path);
            } else if (isRecord(item)) {
              const path = normaliseString(item.file) ?? normaliseString(item.path);
              if (path) {
                assets.add(path);
              }
            }
          }
        }
      }
    }
  }

  return {
    componentsCount: ids.size,
    assetsCount: assets.size,
    guardsCount,
    componentIds: Array.from(ids).sort(),
  };
}

async function fetchManifest(fileName: string): Promise<ManifestLoad> {
  const hdrs = headers();
  const host =
    hdrs.get("x-forwarded-host") ?? hdrs.get("host") ?? "localhost:3000";
  const protocol = hdrs.get("x-forwarded-proto") ?? "http";
  const url = `${protocol}://${host}/brand/${fileName}`;

  try {
    const response = await fetch(url, { cache: "no-store" });
    const status = response.status;
    const statusText = response.statusText || "";
    const body = await response.text();

    if (!response.ok) {
      const friendly =
        status === 401
          ? "Authentication required"
          : status === 403
          ? "Access denied"
          : status === 404
          ? "File not found"
          : `HTTP ${status} ${statusText}`.trim();
      return {
        ok: false,
        url,
        status,
        statusText: statusText || friendly,
        summary: EMPTY_SUMMARY,
        error: `${friendly}. Tried ${url}.`,
        components: [],
      };
    }

    if (body.length === 0) {
      return {
        ok: false,
        url,
        status,
        statusText: "empty body",
        summary: EMPTY_SUMMARY,
        error: `Received 0-byte response from ${url}.`,
        components: [],
      };
    }

    try {
      const json: unknown = JSON.parse(body);
      const summary = computeSummary(json);
      const { list } = extractComponents(json);
      return {
        ok: true,
        url,
        status,
        statusText: statusText || "OK",
        data: json,
        summary,
        components: list,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        ok: false,
        url,
        status,
        statusText: "json parse error",
        summary: EMPTY_SUMMARY,
        error: `Failed to parse JSON from ${url}: ${message}`,
        components: [],
      };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      ok: false,
      url,
      status: 0,
      statusText: "network error",
      summary: EMPTY_SUMMARY,
      error: `Network error while requesting ${url}: ${message}`,
      components: [],
    };
  }
}

function diffComponents(champagne: ManifestLoad, manus: ManifestLoad): DiffResult {
  if (!champagne.ok || !manus.ok) {
    return { missing: [], extra: [] };
  }

  const manusIds = new Set(manus.summary.componentIds);
  const champagneIds = new Set(champagne.summary.componentIds);

  const missing = champagne.summary.componentIds
    .filter((id) => !manusIds.has(id))
    .sort();
  const extra = manus.summary.componentIds
    .filter((id) => !champagneIds.has(id))
    .sort();

  return { missing, extra };
}

function StatusList({ label, result }: { label: string; result: ManifestLoad }) {
  return (
    <div>
      <h3>{label}</h3>
      <ul>
        <li>
          status: {result.status}{" "}
          {result.statusText}
        </li>
        <li>
          path tried: <code>{result.url}</code>
        </li>
        {!result.ok ? (
          <li className="text-amber-600">
            {result.error}
          </li>
        ) : null}
      </ul>
    </div>
  );
}

function SummaryTable({ champagne, manus }: { champagne: ManifestLoad; manus: ManifestLoad }) {
  const rows: { label: string; champagne: number; manus: number }[] = [
    {
      label: "Components",
      champagne: champagne.summary.componentsCount,
      manus: manus.summary.componentsCount,
    },
    {
      label: "Assets",
      champagne: champagne.summary.assetsCount,
      manus: manus.summary.assetsCount,
    },
    {
      label: "Guards",
      champagne: champagne.summary.guardsCount,
      manus: manus.summary.guardsCount,
    },
  ];

  return (
    <table className="table-auto border-collapse border border-slate-300 text-sm">
      <thead>
        <tr>
          <th className="border border-slate-300 px-3 py-2 text-left">Metric</th>
          <th className="border border-slate-300 px-3 py-2 text-left">Champagne</th>
          <th className="border border-slate-300 px-3 py-2 text-left">Manus</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <th className="border border-slate-300 px-3 py-2 text-left font-medium">
              {row.label}
            </th>
            <td className="border border-slate-300 px-3 py-2">{row.champagne}</td>
            <td className="border border-slate-300 px-3 py-2">{row.manus}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default async function ManusManifestExplorerPage() {
  const [champagne, manus] = await Promise.all([
    fetchManifest(CHAMPAGNE_MANIFEST_FILE),
    fetchManifest(MANUS_MANIFEST_FILE),
  ]);

  const diff = diffComponents(champagne, manus);
  const warnChampagne =
    !champagne.ok &&
    (champagne.statusText === "empty body" || champagne.statusText === "json parse error");
  const warnManus =
    !manus.ok && (manus.statusText === "empty body" || manus.statusText === "json parse error");
  const showWarning = warnChampagne || warnManus;

  return (
    <main className="prose max-w-4xl mx-auto p-6">
      <h1>Manus manifest explorer</h1>
      <p>
        Read-only view of the Champagne canon and Manus manifests stored under
        <code>/public/brand</code>.
      </p>

      {showWarning ? (
        <div className="border-l-4 border-yellow-400 bg-yellow-100 p-4 text-yellow-900">
          <p className="font-semibold">Manifest warning</p>
          <ul className="mt-2 space-y-1">
            {warnChampagne ? <li>{champagne.error}</li> : null}
            {warnManus ? <li>{manus.error}</li> : null}
          </ul>
        </div>
      ) : null}

      <section>
        <h2>Manifest status</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <StatusList label="Champagne manifest" result={champagne} />
          <StatusList label="Manus manifest" result={manus} />
        </div>
      </section>

      <section>
        <h2>Snapshot totals</h2>
        <SummaryTable champagne={champagne} manus={manus} />
      </section>

      <section>
        <h2>Components</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3>Champagne</h3>
            {champagne.ok && champagne.components.length ? (
              <ul>
                {champagne.components.map((component) => (
                  <li key={component.id}>
                    <span className="font-medium">{component.id}</span>
                    {component.previewRoute ? (
                      <>
                        {" — "}
                        <Link href={component.previewRoute}>preview</Link>
                      </>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No components available.</p>
            )}
          </div>
          <div>
            <h3>Manus</h3>
            {manus.ok && manus.components.length ? (
              <ul>
                {manus.components.map((component) => (
                  <li key={component.id}>
                    <span className="font-medium">{component.id}</span>
                    {component.previewRoute ? (
                      <>
                        {" — "}
                        <Link href={component.previewRoute}>preview</Link>
                      </>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No components available.</p>
            )}
          </div>
        </div>
      </section>

      <section>
        <h2>Component diff</h2>
        {champagne.ok && manus.ok ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3>Missing from Manus</h3>
              {diff.missing.length ? (
                <ul>
                  {diff.missing.map((id) => (
                    <li key={id}>{id}</li>
                  ))}
                </ul>
              ) : (
                <p>No components missing from Manus.</p>
              )}
            </div>
            <div>
              <h3>Extra in Manus</h3>
              {diff.extra.length ? (
                <ul>
                  {diff.extra.map((id) => (
                    <li key={id}>{id}</li>
                  ))}
                </ul>
              ) : (
                <p>No Manus-only components detected.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-amber-600">
            Differences are available once both manifests load successfully.
          </p>
        )}
      </section>
    </main>
  );
}
