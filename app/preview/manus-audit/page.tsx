import Link from "next/link";
import path from "node:path";
import { promises as fs } from "node:fs";

type ManifestJson = {
  sections?: Record<string, unknown>;
  [key: string]: unknown;
};

type ManifestFetchResult = {
  id: "champagne" | "manus";
  label: string;
  url: string;
  status?: number;
  statusText?: string;
  sectionKeys: string[];
  lastUpdated?: string;
  errorMessage?: string;
};

const CHAMPAGNE_MANIFEST_PATH = "/brand/champagne_machine_manifest_full.json";
const MANUS_MANIFEST_PATH = "/brand/manus_import_unified_manifest_20251104.json";

type ManifestMap = Record<string, ManifestFetchResult>;

export default async function ManusAuditPage() {
  const root = process.cwd();
  const [champagne, manus, reportExists] = await Promise.all([
    fetchManifest({ id: "champagne", label: "Champagne reference", path: CHAMPAGNE_MANIFEST_PATH }),
    fetchManifest({ id: "manus", label: "Manus package", path: MANUS_MANIFEST_PATH }),
    getReportAvailability(root),
  ]);

  const manifests: ManifestMap = {
    champagne,
    manus,
  };

  const missingInManus = champagne.sectionKeys
    .filter((key) => !manus.sectionKeys.includes(key))
    .sort();
  const unexpectedInManus = manus.sectionKeys
    .filter((key) => !champagne.sectionKeys.includes(key))
    .sort();

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Preview</p>
        <h1 className="text-3xl font-semibold">Manus audit overview</h1>
        <p className="text-sm text-neutral-500">
          Quick comparison between the Manus delivery package and the Champagne canon manifest.
        </p>
        <p className="text-xs text-neutral-500">Audit fetches manifests from /brand/* URLs.</p>
      </header>

      <section className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-medium">Component totals</h2>
        <dl className="grid gap-2 text-sm sm:grid-cols-2">
          {Object.values(manifests).map((manifest) => (
            <div key={manifest.id}>
              <dt className="text-neutral-500">{manifest.label}</dt>
              <dd className="text-lg font-semibold">{manifest.sectionKeys.length}</dd>
              {manifest.errorMessage ? (
                <p className="mt-1 text-xs text-amber-400">{manifest.errorMessage}</p>
              ) : null}
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-medium">Diagnostics</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="text-neutral-500">
              <tr>
                <th className="px-3 py-2 font-medium">Manifest</th>
                <th className="px-3 py-2 font-medium">URL</th>
                <th className="px-3 py-2 font-medium">lastUpdated</th>
                <th className="px-3 py-2 font-medium">Section keys</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(manifests).map((manifest) => (
                <tr key={`diagnostics-${manifest.id}`} className="border-t border-white/5">
                  <td className="px-3 py-2 align-top text-sm font-medium">{manifest.label}</td>
                  <td className="px-3 py-2 align-top text-xs">
                    <code className="break-all text-[11px] text-neutral-300">{manifest.url}</code>
                  </td>
                  <td className="px-3 py-2 align-top text-xs text-neutral-300">
                    {manifest.lastUpdated ?? "—"}
                  </td>
                  <td className="px-3 py-2 align-top text-xs text-neutral-300">
                    {manifest.sectionKeys.length > 0 ? manifest.sectionKeys.join(", ") : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-medium">Missing from Manus</h2>
        {missingInManus.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {missingInManus.map((key) => (
              <li key={`missing-${key}`}>{key}</li>
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
            {unexpectedInManus.map((key) => (
              <li key={`unexpected-${key}`}>{key}</li>
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

type FetchManifestArgs = {
  id: ManifestFetchResult["id"];
  label: string;
  path: string;
};

async function fetchManifest({ id, label, path: pathname }: FetchManifestArgs): Promise<ManifestFetchResult> {
  const url = createAbsoluteUrl(pathname);

  try {
    const response = await fetch(url, { cache: "no-store" });
    const status = response.status;
    const statusText = response.statusText;

    if (!response.ok) {
      return {
        id,
        label,
        url,
        status,
        statusText,
        sectionKeys: [],
        errorMessage: formatFetchFailure(url, status, statusText),
      };
    }

    const manifest = (await response.json()) as ManifestJson;
    const sections = extractSections(manifest);

    return {
      id,
      label,
      url,
      status,
      statusText,
      sectionKeys: Object.keys(sections),
      lastUpdated: extractLastUpdated(manifest),
    };
  } catch (error) {
    const statusText = error instanceof Error ? error.message : "Unknown error";

    return {
      id,
      label,
      url,
      sectionKeys: [],
      statusText,
      errorMessage: formatFetchFailure(url, undefined, statusText),
    };
  }
}

function extractSections(manifest: ManifestJson): Record<string, unknown> {
  if (!manifest || typeof manifest !== "object") {
    return {};
  }

  const sections = manifest.sections;

  if (sections && typeof sections === "object" && !Array.isArray(sections)) {
    return sections as Record<string, unknown>;
  }

  return {};
}

function extractLastUpdated(manifest: ManifestJson): string | undefined {
  if (!manifest || typeof manifest !== "object") {
    return undefined;
  }

  const candidates = ["lastUpdated", "last_updated", "updatedAt", "updated_at"];

  for (const key of candidates) {
    const value = manifest[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }

  return undefined;
}

function formatFetchFailure(url: string, status?: number, statusText?: string): string {
  const statusLabel = typeof status === "number" ? status.toString() : "error";
  const text = statusText && statusText.length > 0 ? statusText : "";
  return `Fetch failed: ${url} — ${statusLabel}${text ? ` ${text}` : ""}`;
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
