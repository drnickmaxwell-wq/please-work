'use client';

import { useEffect, useState } from 'react';

import brandManifest from '@/public/brand/manifest.json';
import {
  loadBrandManifest,
  normalizeBrandManifest,
  type BrandManifest,
  type RawBrandManifest,
} from '@/lib/brand/manifest';

const staticManifest = normalizeBrandManifest(brandManifest as RawBrandManifest);

export function useBrand(): BrandManifest {
  const [manifest, setManifest] = useState<BrandManifest>(staticManifest);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let cancelled = false;

    loadBrandManifest()
      .then((loaded) => {
        if (!cancelled) {
          setManifest(loaded);
        }
      })
      .catch(() => {
        // fail silently and continue using the static manifest
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return manifest;
}

export default useBrand;
