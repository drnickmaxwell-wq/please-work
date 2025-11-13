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

const whiteningHighlights = [
  "Gentle, calibrated whitening programmes protect enamel while lifting shade.",
  "Shade previews track progress with Champagne-safe photography guides.",
  "At-home kits pair with in-studio care for luminous, lasting brightness.",
  "Comfort rituals keep sensitivity low with serum soothers and micro mist hydration.",
];

const whiteningSteps = [
  {
    title: "Shade mapping",
    detail: "Baseline scans and shade charts define a personalised lift and timing.",
  },
  {
    title: "Studio activation",
    detail: "Low-heat LED activation and Champagne-calibrated gels start the lift.",
  },
  {
    title: "At-home rhythm",
    detail: "Gentle kits continue the journey with check-ins for comfort and progress.",
  },
  {
    title: "Radiance sealing",
    detail: "Mineral serums and Champagne polishes lock in gloss and soothe enamel.",
  },
];

const whiteningFaq = [
  {
    question: "How long do results last?",
    answer: "Most guests maintain their glow for 12–18 months with bespoke at-home boosters.",
  },
  {
    question: "Is whitening safe for sensitive teeth?",
    answer: "Yes. We stage the programme with sensitivity checkpoints and soothing serums to keep guests comfortable.",
  },
  {
    question: "Do I need to avoid certain foods?",
    answer: "For the first 48 hours avoid deep pigments like coffee, berries, or red wine to protect the new shade.",
  },
];

export default function WhiteningPreviewPage() {
  return (
    <PreviewPageShell>
      <SchemaInjector route="/treatments/whitening" />

      <ChampagneTreatmentHeroLuxe
        tone="whitening"
        eyebrow="Teeth whitening"
        title="Whitening rituals with Champagne glow"
        subtitle="Layered care plans keep shades luminous and enamel calm with every appointment."
        primaryCta={{ label: "Book whitening session", href: "/contact" }}
        secondaryCta={{ label: "View treatment menu", href: "/treatments" }}
      />

      <PreviewMain>
        <LuxeSection tone="whitening" surfaceTone="muted" id="viewer" label="Radiance monitor">
          <LuxeCard variant="muted" className="flex flex-col gap-3 text-center">
            <p className="text-xs uppercase tracking-[0.28em]">Radiance dashboard placeholder</p>
            <p className="mx-auto max-w-2xl text-base leading-relaxed">
              Reserve this block for the whitening dashboard with tone tracking, sensitivity notes, and kit re-order prompts.
            </p>
            <div className="flex min-h-[10rem] items-center justify-center rounded-2xl border border-dashed border-current text-xs uppercase tracking-[0.24em]">
              Dashboard in development
            </div>
          </LuxeCard>
        </LuxeSection>

        <LuxeSection tone="whitening" id="benefits" label="Why guests love Champagne whitening">
          <div className="grid gap-4 md:grid-cols-2">
            {whiteningHighlights.map((highlight) => (
              <LuxeCard key={highlight}>
                <p className="text-base leading-relaxed">{highlight}</p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="whitening" id="how-it-works" label="How the programme flows">
          <div className="grid gap-4 md:grid-cols-2">
            {whiteningSteps.map((step) => (
              <LuxeCard key={step.title}>
                <h3 className="text-sm uppercase tracking-[0.18em]">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed">{step.detail}</p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="whitening" id="faqs" label="Preview FAQs" surfaceTone="muted">
          <div className="grid gap-4 md:grid-cols-2">
            {whiteningFaq.map((faq) => (
              <LuxeCard key={faq.question} variant="muted">
                <h3 className="text-sm uppercase tracking-[0.18em]">{faq.question}</h3>
                <p className="mt-2 text-base leading-relaxed">{faq.answer}</p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="whitening" id="pricing" label="Pricing & aftercare" surfaceTone="highlight">
          <LuxeCard variant="highlight" className="flex flex-col gap-4">
            <p>
              Outline whitening packages, sensitivity serums, and aftercare bundles here. Keep finance CTAs ready for Tabeo and
              other partners once integrated.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full border border-current px-6 py-2 text-xs uppercase tracking-[0.2em] transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] motion-safe:hover:-translate-y-1"
                href="/contact"
              >
                Book session
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
