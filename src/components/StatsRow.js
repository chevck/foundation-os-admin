import React from 'react';
import { ClipboardList, HeartHandshake, TicketPercent } from 'lucide-react';
import { useDashboardData } from '../context/DashboardDataProvider';

const iconMap = {
  clipboardList: ClipboardList,
  heartHandshake: HeartHandshake,
  ticketPercent: TicketPercent,
};

export function StatsRow() {
  const { stats, statsLoading } = useDashboardData();

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((s) => {
        const Icon = iconMap[s.icon] || HeartHandshake;
        return (
          <article
            key={s.id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] font-medium text-slate-500">{s.label}</p>
                <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">
                  {statsLoading ? '—' : s.value}
                </p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
            </div>
            {s.hint ? (
              <p className="text-xs font-semibold text-emerald-600">{s.hint}</p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
