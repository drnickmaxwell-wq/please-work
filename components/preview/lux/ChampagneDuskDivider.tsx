import { luxClasses } from "@/lib/champagne/lux";

import "@/styles/champagne/lux/components.css";

export function ChampagneDuskDivider() {
  return <div aria-hidden className={luxClasses.duskDivider} role="presentation" />;
}

export default ChampagneDuskDivider;
