import { luxClasses } from "@/lib/champagne/lux";

import "@/styles/champagne/lux/components.css";

export function SilentHorizonDivider() {
  return (
    <div aria-hidden className={luxClasses.horizonDivider} role="presentation">
      <div className="lux-horizon-fog" />
    </div>
  );
}

export default SilentHorizonDivider;
