import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { useFirebaseData } from '../context/FirebaseDataModeProvider';
import {
  NGO_DISPLAY_NAME,
  NGO_EMAIL,
  NGO_LAST_SIGN_IN_DISPLAY,
  NGO_PLAN,
  NGO_STATUS,
  NGO_WEBSITE,
  useNgosList,
} from '../hooks/useNgosList';

function formatWebsiteHref(raw) {
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
}

export function NgosPage() {
  const { db, dataMode, initError } = useFirebaseData();
  const showFirebaseSetupWarning = !db;
  const { items, loading, error } = useNgosList();
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-10">
      <PageHeader
        title="NGOs"
        description={`Live list from Firestore · collection \`ngos\`. Data tier: ${dataMode}.`}
      />

      {showFirebaseSetupWarning ? (
        <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Firebase is not connected for this data tier ({dataMode}). Configure{' '}
          <code className="rounded bg-amber-100 px-1 font-mono text-xs">REACT_APP_FIREBASE_DEV_*</code> and{' '}
          <code className="rounded bg-amber-100 px-1 font-mono text-xs">REACT_APP_FIREBASE_PROD_*</code>, then use the sidebar Firestore toggle.
          {initError ? ` (${initError})` : null}
        </p>
      ) : null}

      {error ? (
        <p className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          Could not read NGOs: {error}. Check Firestore rules allow read access to{' '}
          <code className="rounded bg-rose-100 px-1">ngos</code>.
        </p>
      ) : null}

      {loading ? (
        <p className="text-sm text-slate-500">Loading NGOs…</p>
      ) : (
        <>
          {!items.length && !error ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center">
              <p className="font-medium text-slate-900">No NGOs yet</p>
              <p className="mt-2 text-sm text-slate-600">
                Add documents under the{' '}
                <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs">
                  ngos
                </code>{' '}
                collection in this Firebase project.
              </p>
            </div>
          ) : null}

          {items.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/90 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Plan</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Last sign-in</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Website</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((row) => {
                      const name = NGO_DISPLAY_NAME(row);
                      const site = NGO_WEBSITE(row);
                      const href = formatWebsiteHref(site);
                      return (
                        <tr key={row.id} className="text-slate-800 hover:bg-slate-50/80">
                          <td className="px-4 py-3 font-medium">{name}</td>
                          <td className="max-w-[140px] truncate px-4 py-3 text-slate-600">{NGO_PLAN(row)}</td>
                          <td className="max-w-[140px] truncate px-4 py-3 text-slate-600">{NGO_STATUS(row)}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-600">{NGO_LAST_SIGN_IN_DISPLAY(row)}</td>
                          <td className="max-w-[200px] truncate px-4 py-3 text-slate-600">{NGO_EMAIL(row)}</td>
                          <td className="max-w-[220px] px-4 py-3">
                            {site ? (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex max-w-full items-center gap-1 truncate text-brand-600 hover:underline"
                              >
                                <span className="truncate">{site}</span>
                                <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" />
                              </a>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
