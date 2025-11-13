import Link from "next/link";

import ChampagneHero from "@/components/home/ChampagneHero";
import Hero4KVideo from "@/components/hero/4k-hero-video";
import SmileJourney from "@/components/sections/SmileJourney";

export default function HomePage() {
  const showPreviewRoutes = process.env.NEXT_PUBLIC_PREVIEW_MODE === "true";

  return (
    <main className="space-y-0">
      {process.env.NEXT_PUBLIC_FEATURE_BRAND_HERO && <ChampagneHero />}
      <Hero4KVideo />
      <SmileJourney />
      {showPreviewRoutes ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "2.5rem 0 3.5rem",
          }}
        >
          <Link
            href="/preview/treatments"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.55rem 1.4rem 0.55rem 1.05rem",
              borderRadius: "999px",
              border: "1px solid var(--smh-accent-gold-soft)",
              background: "color-mix(in srgb, var(--smh-ink) 60%, transparent)",
              color: "var(--smh-text)",
              textDecoration: "none",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.18rem 0.6rem",
                borderRadius: "999px",
                background: "color-mix(in srgb, var(--smh-accent-gold) 42%, transparent)",
                color: "color-mix(in srgb, var(--smh-ink) 78%, transparent)",
                boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--smh-ink) 18%, transparent)",
              }}
            >
              DEV
            </span>
            Preview treatments hub
          </Link>
        </div>
      ) : null}
    </main>
  );
}
