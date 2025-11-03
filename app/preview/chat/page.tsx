import dynamic from 'next/dynamic';
import EnvBadge from './env-badge';

export default function ChatPreviewPage() {
  const isApiConfigured = Boolean(process.env.NEXT_PUBLIC_CHAT_API);
  const ChatPreviewClient = dynamic(() => import('./ChatPreviewClient'));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-slate-900">Chat Preview</h1>
          <p className="text-sm text-slate-500">
            Preview chat experiences without affecting the main layout.
          </p>
        </div>
        <EnvBadge />
      </div>

      {!isApiConfigured && (
        <div className="mb-6 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
          Offline—set NEXT_PUBLIC_CHAT_API to enable live replies.
        </div>
      )}

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
  );
}
