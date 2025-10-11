Waves & Particles Pack
======================
Additive-only drop-in. Includes a lightweight CSS/SVG wave layer, a tiny particles layer,
a WebGL wave shader (optional, lazy-load recommended), and a scroll reveal helper.

Files
- components/effects/coastal-waves.tsx
- components/effects/CoastalParticles.tsx
- components/effects/WebGLWaves.tsx
- components/effects/scroll-animations.tsx

Usage
-----
1) Drag the `components/` folder from this zip into your GitHub repo root (GitHub merges paths).
2) Commit → Vercel → Redeploy with **Clear build cache**.

Hero example (in components/layout/sections/HeroBand.tsx):
----------------------------------------------------------
import dynamic from 'next/dynamic';
import CoastalWaves from '@/components/effects/coastal-waves';
const WebGLWaves = dynamic(() => import('@/components/effects/WebGLWaves'), { ssr: false });

// Under the video/background:
{/* <CoastalWaves /> */}
{/* <WebGLWaves />   // heavier, GPU-animated; falls back if unsupported */}

Scroll reveal helper:
---------------------
import { Reveal } from '@/components/effects/scroll-animations';
<Reveal><div>Content fades/slides in on scroll</div></Reveal>
