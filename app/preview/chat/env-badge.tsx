export default function EnvBadge() {
  const connected = Boolean(process.env.NEXT_PUBLIC_CHAT_API);

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
        connected
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-slate-200 bg-slate-100 text-slate-600'
      }`}
    >
      {`API: ${connected ? 'Connected' : 'Offline (preview mode)'}`}
    </span>
  );
}
