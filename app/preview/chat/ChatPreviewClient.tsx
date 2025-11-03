'use client';

import LuxuryChatbot from '@/components/ai/luxury-chatbot';
import Dock from '@/components/chat/Dock';

type PanelConfig = {
  label: string;
  containerClassName?: string;
  contentClassName?: string;
};

type ChatPreviewClientProps = {
  luxury: PanelConfig;
  dock: PanelConfig;
};

function mergeClasses(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export default function ChatPreviewClient({ luxury, dock }: ChatPreviewClientProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className={mergeClasses('space-y-3', luxury.containerClassName)}>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {luxury.label}
        </p>
        <div className={mergeClasses('overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm', luxury.contentClassName)}>
          <LuxuryChatbot />
        </div>
      </div>
      <div className={mergeClasses('space-y-3', dock.containerClassName)}>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {dock.label}
        </p>
        <div className={mergeClasses('overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm', dock.contentClassName)}>
          <Dock />
        </div>
      </div>
    </div>
  );
}
