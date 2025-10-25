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
import { TreatmentGrid } from "@/components/ai24/TreatmentGrid";
import { TestimonialCarousel } from "@/components/ai24/TestimonialCarousel";

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
  const tools = [
    {
      title: "AI Cost Estimator",
      excerpt: "Personalised estimates based on your case.",
      ctaLabel: "Estimate now",
      ctaHref: "#cost",
    },
    {
      title: "Treatment Time Predictor",
      excerpt: "Get a realistic timeline from consult to results.",
      ctaLabel: "Check timeline",
      ctaHref: "#timeline",
    },
    {
      title: "AR Smile Try-On",
      excerpt: "Preview your smile with augmented reality.",
      ctaLabel: "Open preview",
      ctaHref: "#ar",
    },
  ];

  const testimonials = [
    {
      quote:
        "Absolutely brilliant service. The AI tools helped me understand exactly what to expect.",
      name: "Emma Roberts",
    },
    {
      quote:
        "Professional, precise, and painless. Results exceeded expectations.",
      name: "Michael Chen",
    },
    {
      quote:
        "I was nervous about dental work, but the team put me at ease. Incredible!",
      name: "Lucy Anderson",
    },
  ];

  return (
    <>
      {/* JSON-LD */}
      <TechnologySchema />

      {/* Champagne hero wrapper using your brand tokens + wave + particles */}
      <BrandHeroGradient
        intensity="bold"
        clip="wave-bottom"
        goldDensity="med"
        waveOpacity={0.2}
        particles
      >
        <section id="hero" className="relative overflow-clip">
          <div className="relative z-[2]">
            <TechnologyHero />
            <ScrollCue />
          </div>
        </section>
      </BrandHeroGradient>

      {/* Main sections */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-24 py-16">
        <DigitalWorkflow />
        <EquipmentGallery />
        <section id="personalize" className="relative py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-4xl md:text-5xl font-semibold iridescent-heading mb-8">
              Personalize Your Journey
            </h2>
            <p className="mb-10 text-slate-600 max-w-2xl">
              Use our AI-powered tools to get a clearer picture of your treatment plan.
            </p>
            <TreatmentGrid items={tools} />
          </div>
        </section>
        <section id="stories" className="relative py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-4xl md:text-5xl font-semibold iridescent-heading mb-10">
              Patient Stories
            </h2>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>
        <AIInnovation />
        <Sustainability />
        <TechnologyCTA />
      </main>
    </>
  );
}
