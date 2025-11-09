export { metadata } from '@/app/preview/metadata';
import FooterLuxePreview from '@/components/preview/FooterLuxePreview';

export default function FooterLuxePreviewPage() {
  return (
    <main className="bg-[var(--smh-ink)] text-[var(--smh-text)]">
      <section className="mx-auto flex max-w-3xl flex-col gap-5 px-6 py-16 sm:px-10">
        <h1 className="text-3xl font-semibold tracking-tight">Luxe footer preview</h1>
        <p className="text-base leading-relaxed text-[color:color-mix(in_oklab,var(--smh-text)_86%,var(--smh-white)_14%)]">
          This preview renders the Luxe footer with current brand tokens and manifest assets. Use the quick
          links below to compare brand touchpoints before the footer goes live.
        </p>
        <nav aria-label="Preview links" className="text-sm">
          <ul className="flex flex-wrap gap-3">
            <li>
              <a className="underline-offset-4 hover:underline" href="/brand/manifest">
                Brand manifest JSON
              </a>
            </li>
            <li>
              <a className="underline-offset-4 hover:underline" href="/styles/tokens/smh-champagne-tokens.css">
                Champagne tokens
              </a>
            </li>
            <li>
              <a className="underline-offset-4 hover:underline" href="/preview/lux">
                Luxe content preview
              </a>
            </li>
          </ul>
        </nav>
      </section>

      <FooterLuxePreview />
    </main>
  );
}
