import React from 'react';
import { doc, getDoc, serverTimestamp, setDoc, Timestamp } from 'firebase/firestore';
import { Plus, X } from 'lucide-react';
import { useFirebaseData } from '../context/FirebaseDataModeProvider';
import {
  COUPON_CODES_COLLECTION,
  couponCreatedMillis,
  useCouponCodes,
} from '../hooks/useCouponCodes';
import { formatFirestoreDateTime } from '../utils/firestoreDates';

/** @typedef {'percentage_off' | 'fixed_amount_off' | 'trial_extension_days'} CouponKind */

const FORM_COUPON_KIND_OPTIONS = /** @type {const} */ ([
  { value: 'percentage_off', label: 'Percentage discount' },
  { value: 'fixed_amount_off', label: 'Fixed amount off' },
]);

const SUBSCRIPTION_PLAN_SUGGESTIONS = ['Starter', 'Growth', 'Professional', 'Enterprise'];

/** @typedef {'open' | 'fixed_end' | 'days_after_creation'} ValidityKind */

function sanitizeCouponCode(raw) {
  return String(raw || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, '');
}

/** @param {Record<string, unknown>} c */
function resolveCouponKind(c) {
  const explicit = String(c.couponKind || '').toLowerCase();
  if (explicit === 'percentage_off' || explicit === 'fixed_amount_off' || explicit === 'trial_extension_days') {
    return /** @type {CouponKind} */ (explicit);
  }
  const dt = String(c.discountType || 'percent').toLowerCase();
  if (dt === 'trial_days') return 'trial_extension_days';
  if (dt === 'fixed') return 'fixed_amount_off';
  return 'percentage_off';
}

/** @param {Record<string, unknown>} c */
function couponBenefitLabel(c) {
  const kind = resolveCouponKind(c);
  const v = Number(c.value);
  const n = Number.isFinite(v) ? v : 0;
  const currency = String(c.currency || 'USD').toUpperCase();
  if (kind === 'trial_extension_days') return `${Math.round(n)} trial day${Math.round(n) === 1 ? '' : 's'}`;
  if (kind === 'fixed_amount_off') return `${currency} ${n.toFixed(2)} off`;
  return `${n}% off`;
}

/** @param {Record<string, unknown>} c */
function resolveValidityKind(c) {
  const k = String(c.validityKind || '').toLowerCase();
  if (k === 'fixed_end' || k === 'days_after_creation' || k === 'open') {
    return /** @type {ValidityKind} */ (k);
  }
  const rel = Number(c.validDaysFromCreation);
  if (Number.isFinite(rel) && rel > 0) return 'days_after_creation';
  if (c.expiresAt != null) return 'fixed_end';
  return 'open';
}

/** @param {Record<string, unknown>} c */
function validitySummary(c) {
  const kind = resolveValidityKind(c);
  const vf = formatFirestoreDateTime(c.validFrom);
  const start = vf && vf !== '—' ? `From ${vf}` : null;

  if (kind === 'days_after_creation') {
    const d = Number(c.validDaysFromCreation);
    const days = Number.isFinite(d) ? d : 0;
    const created = couponCreatedMillis(c);
    let endPhrase = `${days} day${days === 1 ? '' : 's'} after save`;
    if (created && days > 0) {
      const approx = new Date(created + days * 86400000);
      endPhrase += ` (~${approx.toLocaleDateString()})`;
    }
    return [start, endPhrase].filter(Boolean).join(' · ') || endPhrase;
  }

  const exp = formatFirestoreDateTime(c.expiresAt);
  if (kind === 'fixed_end' && exp && exp !== '—') return [start, `Until ${exp}`].filter(Boolean).join(' · ');
  return start || 'No calendar end';
}

/** @param {Record<string, unknown>} c */
function couponDisplayName(c) {
  const n = String(c.couponName ?? c.name ?? c.title ?? '').trim();
  return n || String(c.code || c.id || '—');
}

/** @param {Record<string, unknown>} c */
function couponDescriptionText(c) {
  return String(c.description ?? c.notes ?? '').trim();
}

