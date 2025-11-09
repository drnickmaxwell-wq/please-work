# Token Mapping

The following table documents the replacements performed while resolving the `rogue-tailwind-hues` issue. Each row maps a hardcoded value or Tailwind palette class that previously shipped in the repository to the brand token (or token-derived mix) that now powers it.

| Original value | Replacement | Notable files |
| --- | --- | --- |
| `#f8fafc` | `var(--smh-gray-200)` | `app/api/integrations/email/route.ts` |
| `white` | `var(--smh-white)` | `app/api/integrations/email/route.ts`, `app/treatments/technology/components/technology-hero.css`, `styles/ai/chat-preview.css`, `styles/champagne/hero.css`, etc. |
| `rgba(255, 255, 255, 0.9)` | `color-mix(in oklab, var(--smh-white) 90%, transparent)` | `app/api/integrations/email/route.ts`, `app/treatments/composite-bonding/composite-bonding.module.css` |
| `#1e293b` | `var(--ink)` | `app/api/integrations/email/route.ts` |
| `#475569` | `var(--text)` | `app/api/integrations/email/route.ts` |
| `#f1f5f9` | `var(--smh-gray-200)` | `app/api/integrations/email/route.ts` |
| `#e2e8f0` | `color-mix(in oklab, var(--smh-gray-200) 90%, transparent)` | `app/api/integrations/email/route.ts` |
| `#64748b` | `color-mix(in oklab, var(--text) 70%, var(--smh-white) 30%)` | `app/api/integrations/email/route.ts` |
| `#dc2626` | `var(--brand-magenta)` | `app/api/integrations/email/route.ts` |
| `#fef2f2` | `color-mix(in oklab, var(--brand-magenta) 15%, var(--smh-white) 85%)` | `app/api/integrations/email/route.ts` |
| `#f8f4ee` | `color-mix(in oklab, var(--champagne-keyline-gold) 30%, var(--smh-white) 70%)` | `app/globals/hero-polish.css` |
| `#000` | `var(--ink)` | `app/globals/hero-polish.css`, `styles/preview/champagne/layers.css` |
| `#fdfbff` | `color-mix(in oklab, var(--smh-white) 98%, var(--brand-magenta) 2%)` | `app/treatments/composite-bonding/composite-bonding.module.css`, `app/treatments/technology/technology.module.css` |
| `rgba(255, 255, 255, 0.82)` | `color-mix(in oklab, var(--smh-white) 82%, transparent)` | `app/treatments/composite-bonding/composite-bonding.module.css`, `app/treatments/technology/technology.module.css` |
| `rgba(255, 255, 255, 0.88)` | `color-mix(in oklab, var(--smh-white) 88%, transparent)` | `app/treatments/composite-bonding/composite-bonding.module.css`, `app/treatments/technology/technology.module.css` |
| `rgba(255, 255, 255, 0.08)` | `color-mix(in oklab, var(--smh-white) 8%, transparent)` | `app/treatments/technology/components/technology-hero.css` |
| `rgba(255, 255, 255, 0.15)` | `color-mix(in oklab, var(--smh-white) 15%, transparent)` | `app/treatments/technology/components/technology-hero.css` |
| `rgba(0, 0, 0, 0.2)` | `color-mix(in oklab, var(--ink) 20%, transparent)` | `app/treatments/technology/components/technology-hero.css` |
| `rgba(0, 0, 0, 0.35)` | `color-mix(in oklab, var(--ink) 35%, transparent)` | `app/treatments/technology/components/technology-hero.css`, `styles/preview/champagne/page.css` |
| `rgba(0, 0, 0, 0.45)` | `color-mix(in oklab, var(--ink) 45%, transparent)` | `styles/preview/champagne/footer.css`, `styles/preview/champagne/page.css` |
| `rgba(0, 0, 0, 0.25)` | `color-mix(in oklab, var(--ink) 25%, transparent)` | `app/treatments/technology/technology.module.css`, `components/navigation/breadcrumbs.module.css` |
| `rgba(6, 18, 32, 0.25)` | `color-mix(in oklab, var(--ink) 25%, transparent)` | `app/treatments/technology/technology.module.css` |
| `rgba(12, 24, 32, 0.35)` | `color-mix(in oklab, var(--ink) 35%, transparent)` | `components/navigation/breadcrumbs.module.css` |
| `rgba(249, 232, 195, 0.45)` | `color-mix(in oklab, var(--champagne-keyline-gold) 45%, transparent)` | `components/navigation/breadcrumbs.module.css` |
| `rgba(255, 255, 255, 0.86)` | `color-mix(in oklab, var(--smh-white) 86%, transparent)` | `components/navigation/breadcrumbs.module.css` |
| `rgba(255, 242, 222, 0.92)` | `color-mix(in oklab, var(--smh-white) 92%, var(--brand-gold) 8%)` | `styles/preview/champagne/footer.css` |
| `rgba(255, 237, 209, 0.82)` | `color-mix(in oklab, var(--smh-white) 82%, var(--brand-gold) 18%)` | `styles/preview/champagne/footer.css` |
| `rgba(255, 249, 236, 0.88)` | `color-mix(in oklab, var(--smh-white) 88%, var(--brand-gold) 12%)` | `styles/preview/champagne/footer.css` |
| `rgba(255, 244, 229, 0.78)` | `color-mix(in oklab, var(--smh-white) 78%, var(--brand-gold) 22%)` | `styles/preview/champagne/footer.css` |
| `#050505` | `color-mix(in oklab, var(--ink) 90%, transparent 10%)` | `styles/preview/champagne/footer.css` |
| `rgba(255, 255, 255, 0.28)` | `color-mix(in oklab, var(--smh-white) 28%, transparent)` | `styles/ai/chat-preview.css`, `styles/champagne/hero.css` |
| `rgba(255, 255, 255, 0.18)` | `color-mix(in oklab, var(--smh-white) 18%, transparent)` | `styles/ai/chat-preview.css`, `styles/champagne/hero.css` |
| `rgba(255, 255, 255, 0.02)` | `color-mix(in oklab, var(--smh-white) 2%, transparent)` | `app/treatments/technology/components/technology-hero.css`, `styles/ai/chat-preview.css` |
| `rgba(255, 255, 255, 0.12)` | `color-mix(in oklab, var(--smh-white) 12%, transparent)` | `app/treatments/technology/technology.module.css` |
| `rgba(255, 255, 255, 0.18)` | `color-mix(in oklab, var(--smh-white) 18%, transparent)` | `app/treatments/technology/components/technology-hero.css`, `styles/ai/chat-preview.css` |
| `rgba(64, 196, 180, 0.08)` | `color-mix(in oklab, var(--brand-teal) 8%, transparent)` | `app/treatments/technology/components/technology-hero.css`
| `rgba(255, 255, 255, 0.55)` | `color-mix(in oklab, var(--smh-white) 55%, transparent)` | `app/treatments/technology/components/technology-hero.css`
| `rgba(255, 255, 255, 0.005)` | `color-mix(in oklab, var(--smh-white) 0.5%, transparent)` | `app/treatments/technology/components/technology-hero.css` |
| `#C2185B`, `#2CBFAE`, `#40C4B4`, `#D4AF37`, `#FFFFFF`, `#0E1420` | `var(--brand-magenta)`, `var(--brand-teal)`, `var(--brand-teal)`, `var(--brand-gold)`, `var(--smh-white)`, `var(--ink)` | `styles/champagne/hero.css`, `styles/champagne/manifest.json` |
| `#0f172a` | `color-mix(in oklab, var(--ink) 94%, transparent 6%)` (fallback) | `styles/ai/chat-preview.css` |
| `#0f0c0a`, `#1c1412`, `#060607` | gradient mixes with `var(--ink)` and brand hues | `styles/preview/champagne/page.css` |
| `rgba(255, 214, 170, 0.18)` | `color-mix(in oklab, var(--brand-gold) 18%, transparent)` | `styles/preview/champagne/page.css` |
| `rgba(255, 214, 170, 0.24)` | `color-mix(in oklab, var(--brand-gold) 24%, transparent)` | `styles/preview/champagne/page.css` |
| `rgba(12, 9, 8, 0.8)` | `color-mix(in oklab, var(--ink) 80%, transparent)` | `styles/preview/champagne/page.css` |
| `rgba(16, 11, 9, 0.9)` | `color-mix(in oklab, var(--ink) 90%, transparent)` | `styles/preview/champagne/page.css` |
| `rgba(255, 248, 235, 0.95)` | `color-mix(in oklab, var(--smh-white) 95%, var(--brand-gold) 5%)` | `styles/preview/champagne/page.css` |
| `rgba(255, 231, 205, 0.85)` | `color-mix(in oklab, var(--smh-white) 85%, var(--brand-gold) 15%)` | `styles/preview/champagne/page.css` |
| `rgba(255, 241, 227, 0.8)` | `color-mix(in oklab, var(--smh-white) 80%, var(--brand-gold) 20%)` | `styles/preview/champagne/page.css` |
| `rgba(255, 245, 228, 0.6)` | `color-mix(in oklab, var(--smh-white) 60%, var(--brand-gold) 40%)` | `styles/preview/champagne/page.css` |
| `accent-color: #f0c674` | `accent-color: var(--brand-gold)` | `styles/preview/champagne/page.css` |
| `text-yellow-400` | Inline style `color: var(--brand-gold)` | `components/ai/luxury-chatbot.tsx` |
| `text-orange-500` | Inline style `color: color-mix(in oklab, var(--brand-gold) 65%, var(--brand-magenta) 35%)` | `components/ai/luxury-chatbot.tsx` |
| `text-red-500` | Inline style `color: var(--brand-magenta)` | `components/ai/luxury-chatbot.tsx` |
| `text-green-500` | Inline style `color: var(--brand-teal)` | `components/ai/luxury-chatbot.tsx` |
| `text-red-400` | Inline style `color: color-mix(in oklab, var(--brand-magenta) 80%, var(--smh-white) 20%)` | `components/ai/luxury-chatbot.tsx` |
| `text-blue-500` | Inline style `color: color-mix(in oklab, var(--brand-teal) 70%, var(--smh-white) 30%)` | `components/ai/luxury-chatbot.tsx` |
| `text-gray-500` | Inline style `color: color-mix(in oklab, var(--text) 70%, var(--smh-white) 30%)` | `components/ai/luxury-chatbot.tsx` |
| `bg-gradient-to-b from-pink-500 to-teal-500` | Inline gradient `linear-gradient(180deg, var(--brand-magenta) 0%, var(--brand-teal) 100%)` | `components/effects/luxury-text-effects.tsx` |
| `white` (GlowText palette) | `var(--smh-white)` | `components/effects/luxury-text-effects.tsx` |

