import dynamic from 'next/dynamic';
import EnvBadge from './env-badge';
import '@/styles/preview/chat-tokens.css';
import '@/styles/ai/chat-preview.css';

export default function ChatPreviewPage() {
  const isApiConfigured = Boolean(process.env.NEXT_PUBLIC_CHAT_API);
  const ChatPreviewClient = dynamic(() => import('./ChatPreviewClient'));

  return (
    <div className="chat-preview-theme chat-preview-stage">
      <div className="chat-preview-card">
        <div className="chat-preview-layout">
          <div className="chat-preview-header">
            <div className="space-y-1">
              <h1 className="text-xl font-semibold text-[color:var(--chat-text)]">Chat Preview</h1>
              <p className="text-sm text-[color:var(--chat-text)] opacity-80">
                Preview chat experiences without affecting the main layout.
              </p>
            </div>
            <EnvBadge />
          </div>

          {!isApiConfigured && (
            <div className="chat-preview-badge">API: Offline (preview mode)</div>
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
      </div>
    </div>
  );
}
