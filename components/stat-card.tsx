import { ReactNode } from 'react';

export function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
          {subtitle ? <p className="mt-2 text-xs text-zinc-400">{subtitle}</p> : null}
        </div>
        {icon ? <div className="text-zinc-400">{icon}</div> : null}
      </div>
    </div>
  );
}