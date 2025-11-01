import fs from "node:fs";
import path from "node:path";

export type BrandManifest = {
  name: string;
  version: string;
  tokens: string;
  gradient: { angle: number; stops: { color: string; pos: number }[]; css: string };
  gold: { hex: string; usage: string };
  typography: { headings: string; body: string };
  textures: { grain: string; glass: string };
  particles: { light: string; alpha: boolean };
  waves: { mask: string; background: string };
};

export function loadBrandManifest(): BrandManifest {
  const p = path.join(process.cwd(), "public/brand/manifest.json");
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw) as BrandManifest;
}
