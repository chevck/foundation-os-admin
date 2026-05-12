import React from 'react';
import { Briefcase, ChevronRight, MoreVertical, Phone, Users } from 'lucide-react';
import { useDashboardData } from '../context/DashboardDataProvider';

function ColumnHeader({ title, Icon }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>
      <button
        type="button"
        className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        aria-label={`Open ${title}`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

function statusStyles(tone) {
  if (tone === 'amber') {
    return 'bg-amber-50 text-amber-800 ring-amber-100';
  }
  return 'bg-sky-50 text-sky-800 ring-sky-100';
}

export function RecentActivity() {
  const { jobs, candidates, contacts } = useDashboardData();

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold tracking-tight text-slate-900">
        Recent activity
      </h2>
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Jobs */}
        <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-4">
          <ColumnHeader title="Jobs" Icon={Briefcase} />
          <div className="space-y-3">
            {jobs.slice(0, 4).map((j) => (
              <div
                key={j.id}
                className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white p-3 shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-500">
                  {j.logoUrl ? (
                    <img
                      src={j.logoUrl}
                      alt=""
                      className="h-full w-full rounded-xl object-cover"
                    />
                  ) : (
                    (j.company?.slice(0, 2) || 'Co').toUpperCase()
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-900">{j.title}</p>
                  <p className="truncate text-[13px] text-slate-500">{j.company}</p>
                  {j.status ? (
                    <span
                      className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${statusStyles(j.statusTone)}`}
                    >
                      {j.status}
                    </span>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-lg p-1 text-slate-400 hover:bg-slate-50"
                  aria-label="More"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Candidates */}
        <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-4">
          <ColumnHeader title="Candidates" Icon={Users} />
          <div className="space-y-3">
            {candidates.slice(0, 4).map((c) => (
              <div
                key={c.id}
                className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white p-3 shadow-sm"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${c.initialsBg?.startsWith('bg-') ? c.initialsBg : 'bg-brand-600'}`}
                >
                  {c.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-900">{c.name}</p>
                  <p className="truncate text-[13px] text-slate-500">{c.role}</p>
                  {c.badge ? (
                    <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-100">
                      {c.badge}
                    </span>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-lg p-1 text-slate-400 hover:bg-slate-50"
                  aria-label="More"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Contacts */}
        <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-4">
          <ColumnHeader title="Contacts" Icon={Phone} />
          <div className="space-y-3">
            {contacts.slice(0, 4).map((o) => (
              <div
                key={o.id}
                className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white p-3 shadow-sm"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${o.initialsBg?.startsWith('bg-') ? o.initialsBg : 'bg-slate-600'}`}
                >
                  {o.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-900">{o.name}</p>
                  <p className="truncate text-[13px] text-slate-500">{o.company}</p>
                  <span className="mt-2 inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 ring-1 ring-inset ring-slate-200/80">
                    {o.openJobsLabel}
                  </span>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-lg p-1 text-slate-400 hover:bg-slate-50"
                  aria-label="More"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
