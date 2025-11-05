export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { readFile, readdir, stat } from "fs/promises";
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
      status: 200;
      statusText: "OK";
      pathTried: string;
    }
  | {
      ok: false;
      json: null;
      status: number;
      statusText: string;
      pathTried: string;
      error: string;
      code?: string;
    };

async function safeReadJson<T>(absPath: string): Promise<LoadResult<T>> {
  try {
    const buf = await readFile(absPath);
    try {
      const json = JSON.parse(buf.toString()) as T;
      return { ok: true, json, status: 200, statusText: "OK", pathTried: absPath };
    } catch (e: any) {
      return {
        ok: false,
        json: null,
        status: 422,
        statusText: "json parse error",
        pathTried: absPath,
        error: String(e?.message || e),
      };
    }
  } catch (e: any) {
    const code = e?.code;
    const status = code === "ENOENT" ? 404 : 500;
    const statusText = code === "ENOENT" ? "not found" : "fs error";
    return {
      ok: false,
      json: null,
      status,
      statusText,
      pathTried: absPath,
      error: String(e?.message || e),
      code,
    };
  }
}

async function loadFromEither<T>(
  fileName: string
): Promise<{ tried: string[]; result: LoadResult<T> }> {
  const candidates = [join(BRAND_PUBLIC, fileName), join(BRAND_ROOT, fileName)];
  let lastResult: LoadResult<T> | null = null;
  for (const abs of candidates) {
    const res = await safeReadJson<T>(abs);
    lastResult = res;
    if (res.ok) {
      return { tried: candidates, result: res };
    }
  }
  const result = lastResult ?? (await safeReadJson<T>(candidates[candidates.length - 1]));
  return { tried: candidates, result };
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
  } catch (e: any) {
    return { ok: false as const, dir: absDir, error: String(e?.message || e) };
  }
}

function summarise(manifest: any | null) {
  if (!manifest || typeof manifest !== "object") {
    return { total: 0, sectionKeys: new Set<string>() };
  }

  const sectionSource = manifest.sections;
  let sectionKeys: string[] = [];

  if (Array.isArray(sectionSource)) {
    sectionKeys = sectionSource.map((item) => String(item));
  } else if (sectionSource && typeof sectionSource === "object") {
    sectionKeys = Object.keys(sectionSource as Record<string, unknown>);
  } else if (manifest.components && typeof manifest.components === "object") {
    if (Array.isArray(manifest.components)) {
      sectionKeys = manifest.components.map((item: unknown) => String(item));
    } else {
      sectionKeys = Object.keys(manifest.components as Record<string, unknown>);
    }
  }

  const sections = new Set<string>(sectionKeys);
  return { total: sections.size, sectionKeys: sections };
}

export default async function ManusAuditPage() {
  const [brandPublicList, brandRootList, champagne, manus] = await Promise.all([
    listDir(BRAND_PUBLIC),
    listDir(BRAND_ROOT),
    loadFromEither<any>(CHAMPAGNE_MANIFEST_FILE),
    loadFromEither<any>(MANUS_MANIFEST_FILE),
  ]);

  const champagneJson = champagne.result.ok ? champagne.result.json : null;
  const manusJson = manus.result.ok ? manus.result.json : null;

  const champagneSummary = summarise(champagneJson);
  const manusSummary = summarise(manusJson);

  const missingInManus =
    champagne.result.ok && manus.result.ok
      ? [...champagneSummary.sectionKeys]
          .filter((k) => !manusSummary.sectionKeys.has(k))
          .sort()
      : [];
  const unexpectedInManus =
    champagne.result.ok && manus.result.ok
      ? [...manusSummary.sectionKeys]
          .filter((k) => !champagneSummary.sectionKeys.has(k))
          .sort()
      : [];

  const trimError = (error: string) =>
    error.length > 180 ? `${error.slice(0, 180)}…` : error;

  const champagneErrorSnippet = !champagne.result.ok ? trimError(champagne.result.error) : null;
  const manusErrorSnippet = !manus.result.ok ? trimError(manus.result.error) : null;

  const champagneStubLoaded =
    champagneJson && typeof champagneJson === "object" && champagneJson.version === "canon-stub-1";
  const manusStubLoaded = manusJson && typeof manusJson === "object" && manusJson.version === "canon-stub-1";

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
                status: {champagne.result.status} {champagne.result.statusText}
                {champagne.result.code ? ` (${champagne.result.code})` : ""}
              </li>
              <li>
                last path tried: <code>{champagne.result.pathTried}</code>
              </li>
              <li>
                candidates tried: <code>{champagne.tried.join(", ")}</code>
              </li>
              {!champagne.result.ok && champagneErrorSnippet ? (
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
                status: {manus.result.status} {manus.result.statusText}
                {manus.result.code ? ` (${manus.result.code})` : ""}
              </li>
              <li>
                last path tried: <code>{manus.result.pathTried}</code>
              </li>
              <li>
                candidates tried: <code>{manus.tried.join(", ")}</code>
              </li>
              {!manus.result.ok && manusErrorSnippet ? (
                <li>
                  error: <code>{manusErrorSnippet}</code>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </section>

      <h3>Component totals</h3>
      <ul>
        <li>
          Champagne reference: <b>{champagneSummary.total}</b>
          {champagne.result.ok
            ? ""
            : ` (missing: ${champagne.result.status} ${champagne.result.statusText}${champagne.result.code ? ` ${champagne.result.code}` : ""})`}
        </li>
        <li>
          Manus package: <b>{manusSummary.total}</b>
          {manus.result.ok
            ? ""
            : ` (missing: ${manus.result.status} ${manus.result.statusText}${manus.result.code ? ` ${manus.result.code}` : ""})`}
        </li>
      </ul>

      {champagneStubLoaded || manusStubLoaded ? (
        <p>Champagne reference loaded as stub (replace with full canon).</p>
      ) : null}

      <h3>Missing from Manus</h3>
      {missingInManus.length ? (
        <ul>{missingInManus.map((k) => <li key={k}>{k}</li>)}</ul>
      ) : (
        <p>No gaps detected between the manifests.</p>
      )}

      <h3>Unexpected or mismatched entries</h3>
      {unexpectedInManus.length ? (
        <ul>{unexpectedInManus.map((k) => <li key={k}>{k}</li>)}</ul>
      ) : (
        <p>No Manus-only entries detected.</p>
      )}

      <h3>Report</h3>
      <pre>Run: pnpm exec node scripts/compare-manus-to-champagne.mjs</pre>
    </main>
  );
}
