import type { ReactNode } from 'react';

export type DevHudStat = {
  label: string;
  value: ReactNode;
};

export type DevHudProps = {
  title: string;
  stats: DevHudStat[];
  hint?: string;
  className?: string;
};

export function shouldShowHud(hudParam: string | string[] | undefined): boolean {
  if (Array.isArray(hudParam)) {
    return hudParam.includes('1');
  }

  return hudParam === '1';
}

export function DevHud({ title, stats, hint = 'Toggle with ?hud=1', className = 'tl-hud' }: DevHudProps) {
  return (
    <aside className={className} aria-label="Developer HUD">
      <p className="tl-hud__title">{title}</p>
      <dl className="tl-hud__grid">
        {stats.map(({ label, value }) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="tl-hud__hint">{hint}</p>
    </aside>
  );
}
