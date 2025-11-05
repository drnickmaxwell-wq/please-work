export const dynamic = "force-dynamic";
export const revalidate = 0;

import { makeAbsolute } from "@/lib/url/absolute";

const CHAMPAGNE_MANIFEST_PATH = "/brand/champagne_machine_manifest_full.json";
const MANUS_MANIFEST_PATH = "/brand/manus_import_unified_manifest_20251104.json";

type FetchJsonResult<T = unknown> = {
  ok: boolean;
  url: string;
  status: number;
  statusText: string;
  json?: T | null;
  error?: string;
};

async function fetchJson<T = unknown>(relativePath: string): Promise<FetchJsonResult<T>> {
  const url = makeAbsolute(relativePath);
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return { ok: false, url, status: res.status, statusText: res.statusText, json: null, error: "bad status" };
    }
    const json = await res.json().catch(() => null);
    if (!json) {
      return { ok: false, url, status: res.status, statusText: res.statusText, json: null, error: "invalid json" };
    }
    return { ok: true, url, status: res.status, statusText: res.statusText, json };
  } catch (e: any) {
    return { ok: false, url, status: 0, statusText: "fetch error", json: null, error: e?.message || "fetch error" };
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
    fetchJson(CHAMPAGNE_MANIFEST_PATH),
    fetchJson(MANUS_MANIFEST_PATH),
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
          Champagne URL: <code>{champagneRes.url}</code> {champagneRes.ok ? "OK" : `(missing: ${champagneRes.statusText})`}
        </li>
        <li>
          Manus URL: <code>{manusRes.url}</code> {manusRes.ok ? "OK" : `(missing: ${manusRes.statusText})`}
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
