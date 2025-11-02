import HeroLuxury from "@/components/home/HeroLuxury";

export const metadata = {
  title: "Champagne Hero — Locked Preview",
  description: "Frozen preview of the canonical Manus Champagne hero.",
  robots: { index: false, follow: false }, // keep this out of search
};

export default function Page() {
  return (
    <main>
      <HeroLuxury />
    </main>
  );
}
