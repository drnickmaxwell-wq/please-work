export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { headers } from "next/headers";
import { readdir, stat } from "fs/promises";
import { join } from "path";

const CWD = process.cwd();
const BRAND_PUBLIC = join(CWD, "public", "brand");
const BRAND_ROOT = join(CWD, "brand");

const CHAMPAGNE_MANIFEST_FILE = "champagne_machine_manifest_full.json";
const MANUS_MANIFEST_FILE = "manus_import_unified_manifest_20251104.json";

type LoadResult<T> =
  | {
      ok: true;
      json: T;
      status: number;
      statusText: string;
      pathTried: string;
    }
  | {
      ok: false;
      json: null;
      status: number;
      statusText: string;
      pathTried: string;
      error: string;
    };

type ManifestSummary = {
  componentCount: number;
  componentKeys: Set<string>;
  assetCount: number;
  assetPaths: Set<string>;
  guardCount: number;
  guardEntries: Set<string>;
};

function createBaseUrl() {
  const headerList = headers();
  const forwardedProto = headerList.get("x-forwarded-proto");
  const forwardedHost = headerList.get("x-forwarded-host");
  const host = forwardedHost || headerList.get("host") || "localhost:3000";
  const protocol = forwardedProto || (host.includes("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

async function fetchManifest<T = unknown>(fileName: string): Promise<LoadResult<T>> {
  const baseUrl = createBaseUrl();
  const url = new URL(`/brand/${fileName}`, baseUrl);

  try {
    const response = await fetch(url, { cache: "no-store" });
    const statusText = response.statusText || "";

    if (!response.ok) {
      return {
        ok: false,
        json: null,
        status: response.status,
        statusText: statusText || "request failed",
        pathTried: url.toString(),
        error: `HTTP ${response.status} ${statusText || ""}`.trim(),
      };
    }

    const body = await response.text();

    if (!body.trim()) {
      return {
        ok: false,
        json: null,
        status: 422,
        statusText: "empty file",
        pathTried: url.toString(),
        error: "Manifest file is empty (0 bytes).",
      };
    }

    try {
      const json = JSON.parse(body) as T;
      return {
        ok: true,
        json,
        status: response.status,
        statusText: statusText || "OK",
        pathTried: url.toString(),
      };
    } catch (error: unknown) {
      return {
        ok: false,
        json: null,
        status: 422,
        statusText: "invalid json",
        pathTried: url.toString(),
        error: String((error as { message?: unknown })?.message ?? error),
      };
    }
  } catch (error: unknown) {
    return {
      ok: false,
      json: null,
      status: 0,
      statusText: "network error",
      pathTried: url.toString(),
      error: String((error as { message?: unknown })?.message ?? error),
    };
  }
}

async function listDir(absDir: string) {
  try {
    const entries = await readdir(absDir);
    const detailed = await Promise.all(
      entries.map(async (name) => {
        try {
          const s = await stat(join(absDir, name));
          return { name, bytes: s.size, mtime: s.mtime.toISOString() };
        } catch {
          return { name, bytes: null, mtime: null };
        }
      })
    );
    return { ok: true as const, dir: absDir, entries: detailed };
  } catch (error: unknown) {
    return {
      ok: false as const,
      dir: absDir,
      error: String((error as { message?: unknown })?.message ?? error),
    };
  }
}

function addToSet(set: Set<string>, value: unknown) {
  if (typeof value === "string" && value.trim()) {
    set.add(value.trim());
  } else if (typeof value === "number") {
    set.add(String(value));
  }
}

function summarise(manifest: unknown): ManifestSummary {
  const componentKeys = new Set<string>();
  const assetPaths = new Set<string>();
  const guardEntries = new Set<string>();

  if (!manifest || typeof manifest !== "object") {
    return {
      componentCount: 0,
      componentKeys,
      assetCount: 0,
      assetPaths,
      guardCount: 0,
      guardEntries,
    };
  }

  const { sections, components, assets_summary: assetsSummary, guards } = manifest as Record<
    string,
    unknown
  >;

  if (sections) {
    if (Array.isArray(sections)) {
      for (const entry of sections) {
        addToSet(componentKeys, entry);
      }
    } else if (typeof sections === "object") {
      Object.keys(sections as Record<string, unknown>).forEach((key) => addToSet(componentKeys, key));
    }
  }

  if (components) {
    if (Array.isArray(components)) {
      for (const component of components) {
        if (component && typeof component === "object") {
          const record = component as Record<string, unknown>;
          if (record.id) {
            addToSet(componentKeys, record.id);
          } else if (record.key) {
            addToSet(componentKeys, record.key);
          } else if (record.name) {
            addToSet(componentKeys, record.name);
          }

          const assets = record.assets;
          if (Array.isArray(assets)) {
            for (const asset of assets) {
              if (asset && typeof asset === "object") {
                const assetRecord = asset as Record<string, unknown>;
                if (assetRecord.path) {
                  addToSet(assetPaths, assetRecord.path);
                } else if (assetRecord.file) {
                  addToSet(assetPaths, assetRecord.file);
                }
              } else {
                addToSet(assetPaths, asset);
              }
            }
          }
        } else {
          addToSet(componentKeys, component);
        }
      }
    } else if (typeof components === "object") {
      Object.keys(components as Record<string, unknown>).forEach((key) => addToSet(componentKeys, key));
    }
  }

  if (assetsSummary && typeof assetsSummary === "object") {
    for (const value of Object.values(assetsSummary as Record<string, unknown>)) {
      if (Array.isArray(value)) {
        for (const asset of value) {
          if (asset && typeof asset === "object") {
            const assetRecord = asset as Record<string, unknown>;
            if (assetRecord.file) {
              addToSet(assetPaths, assetRecord.file);
            } else if (assetRecord.path) {
              addToSet(assetPaths, assetRecord.path);
            }
          } else {
            addToSet(assetPaths, asset);
          }
        }
      }
    }
  }

  if (guards && typeof guards === "object") {
    for (const guardValue of Object.values(guards as Record<string, unknown>)) {
      if (Array.isArray(guardValue)) {
        for (const entry of guardValue) {
          addToSet(guardEntries, entry);
        }
      } else if (guardValue && typeof guardValue === "object") {
        Object.values(guardValue as Record<string, unknown>).forEach((entry) => addToSet(guardEntries, entry));
      } else {
        addToSet(guardEntries, guardValue);
      }
    }
  }

  return {
    componentCount: componentKeys.size,
    componentKeys,
    assetCount: assetPaths.size,
    assetPaths,
    guardCount: guardEntries.size,
    guardEntries,
  };
}

function hasVersion(candidate: unknown, version: string) {
  if (!candidate || typeof candidate !== "object") {
    return false;
  }

  const record = candidate as { version?: unknown };
  return typeof record.version === "string" && record.version === version;
}

export default async function ManusAuditPage() {
  const [brandPublicList, brandRootList, champagne, manus] = await Promise.all([
    listDir(BRAND_PUBLIC),
    listDir(BRAND_ROOT),
    fetchManifest(CHAMPAGNE_MANIFEST_FILE),
    fetchManifest(MANUS_MANIFEST_FILE),
  ]);

  const champagneJson = champagne.ok ? champagne.json : null;
  const manusJson = manus.ok ? manus.json : null;

  const champagneSummary = summarise(champagneJson);
  const manusSummary = summarise(manusJson);

  const missingInManus = champagne.ok && manus.ok
    ? [...champagneSummary.componentKeys]
        .filter((key) => !manusSummary.componentKeys.has(key))
        .sort()
    : [];

  const extraInManus = champagne.ok && manus.ok
    ? [...manusSummary.componentKeys]
        .filter((key) => !champagneSummary.componentKeys.has(key))
        .sort()
    : [];

  const trimError = (error: string) =>
    error.length > 180 ? `${error.slice(0, 180)}…` : error;

  const champagneErrorSnippet = !champagne.ok ? trimError(champagne.error) : null;
  const manusErrorSnippet = !manus.ok ? trimError(manus.error) : null;

  const champagneStubLoaded = hasVersion(champagneJson, "canon-stub-1");
  const manusStubLoaded = hasVersion(manusJson, "canon-stub-1");

  return (
    <main className="prose max-w-3xl mx-auto p-6">
      <h1>Manus audit overview</h1>
      <p>Quick comparison between the Manus delivery package and the Champagne canon manifest.</p>

      <section>
        <h2>Diagnostics</h2>
        <p>
          process.cwd(): <code>{CWD}</code>
        </p>

        <div>
          <h3>Brand directory listings</h3>
          <div>
            <h4>
              public brand: <code>{BRAND_PUBLIC}</code>
            </h4>
            {brandPublicList.ok ? (
              brandPublicList.entries.length ? (
                <ul>
                  {brandPublicList.entries.map((entry) => (
                    <li key={entry.name}>
                      <code>{entry.name}</code> —{" "}
                      {typeof entry.bytes === "number" ? `${entry.bytes} bytes` : "size n/a"}
                      {entry.mtime ? ` (modified ${entry.mtime})` : ""}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Directory is empty.</p>
              )
            ) : (
              <p>Error: {brandPublicList.error}</p>
            )}
          </div>
          <div>
            <h4>
              root brand: <code>{BRAND_ROOT}</code>
            </h4>
            {brandRootList.ok ? (
              brandRootList.entries.length ? (
                <ul>
                  {brandRootList.entries.map((entry) => (
                    <li key={entry.name}>
                      <code>{entry.name}</code> —{" "}
                      {typeof entry.bytes === "number" ? `${entry.bytes} bytes` : "size n/a"}
                      {entry.mtime ? ` (modified ${entry.mtime})` : ""}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Directory is empty.</p>
              )
            ) : (
              <p>Error: {brandRootList.error}</p>
            )}
          </div>
        </div>

        <div>
          <h3>Manifest load status</h3>
          <div>
            <h4>Champagne manifest</h4>
            <ul>
              <li>
                status: {champagne.status} {champagne.statusText}
              </li>
              <li>
                path: <code>{champagne.pathTried}</code>
              </li>
              {!champagne.ok && champagneErrorSnippet ? (
                <li>
                  error: <code>{champagneErrorSnippet}</code>
                </li>
              ) : null}
            </ul>
          </div>
          <div>
            <h4>Manus manifest</h4>
            <ul>
              <li>
                status: {manus.status} {manus.statusText}
              </li>
              <li>
                path: <code>{manus.pathTried}</code>
              </li>
              {!manus.ok && manusErrorSnippet ? (
                <li>
                  error: <code>{manusErrorSnippet}</code>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </section>

      <h3>Totals</h3>
      <ul>
        <li>
          Champagne components: <b>{champagneSummary.componentCount}</b>
          {champagne.ok
            ? ""
            : ` (unavailable: ${champagne.status} ${champagne.statusText})`}
        </li>
        <li>
          Manus components: <b>{manusSummary.componentCount}</b>
          {manus.ok
            ? ""
            : ` (unavailable: ${manus.status} ${manus.statusText})`}
        </li>
        <li>
          Champagne assets tracked: <b>{champagneSummary.assetCount}</b>
        </li>
        <li>
          Manus assets tracked: <b>{manusSummary.assetCount}</b>
        </li>
        <li>
          Champagne guard entries: <b>{champagneSummary.guardCount}</b>
        </li>
        <li>
          Manus guard entries: <b>{manusSummary.guardCount}</b>
        </li>
      </ul>

      {champagneStubLoaded || manusStubLoaded ? (
        <p>Champagne reference loaded as stub (replace with full canon).</p>
      ) : null}

      <h3>Missing from Manus</h3>
      {champagne.ok && manus.ok ? (
        missingInManus.length ? (
          <ul>{missingInManus.map((k) => <li key={k}>{k}</li>)}</ul>
        ) : (
          <p>No gaps detected between the manifests.</p>
        )
      ) : (
        <p>Waiting for both manifests to load before diffing.</p>
      )}

      <h3>Extra in Manus</h3>
      {champagne.ok && manus.ok ? (
        extraInManus.length ? (
          <ul>{extraInManus.map((k) => <li key={k}>{k}</li>)}</ul>
        ) : (
          <p>No Manus-only entries detected.</p>
        )
      ) : (
        <p>Waiting for both manifests to load before diffing.</p>
      )}

      <h3>Report</h3>
      <pre>Run: pnpm brand:audit</pre>
    </main>
  );
}
