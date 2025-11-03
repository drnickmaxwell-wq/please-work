import dynamic from 'next/dynamic';
import EnvBadge from './env-badge';
import '@/styles/preview/chat-tokens.css';

export default function ChatPreviewPage() {
  const isApiConfigured = Boolean(process.env.NEXT_PUBLIC_CHAT_API);
  const ChatPreviewClient = dynamic(() => import('./ChatPreviewClient'));

  return (
    <div className="chat-preview-theme mx-auto max-w-6xl p-4 md:p-8 grid gap-6 md:grid-cols-2">
      <div className="md:col-span-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-[color:var(--chat-text)]">Chat Preview</h1>
          <p className="text-sm text-[color:var(--chat-text)] opacity-80">
            Preview chat experiences without affecting the main layout.
          </p>
        </div>
        <EnvBadge />
      </div>

      {!isApiConfigured && (
        <div className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--chat-ring)] px-3 py-1 text-xs font-medium text-[color:var(--chat-text)] opacity-80 bg-[color:var(--chat-panel-bg)]">
          Offline—set NEXT_PUBLIC_CHAT_API to enable live replies.
        </div>
      )}

      <div className="md:col-span-2">
        <ChatPreviewClient
          luxury={{
            label: 'Luxury Concierge (fullscreen modal)',
            containerClassName: 'md:pr-4',
            contentClassName: 'min-h-[28rem]'
          }}
          dock={{
            label: 'Dock Chat (inline)',
            containerClassName: 'md:pl-4',
            contentClassName: 'min-h-[28rem]'
          }}
        />
      </div>
    </div>
  );
}
