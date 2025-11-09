import type { Metadata } from "next";
import PreviewHeroGildedClient from "./PreviewHeroGildedClient";

export const metadata: Metadata = {
  title: "Preview — Hero Gilded",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PreviewHeroGildedClient />;
}
