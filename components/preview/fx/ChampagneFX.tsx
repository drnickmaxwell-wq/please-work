'use client';

import type { CSSProperties } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import usePrefersReducedMotion from '@/lib/hooks/usePrefersReducedMotion';

export type ChampagneFXProps = {
  /** element the FX should cover; typically a section/hero */
  targetId?: string;
  /** density controls for dust/particles: 'off' | 'low' (default) */
  dust?: 'off' | 'low';
  /** enable parallax for child slots (default true) */
  parallax?: boolean;
};

type AssetResolution = {
  waveMask?: string | null;
  grain?: string | null;
};

const DEFAULT_GRAIN = '/brand/textures/film-grain-2560x1440.webp';
const WAVE_CANDIDATES = [
  '/brand/assets/champagne/wave-caustics.webp',
  '/brand/assets/champagne/wave-caustics.png',
  '/brand/masks/champagne-wave-mask.webp',
  '/brand/masks/champagne-wave-mask.png',
  '/brand/waves/wave-field.svg',
  '/brand/waves/header-wave-mask.svg',
];

function isClient() {
  return typeof window !== 'undefined';
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function probeImage(src: string) {
  return new Promise<boolean>((resolve) => {
    if (!isClient()) {
      resolve(false);
      return;
    }
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = src;
  });
}

async function resolveAssets(): Promise<AssetResolution> {
  if (!isClient()) {
    return {};
  }

  const result: AssetResolution = {};

  for (const path of WAVE_CANDIDATES) {
    // eslint-disable-next-line no-await-in-loop
    const ok = await probeImage(path);
    if (ok) {
      result.waveMask = path;
      break;
    }
  }

  const grainOk = await probeImage(DEFAULT_GRAIN);
  result.grain = grainOk ? DEFAULT_GRAIN : null;

  return result;
}

function ensureRelative(target: HTMLElement) {
  if (!isClient()) return () => {};
  const computed = window.getComputedStyle(target).position;
  const mutated = computed === 'static' || computed === '';
  if (mutated) {
    target.dataset.champagneFxPosition = 'temp';
    target.style.position = 'relative';
  }
  return () => {
    if (target.dataset.champagneFxPosition === 'temp') {
      target.style.position = '';
      delete target.dataset.champagneFxPosition;
    }
  };
}

function applyParallax(target: HTMLElement, prefersReducedMotion: boolean) {
  if (!isClient() || prefersReducedMotion) {
    return () => {};
  }

  target.classList.add('fx-parallax');

  const update = (clientX: number, clientY: number) => {
    const rect = target.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dx = (clientX - (rect.left + rect.width / 2)) / rect.width;
    const dy = (clientY - (rect.top + rect.height / 2)) / rect.height;

    const base = clamp(dy * 10, -6, 6);
    const baseX = clamp(dx * 6, -6, 6);

    target.style.setProperty('--parallax-1', `${base}px`);
    target.style.setProperty('--parallax-2', `${clamp(base * 1.2, -6, 6)}px`);
    target.style.setProperty('--parallax-3', `${clamp(base * 1.4, -6, 6)}px`);
    target.style.setProperty('--parallax-x', `${baseX}px`);
  };

  const handlePointerMove = (event: PointerEvent) => {
    update(event.clientX, event.clientY);
  };

  const reset = () => {
    target.style.setProperty('--parallax-1', '0px');
    target.style.setProperty('--parallax-2', '0px');
    target.style.setProperty('--parallax-3', '0px');
    target.style.setProperty('--parallax-x', '0px');
  };

  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  window.addEventListener('pointerleave', reset, { passive: true });
  window.addEventListener('scroll', reset, { passive: true });

  return () => {
    reset();
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerleave', reset);
    window.removeEventListener('scroll', reset);
    target.classList.remove('fx-parallax');
  };
}

export default function ChampagneFX({ targetId, dust = 'low', parallax = true }: ChampagneFXProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [assets, setAssets] = useState<AssetResolution>({});
  const [hudVisible, setHudVisible] = useState(false);

  useEffect(() => {
    if (!isClient()) return;

    let cancelled = false;
    resolveAssets().then((resolved) => {
      if (!cancelled) {
        setAssets(resolved);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isClient()) return;

    const searchParams = new URLSearchParams(window.location.search);
    setHudVisible(searchParams.get('hud') === '1');
  }, []);

  useEffect(() => {
    if (!isClient()) return;

    const target = targetId ? document.getElementById(targetId) : containerRef.current?.parentElement;
    if (!target) return;

    const restore = ensureRelative(target);
    const teardownParallax = parallax ? applyParallax(target, prefersReducedMotion) : () => {};

    return () => {
      teardownParallax();
      restore();
    };
  }, [targetId, parallax, prefersReducedMotion]);

  const parallaxActive = parallax && !prefersReducedMotion;

  const hudLabel = useMemo(() => {
    if (!hudVisible) return null;
    const layers: string[] = [];
    layers.push(assets.waveMask ? 'wave-mask' : 'wave-grad');
    layers.push('glass');
    if (dust !== 'off') layers.push('dust');
    if (assets.grain) layers.push('grain');

    const motion = prefersReducedMotion ? 'PRM: off' : 'PRM: on';
    return `${layers.join(' · ')} · ${motion}`;
  }, [assets.grain, assets.waveMask, dust, hudVisible, prefersReducedMotion]);

  if (!isClient()) {
    return null;
  }

  const style: CSSProperties = {
    '--champagne-fx-wave-mask': assets.waveMask ? `url(${assets.waveMask})` : undefined,
    '--champagne-fx-grain-image': assets.grain ? `url(${assets.grain})` : undefined,
  };

  const className = parallaxActive ? 'champagne-fx fx-parallax' : 'champagne-fx';

  return (
    <div
      aria-hidden
      className={className}
      ref={containerRef}
      style={style}
    >
      <div className="champagne-fx__layer champagne-fx__waves" />
      <div className="champagne-fx__layer champagne-fx__glass" />
      {dust === 'off' ? null : <div className="champagne-fx__layer champagne-fx__dust" />}
      {assets.grain ? <div className="champagne-fx__layer champagne-fx__grain" /> : null}
      {hudLabel ? <div className="champagne-fx__hud">{hudLabel}</div> : null}
    </div>
  );
}
