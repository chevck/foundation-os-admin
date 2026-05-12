import React from 'react';
import { Banner } from './Banner';
import { MyTasks } from './MyTasks';
import { RecentActivity } from './RecentActivity';
import { StatsRow } from './StatsRow';
import { useDashboardData } from '../context/DashboardDataProvider';

export function Dashboard() {
  const { firestoreError, loading } = useDashboardData();

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          {loading ? <p className="text-sm text-slate-500">Syncing dashboard…</p> : null}
          {firestoreError ? (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-900">
              Live data paused: {firestoreError}. Showing cached or sample data until rules and
              collections are configured.
            </p>
          ) : null}
          <Banner />
          <StatsRow />
          <RecentActivity />
          <MyTasks />
        </div>
      </div>
    </div>
  );
}
