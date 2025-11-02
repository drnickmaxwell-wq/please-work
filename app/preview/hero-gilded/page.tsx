import dynamic from "next/dynamic";

const HeroGilded = dynamic(() => import("@/components/preview/HeroGilded"), {
  ssr: false,
});

export const metadata = { title: "Hero Gilded Preview • Champagne" };

export default function Page() {
  return <HeroGilded />;
}
