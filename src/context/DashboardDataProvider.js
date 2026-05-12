import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  doc,
  getCountFromServer,
  limit,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { COUPON_CODES_COLLECTION } from '../hooks/useCouponCodes';
import { useFirebaseData } from './FirebaseDataModeProvider';

/** Collection id for waitlist rows (see Waitlist page). */
export const WAITLIST_COLLECTION = 'waitlist_entries';

const DEFAULT_HOMEPAGE = {
  displayName: 'Admin',
  greetingLine: "Today's a hiring day.",
  subGreeting: 'Your hive of candidates is waiting to be organized.',
  reminder: 'Quick reminder: 2:30pm Call with Sarah Liu',
};

const DEFAULT_HOME_STATS = [
  {
    id: 'waitlists',
    label: 'Waitlists',
    value: 0,
    hint: '',
    icon: 'clipboardList',
  },
  {
    id: 'ngos',
    label: 'NGOs',
    value: 0,
    hint: '',
    icon: 'heartHandshake',
  },
  {
    id: 'coupons_active',
    label: 'Active coupons',
    value: 0,
    hint: '',
    icon: 'ticketPercent',
  },
];

const DEFAULT_JOBS = [
  {
    id: 'j1',
    title: 'Graphic Artist',
    company: 'Wavelength Creative Co.',
    status: 'Temp-Working',
    statusTone: 'blue',
  },
  {
    id: 'j2',
    title: 'Graphic Artist',
    company: 'Wavelength Creative Co.',
    status: 'Open - Hiring',
    statusTone: 'amber',
  },
];

const DEFAULT_CANDIDATES = [
  {
    id: 'c1',
    initials: 'SL',
    initialsBg: 'bg-rose-500',
    name: 'Sophie Lewis',
    role: 'UX Designer · London',
    badge: 'Actively seeking',
  },
];

const DEFAULT_CONTACTS = [
  {
    id: 'o1',
    initials: 'AB',
    initialsBg: 'bg-amber-700',
    name: 'Aaron Bell',
    company: 'Momentum Partners',
    openJobsLabel: 'Open jobs · 23',
  },
];

const DEFAULT_TASKS = {
  candidate: [
    {
      id: 't1',
      title: 'Follow up with Mei Chen on relocation',
      detail: 'Confirm visa timeline & start date assumptions.',
    },
  ],
  contact: [
    {
      id: 't2',
      title: 'Call Sarah Liu for portfolio feedback',
      detail: '',
    },
  ],
  job: [],
  general: [],
};

function normalizeTaskCategory(raw) {
  const c = String(raw || '').toLowerCase();
  if (['candidate', 'contact', 'job', 'general'].includes(c)) return c;
  return 'general';
}

const DashboardDataContext = createContext(null);

