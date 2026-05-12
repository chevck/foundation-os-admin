/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  safelist: [
    'bg-brand-600',
    'bg-slate-600',
    'bg-rose-500',
    'bg-amber-700',
    'bg-emerald-600',
    'bg-violet-600',
    'bg-teal-600',
    'bg-orange-600',
    'bg-cyan-600',
    'bg-fuchsia-600',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        navy: {
          banner: '#0f2744',
          deep: '#0a1929',
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
};
