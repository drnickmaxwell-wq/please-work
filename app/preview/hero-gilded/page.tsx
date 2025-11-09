import type { Metadata } from "next";
import "@/styles/champagne/hero-gilded-tweaks.css";
import PreviewHeroGildedClient from "./PreviewHeroGildedClient";

export const metadata: Metadata = {
  robots: { index: false },
};

export default function HeroGildedPage() {
  return <PreviewHeroGildedClient />;
}
