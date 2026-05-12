import React from 'react';
import { Outlet } from 'react-router-dom';
import { FirebaseDataToggle } from '../components/FirebaseDataToggle';
import { Sidebar } from '../components/Sidebar';

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100/80">
      <Sidebar />
      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
        <header className="sticky top-0 z-20 flex shrink-0 items-center justify-end border-b border-slate-200/90 bg-white/85 px-4 py-2 shadow-sm backdrop-blur-md">
          <FirebaseDataToggle variant="compact" />
        </header>
        <Outlet />
      </main>
    </div>
  );
}
