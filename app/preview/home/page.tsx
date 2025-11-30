import type { Metadata } from "next";
import React from "react";

import { ChampagneLayout } from "@/components/layout/ChampagneLayout";
import { ChampagneHero } from "@/components/hero/ChampagneHero";
import AiSmileQuizTeaser from "@/components/sections/home/AiSmileQuizTeaser";
import ClinicTourSection from "@/components/sections/home/ClinicTourSection";
import LocalProof from "@/components/sections/home/LocalProof";
import MicroFaq, { type Faq } from "@/components/sections/home/MicroFaq";
import MostRequestedTreatments from "@/components/sections/home/MostRequestedTreatments";
import PatientStoriesTeaser from "@/components/sections/home/PatientStoriesTeaser";
import PortalTeaser from "@/components/sections/home/PortalTeaser";
import TechnologyHighlight from "@/components/sections/home/TechnologyHighlight";
import "@/components/preview/preview-layout.css";
import "@/components/preview/preview-typography.css";
import JsonLd from "@/components/seo/json-ld";
import { SMH_BUSINESS_DATA } from "@/lib/seo/advanced-seo";
import "@/styles/preview/home-champagne.css";

export const metadata: Metadata = {
  title: "Luxury Coastal Dentistry in Shoreham-by-Sea | St Mary's House Dental",
  description:
    "Luxury coastal dentistry with calm, technology-led care. Visit St Mary's House Dental in Shoreham-by-Sea for veneers, implants, orthodontics, and 3D digital dentistry.",
  alternates: {
    canonical: "/preview/home",
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
  name: SMH_BUSINESS_DATA.name,
  image: `${SMH_BUSINESS_DATA.url}/clinic.jpg`,
  telephone: SMH_BUSINESS_DATA.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 St Mary’s House",
    addressLocality: "Shoreham-by-Sea",
    postalCode: "BN43 5ZA",
    addressCountry: "GB",
  },
  url: SMH_BUSINESS_DATA.url,
  priceRange: "££",
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.834,
    longitude: -0.278,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://www.google.com/maps/place/St+Mary's+House+Dental+Practice",
    "https://www.facebook.com/stmaryshousedental",
    "https://www.instagram.com/stmaryshousedental",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SMH_BUSINESS_DATA.name,
  url: SMH_BUSINESS_DATA.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SMH_BUSINESS_DATA.url}/search?q={query}`,
    "query-input": "required name=query",
  },
};

export default function HomePreviewPage() {
  return (
    <ChampagneLayout>
      <div className="preview-home-canvas champagne-page">
        <main className="preview-home-main champagne-shell">
          <section className="preview-home-zone preview-home-zone-1">
            <ChampagneHero
              eyebrow="Calm coastal dentistry"
              title="Champagne preview home"
              subtitle="Layered gradients, glass shells, and Manus-ready components wrapped in the dusk ink canvas."
              badge="Preview"
              primaryCta={{ label: "Book a consultation", href: "/contact" }}
              secondaryCta={{ label: "Explore treatments", href: "/preview/treatments" }}
            />
            <ClinicTourSection />
          </section>
          <section className="preview-home-zone preview-home-zone-2">
            <MostRequestedTreatments />
            <TechnologyHighlight />
            <PatientStoriesTeaser />
            <AiSmileQuizTeaser />
            <PortalTeaser />
          </section>
          <section className="preview-home-zone preview-home-zone-3">
            <LocalProof />
            <MicroFaq faqs={faqs} />
          </section>
          <JsonLd data={[organizationSchema, localBusinessSchema, websiteSchema]} />
        </main>
      </div>
    </ChampagneLayout>
  );
}
