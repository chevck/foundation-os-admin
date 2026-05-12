/**
 * Generic build-time app tier (Create React App inlines `REACT_APP_*`).
 * `isStaging()` selects `REACT_APP_FIREBASE_DEV_*` vs `_PROD_*` keys in `src/firebase/app.js`.
 */

/** @returns {'staging' | 'production'} */
export function getAppEnvironment() {
  const raw = (
    typeof process !== 'undefined' ? process.env.REACT_APP_APP_ENV || '' : ''
  )
    .trim()
    .toLowerCase();

  if (raw === 'staging' || raw === 'development') {
    return 'staging';
  }
  if (raw === 'production') {
    return 'production';
  }

  return typeof process !== 'undefined' && process.env.NODE_ENV === 'production'
    ? 'production'
    : 'staging';
}

export function isStaging() {
  return getAppEnvironment() === 'staging';
}

export function envPick(stagingBranch, productionBranch) {
  return getAppEnvironment() === 'staging' ? stagingBranch : productionBranch;
}
