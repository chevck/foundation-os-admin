/**
 * Non-Firebase public config (inlined `REACT_APP_*`).
 * Firebase: `src/firebase/app.js` reads `REACT_APP_FIREBASE_DEV_*` vs `REACT_APP_FIREBASE_PROD_*` via `REACT_APP_APP_ENV` / `appEnv.js`.
 */
import { getAppEnvironment } from './appEnv';

function trimVal(v) {
  if (v == null) return '';
  return String(v).trim();
}

export function readPublicEnv() {
  const env = typeof process !== 'undefined' ? process.env : {};
  return {
    cloudinaryCloudName: trimVal(env.REACT_APP_CLOUDINARY_CLOUD_NAME),
    cloudinaryUnsignedUploadPreset: trimVal(
      env.REACT_APP_CLOUDINARY_UNSIGNED_UPLOAD_PRESET ||
        env.REACT_APP_UNSIGNED_UPLOAD_PRESET,
    ),
    paystackPublicKey: trimVal(env.REACT_APP_PAYSTACK_PUBLIC_KEY),
    apiBaseUrl: trimVal(env.REACT_APP_API_BASE_URL).replace(/\/$/, ''),
  };
}

/** Singleton for modules that prefer a stable object reference. */
export const PUBLIC_ENV = readPublicEnv();

/** Builds an absolute backend URL (`REACT_APP_API_BASE_URL`). */
export function resolveApiUrl(path = '/') {
  const base = PUBLIC_ENV.apiBaseUrl;
  if (!base) return '';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

/**
 * Optional: inspect config in dev (`window.__FOUNDATION_ADMIN_ENV__`).
 * Call once from `App`.
 */
export function attachPublicEnvForDevtools() {
  if (process.env.NODE_ENV !== 'development') return;
  if (typeof window === 'undefined') return;
  window.__FOUNDATION_ADMIN_ENV__ = { ...PUBLIC_ENV, appEnvironment: getAppEnvironment() };
}
