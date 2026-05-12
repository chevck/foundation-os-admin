import React from 'react';

export function PageHeader({ title, description }) {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
      {description ? (
        <p className="mt-1 max-w-2xl text-sm text-slate-600">{description}</p>
      ) : null}
    </header>
  );
}
