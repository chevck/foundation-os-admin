import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const APP_IDS = /** @type {const} */ ({
  development: '[foundation-os-dev]',
  production: '[foundation-os-prod]',
});

const PREFIX_BY_MODE = /** @type {const} */ ({
  development: 'REACT_APP_FIREBASE_DEV_',
  production: 'REACT_APP_FIREBASE_PROD_',
});

/** Maps FirebaseOptions keys → env suffix after prefix. */
const REQUIRED_FIREBASE_ENV = /** @type {const} */ ([
  ['apiKey', 'API_KEY'],
  ['authDomain', 'AUTH_DOMAIN'],
  ['projectId', 'PROJECT_ID'],
  ['storageBucket', 'STORAGE_BUCKET'],
  ['messagingSenderId', 'MESSAGING_SENDER_ID'],
  ['appId', 'APP_ID'],
]);

/** @param {string} prefix e.g. `REACT_APP_FIREBASE_DEV_` */
function readFirebaseEnv(prefix, suffix) {
  return process.env[`${prefix}${suffix}`];
}

/** @param {string} prefix */
function buildFirebaseConfig(prefix) {
  /** @type {import('firebase/app').FirebaseOptions} */
  const config = Object.fromEntries(
    REQUIRED_FIREBASE_ENV.map(([key, suffix]) => [key, readFirebaseEnv(prefix, suffix)]),
  );

  let measurementId;
  if (prefix === PREFIX_BY_MODE.development) {
    measurementId =
      process.env.REACT_APP_FIREBASE_DEV_MEASUREMENT_ID ||
      process.env.REACT_APP_FIREBASE_DEV_MESUREMENT_ID;
  } else {
    measurementId =
      process.env.REACT_APP_FIREBASE_PROD_MEASUREMENT_ID ||
      process.env.REACT_APP_FIREBASE_PROD_MESUREMENT_ID;
  }
  if (measurementId) {
    config.measurementId = measurementId;
  }
  return config;
}

function hasMinimalFirebaseConfig(cfg) {
  return Boolean(
    cfg.apiKey &&
      cfg.authDomain &&
      cfg.projectId &&
      cfg.storageBucket &&
      cfg.messagingSenderId &&
      cfg.appId,
  );
}

/**
 * Initialize one Firebase app + services for DEV or PROD env prefix.
 * @param {'development' | 'production'} mode
 */
function initFirebaseTier(mode) {
  const prefix = PREFIX_BY_MODE[mode];
  const config = buildFirebaseConfig(prefix);
  /** @typedef {{ app: ReturnType<typeof initializeApp>|null, db: ReturnType<typeof getFirestore>|null, auth: ReturnType<typeof getAuth>|null, storage: ReturnType<typeof getStorage>|null, analytics: ReturnType<typeof getAnalytics>|null, measurementId: string|undefined, initError: string|null }} TierSlice */
  /** @type {TierSlice} */
  const slice = {
    app: null,
    db: null,
    auth: null,
    storage: null,
    analytics: null,
    measurementId: config.measurementId,
    initError: null,
  };

  // Avoid real Firestore gRPC / open handles in Jest (tests render UI only).
  if (process.env.NODE_ENV === 'test') {
    slice.initError = 'not_configured';
    return slice;
  }

  if (!hasMinimalFirebaseConfig(config)) {
    slice.initError = 'not_configured';
    return slice;
  }

  try {
    const name = APP_IDS[mode];
    const apps = getApps();
    slice.app =
      apps.find((a) => a.name === name) ??
      initializeApp(config, name);
    slice.db = getFirestore(slice.app);
    slice.auth = getAuth(slice.app);
    slice.storage = getStorage(slice.app);

    if (
      typeof window !== 'undefined' &&
      config.measurementId &&
      mode === 'development'
    ) {
      try {
        slice.analytics = getAnalytics(slice.app);
      } catch {
        slice.analytics = null;
      }
    }
    slice.initError = null;
  } catch (e) {
    slice.initError = e?.message ? String(e.message) : 'init_failed';
    slice.app = null;
    slice.db = null;
    slice.auth = null;
    slice.storage = null;
  }

  return slice;
}

export const FIREBASE_INSTANCES = {
  development: Object.freeze(initFirebaseTier('development')),
  production: Object.freeze(initFirebaseTier('production')),
};

/** @param {'development' | 'production'} mode */
export function getFirestoreDbForMode(mode) {
  return FIREBASE_INSTANCES[mode]?.db ?? null;
}
