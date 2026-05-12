import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useFirebaseAuth } from '../context/FirebaseAuthProvider';
import { useFirebaseData } from '../context/FirebaseDataModeProvider';
import { AppLogoMark } from '../components/AppLogoMark';
import { FirebaseDataToggle } from '../components/FirebaseDataToggle';

export function LoginPage() {
  const { auth } = useFirebaseData();
  const { user, authLoading, signIn } = useFirebaseAuth();
  const location = useLocation();
  const fromRaw = typeof location.state?.from === 'string' ? location.state.from : '/';
  const safeFrom =
    fromRaw.startsWith('/') && !fromRaw.startsWith('/login') ? fromRaw : '/';

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  if (process.env.NODE_ENV !== 'test' && authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-300 border-t-brand-600" />
      </div>
    );
  }

  if (!authLoading && user) {
    return <Navigate to={safeFrom} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const result = await signIn(email, password);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-slate-100">
      <header className="flex items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Admin sign-in
        </span>
        <FirebaseDataToggle variant="compact" />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-[400px] rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-slate-200/90">
              <AppLogoMark className="h-11 w-11" size={44} />
            </div>
            <h1 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
              Foundation OS
            </h1>
            <p className="mt-2 text-sm text-slate-600">Sign in with your administrator account.</p>
          </div>

          {!auth ? (
            <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900">
              Firebase is not configured for the selected tier. Add your{' '}
              <code className="rounded bg-amber-100 px-1 text-xs">
                REACT_APP_FIREBASE_DEV_*
              </code>{' '}
              or{' '}
              <code className="rounded bg-amber-100 px-1 text-xs">
                REACT_APP_FIREBASE_PROD_*
              </code>{' '}
              keys, enable Email/Password in the Firebase console, then restart.
            </p>
          ) : (
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </span>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
                  placeholder="admin@foundation.org"
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Password
                </span>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
                />
              </label>

              {error ? (
                <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-800">{error}</p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60"
              >
                {submitting ? 'Signing in…' : 'Sign in'}
              </button>

              <p className="text-center text-[11px] text-slate-500">
                After sign-in you’ll be redirected{safeFrom !== '/' ? ` back` : ''}.
              </p>
            </form>
          )}
        </div>

        <p className="mt-8 max-w-md text-center text-xs text-slate-500">
          Use the{' '}
          <span className="font-semibold text-slate-700">Firestore</span> switch above if you sign in against
          development or production Firebase.
        </p>
      </div>
    </div>
  );
}
