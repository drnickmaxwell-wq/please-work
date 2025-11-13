export const dynamic = "force-static";
export const revalidate = 0;

import Link from "next/link";

import {
  ChampagneTreatmentHeroLuxe,
  LuxeCard,
  LuxeSection,
  PreviewMain,
  PreviewPageShell,
} from "@/components/luxe";
import { SchemaInjector } from "@/lib/seo/preview/SchemaInjector";

const sparkHighlights = [
  "Clear aligners trimmed to the gumline for comfort and discreet wear.",
  "Digital staging keeps each tray change calm, predictable, and Champagne precise.",
  "Remote check-ins pair with in-studio refinements for steady progress.",
  "Finishing protocols polish enamel and refine edges for camera-ready sparkle.",
];

const sparkJourney = [
  {
    title: "Smile mapping",
    detail: "3D scans and AI sequencing draft each aligner step with Champagne precision.",
  },
  {
    title: "Tray rhythm",
    detail: "Weekly or bi-weekly changes keep movement steady with minimal pressure spikes.",
  },
  {
    title: "Hybrid reviews",
    detail: "Remote monitoring pairs with studio visits to course-correct and celebrate milestones.",
  },
  {
    title: "Finish & retention",
    detail: "Final polish, retainers, and champagne-toned whitening lock in the new alignment.",
  },
];

const sparkFaq = [
  {
    question: "How often do I switch aligners?",
    answer: "Most guests change trays every 7–10 days, guided by the Champagne monitoring app.",
  },
  {
    question: "Can I pair Spark with whitening?",
    answer: "Yes. Whitening boosters are timed for calm sensitivity and luminous results post-treatment.",
  },
  {
    question: "What about retainers?",
    answer: "We stage retainers early so you leave with a retention plan, aligner case, and polishing kit.",
  },
];

export default function SparkAlignersPreviewPage() {
  return (
    <PreviewPageShell>
      <SchemaInjector route="/treatments/orthodontics/spark-aligners" />

      <ChampagneTreatmentHeroLuxe
        tone="spark"
        eyebrow="Spark aligners"
        title="Spark aligners with aqua clarity"
        subtitle="Precise staging and calm motion control keep aligner journeys discreet and on schedule."
        primaryCta={{ label: "Start Spark consultation", href: "/contact" }}
        secondaryCta={{ label: "Explore orthodontics", href: "/treatments/orthodontics" }}
      />

      <PreviewMain>
        <LuxeSection tone="spark" surfaceTone="muted" id="viewer" label="Aligner visualiser">
          <LuxeCard variant="muted" className="flex flex-col gap-3 text-center">
            <p className="text-xs uppercase tracking-[0.28em]">Aligner preview placeholder</p>
            <p className="mx-auto max-w-2xl text-base leading-relaxed">
              Slot reserved for the aligner journey visualiser with tray progression, attachments, and retention planning tools.
            </p>
            <div className="flex min-h-[10rem] items-center justify-center rounded-2xl border border-dashed border-current text-xs uppercase tracking-[0.24em]">
              Visual system in progress
            </div>
          </LuxeCard>
        </LuxeSection>

        <LuxeSection tone="spark" id="benefits" label="Why guests choose Spark">
          <div className="grid gap-4 md:grid-cols-2">
            {sparkHighlights.map((highlight) => (
              <LuxeCard key={highlight}>
                <p className="text-base leading-relaxed">{highlight}</p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="spark" id="journey" label="Journey outline">
          <div className="grid gap-4 md:grid-cols-2">
            {sparkJourney.map((stage) => (
              <LuxeCard key={stage.title}>
                <h3 className="text-sm uppercase tracking-[0.18em]">{stage.title}</h3>
                <p className="mt-2 text-base leading-relaxed">{stage.detail}</p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="spark" id="faqs" label="Preview FAQs" surfaceTone="muted">
          <div className="grid gap-4 md:grid-cols-2">
            {sparkFaq.map((faq) => (
              <LuxeCard key={faq.question} variant="muted">
                <h3 className="text-sm uppercase tracking-[0.18em]">{faq.question}</h3>
                <p className="mt-2 text-base leading-relaxed">{faq.answer}</p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="spark" id="pricing" label="Pricing & next steps" surfaceTone="highlight">
          <LuxeCard variant="highlight" className="flex flex-col gap-4">
            <p>
              Use this block for pricing matrices, remote monitoring subscriptions, and retainer packages. Align CTAs with the
              Champagne finance guidance once integrations are ready.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full border border-current px-6 py-2 text-xs uppercase tracking-[0.2em] transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] motion-safe:hover:-translate-y-1"
                href="/contact"
              >
                Start consultation
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-current px-6 py-2 text-xs uppercase tracking-[0.2em] transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] motion-safe:hover:-translate-y-1"
                href="/preview/treatments"
              >
                Back to previews
              </Link>
            </div>
          </LuxeCard>
        </LuxeSection>
      </PreviewMain>
    </PreviewPageShell>
  );
}
