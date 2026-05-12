/** @param {unknown} ts */
export function formatFirestoreDateTime(ts) {
  if (ts == null || ts === '') return '—';
  if (typeof ts === 'object' && ts !== null && typeof ts.toDate === 'function') {
    try {
      return ts.toDate().toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      return '—';
    }
  }
  if (typeof ts === 'object' && ts !== null && typeof ts.seconds === 'number') {
    return new Date(ts.seconds * 1000).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }
  if (typeof ts === 'number') {
    const d = new Date(ts > 1e12 ? ts : ts * 1000);
    return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  }
  const d = new Date(String(ts));
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}
