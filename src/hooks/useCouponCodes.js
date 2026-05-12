import { useEffect, useState } from 'react';
import {
  collection,
  limit,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { useFirebaseData } from '../context/FirebaseDataModeProvider';

export const COUPON_CODES_COLLECTION = 'coupon_codes';

/** @param {Record<string, unknown>} x */
export function couponCreatedMillis(x) {
  const c = x.createdAt;
  if (c && typeof c.toMillis === 'function') return c.toMillis();
  if (c && typeof c.seconds === 'number') return c.seconds * 1000;
  if (typeof c === 'number') return c;
  return 0;
}

/** @typedef {{ id: string } & Record<string, unknown>} CouponDoc */

export function useCouponCodes() {
  const { db } = useFirebaseData();
  const [items, setItems] = useState(/** @type {CouponDoc[]} */ ([]));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(/** @type {string|null} */ (null));

  useEffect(() => {
    if (!db) {
      setItems([]);
      setLoading(false);
      setError(null);
      return undefined;
    }

    setLoading(true);
    const q = query(collection(db, COUPON_CODES_COLLECTION), limit(200));

    return onSnapshot(
      q,
      (snap) => {
        const rows = [];
        snap.forEach((d) => {
          rows.push({ id: d.id, ...d.data() });
        });
        rows.sort((a, b) => {
          const ma = couponCreatedMillis(a);
          const mb = couponCreatedMillis(b);
          return mb - ma;
        });
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
