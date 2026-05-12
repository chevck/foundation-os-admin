import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FIREBASE_INSTANCES } from '../firebase/app';

const STORAGE_KEY = 'foundation-os-firestore-data-mode';

const FirebaseDataModeContext = createContext(null);

export function FirebaseDataModeProvider({ children }) {
  const [dataMode, setDataModeState] = useState(() => {
    try {
      const s = window.localStorage.getItem(STORAGE_KEY);
      if (s === 'production' || s === 'development') return s;
    } catch (_) {
      /* ignore */
    }
    return 'development';
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, dataMode);
    } catch (_) {
      /* ignore */
    }
  }, [dataMode]);

  const setDataMode = (mode) => {
    if (mode !== 'production' && mode !== 'development') return;
    setDataModeState(mode);
  };

  const value = useMemo(() => {
    const devSlice = FIREBASE_INSTANCES.development;
    const prodSlice = FIREBASE_INSTANCES.production;

    const hasDevDb = Boolean(devSlice?.db);
    const hasProdDb = Boolean(prodSlice?.db);
    const currentSlice = dataMode === 'production' ? prodSlice : devSlice;
    const db = currentSlice?.db ?? null;

    const auth = currentSlice?.auth ?? null;

    return {
      dataMode,
      setDataMode,
      db,
      auth,
      hasDevDb,
      hasProdDb,
      hasDevAuth: Boolean(devSlice?.auth),
      hasProdAuth: Boolean(prodSlice?.auth),
      /** Error for the tier currently driving `db`. */
      initError: currentSlice.initError ?? (db ? null : 'not_configured'),
      devInitError: devSlice.initError,
      prodInitError: prodSlice.initError,
    };
  }, [dataMode]);

  return (
    <FirebaseDataModeContext.Provider value={value}>
      {children}
    </FirebaseDataModeContext.Provider>
  );
}

/**
 * Shared Firestore tier for the whole app (under {@link FirebaseDataModeProvider}).
 * Any component may call {@link useFirebaseData} and use `db`, `auth`, `dataMode`, or `setDataMode('development'|'production')`
 * to read or switch projects — listeners on `db` refresh automatically across all routes.
 */
export function useFirebaseData() {
  const ctx = useContext(FirebaseDataModeContext);
  if (!ctx) {
    throw new Error('useFirebaseData must be used within FirebaseDataModeProvider');
  }
  return ctx;
}
