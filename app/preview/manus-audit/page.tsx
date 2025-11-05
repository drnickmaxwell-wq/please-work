export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { readFile } from "fs/promises";
import { join } from "path";

const BRAND_DIR = join(process.cwd(), "public", "brand");

const CHAMPAGNE_MANIFEST_FILE = "champagne_machine_manifest_full.json";
const MANUS_MANIFEST_FILE = "manus_import_unified_manifest_20251104.json";

type LoadJsonResult<T = unknown> =
  | { ok: true; url: string; status: number; statusText: string; json: T }
  | { ok: false; url: string; status: number; statusText: string; json: null };

async function loadJson<T>(fileName: string): Promise<LoadJsonResult<T>> {
  const url = `/brand/${fileName}`;
  try {
    const buf = await readFile(join(BRAND_DIR, fileName));
    return {
      ok: true,
      json: JSON.parse(buf.toString()) as T,
      status: 200,
      statusText: "OK",
      url,
    };
  } catch (err: any) {
    const msg = (err && err.message) || "read error";
    const notFound = msg.includes("ENOENT");
    return {
      ok: false,
      json: null,
      status: notFound ? 404 : 500,
      statusText: notFound ? "not found" : "fs error",
      url,
    };
  }
}

function summarise(manifest: any | null) {
  if (!manifest || typeof manifest !== "object") {
    return { total: 0, sectionKeys: new Set<string>() };
  }
  const sections = new Set<string>(
    Array.isArray(manifest.sections)
      ? manifest.sections
      : Object.keys((manifest.components ?? {}) as Record<string, unknown>)
  );
  return { total: sections.size, sectionKeys: sections };
}

export default async function ManusAuditPage() {
  const [champagneRes, manusRes] = await Promise.all([
    loadJson<any>(CHAMPAGNE_MANIFEST_FILE),
    loadJson<any>(MANUS_MANIFEST_FILE),
  ]);

  const champagne = summarise(champagneRes.ok ? champagneRes.json : null);
  const manus = summarise(manusRes.ok ? manusRes.json : null);

  const missingInManus = [...champagne.sectionKeys].filter((k) => !manus.sectionKeys.has(k)).sort();
  const unexpectedInManus = [...manus.sectionKeys].filter((k) => !champagne.sectionKeys.has(k)).sort();

  return (
    <main className="prose max-w-3xl mx-auto p-6">
      <h1>Manus audit overview</h1>
      <p>Quick comparison between the Manus delivery package and the Champagne canon manifest.</p>

      <h3>Audit loads manifests from /public/brand</h3>
      <ul>
        <li>
          Champagne URL: <code>{champagneRes.url}</code>{" "}
          {champagneRes.ok
            ? `(${champagneRes.status} ${champagneRes.statusText})`
            : `(status: ${champagneRes.status} ${champagneRes.statusText})`}
        </li>
        <li>
          Manus URL: <code>{manusRes.url}</code>{" "}
          {manusRes.ok
            ? `(${manusRes.status} ${manusRes.statusText})`
            : `(status: ${manusRes.status} ${manusRes.statusText})`}
        </li>
      </ul>

      <h3>Component totals</h3>
      <ul>
        <li>
          Champagne reference: <b>{champagne.total}</b> {champagneRes.ok ? "" : " (missing)"}
        </li>
        <li>
          Manus package: <b>{manus.total}</b> {manusRes.ok ? "" : " (missing)"}
        </li>
      </ul>

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