/** @param {Record<string, unknown>} c */
function maxPeopleLabel(c) {
  const maxN = c.maxTotalRedemptions == null ? null : Number(c.maxTotalRedemptions);
  if (maxN != null && Number.isFinite(maxN) && maxN > 0) return String(Math.round(maxN));
  return 'Unlimited';
}

/** @param {Record<string, unknown>} c */
function benefitDurationLabel(c) {
  const d = Number(c.benefitDurationDays);
  if (Number.isFinite(d) && d > 0) return `${Math.round(d)} day${Math.round(d) === 1 ? '' : 's'}`;
  return 'Unlimited';
}

/** @param {Record<string, unknown>} c */
function subscriptionPlanLabel(c) {
  const p = String(c.subscriptionPlan ?? c.grantSubscriptionPlan ?? '').trim();
  return p || '—';
}

/** @param {Record<string, unknown>} c */
function couponTypeShortLabel(c) {
  const k = resolveCouponKind(c);
  if (k === 'fixed_amount_off') return 'Fixed amount';
  if (k === 'trial_extension_days') return 'Trial extension';
  return 'Percentage';
}

/** @param {Record<string, unknown>} c */
function couponExpiresDisplay(c) {
  const exp = formatFirestoreDateTime(c.expiresAt);
  if (exp && exp !== '—') return exp;
  const vk = resolveValidityKind(c);
  if (vk !== 'open') return validitySummary(c);
  return 'No expiry';
}

/** @param {CouponKind} kind */
function discountTypeForKind(kind) {
  if (kind === 'fixed_amount_off') return 'fixed';
  if (kind === 'trial_extension_days') return 'trial_days';
  return 'percent';
}

function defaultFormState() {
  return {
    code: '',
    couponName: '',
    description: '',
    couponKind: /** @type {'percentage_off' | 'fixed_amount_off'} */ ('percentage_off'),
    value: '10',
    currency: 'USD',
    expiresAt: '',
    maxPeople: '',
    benefitUnlimited: true,
    benefitDurationDays: '',
    subscriptionPlan: '',
    active: true,
  };
}

/**
 * @param {{ open: boolean, onClose: () => void, db: import('firebase/firestore').Firestore | null, onSaved: (code: string) => void }} props
 */
