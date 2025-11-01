'use client';

import { useEffect, useState } from 'react';

import type { BrandManifest } from '@/lib/brand/manifest';
import { staticBrandManifest } from '@/lib/brand/manifest';

type BrandGlobal = typeof globalThis & {
  __SMH_BRAND_MANIFEST__?: BrandManifest;
};

const getGlobal = (): BrandGlobal => globalThis as BrandGlobal;

export function useBrand(): BrandManifest {
  if (typeof window === 'undefined') {
    return staticBrandManifest;
  }

  const [brand, setBrand] = useState<BrandManifest>(() => {
    const globalRef = getGlobal();
    return globalRef.__SMH_BRAND_MANIFEST__ ?? staticBrandManifest;
  });

  useEffect(() => {
    const globalRef = getGlobal();
    if (globalRef.__SMH_BRAND_MANIFEST__) {
      return;
    }

    let active = true;

    const hydrate = async () => {
      try {
        const response = await fetch('/brand/manifest.json', { cache: 'force-cache' });
        if (!response.ok) {
          return;
        }

        const manifest = (await response.json()) as BrandManifest;
        if (!active) {
          return;
        }

        globalRef.__SMH_BRAND_MANIFEST__ = manifest;
        setBrand(manifest);
      } catch {
        // Silent failure — fall back to static manifest import
      }
    };

    hydrate();

    return () => {
      active = false;
    };
  }, []);

  return brand;
}