export function DashboardDataProvider({ children }) {
  const { db } = useFirebaseData();
  const [ready, setReady] = useState(false);
  const [homepage, setHomepage] = useState(DEFAULT_HOMEPAGE);
  const [stats, setStats] = useState(DEFAULT_HOME_STATS);
  const [statsLoading, setStatsLoading] = useState(false);
  const [jobs, setJobs] = useState(DEFAULT_JOBS);
  const [candidates, setCandidates] = useState(DEFAULT_CANDIDATES);
  const [contacts, setContacts] = useState(DEFAULT_CONTACTS);
  const [tasksByCategory, setTasksByCategory] = useState(DEFAULT_TASKS);
  const [firestoreError, setFirestoreError] = useState(null);

  useEffect(() => {
    setReady(false);
    setFirestoreError(null);

    if (!db) {
      setHomepage(DEFAULT_HOMEPAGE);
      setStats(DEFAULT_HOME_STATS);
      setJobs(DEFAULT_JOBS);
      setCandidates(DEFAULT_CANDIDATES);
      setContacts(DEFAULT_CONTACTS);
      setTasksByCategory(DEFAULT_TASKS);
      setReady(true);
      return undefined;
    }

    const unsubs = [];
    let pending = 5;

    const markReady = () => {
      pending -= 1;
      if (pending <= 0) setReady(true);
    };

    const onErr = (err) => {
      setFirestoreError(err.message);
      markReady();
    };

    unsubs.push(
      onSnapshot(
        doc(db, 'homepage', 'main'),
        (snap) => {
          if (!snap.exists()) {
            setHomepage(DEFAULT_HOMEPAGE);
          } else {
            const d = snap.data();
            setHomepage({
              displayName: d.displayName ?? DEFAULT_HOMEPAGE.displayName,
              greetingLine: d.greetingLine ?? DEFAULT_HOMEPAGE.greetingLine,
              subGreeting: d.subGreeting ?? DEFAULT_HOMEPAGE.subGreeting,
              reminder: d.reminder ?? DEFAULT_HOMEPAGE.reminder,
            });
          }
          markReady();
        },
        onErr,
      ),
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'jobs'), limit(24)),
        (snap) => {
          const rows = [];
          snap.forEach((s) => {
            const x = s.data();
            rows.push({
              id: s.id,
              title: x.title || 'Untitled role',
              company: x.companyName || x.company || '',
              status: x.status || '',
              statusTone: x.statusTone || 'blue',
              logoUrl: x.companyLogoUrl || null,
            });
          });
          setJobs(rows.length ? rows : DEFAULT_JOBS);
          markReady();
        },
        () => {
          setJobs(DEFAULT_JOBS);
          markReady();
        },
      ),
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'candidates'), limit(24)),
        (snap) => {
          const rows = [];
          snap.forEach((s) => {
            const x = s.data();
            rows.push({
              id: s.id,
              initials: x.initials || '?',
              initialsBg: x.initialsBg || 'bg-brand-600',
              name: x.name || 'Candidate',
              role: x.jobTitle || x.role || '',
              badge: x.badge || '',
            });
          });
          setCandidates(rows.length ? rows : DEFAULT_CANDIDATES);
          markReady();
        },
        () => {
          setCandidates(DEFAULT_CANDIDATES);
          markReady();
        },
      ),
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'contacts'), limit(24)),
        (snap) => {
          const rows = [];
          snap.forEach((s) => {
            const x = s.data();
            rows.push({
              id: s.id,
              initials: x.initials || '?',
              initialsBg: x.initialsBg || 'bg-slate-600',
              name: x.name || 'Contact',
              company: x.companyName || x.company || '',
              openJobsLabel:
                x.openJobsLabel ||
                `Open jobs · ${Number(x.openJobsCount) || 0}`,
            });
          });
          setContacts(rows.length ? rows : DEFAULT_CONTACTS);
          markReady();
        },
        () => {
          setContacts(DEFAULT_CONTACTS);
          markReady();
        },
      ),
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'tasks'), limit(100)),
        (snap) => {
          const next = {
            candidate: [],
            contact: [],
            job: [],
            general: [],
          };
          snap.forEach((s) => {
            const x = s.data();
            const cat = normalizeTaskCategory(x.category);
            next[cat].push({
              id: s.id,
              title: x.title || 'Task',
              detail: x.description || x.detail || '',
            });
          });
          const hasAny = Object.values(next).some((a) => a.length);
          setTasksByCategory(hasAny ? next : DEFAULT_TASKS);
          markReady();
        },
        () => {
          setTasksByCategory(DEFAULT_TASKS);
          markReady();
        },
      ),
    );

    return () => {
      unsubs.forEach((u) => u());
    };
  }, [db]);

  useEffect(() => {
    if (!db) {
      setStats(DEFAULT_HOME_STATS);
      setStatsLoading(false);
      return undefined;
    }

    let cancelled = false;

    async function refreshCounts() {
      setStatsLoading(true);
      try {
        const couponsActiveQuery = query(
          collection(db, COUPON_CODES_COLLECTION),
          where('active', '==', true),
        );
        const [ngoSnap, waitSnap, couponSnap] = await Promise.all([
          getCountFromServer(collection(db, 'ngos')),
          getCountFromServer(collection(db, WAITLIST_COLLECTION)),
          getCountFromServer(couponsActiveQuery),
        ]);
        if (cancelled) return;
        const ngoCount = ngoSnap.data().count;
        const waitCount = waitSnap.data().count;
        const activeCouponCount = couponSnap.data().count;
        setStats([
          {
            id: 'waitlists',
            label: 'Waitlists',
            value: waitCount,
            hint: '',
            icon: 'clipboardList',
          },
          {
            id: 'ngos',
            label: 'NGOs',
            value: ngoCount,
            hint: '',
            icon: 'heartHandshake',
          },
          {
            id: 'coupons_active',
            label: 'Active coupons',
            value: activeCouponCount,
            hint: '',
            icon: 'ticketPercent',
          },
        ]);
      } catch (_) {
        if (!cancelled) {
          setStats(DEFAULT_HOME_STATS);
        }
      } finally {
        if (!cancelled) setStatsLoading(false);
      }
    }

    refreshCounts();
    const intervalMs = 45_000;
    const id = window.setInterval(refreshCounts, intervalMs);

    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [db]);

  const value = {
    loading: db ? !ready : false,
    statsLoading,
    homepage,
    stats,
    jobs,
    candidates,
    contacts,
    tasksByCategory,
    firestoreError,
  };

  return (
    <DashboardDataContext.Provider value={value}>
      {children}
    </DashboardDataContext.Provider>
  );
}

export function useDashboardData() {
  const ctx = useContext(DashboardDataContext);
  if (!ctx) {
    throw new Error('useDashboardData must be used within DashboardDataProvider');
  }
  return ctx;
}
