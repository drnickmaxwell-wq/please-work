// app/preview/brand-lock/page.tsx — Runtime brand probe (read-only)
"use client";

import { useEffect, useState } from "react";

type Diagnostics = {
  gradient: string;
  waves: string;
  backgroundSize: string;
  backgroundPosition: string;
};

const splitByTopLevelCommas = (value: string): string[] => {
  const parts: string[] = [];
  let depth = 0;
  let current = "";

  for (const char of value) {
    if (char === "(") depth += 1;
    if (char === ")") depth -= 1;
    if (char === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }

  if (current.trim()) {
    parts.push(current.trim());
  }

  return parts;
};

const rgbToHex = (value: string): string => {
  const match = value.match(/rgba?\(([^)]+)\)/i);
  if (!match) {
    return value.trim();
  }

  const components = match[1]
    .split(/[\s,\/]+/)
    .filter(Boolean)
    .map(Number);

  if (components.length < 3) {
    return value.trim();
  }

  const [r, g, b, alpha] = components;
  if (Number.isFinite(alpha) && alpha !== 1) {
    return value.replace(/\s+/g, "");
  }

  if ([r, g, b].some((component) => Number.isNaN(component))) {
    return value.trim();
  }

  return `#${[r, g, b]
    .map((component) => component.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
};

const extractGradientLayer = (backgroundImage: string): string => {
  let depth = 0;
  for (let index = 0; index < backgroundImage.length; index += 1) {
    const char = backgroundImage[index];
    if (char === "(") depth += 1;
    if (char === ")") {
      depth -= 1;
      if (depth === 0) {
        return backgroundImage.slice(0, index + 1);
      }
    }
  }
  return backgroundImage;
};

const normalizeGradient = (backgroundImage: string): string => {
  if (!backgroundImage) {
    return "";
  }

  const firstLayer = extractGradientLayer(backgroundImage);
  const openIndex = firstLayer.indexOf("(");
  const closeIndex = firstLayer.lastIndexOf(")");
  if (openIndex === -1 || closeIndex === -1) {
    return firstLayer.replace(/\s+/g, "");
  }

  const body = firstLayer.slice(openIndex + 1, closeIndex);
  const [angle, ...stopTokens] = splitByTopLevelCommas(body);
  if (!angle || stopTokens.length === 0) {
    return firstLayer.replace(/\s+/g, "");
  }

  const resolveColorMix = (value: string): string => {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return value.replace(/\s+/g, "");
    }
    ctx.fillStyle = value;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return rgbToHex(`rgb(${r},${g},${b})`);
  };

  const stops = stopTokens.map((token) => {
    const trimmed = token.trim();
    if (trimmed.startsWith("color-mix") || trimmed.startsWith("oklab")) {
      const mixMatch = trimmed.match(/(?:color-mix|oklab)\([^)]*\)/i);
      if (mixMatch) {
        const resolved = resolveColorMix(mixMatch[0]);
        const position = trimmed.slice(mixMatch[0].length).trim();
        return position ? `${resolved} ${position}` : resolved;
      }
    }
    const colorMatch = token.match(/rgba?\([^)]+\)/i);
    if (!colorMatch) {
      return token.replace(/\s+/g, "");
    }
    const color = rgbToHex(colorMatch[0]);
    const position = token.slice(colorMatch[0].length).trim();
    return position ? `${color} ${position}` : color;
  });

  return `linear-gradient(${angle.trim()},${stops.join(",")})`;
};

export default function BrandLock() {
  const [diagnostics, setDiagnostics] = useState<Diagnostics | null>(null);
  const [warmLiftEnabled, setWarmLiftEnabled] = useState(false);
  const [particlesEnabled, setParticlesEnabled] = useState(false);

  useEffect(() => {
    const surface = document.querySelector<HTMLElement>(".champagne-surface-lux");
    if (!surface) return;

    const surfaceStyles = getComputedStyle(surface);
    const gradient = normalizeGradient(surfaceStyles.backgroundImage);
    const hasWaveField = surfaceStyles.backgroundImage.includes("wave-field.svg");
    const hasWaveDots = surfaceStyles.backgroundImage.includes("wave-dots.svg");
    const waves = hasWaveField && hasWaveDots
      ? "wave-field.svg + wave-dots.svg"
      : surfaceStyles.backgroundImage.replace(/\s+/g, " ").trim();

    console.log(`gradient=${gradient}`);
    console.log(`waves=${waves}`);
    console.log(`bgSize/Pos=${surfaceStyles.backgroundSize} | ${surfaceStyles.backgroundPosition}`);

    setDiagnostics({
      gradient,
      waves,
      backgroundSize: surfaceStyles.backgroundSize,
      backgroundPosition: surfaceStyles.backgroundPosition,
    });
  }, [particlesEnabled, warmLiftEnabled]);

  return (
    <main className="min-h-screen bg-[color:var(--smh-bg)] text-[color:var(--smh-text)]">
      <section
        className={`champagne-surface-lux champagne-warm-lift saturation-lift hero flex min-h-screen items-center justify-center p-6${particlesEnabled ? " particles" : ""}`}
        style={{ ["--smh-warm-lift" as const]: warmLiftEnabled ? 1 : 0 }}
      >
        <div className="champagne-glass w-full max-w-2xl p-8">
          <h2 className="font-serif text-2xl">Brand lock diagnostics</h2>
          <p className="mt-2 text-sm opacity-80">
            Values below reflect live computed styles for the champagne surface stack.
          </p>
          <label className="mt-4 inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={warmLiftEnabled}
              onChange={(event) => setWarmLiftEnabled(event.target.checked)}
            />
            Warm lift overlay
          </label>
          <label className="mt-2 inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={particlesEnabled}
              onChange={(event) => setParticlesEnabled(event.target.checked)}
            />
            Particles layer
          </label>
          <div className="mt-6 space-y-2 font-mono text-sm">
            {diagnostics ? (
              <>
                <p>gradient={diagnostics.gradient}</p>
                <p>waves={diagnostics.waves}</p>
                <p>bgSize/Pos={diagnostics.backgroundSize} | {diagnostics.backgroundPosition}</p>
              </>
            ) : (
              <p aria-live="polite">Sampling surface…</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
