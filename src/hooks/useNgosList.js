import { useEffect, useState } from 'react';
import { collection, limit, onSnapshot, query } from 'firebase/firestore';
import { formatFirestoreDateTime } from '../utils/firestoreDates';
import { useFirebaseData } from '../context/FirebaseDataModeProvider';

/** @param {Record<string, unknown>} d */
export function NGO_PLAN(d) {
  const p =
    d.plan ??
    d.subscriptionPlan ??
    d.tier ??
    d.foundationPlan ??
    d.billingPlan ??
    '';
  return String(p).trim() || '—';
}

/** @param {Record<string, unknown>} d */
export function NGO_LAST_SIGN_IN_DISPLAY(d) {
  const v =
    d.lastSignIn ??
    d.lastSignInAt ??
    d.lastLoginAt ??
    d.lastLogin ??
    d.lastSeenAt;
  return formatFirestoreDateTime(v);
}

/** @param {Record<string, unknown>} d */
export function NGO_DISPLAY_NAME(d) {
  const n =
    d.name ?? d.title ?? d.organizationName ?? d.ngoName ?? d.displayName ?? '';
  return String(n).trim() || 'Untitled NGO';
}

/** @param {Record<string, unknown>} d */
export function NGO_STATUS(d) {
  const s = d.status ?? d.state ?? '';
  return String(s).trim() || '—';
}

/** @param {Record<string, unknown>} d */
export function NGO_EMAIL(d) {
  const e = d.email ?? d.contactEmail ?? '';
  return String(e).trim() || '—';
}

/** @param {Record<string, unknown>} d */
export function NGO_WEBSITE(d) {
  const w = d.website ?? d.url ?? d.webUrl ?? '';
  return String(w).trim();
}

export function useNgosList() {
  const { db } = useFirebaseData();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!db) {
      setItems([]);
      setLoading(false);
      setError(null);
      return undefined;
    }

    setLoading(true);
    const q = query(collection(db, 'ngos'), limit(500));

    return onSnapshot(
      q,
      (snap) => {
        const rows = [];
        snap.forEach((docSnap) => {
          rows.push({ id: docSnap.id, ...docSnap.data() });
        });
        rows.sort((a, b) =>
          NGO_DISPLAY_NAME(a).localeCompare(NGO_DISPLAY_NAME(b), undefined, {
            sensitivity: 'base',
          }),
        );
        setItems(rows);
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setItems([]);
        setLoading(false);
      },
    );
  }, [db]);

  return { items, loading, error };
}
