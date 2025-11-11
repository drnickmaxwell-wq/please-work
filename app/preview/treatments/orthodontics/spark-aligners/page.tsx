// Preview-only Champagne polish for Spark Aligners. Production route untouched.
import Link from 'next/link';

import TreatmentBanner from '@/components/preview/TreatmentBanner';
import ThreeDViewerSlot from '@/components/preview/treatments/ThreeDViewerSlot';
import ChampagneSectionShell, { champagneShellClasses } from '@/components/sections/ChampagneSectionShell';

import '@/styles/treatments/preview-light.css';

const alignerHighlights = [
  {
    title: 'Feather-light trays',
    description: 'Slim, contoured aligners hug every curve of your smile for barely-there comfort day and night.',
  },
  {
    title: 'Discreet clarity',
    description: 'Crystal-clear materials resist staining so your aligners stay virtually invisible throughout treatment.',
  },
  {
    title: 'Responsive progress tracking',
    description: 'Digital scans at each visit guide refinements and keep every movement perfectly on schedule.',
  },
  {
    title: 'Gentle force mapping',
    description: 'Precision attachments and staged movements deliver predictable alignment with minimal pressure.',
  },
];

const journey = [
  {
    phase: 'Digital smile design',
    detail: 'Scan, simulate, and preview your new alignment with 3D modelling and predictive mapping.',
  },
  {
    phase: 'Tray crafting',
    detail: 'Spark specialists thermoform ultra-clear aligners that align with each micro-stage of movement.',
  },
  {
    phase: 'Weekly progressions',
    detail: 'Switch to fresh trays every 7–10 days and enjoy remote check-ins between in-practice reviews.',
  },
  {
    phase: 'Finishing and retention',
    detail: 'Polish, contour, and transition to custom retainers that maintain your newly balanced smile.',
  },
];

const candidacy = [
  'Mild to moderate crowding or spacing',
  'Previous orthodontic relapse needing refinement',
  'Patients seeking minimal chair time and gentle forces',
  'Commitment to wearing aligners 20–22 hours per day',
  'Desire for nearly invisible orthodontics',
  'Good oral hygiene and routine dental reviews',
];

export default function SparkAlignersPreviewPage() {
  const { goldGlow, parallax } = champagneShellClasses;

  return (
    <ChampagneSectionShell>
      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-6">
        <nav aria-label="Breadcrumb" className="text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-[var(--champagne-ink-muted)]">
            <li>
              <Link className="underline-offset-4 hover:underline" href="/preview">
                Preview
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link className="underline-offset-4 hover:underline" href="/preview/treatments">
                Treatments
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link className="underline-offset-4 hover:underline" href="/preview/treatments/orthodontics">
                Orthodontics
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[var(--champagne-ink)]">
              Spark aligners
            </li>
          </ol>
        </nav>

        <div className={parallax} data-direction="reverse">
          <TreatmentBanner
            label="Orthodontics preview"
            subtitle="Preview the digital-first Spark Aligner journey designed for adults seeking subtle, steady refinement with Champagne layering."
            title="Spark Aligners in Shoreham-by-Sea"
          />
        </div>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Interactive aligner preview</h2>
            <p className="max-w-3xl leading-relaxed t-muted">
              Visualise how Spark trays seat over enamel with precise scalloped edges and soft force zones ready for {'<model-viewer>'} integration.
            </p>
            <ThreeDViewerSlot />
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Why guests choose Spark Aligners</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {alignerHighlights.map((item) => (
                <article key={item.title} className="t-card h-full p-6">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-relaxed t-muted">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Four-stage Spark journey</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {journey.map((stage) => (
                <article key={stage.phase} className="t-card h-full p-6">
                  <h3 className="text-lg font-semibold">{stage.phase}</h3>
                  <p className="mt-3 leading-relaxed t-muted">{stage.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div aria-hidden className="fx-waves" />

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Ideal Spark candidates</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {candidacy.map((item) => (
                <article key={item} className="t-card h-full p-6">
                  <p className="font-medium">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`t-section rounded-3xl p-8 shadow-sm ${parallax}`} data-depth="cta">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Book a Spark Aligner consultation</h2>
            <p className="max-w-3xl leading-relaxed t-muted">
              Meet our orthodontic team to scan, stage, and customise your aligner plan with Champagne-ready polish before production deployment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link className={goldGlow} href="/contact">
                Reserve Spark consult
              </Link>
              <Link className={goldGlow} href="/preview/treatments/orthodontics">
                Explore orthodontic previews
              </Link>
            </div>
          </div>
        </section>
      </main>
    </ChampagneSectionShell>
  );
}
