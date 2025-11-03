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
  const isApiConfigured = Boolean(process.env.NEXT_PUBLIC_CHAT_API);

  const statusLabel = isApiConfigured ? 'Live API' : 'Preview mode';
  const statusClassName = isApiConfigured
    ? 'chat-accent border'
    : 'border border-[color:var(--chat-ring)] text-[color:var(--chat-text)] opacity-80';

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className={mergeClasses('space-y-4', luxury.containerClassName)}>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--chat-text)] opacity-80">
            {luxury.label}
          </p>
          <span
            className={mergeClasses(
              'inline-flex items-center rounded-full px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide bg-[color:var(--chat-panel-bg)]',
              statusClassName
            )}
          >
            {statusLabel}
          </span>
        </div>
        <div className={mergeClasses('chat-card rounded-2xl p-3', luxury.contentClassName)}>
          <div className="chat-gradient rounded-xl p-[1px]">
            <div className="rounded-xl bg-[color:var(--chat-panel-glass)]">
              <LuxuryChatbot />
            </div>
          </div>
        </div>
      </div>
      <div className={mergeClasses('space-y-4', dock.containerClassName)}>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--chat-text)] opacity-80">
            {dock.label}
          </p>
          <span
            className={mergeClasses(
              'inline-flex items-center rounded-full px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide bg-[color:var(--chat-panel-bg)]',
              statusClassName
            )}
          >
            {statusLabel}
          </span>
        </div>
        <div className={mergeClasses('chat-card rounded-2xl p-3', dock.contentClassName)}>
          <div className="chat-gradient rounded-xl p-[1px]">
            <div className="rounded-xl bg-[color:var(--chat-panel-glass)]">
              <Dock />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
