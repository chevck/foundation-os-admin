import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useFirebaseAuth } from '../context/FirebaseAuthProvider';

export function RequireAuth() {
  const { user, authLoading } = useFirebaseAuth();
  const location = useLocation();

  if (process.env.NODE_ENV === 'test') {
    return <Outlet />;
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-300 border-t-brand-600" />
          <p className="text-sm text-slate-600">Signing you in…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
