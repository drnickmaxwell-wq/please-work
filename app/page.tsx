import type { Metadata } from "next";

import AiSmileQuizTeaser from "@/components/home/AiSmileQuizTeaser";
import ChampagneHero from "@/components/home/ChampagneHero";
import ClinicTourSection from "@/components/home/ClinicTourSection";
import LocalProof from "@/components/home/LocalProof";
import MicroFaq, { type Faq } from "@/components/home/MicroFaq";
import MostRequestedTreatments from "@/components/home/MostRequestedTreatments";
import PatientStoriesTeaser from "@/components/home/PatientStoriesTeaser";
import PortalTeaser from "@/components/home/PortalTeaser";
import TechnologyHighlight from "@/components/home/TechnologyHighlight";
import JsonLd from "@/components/seo/json-ld";
import { SMH_BUSINESS_DATA } from "@/lib/seo/advanced-seo";

export const metadata: Metadata = {
  title: "Luxury Coastal Dentistry in Shoreham-by-Sea | St Mary's House Dental",
  description:
    "Luxury coastal dentistry with calm, technology-led care. Visit St Mary's House Dental in Shoreham-by-Sea for veneers, implants, orthodontics, and 3D digital dentistry.",
  alternates: {
    canonical: "/",
  },
};

const faqs: Faq[] = [
  {
    question: "How do I book a consultation?",
    answer: "Choose a time online or call 01273 453109; we confirm with a calm pre-visit checklist and optional AI photo review.",
  },
  {
    question: "Do you help nervous patients?",
    answer: "Yes — quiet rooms, gentle clinicians, and sedation options are available for both routine and advanced treatments.",
  },
  {
    question: "Which treatments are most popular?",
    answer: "Porcelain veneers, 3D-guided dental implants, Spark aligners, and sensitivity-safe whitening lead our Shoreham list.",
  },
  {
    question: "Where is the clinic located?",
    answer: "You’ll find us at 1 St Mary’s House, Shoreham-by-Sea, BN43 5ZA with nearby parking and easy coastal access.",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SMH_BUSINESS_DATA.name,
  url: SMH_BUSINESS_DATA.url,
  logo: `${SMH_BUSINESS_DATA.url}/logo.png`,
  sameAs: [
    "https://www.facebook.com/stmaryshousedental",
    "https://www.instagram.com/stmaryshousedental",
    "https://www.linkedin.com/company/stmaryshousedental",
  ],
  foundingDate: "2007",
  award: "Recognised for calm, technology-led coastal dentistry",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SMH_BUSINESS_DATA.url}/#local`,
  name: SMH_BUSINESS_DATA.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: SMH_BUSINESS_DATA.address.streetAddress,
    addressLocality: SMH_BUSINESS_DATA.address.addressLocality,
    addressRegion: SMH_BUSINESS_DATA.address.addressRegion,
    postalCode: SMH_BUSINESS_DATA.address.postalCode,
    addressCountry: SMH_BUSINESS_DATA.address.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "50.8333",
    longitude: "-0.2667",
  },
  openingHoursSpecification: SMH_BUSINESS_DATA.openingHours.map((hours) => {
    const [days, time] = hours.split(" ");
    const [opens, closes] = time.split("-");
    const dayOfWeek =
      days === "Mo-Th"
        ? ["Monday", "Tuesday", "Wednesday", "Thursday"]
        : days === "Fr"
          ? ["Friday"]
          : ["Saturday"];
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek,
      opens,
      closes,
    };
  }),
  telephone: SMH_BUSINESS_DATA.telephone,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SMH_BUSINESS_DATA.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SMH_BUSINESS_DATA.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <main className="space-y-0">
      <ChampagneHero />
      <JsonLd data={organizationSchema} />
      <ClinicTourSection />
      <MostRequestedTreatments />
      <TechnologyHighlight />
      <PatientStoriesTeaser />
      <AiSmileQuizTeaser />
      <PortalTeaser />
      <LocalProof />
      <JsonLd data={localBusinessSchema} />
      <MicroFaq faqs={faqs} />
      <JsonLd data={websiteSchema} />
    </main>
  );
}
