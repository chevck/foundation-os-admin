import React from 'react';
import { PageHeader } from '../components/PageHeader';

export function WaitlistPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-10">
      <PageHeader
        title="Waitlist"
        description="People waiting for access · list and tooling can connect to Firestore when you define the schema."
      />
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-600 shadow-card">
        Placeholder route — replace with a subscribed list (e.g. collection{' '}
        <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs">
          waitlist_entries
        </code>
        ).
      </div>
    </div>
  );
}
