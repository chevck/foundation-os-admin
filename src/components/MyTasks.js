import React, { useState } from 'react';
import { LayoutGrid, List, Maximize2, MoreVertical, Plus } from 'lucide-react';
import { useDashboardData } from '../context/DashboardDataProvider';

const columns = [
  { key: 'candidate', title: 'Candidate Tasks', dot: 'bg-brand-500' },
  { key: 'contact', title: 'Contact Tasks', dot: 'bg-teal-500' },
  { key: 'job', title: 'Job Tasks', dot: 'bg-emerald-500' },
  { key: 'general', title: 'General Tasks', dot: 'bg-violet-500' },
];

export function MyTasks() {
  const { tasksByCategory } = useDashboardData();
  const [layout, setLayout] = useState('list');

  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-card">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">My Tasks</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Expand
          </button>
          <div className="flex rounded-full border border-slate-200 p-0.5">
            <button
              type="button"
              onClick={() => setLayout('list')}
              className={`rounded-full p-1.5 ${layout === 'list' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setLayout('grid')}
              className={`rounded-full p-1.5 ${layout === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={
          layout === 'grid'
            ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-4'
            : 'grid gap-4 xl:grid-cols-4'
        }
      >
        {columns.map((col) => {
          const items = tasksByCategory[col.key] || [];
          return (
            <div key={col.key} className="flex min-h-[200px] flex-col rounded-2xl bg-slate-50/80 p-3">
              <div className="mb-3 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${col.dot}`} />
                <span className="flex-1 text-[13px] font-semibold text-slate-800">
                  {col.title}
                </span>
                <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200">
                  {items.length}
                </span>
                <button
                  type="button"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
                  aria-label="Add task"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-2">
                {items.map((t) => (
                  <div
                    key={t.id}
                    className="flex gap-2 rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-slate-900">{t.title}</p>
                      {t.detail ? (
                        <p className="mt-1 text-xs leading-relaxed text-slate-500">{t.detail}</p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      className="h-8 w-8 shrink-0 rounded-lg text-slate-400 hover:bg-slate-50"
                      aria-label="More"
                    >
                      <MoreVertical className="mx-auto h-4 w-4" />
                    </button>
                  </div>
                ))}
                {items.length === 0 ? (
                  <p className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-200 py-6 text-center text-xs text-slate-400">
                    No tasks yet
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
