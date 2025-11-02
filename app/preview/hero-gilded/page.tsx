import ChampagneHeroGilded from "@/components/home/ChampagneHeroGilded";

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
      <ChampagneHeroGilded />
    </main>
  );
}
