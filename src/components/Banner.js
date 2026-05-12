import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  Calendar,
  ClipboardList,
  ListTodo,
  Mail,
  Pencil,
  Search,
  Send,
  UserPlus,
  Users,
} from 'lucide-react';
import { useDashboardData } from '../context/DashboardDataProvider';
import { getAppEnvironment } from '../config/appEnv';
import { useFirebaseData } from '../context/FirebaseDataModeProvider';

function formatDate(d) {
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}

function formatTime(d) {
  return d.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
}

const quickActions = [
  { label: 'Add Candidate', Icon: UserPlus },
  { label: 'Add Contact', Icon: Users },
  { label: 'Add Job', Icon: Briefcase },
  { label: 'Float Candidate', Icon: Send },
  { label: 'Send Email', Icon: Mail },
  { label: 'Log Activity', Icon: ClipboardList },
  { label: 'Create Task', Icon: ListTodo },
];

export function Banner() {
  const { homepage } = useDashboardData();
  const appEnvironment = getAppEnvironment();
  const { initError, dataMode } = useFirebaseData();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2744] via-[#0f2744] to-[#153a5c] px-6 pb-7 pt-5 text-white shadow-xl shadow-slate-900/15">
      <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="relative flex flex-wrap items-center gap-3 border-b border-white/10 pb-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/15 ring-2 ring-white/20">
          <span className="text-sm font-bold">
            {homepage.displayName?.charAt(0) || 'S'}
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold">
          <Calendar className="h-3.5 w-3.5 opacity-90" />
          {formatDate(now)}
        </div>

        <div className="order-last flex w-full flex-1 basis-full items-center gap-2 sm:order-none sm:basis-[320px] md:min-w-[320px]">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              readOnly
              placeholder="Search for Candidates, Contacts, Companies or Jobs"
              className="w-full rounded-full border border-white/10 bg-white py-2 pl-9 pr-4 text-[13px] text-slate-800 shadow-inner shadow-slate-900/5 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400/60"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold sm:block">
            {formatTime(now)}
          </div>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white/20"
            aria-label="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Welcome, {homepage.displayName}. {homepage.greetingLine}
          </h1>
          <p className="mt-2 text-sm text-white/75 sm:text-base">{homepage.subGreeting}</p>

          <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/90 sm:text-sm">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
            <span className="truncate">{homepage.reminder}</span>
          </div>

          {initError && (
            <p className="mt-3 text-xs text-amber-200/90">
              Firestore not available for the{' '}
              <span className="capitalize">{dataMode}</span> data tier (build:{' '}
              <span className="capitalize">{appEnvironment}</span>). Configure{' '}
              <code className="rounded bg-white/10 px-1">REACT_APP_FIREBASE_DEV_*</code> and{' '}
              <code className="rounded bg-white/10 px-1">REACT_APP_FIREBASE_PROD_*</code>, then use the sidebar toggle.
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-end gap-4 lg:max-w-[520px]">
          {quickActions.map(({ label, Icon }) => (
            <button
              key={label}
              type="button"
              className="group flex w-[72px] flex-col items-center gap-1.5 text-center"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 transition group-hover:bg-white/20">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="text-[10px] font-medium leading-tight text-white/80">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
