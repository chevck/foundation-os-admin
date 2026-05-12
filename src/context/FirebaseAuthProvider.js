import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { useFirebaseData } from './FirebaseDataModeProvider';

/** @param {unknown} err */
function formatAuthError(err) {
  const code =
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    typeof /** @type {{ code?: string }} */ (err).code === 'string'
      ? /** @type {{ code: string }} */ (err).code
      : '';
  switch (code) {
    case 'auth/invalid-email':
      return 'That email address is not valid.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again shortly.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection.';
    default:
      if (
        typeof err === 'object' &&
        err !== null &&
        'message' in err &&
        typeof /** @type {{ message?: unknown }} */ (err).message === 'string'
      ) {
        return /** @type {{ message: string }} */ (err).message;
      }
      return 'Sign-in failed. Try again.';
  }
}

const FirebaseAuthContext = createContext(null);

export function FirebaseAuthProvider({ children }) {
  const { auth } = useFirebaseData();
  const [user, setUser] = useState(/** @type {import('firebase/auth').User|null} */ (null));
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setUser(null);
      setAuthLoading(false);
      return undefined;
    }
    setAuthLoading(true);
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
  }, [auth]);

  const signIn = useCallback(async (email, password) => {
    if (!auth) {
      return { ok: false, error: 'Authentication is not available. Check Firebase env keys.' };
    }
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      return { ok: true, error: '' };
    } catch (err) {
      return { ok: false, error: formatAuthError(err) };
    }
  }, [auth]);

  const signOutUser = useCallback(async () => {
    if (!auth) return;
    await firebaseSignOut(auth);
  }, [auth]);

  const value = useMemo(
    () => ({
      user,
      authLoading,
      signIn,
      signOutUser,
    }),
    [user, authLoading, signIn, signOutUser],
  );

  return (
    <FirebaseAuthContext.Provider value={value}>{children}</FirebaseAuthContext.Provider>
  );
}

export function useFirebaseAuth() {
  const ctx = useContext(FirebaseAuthContext);
  if (!ctx) {
    throw new Error('useFirebaseAuth must be used within FirebaseAuthProvider');
  }
  return ctx;
}
