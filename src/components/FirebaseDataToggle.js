import React from 'react';
import { useFirebaseData } from '../context/FirebaseDataModeProvider';

/** @typedef {'default' | 'compact'} FirebaseDataToggleVariant */

/**
 * Switch Firestore project tier (development vs production).
 * Reads/writes shared app state via `FirebaseDataModeProvider` — identical UI in the sidebar or here updates all listeners.
 *
 * @param {{ className?: string, variant?: FirebaseDataToggleVariant }} props
 */
export function FirebaseDataToggle({ className = '', variant = 'default' }) {
  const { dataMode, setDataMode, hasDevDb, hasProdDb } = useFirebaseData();

  const segmented = (
    <div
      className={`inline-flex rounded-full border border-slate-200 bg-white p-0.5 font-semibold shadow-sm ${
        variant === 'compact' ? 'text-[11px]' : 'w-full text-xs'
      }`.trim()}
      role="group"
      aria-label="Firestore data tier"
    >
      <button
        type="button"
        disabled={!hasDevDb}
        aria-pressed={dataMode === 'development'}
        onClick={() => setDataMode('development')}
        className={`rounded-full transition ${
          variant === 'compact' ? 'px-2.5 py-1' : 'flex-1 px-3 py-1.5'
        } ${
          dataMode === 'development'
            ? 'bg-brand-600 text-white shadow-sm'
            : 'text-slate-600 hover:bg-slate-50 disabled:opacity-40'
        }`}
      >
        {variant === 'compact' ? 'Dev' : 'Development'}
      </button>
      <button
        type="button"
        disabled={!hasProdDb}
        aria-pressed={dataMode === 'production'}
        onClick={() => setDataMode('production')}
        className={`rounded-full transition ${
          variant === 'compact' ? 'px-2.5 py-1' : 'flex-1 px-3 py-1.5'
        } ${
          dataMode === 'production'
            ? 'bg-brand-600 text-white shadow-sm'
            : 'text-slate-600 hover:bg-slate-50 disabled:opacity-40'
        }`}
      >
        {variant === 'compact' ? 'Prod' : 'Production'}
      </button>
    </div>
  );

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`.trim()}>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Firestore
        </span>
        {segmented}
        {!hasDevDb || !hasProdDb ? (
          <span
            className="max-w-[200px] truncate text-[10px] text-amber-700"
            title={
              !hasDevDb && !hasProdDb
                ? 'Define both FIREBASE DEV and PROD env keys.'
                : !hasProdDb
                  ? 'Production keys incomplete.'
                  : 'Development keys incomplete.'
            }
          >
            {!hasDevDb && !hasProdDb
              ? 'Configure both tiers'
              : !hasProdDb
                ? 'Prod unavailable'
                : 'Dev unavailable'}
          </span>
        ) : (
          <span className="hidden text-[10px] text-slate-500 sm:inline" title="Persisted in this browser only">
            {dataMode === 'production' ? 'Production data' : 'Development data'}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`.trim()}>
      <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        Firestore data
      </p>
      {segmented}
      {!hasDevDb || !hasProdDb ? (
        <p className="px-3 text-[10px] leading-snug text-amber-700">
          {!hasDevDb && !hasProdDb
            ? 'Define both FIREBASE DEV and PROD env keys to enable switching.'
            : !hasProdDb
              ? 'Production Firebase keys incomplete — Prod toggle disabled.'
              : 'Development Firebase keys incomplete — Dev toggle disabled.'}
        </p>
      ) : (
        <p className="px-3 text-[10px] text-slate-500">
          Saves to this browser. All pages use this Firestore project until you change it.
        </p>
      )}
    </div>
  );
}
