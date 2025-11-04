import fs from 'node:fs/promises';
import path from 'node:path';

const MANIFEST_SOURCES = [
  {
    id: 'champagne',
    label: 'Champagne manifest',
    relativePath: path.join('public', 'assets', 'champagne', 'manifest.json'),
  },
  {
    id: 'brand',
    label: 'Manus unified manifest',
    relativePath: path.join('public', 'brand', 'manus_import_unified_manifest_20251104.json'),
  },
] as const;

type ManifestSource = (typeof MANIFEST_SOURCES)[number];

type ManifestResult =
  | { status: 'loaded'; source: ManifestSource; contents: string }
  | { status: 'missing'; source: ManifestSource }
  | { status: 'error'; source: ManifestSource; message: string };

const loadManifest = async (source: ManifestSource): Promise<ManifestResult> => {
  const absolutePath = path.join(process.cwd(), source.relativePath);

  try {
    const raw = await fs.readFile(absolutePath, 'utf-8');
    const parsed = JSON.parse(raw);
    const contents = JSON.stringify(parsed, null, 2);
    return { status: 'loaded', source, contents };
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === 'ENOENT') {
      return { status: 'missing', source };
    }

    if (error instanceof SyntaxError) {
      return { status: 'error', source, message: 'Invalid JSON structure' };
    }

    return {
      status: 'error',
      source,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

const statusLabel = (result: ManifestResult): string => {
  switch (result.status) {
    case 'loaded':
      return 'loaded';
    case 'missing':
      return 'missing';
    default:
      return 'error';
  }
};

export default async function ManusAuditPage() {
  const manifests = await Promise.all(MANIFEST_SOURCES.map((source) => loadManifest(source)));

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10 text-sm text-white">
      <p className="rounded-md border border-white/10 bg-white/5 p-4 text-white/80">
        Audit loaded manifests from /public/assets/champagne and /public/brand.
      </p>

      {manifests.map((manifest) => (
        <section key={manifest.source.id} className="rounded-md border border-white/10 bg-white/5 p-4">
          <header className="mb-3 flex items-center justify-between text-xs uppercase tracking-wide text-white/70">
            <span>{manifest.source.label}</span>
            <span className="font-semibold text-white">{statusLabel(manifest)}</span>
          </header>

          {manifest.status === 'loaded' ? (
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-black/40 p-4 text-xs leading-relaxed text-white/90">
              {manifest.contents}
            </pre>
          ) : manifest.status === 'missing' ? (
            <p className="text-sm text-white/80">missing</p>
          ) : (
            <p className="text-sm text-red-300">{manifest.message}</p>
          )}
        </section>
      ))}
    </main>
  );
}
