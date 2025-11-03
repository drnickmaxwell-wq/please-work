import type { ReactNode } from 'react';
import '@/styles/preview/dusk.css';

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return <div data-theme="preview-dusk">{children}</div>;
}
