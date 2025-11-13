// Preview-only Champagne polish for Spark Aligners. Production route untouched.
import Link from "next/link";

import { ChampagneSectionShell } from "@/components/champagne/ChampagneSectionShell";
import { ChampagneTreatmentHero } from "@/components/champagne/ChampagneTreatmentHero";
import ThreeDViewerSlot from "@/components/preview/treatments/ThreeDViewerSlot";
import { SchemaInjector } from "@/lib/seo/preview/SchemaInjector";

import "@/styles/treatments/preview-light.css";

const alignerHighlights = [
  {
    title: "Feather-light trays",
    description: "Slim, contoured aligners hug every curve for barely-there comfort day and night.",
  },
  {
    title: "Discreet clarity",
    description: "Crystal-clear materials resist staining so trays stay virtually invisible.",
  },
  {
    title: "Responsive tracking",
    description: "Digital scans at each visit guide refinements and keep every movement on schedule.",
  },
  {
    title: "Gentle force mapping",
    description: "Precision attachments and staged movements deliver predictable alignment with minimal pressure.",
  },
];

const journey = [
  {
    phase: "Digital smile design",
    detail: "Scan, simulate, and preview alignment with 3D mapping and AI-assisted staging.",
  },
  {
    phase: "Tray crafting",
    detail: "Spark specialists thermoform ultra-clear aligners to match each micro-stage of movement.",
  },
  {
    phase: "Weekly progressions",
    detail: "Switch trays every 7–10 days and pair with remote check-ins between in-practice reviews.",
  },
  {
    phase: "Finishing & retention",
    detail: "Polish, contour, and transition to custom retainers that hold your new smile in place.",
  },
];

const candidacy = [
  "Mild to moderate crowding or spacing.",
  "Previous orthodontic relapse needing refinement.",
  "Patients seeking minimal chair time and gentle forces.",
  "Commitment to wearing aligners 20–22 hours per day.",
  "Desire for nearly invisible orthodontics.",
  "Excellent oral hygiene and routine dental reviews.",
];

export default function SparkAlignersPreviewPage() {
  return (
    <main className="min-h-screen bg-[var(--champagne-surface)] text-[var(--champagne-ink)]">
      <SchemaInjector route="/treatments/orthodontics/spark-aligners" />

      <ChampagneTreatmentHero
        treatmentKey="spark-aligners"
        eyebrow="Orthodontics preview"
        title="Spark Aligners with Champagne clarity"
        subtitle="Aqua-toned gradients, crisp glass overlays, and schema-backed sections keep the aligner journey sharp and light."
        primaryCta={{ label: "Reserve Spark consultation", href: "/contact" }}
        secondaryCta={{ label: "Explore orthodontic previews", href: "/preview/treatments/orthodontics" }}
        schemaRoute="/treatments/orthodontics/spark-aligners"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-[color-mix(in_oklab,var(--smh-ink)_70%,transparent)]">
          <ol className="flex flex-wrap items-center gap-2">
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
            <li aria-current="page" className="font-medium text-[color-mix(in_oklab,var(--smh-ink)_86%,transparent)]">
              Spark aligners
            </li>
          </ol>
        </nav>

        <ChampagneSectionShell treatmentKey="spark-aligners" id="viewer" label="Interactive aligner preview">
          <p className="max-w-3xl leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_76%,transparent)]">
            Visualise how Spark trays seat over enamel with precise scalloped edges and soft force zones. Final build will integrate Three.js for model rotation and pressure mapping overlays.
          </p>
          <ThreeDViewerSlot />
        </ChampagneSectionShell>

        <ChampagneSectionShell treatmentKey="spark-aligners" id="highlights" label="Why guests choose Spark">
          <div className="grid gap-6 text-[color-mix(in_oklab,var(--smh-ink)_76%,transparent)] md:grid-cols-2">
            {alignerHighlights.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[color-mix(in_oklab,var(--smh-primary-teal)_22%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_90%,transparent)] p-6"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </ChampagneSectionShell>

        <ChampagneSectionShell treatmentKey="spark-aligners" id="journey" label="Four-stage Spark journey" tone="muted">
          <div className="grid gap-6 text-[color-mix(in_oklab,var(--smh-ink)_74%,transparent)] md:grid-cols-2">
            {journey.map((stage) => (
              <article
                key={stage.phase}
                className="rounded-2xl border border-[color-mix(in_oklab,var(--smh-primary-teal)_20%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_90%,transparent)] p-6"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color-mix(in_oklab,var(--smh-primary-teal)_68%,var(--smh-ink)_32%)]">
                  {stage.phase}
                </h3>
                <p className="mt-2 text-base leading-relaxed">{stage.detail}</p>
              </article>
            ))}
          </div>
        </ChampagneSectionShell>

        <ChampagneSectionShell treatmentKey="spark-aligners" id="candidacy" label="Ideal Spark candidates">
          <div className="grid gap-4 text-[color-mix(in_oklab,var(--smh-ink)_74%,transparent)] md:grid-cols-2">
            {candidacy.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[color-mix(in_oklab,var(--smh-primary-teal)_18%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_90%,transparent)] p-5"
              >
                {item}
              </div>
            ))}
          </div>
        </ChampagneSectionShell>

        <ChampagneSectionShell treatmentKey="spark-aligners" id="cta" label="Book your Spark consultation" tone="highlight">
          <div className="flex flex-col gap-4 text-[color-mix(in_oklab,var(--smh-ink)_74%,transparent)]">
            <p>
              Connect preview CTAs to booking tools or chat assistants. Motion stays within Champagne easing so hover cues remain calm and precise.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--smh-primary-teal)_26%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_92%,transparent)] px-5 py-2 text-sm font-semibold tracking-[0.16em] text-[color-mix(in_oklab,var(--smh-primary-teal)_72%,var(--smh-ink)_28%)] transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] hover:translate-y-[-2px]"
                href="/contact"
              >
                Reserve Spark consult
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--smh-primary-magenta)_20%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_92%,transparent)] px-5 py-2 text-sm font-semibold tracking-[0.16em] text-[color-mix(in_oklab,var(--smh-primary-magenta)_68%,var(--smh-ink)_32%)] transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] hover:translate-y-[-2px]"
                href="/preview/treatments/orthodontics"
              >
                Explore orthodontic previews
              </Link>
            </div>
          </div>
        </ChampagneSectionShell>
      </div>
    </main>
  );
}
