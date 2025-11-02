import HeroGildedPreview from "@/components/preview/HeroGildedPreview";

export const metadata = { title: "Hero Gilded Preview · Champagne" };

export default function Page() {
  // Server component can return a client component directly.
  return <HeroGildedPreview />;
}
