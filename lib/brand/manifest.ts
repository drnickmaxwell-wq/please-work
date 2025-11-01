import manifestJson from "@/public/brand/manifest.json";

export type BrandManifest = {
  name: string;
  version: string;
  tokens: string;
  gradient: {
    angle: number;
    stops: { color: string; pos: number }[];
    css: string;
  };
  gold: { hex: string; usage: string };
  typography: { headings: string; body: string };
  textures: {
    filmGrain?: string;
    grain?: string;
    glass?: string;
  };
  particles?: {
    soft?: string;
    light?: string;
    alpha?: boolean;
  };
  waves?: {
    mask?: string;
    background?: string;
  };
};

const manifestFromImport = manifestJson as BrandManifest;

export function loadBrandManifest(): BrandManifest {
  return manifestFromImport;
}

export const staticBrandManifest: BrandManifest = manifestFromImport;
