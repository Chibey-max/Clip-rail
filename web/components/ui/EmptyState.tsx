export function EmptyState({ title, action, icon = "◎" }: { title: string; action?: React.ReactNode; icon?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-line px-6 py-10 text-center">
      <span aria-hidden className="text-2xl text-muted">{icon}</span>
      <p className="max-w-sm text-sm text-muted">{title}</p>
      {action}
    </div>
  );
}
