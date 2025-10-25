// app/treatments/technology/page.tsx
import type { Metadata } from "next";
import BrandHeroGradient from "@/components/brand/BrandHeroGradient"; // already in repo per your audit
import TechnologySchema from "./components/TechnologySchema"; // keep your placeholder or replace with code below

import TechnologyHero from "./components/TechnologyHero";
import "./components/technology-hero.css";

import DigitalWorkflow from "./components/DigitalWorkflow";
import "./components/digital-workflow.css";

import EquipmentGallery from "./components/EquipmentGallery";
import "./components/equipment-gallery.css";

import AIInnovation from "./components/AIInnovation";
import "./components/ai-innovation.css";

import Sustainability from "./components/Sustainability";
import "./components/sustainability.css";

import TechnologyCTA from "./components/TechnologyCTA";
import "./components/technology-cta.css";

import ScrollCue from "./components/ScrollCue";
import "./components/scroll-cue.css";

export const metadata: Metadata = {
  title: "Technology | St Mary’s House Dental Care",
  description:
    "Precision, comfort, and aesthetics powered by world-class dental technology: 3D scanning & printing, guided implants, laser dentistry, and more.",
  alternates: { canonical: "/treatments/technology" },
  openGraph: {
    title: "Our Technology",
    description:
      "Guided implants, 3D scanning & printing, laser precision — a calmer, faster, more precise appointment.",
    url: "/treatments/technology",
    type: "website",
  },
};

export default function TechnologyPage() {
  return (
    <>
      {/* JSON-LD */}
      <TechnologySchema />

      {/* Champagne hero wrapper using your brand tokens + wave + particles */}
      <section id="hero" className="relative overflow-clip">
        <BrandHeroGradient intensity="bold" clip="wave-bottom" goldDensity="med" waveOpacity={0.2} />
        <div className="relative z-10">
          <TechnologyHero />
          <ScrollCue />
        </div>
      </section>

      {/* Main sections */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-24 py-16">
        <DigitalWorkflow />
        <EquipmentGallery />
        <AIInnovation />
        <Sustainability />
        <TechnologyCTA />
      </main>
    </>
  );
}
