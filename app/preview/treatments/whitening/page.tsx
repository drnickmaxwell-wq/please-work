export const dynamic = "force-static";
export const revalidate = 0;

import type { Metadata } from "next";

import ChampagneTreatmentTemplate from "@/components/preview/treatments/ChampagneTreatmentTemplate";
import { previewRobots } from "@/lib/seo/preview/previewRobots";
import { buildPreviewMetadata as buildTreatmentPreviewMetadata } from "@/lib/treatments/previewTreatmentConfig";

const slug = "whitening";

// DRAFT COPY: Whitening benefits for Director review.
const whiteningBenefits = [
  "Sensitivity-aware whitening protocols tailored to your teeth.",
  "Shade planning that pairs whitening with future bonding or veneers.",
  "Dentist-led care with documented before/after shades.",
  "Refresher review to help maintain brightness over time.",
];

// DRAFT COPY: Whitening journey steps for Director review.
const whiteningSteps = [
  {
    title: "Consult & shade map",
    summary: "We capture photos and shade records, and plan your ideal result.",
  },
  { title: "Gentle activation", summary: "In-surgery whitening with sensitivity management built-in." },
  { title: "Calm recovery", summary: "Aftercare advice and products to keep teeth comfortable." },
  { title: "Plan the finish", summary: "Review your results and plan any future top-ups or refinements." },
];

// DRAFT COPY: Whitening FAQs for Director review.
const whiteningFaq = [
  {
    question: "Will whitening make my teeth sensitive?",
    answer: "We use sensitivity-aware gels and can adjust the protocol or add serums if you feel any zing during treatment.",
  },
  {
    question: "How long do whitening results last?",
    answer: "Results typically hold for months with good care. We map your shade and advise when quick top-ups are helpful.",
  },
  {
    question: "Is whitening safe for my enamel?",
    answer: "Dentist-prescribed whitening keeps gels within safe limits and avoids overheating so enamel stays protected.",
  },
  {
    question: "Can I still have whitening if I have fillings or crowns?",
    answer: "Yes. We check any existing work, explain how it will respond, and plan refinements or replacements if needed.",
  },
];

export const whiteningFaqEntities = whiteningFaq.map((item) => ({
  questionName: item.question,
  acceptedAnswerText: item.answer,
}));

const whiteningServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Teeth whitening in Shoreham-by-Sea",
  description: "Preview-only schema stub for SMH Dental's cosmetic teeth whitening pathway with Luminous Whitening visuals.",
  provider: {
    "@type": "Organization",
    name: "SMH Dental",
  },
};

export const metadata: Metadata = {
  ...buildTreatmentPreviewMetadata(slug),
  robots: previewRobots,
};

type PreviewPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function WhiteningPreviewPage({ searchParams }: PreviewPageProps) {
  return (
    <ChampagneTreatmentTemplate
      slug={slug}
      schemaKey="whitening-process"
      treatmentName="Teeth whitening"
      category="Cosmetic"
      heroLabel="Cosmetic treatment"
      heroTitle="Luminous Whitening"
      heroSubtitle="Professional whitening with Champagne-level attention to detail."
      heroVisualDescription="Luminous whitening hero surface with regal glass arcs, soft gold motion, and Shoreham sea-inspired light."
      heroCtaPrimaryLabel="Book whitening"
      primaryCtaHref="/contact"
      heroCtaSecondaryLabel="Explore treatment options"
      secondaryCtaHref="/treatments"
      closingPrimaryCtaLabel="Book Teeth whitening"
      closingPrimaryCtaHref="/contact"
      closingSecondaryCtaLabel="View all treatments"
      closingSecondaryCtaHref="/treatments"
      benefits={whiteningBenefits}
      howItWorksLabel="Your whitening journey"
      journeySteps={whiteningSteps}
      financePlanGroup="whitening"
      faqKey="whitening"
      faqItems={whiteningFaq}
      searchParams={searchParams}
      heroVariant="luminous"
      heroFrameVariant="whitening"
    />
    <script type="application/ld+json" suppressHydrationWarning>
      {JSON.stringify(whiteningServiceSchema)}
    </script>
  );
}
