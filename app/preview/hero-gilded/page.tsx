import PreviewHeroGilded from "@/components/preview/HeroGilded";
import "@/styles/champagne/hero-gilded-tweaks.css";

export const metadata = {
  title: "Preview: Gilded Champagne Hero",
};

export default function Page() {
  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "var(--smh-ink)",
        color: "var(--smh-text)",
      }}
    >
      <PreviewHeroGilded />
    </main>
  );
}
