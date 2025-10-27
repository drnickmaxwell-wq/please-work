export default function BrandLockPreview() {
  return (
    <section className="min-h-screen grid place-items-center bg-[var(--smh-bg)] text-[var(--smh-text)]">
      <div className="p-8 rounded-2xl shadow-[var(--rim-gold-inset)]"
           style={{ background: 'var(--smh-gradient)' }}>
        <h1 className="text-3xl font-serif">Brand tokens are live</h1>
        <ul className="mt-4 font-mono text-sm">
          <li>gradient: <code id="g"></code></li>
          <li>magenta:  <code id="m"></code></li>
          <li>teal:     <code id="t"></code></li>
          <li>gold:     <code id="y"></code></li>
          <li>glassStrong: <code id="gs"></code></li>
        </ul>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function(){
              function update(attempt = 0){
                const s = getComputedStyle(document.documentElement);
                const map = {
                  g: s.getPropertyValue('--smh-gradient').trim(),
                  m: s.getPropertyValue('--smh-primary-magenta').trim(),
                  t: s.getPropertyValue('--smh-primary-teal').trim(),
                  y: s.getPropertyValue('--smh-accent-gold').trim(),
                  gs: s.getPropertyValue('--glass-bg-strong').trim(),
                };
                const missing = Object.values(map).some((value) => !value);
                Object.entries(map).forEach(([id, value]) => {
                  const el = document.getElementById(id);
                  if (el && value) el.textContent = value;
                });
                if (attempt < 120 && (missing || attempt < 20)) {
                  setTimeout(() => update(attempt + 1), missing ? 100 : 250);
                }
              }
              const start = () => update();
              if (document.readyState === 'complete') start();
              else window.addEventListener('load', start, { once: true });
            })();
          `
        }} />
      </div>
    </section>
  );
}
