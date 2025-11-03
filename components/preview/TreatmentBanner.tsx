import Image from 'next/image';
import { ReactNode } from 'react';

type TreatmentBannerProps = {
  label?: string;
  title: string;
  subtitle?: ReactNode;
  showWaveMask?: boolean;
};

export default function TreatmentBanner({
  label = 'Treatment preview',
  title,
  subtitle,
  showWaveMask = true,
}: TreatmentBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[color:var(--champagne-keyline-gold)] bg-[color:var(--champagne-glass-bg)]/70 px-6 py-12 text-[var(--champagne-ink)] shadow-sm sm:px-10">
      {showWaveMask ? (
        <Image
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 h-full w-auto object-cover opacity-40"
          height={400}
          src="/assets/champagne/waves/wave-mask-desktop.webp"
          width={720}
        />
      ) : null}

      <div className="relative z-10 flex flex-col gap-4">
        <span className="inline-flex w-fit items-center rounded-full bg-[var(--smh-gradient)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--smh-text)]">
          {label}
        </span>
        <h1
          className="text-4xl font-semibold leading-tight sm:text-5xl"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
        >
          {title}
        </h1>
        {subtitle ? (
          <p className="max-w-3xl text-lg leading-relaxed text-[var(--champagne-ink-muted)] sm:text-xl">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
