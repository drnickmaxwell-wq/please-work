import type { Metadata } from "next";
import React from "react";

import HomeHero from "@/components/preview/home/HomeHero";
import ChampagnePreviewFooter from "@/components/preview/layout/ChampagnePreviewFooter";
import HomeHeroCTABand from "@/components/preview/home/HomeHeroCTABand";
import HomeComfortBlock from "@/components/preview/home/HomeComfortBlock";
import HomeFAQ from "@/components/preview/home/HomeFAQ";
import HomeFeaturedTreatments from "@/components/preview/home/HomeFeaturedTreatments";
import HomeFinalCTA from "@/components/preview/home/HomeFinalCTA";
import HomeImplantsSpotlight from "@/components/preview/home/HomeImplantsSpotlight";
import HomePatientJourneyStrip from "@/components/preview/home/HomePatientJourneyStrip";
import HomeSmileGalleryStrip from "@/components/preview/home/HomeSmileGalleryStrip";
import HomeTeamTeaser from "@/components/preview/home/HomeTeamTeaser";
import HomeTechStrip from "@/components/preview/home/HomeTechStrip";
import HomeTestimonials from "@/components/preview/home/HomeTestimonials";
import HomeTrustStrip from "@/components/preview/home/HomeTrustStrip";
import HomeValueTrio from "@/components/preview/home/HomeValueTrio";
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
    <div className="preview-home-canvas">
      <main className="preview-home-main">
        {/* Preview-only Champagne homepage scaffold. Visual polish and Manus-led assets will slot in later. */}
        <section className="preview-home-zone preview-home-zone-1">
          <HomeHero />
          <HomeHeroCTABand />
        </section>
        <section className="preview-home-zone preview-home-zone-2">
          <HomeTrustStrip />
          <HomeValueTrio />
          <HomeFeaturedTreatments />
          <HomeImplantsSpotlight />
          <HomeTechStrip />
          <HomeSmileGalleryStrip />
          <HomeTestimonials />
          <HomeComfortBlock />
          <HomeTeamTeaser />
          <HomePatientJourneyStrip />
        </section>
        <section className="preview-home-zone preview-home-zone-3">
          <HomeFAQ />
          <HomeFinalCTA />
          <ChampagnePreviewFooter />
        </section>
        <JsonLd data={[organizationSchema, localBusinessSchema, websiteSchema]} />
      </main>
    </div>
  );
}
