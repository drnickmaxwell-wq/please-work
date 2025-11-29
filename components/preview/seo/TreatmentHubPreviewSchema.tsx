import JsonLd from "@/components/seo/json-ld";
import { SMH_BUSINESS_DATA } from "@/lib/seo/advanced-seo";

const serviceDescription =
  "Explore cosmetic, restorative and orthodontic treatments in one place. Compare options, preview results in our 3D viewer, and check monthly finance with a soft search before booking.";

const howToSteps = [
  {
    "@type": "HowToStep",
    name: "Consultation",
    text: "Share photos or visit the clinic to outline your goals, health history, and timelines.",
  },
  {
    "@type": "HowToStep",
    name: "3D Planning",
    text: "Digital scans, CBCT, and smile simulations map the ideal shape, spacing, and implant position.",
  },
  {
    "@type": "HowToStep",
    name: "Treatment Day",
    text: "Guided workflows keep appointments calm, whether placing veneers, aligners, or implants.",
  },
  {
    "@type": "HowToStep",
    name: "Aftercare",
    text: "Follow-up reviews, retainers, and hygiene advice protect your results with clear timelines.",
  },
];

const faqEntities = [
  {
    "@type": "Question",
    name: "How long do veneers last?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Well-made porcelain veneers typically last 10–15 years with good home care and regular hygiene visits.",
    },
  },
  {
    "@type": "Question",
    name: "Does treatment hurt?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Treatments are planned for comfort with local anaesthetic and gentle, minimally invasive techniques.",
    },
  },
  {
    "@type": "Question",
    name: "Do you offer finance?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. We provide finance with soft credit searches so you can review monthly examples before committing.",
    },
  },
  {
    "@type": "Question",
    name: "What is the first step?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Start with a consultation or AI Smile Quiz; both give you tailored recommendations and timelines.",
    },
  },
  {
    "@type": "Question",
    name: "Do you use 3D technology?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. CBCT scans, intraoral scanning, and 3D printing are used for planning, guides, and retainers.",
    },
  },
];

export default function TreatmentHubPreviewSchema() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Dental treatments at St Mary’s House Dental",
    description: serviceDescription,
    areaServed: SMH_BUSINESS_DATA.areaServed,
    provider: {
      "@type": "Organization",
      name: SMH_BUSINESS_DATA.name,
      url: SMH_BUSINESS_DATA.url,
      telephone: SMH_BUSINESS_DATA.telephone,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      availability: "https://schema.org/PreOrder",
      url: `${SMH_BUSINESS_DATA.url}/treatments`,
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How treatments work at St Mary’s House Dental",
    step: howToSteps,
    supply: "Photos or scans for digital planning",
    tool: ["CBCT", "3D printer", "Intraoral scanner"],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntities,
  };

  return <JsonLd data={[serviceSchema, howToSchema, faqSchema]} />;
}