function CreateCouponModal({ open, onClose, db, onSaved }) {
  const [form, setForm] = React.useState(() => defaultFormState());
  const [saving, setSaving] = React.useState(false);
  const [formError, setFormError] = React.useState(/** @type {string|null} */ (null));
  const panelRef = React.useRef(/** @type {HTMLDivElement|null} */ (null));
  const firstFieldRef = React.useRef(/** @type {HTMLInputElement|null} */ (null));

  const set = (/** @type {Partial<typeof form>} */ patch) => setForm((f) => ({ ...f, ...patch }));

  React.useEffect(() => {
    if (open) {
      setForm(defaultFormState());
      setFormError(null);
      requestAnimationFrame(() => firstFieldRef.current?.focus());
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return undefined;
    function onKey(ev) {
      if (ev.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  React.useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);

    const clean = sanitizeCouponCode(form.code);
    if (!db) {
      setFormError('Firestore is not connected for this tier.');
      return;
    }
    if (!clean) {
      setFormError('Enter a coupon code (letters, numbers, dashes).');
      return;
    }

    const nameTrim = form.couponName.trim();
    if (!nameTrim) {
      setFormError('Enter a coupon name.');
      return;
    }

    const discountType = discountTypeForKind(form.couponKind);
    const numVal = Number(form.value);
    if (!Number.isFinite(numVal) || numVal < 0) {
      setFormError('Coupon amount must be a non‑negative number.');
      return;
    }
    if (form.couponKind === 'percentage_off' && numVal > 100) {
      setFormError('Percentage cannot exceed 100.');
      return;
    }

    let expiresAtTs = null;
    const expRaw = form.expiresAt.trim();
    if (expRaw) {
      const dt = new Date(expRaw);
      if (Number.isNaN(dt.getTime())) {
        setFormError('Invalid expiry date.');
        return;
      }
      expiresAtTs = Timestamp.fromDate(dt);
    }

    let maxPeople = null;
    if (String(form.maxPeople).trim() !== '') {
      const n = Number(form.maxPeople);
      if (!Number.isFinite(n) || n < 1 || !Number.isInteger(n)) {
        setFormError(
          '"How many people" must be a positive whole number or left blank for unlimited.',
        );
        return;
      }
      maxPeople = n;
    }

    let benefitDurationDays = null;
    if (!form.benefitUnlimited) {
      const bd = Number(form.benefitDurationDays);
      if (!Number.isFinite(bd) || bd < 1 || !Number.isInteger(bd)) {
        setFormError('Benefit duration must be a positive whole number of days, or choose unlimited.');
        return;
      }
      benefitDurationDays = bd;
    }

    const desc = form.description.trim() || null;
    const plan = form.subscriptionPlan.trim() || null;
    const cur = form.currency.trim().toUpperCase() || 'USD';

    setSaving(true);
    try {
      const ref = doc(db, COUPON_CODES_COLLECTION, clean);
      const exists = (await getDoc(ref)).exists();
      /** @type {Record<string, unknown>} */
      const payload = {
        code: clean,
        couponName: nameTrim,
        title: nameTrim,
        description: desc,
        couponKind: form.couponKind,
        discountType,
        value: numVal,
        currency: form.couponKind === 'fixed_amount_off' ? cur : null,
        validityKind: expiresAtTs ? /** @type {ValidityKind} */ ('fixed_end') : /** @type {ValidityKind} */ ('open'),
        validFrom: null,
        expiresAt: expiresAtTs,
        validDaysFromCreation: null,
        maxTotalRedemptions: maxPeople,
        maxRedemptionsPerUser: null,
        minQualifyingAmount: null,
        benefitDurationDays,
        subscriptionPlan: plan,
        notes: null,
        active: form.active,
        updatedAt: serverTimestamp(),
      };
      if (!exists) {
        payload.createdAt = serverTimestamp();
      }

      await setDoc(ref, payload, { merge: true });
      onSaved(clean);
      onClose();
    } catch (err) {
      setFormError(err?.message ? String(err.message) : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-coupon-title"
        className="relative mb-0 flex max-h-[min(92vh,880px)] w-full max-w-2xl flex-col rounded-t-2xl bg-white shadow-2xl ring-1 ring-slate-200/80 sm:mb-0 sm:rounded-2xl"
        onMouseDown={(ev) => ev.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            <h2 id="create-coupon-title" className="text-lg font-semibold text-slate-900">
              New coupon
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Code is the document id (uppercase). Your app should enforce redemption using the saved limits, dates, plan, and duration.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-4">
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Code</span>
              <input
                ref={firstFieldRef}
                value={form.code}
                onChange={(ev) => set({ code: ev.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm uppercase outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
                placeholder="SUMMER2026"
              />
            </label>

            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Coupon name
              </span>
              <input
                value={form.couponName}
                onChange={(ev) => set({ couponName: ev.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
                placeholder="e.g. Spring nonprofit launch"
              />
            </label>

            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Description{' '}
                <span className="font-normal normal-case tracking-normal text-slate-400">(optional)</span>
              </span>
              <textarea
                value={form.description}
                onChange={(ev) => set({ description: ev.target.value })}
                rows={2}
                className="mt-1 w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
                placeholder="Short explanation for admins or internal reference…"
              />
            </label>

            <fieldset className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
              <legend className="px-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Discount
              </legend>
              <label className="mt-2 block">
                <span className="text-[11px] text-slate-500">Coupon type</span>
                <select
                  value={form.couponKind}
                  onChange={(ev) =>
                    set({
                      couponKind: /** @type {'percentage_off' | 'fixed_amount_off'} */ (ev.target.value),
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
                >
                  {FORM_COUPON_KIND_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="mt-3 block">
                <span className="text-[11px] text-slate-500">
                  {form.couponKind === 'fixed_amount_off'
                    ? `Amount (${form.currency})`
                    : 'Percentage (%)'}
                </span>
                <input
                  type="number"
                  min={0}
                  max={form.couponKind === 'percentage_off' ? 100 : undefined}
                  step={form.couponKind === 'percentage_off' ? 1 : 0.01}
                  value={form.value}
                  onChange={(ev) => set({ value: ev.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
                />
              </label>
              {form.couponKind === 'fixed_amount_off' ? (
                <label className="mt-3 block">
                  <span className="text-[11px] text-slate-500">Currency (ISO)</span>
                  <input
                    value={form.currency}
                    onChange={(ev) => set({ currency: ev.target.value })}
                    maxLength={8}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
                    placeholder="USD"
                  />
                </label>
              ) : null}
            </fieldset>

            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                How many people can use this coupon?
              </span>
              <span className="mt-0.5 block text-[11px] font-normal normal-case tracking-normal text-slate-400">
                Total redemptions across all users. Leave blank for unlimited.
              </span>
              <input
                type="number"
                min={1}
                step={1}
                value={form.maxPeople}
                onChange={(ev) => set({ maxPeople: ev.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
                placeholder="e.g. 100"
              />
            </label>

            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Cannot be redeemed after{' '}
                <span className="font-normal normal-case tracking-normal text-slate-400">(optional)</span>
              </span>
              <span className="mt-0.5 block text-[11px] font-normal normal-case tracking-normal text-slate-400">
                After this moment the code is expired for new redemptions.
              </span>
              <input
                type="datetime-local"
                value={form.expiresAt}
                onChange={(ev) => set({ expiresAt: ev.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
              />
            </label>

            <fieldset className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
              <legend className="px-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                How long does the coupon apply on the subscriber&apos;s account?
              </legend>
              <p className="mt-2 text-[11px] text-slate-500">
                After someone redeems this coupon, how long should the discounted access or benefit last on their
                account?
              </p>
              <div className="mt-3 space-y-2">
                <label className="flex cursor-pointer gap-2 rounded-lg border border-transparent p-2 hover:bg-white/80 has-[:checked]:border-brand-200 has-[:checked]:bg-white">
                  <input
                    type="radio"
                    name="createCouponBenefitDuration"
                    checked={form.benefitUnlimited}
                    onChange={() => set({ benefitUnlimited: true })}
                    className="mt-0.5 text-brand-600"
                  />
                  <span className="text-sm text-slate-800">
                    Unlimited
                    <span className="mt-0.5 block text-[11px] font-normal text-slate-500">
                      No fixed end to the coupon&apos;s effect (your billing rules decide what happens next).
                    </span>
                  </span>
                </label>
                <label className="flex cursor-pointer gap-2 rounded-lg border border-transparent p-2 hover:bg-white/80 has-[:checked]:border-brand-200 has-[:checked]:bg-white">
                  <input
                    type="radio"
                    name="createCouponBenefitDuration"
                    checked={!form.benefitUnlimited}
                    onChange={() => set({ benefitUnlimited: false })}
                    className="mt-0.5 text-brand-600"
                  />
                  <span className="text-sm text-slate-800">A fixed number of days</span>
                </label>
              </div>
              {!form.benefitUnlimited ? (
                <label className="mt-3 block">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Days</span>
                  <input
                    type="number"
                    min={1}
                    step={1}
                    value={form.benefitDurationDays}
                    onChange={(ev) => set({ benefitDurationDays: ev.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
                    placeholder="e.g. 90"
                  />
                </label>
              ) : null}
            </fieldset>

            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Subscription plan this coupon grants
              </span>
              <span className="mt-0.5 block text-[11px] font-normal normal-case tracking-normal text-slate-400">
                Use the same plan identifier your product expects (Stripe price id, internal tier name, etc.).
              </span>
              <input
                value={form.subscriptionPlan}
                onChange={(ev) => set({ subscriptionPlan: ev.target.value })}
                list="coupon-subscription-plan-suggestions"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
                placeholder="e.g. professional"
              />
              <datalist id="coupon-subscription-plan-suggestions">
                {SUBSCRIPTION_PLAN_SUGGESTIONS.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(ev) => set({ active: ev.target.checked })}
                className="h-4 w-4 rounded border-slate-300 text-brand-600"
              />
              Active
            </label>

            {formError ? (
              <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-800">{formError}</p>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/80 px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !db}
              className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save coupon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CouponCodesPage() {
  const { db, dataMode, initError } = useFirebaseData();
  const { items, loading, error } = useCouponCodes();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [savedBanner, setSavedBanner] = React.useState(/** @type {string|null} */ (null));

  React.useEffect(() => {
    if (!savedBanner) return undefined;
    const t = window.setTimeout(() => setSavedBanner(null), 5000);
    return () => window.clearTimeout(t);
  }, [savedBanner]);

  const sortedItems = React.useMemo(
    () =>
      [...items].sort((a, b) => couponCreatedMillis(b) - couponCreatedMillis(a)),
    [items],
  );

  const showFirebaseWarning = !db;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-10">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Coupon codes</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Firestore · collection “{COUPON_CODES_COLLECTION}”. Data tier: {dataMode}.
          </p>
        </div>
        {!showFirebaseWarning ? (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            New coupon
          </button>
        ) : null}
      </header>

      {showFirebaseWarning ? (
        <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Firebase is not configured for this data tier ({dataMode}). Set the matching{' '}
          <code className="rounded bg-amber-100 px-1 font-mono text-xs">REACT_APP_FIREBASE_*</code>{' '}
          keys for dev and prod, then restart.
          {initError ? ` (${initError})` : null}
        </p>
      ) : null}

      {savedBanner ? (
        <p className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Saved coupon “{savedBanner}”. It appears in the list below.
        </p>
      ) : null}

      {error ? (
        <p className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          Could not subscribe to coupons: {error}.
        </p>
      ) : null}

      {!showFirebaseWarning && (
        <div className="mb-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-900">All coupons</h2>
            {loading ? (
              <span className="text-xs text-slate-500">Loading…</span>
            ) : (
              <span className="text-xs text-slate-500">
                {items.length} coupon{items.length === 1 ? '' : 's'}
              </span>
            )}
          </div>

          {items.length === 0 && !loading ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center shadow-card">
              <p className="font-medium text-slate-900">No coupons yet</p>
              <p className="mt-2 text-sm text-slate-600">
                Create one with <span className="font-medium text-slate-800">New coupon</span>.
              </p>
            </div>
          ) : null}

          {sortedItems.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/90 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      <th className="min-w-[160px] px-4 py-3">Coupon</th>
                      <th className="min-w-[110px] px-4 py-3">Type</th>
                      <th className="min-w-[100px] px-4 py-3">Amount</th>
                      <th className="min-w-[140px] px-4 py-3">Expires after</th>
                      <th className="min-w-[90px] px-4 py-3">Max people</th>
                      <th className="min-w-[100px] px-4 py-3">On account</th>
                      <th className="min-w-[100px] px-4 py-3">Plan</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sortedItems.map((row) => {
                      const desc = couponDescriptionText(row);
                      const descShort = desc.length > 72 ? `${desc.slice(0, 69)}…` : desc;
                      return (
                        <tr key={row.id} className="align-top text-slate-800 hover:bg-slate-50/80">
                          <td className="max-w-[200px] px-4 py-3">
                            <div className="font-semibold text-slate-900">{couponDisplayName(row)}</div>
                            <div className="mt-0.5 font-mono text-[11px] font-medium text-slate-500">
                              {String(row.code || row.id)}
                            </div>
                            {desc ? (
                              <div className="mt-1 text-[11px] text-slate-600" title={desc}>
                                {descShort}
                              </div>
                            ) : null}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-600">
                            {couponTypeShortLabel(row)}
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-600">{couponBenefitLabel(row)}</td>
                          <td className="max-w-[180px] px-4 py-3 text-xs text-slate-600">
                            {couponExpiresDisplay(row)}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-600">
                            {maxPeopleLabel(row)}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-600">
                            {benefitDurationLabel(row)}
                          </td>
                          <td className="max-w-[120px] truncate px-4 py-3 text-xs text-slate-600" title={subscriptionPlanLabel(row)}>
                            {subscriptionPlanLabel(row)}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">
                            {row.active === false ? (
                              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                                Inactive
                              </span>
                            ) : (
                              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 ring-1 ring-emerald-100">
                                Active
                              </span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">
                            {formatFirestoreDateTime(row.createdAt)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      )}

      <CreateCouponModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        db={db}
        onSaved={(clean) => setSavedBanner(clean)}
      />
    </div>
  );
}
