import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ClipboardList,
  HeartHandshake,
  Home,
  LogOut,
  TicketPercent,
} from "lucide-react";
import { AppLogoMark } from "./AppLogoMark";
import { FirebaseDataToggle } from "./FirebaseDataToggle";
import { useFirebaseAuth } from "../context/FirebaseAuthProvider";

const navCls =
  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition";
const inactiveNav = "text-slate-600 hover:bg-slate-100";
const activeNav = "bg-brand-600 text-white shadow-sm hover:bg-brand-700";

export function Sidebar() {
  const { user, signOutUser } = useFirebaseAuth();

  return (
    <aside className='flex min-h-screen w-[260px] shrink-0 flex-col border-r border-slate-200/80 bg-slate-50/90'>
      <Link
        to='/'
        className='flex items-center gap-2 px-5 py-6 hover:opacity-90'
      >
        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white shadow-md shadow-slate-900/8 ring-1 ring-slate-200/90'>
          <AppLogoMark className='h-8 w-8' size={32} />
        </div>
        <div>
          <p className='text-sm font-semibold text-slate-900'>Foundation OS</p>
          <p className='text-[11px] font-medium text-slate-500'>
            Recruiting HQ
          </p>
        </div>
      </Link>

      <nav className='flex flex-1 flex-col space-y-1 px-3'>
        <NavLink
          to='/'
          end
          className={({ isActive }) =>
            `${navCls} ${isActive ? activeNav : inactiveNav}`.trim()
          }
        >
          <Home className='h-[18px] w-[18px] shrink-0' strokeWidth={1.75} />
          Home
        </NavLink>

        <NavLink
          to='/ngos'
          className={({ isActive }) =>
            `${navCls} ${isActive ? activeNav : inactiveNav}`.trim()
          }
        >
          <HeartHandshake
            className='h-[18px] w-[18px] shrink-0'
            strokeWidth={1.75}
          />
          NGOs
        </NavLink>
        <NavLink
          to='/coupon-codes'
          className={({ isActive }) =>
            `${navCls} ${isActive ? activeNav : inactiveNav}`.trim()
          }
        >
          <TicketPercent
            className='h-[18px] w-[18px] shrink-0'
            strokeWidth={1.75}
          />
          Coupon codes
        </NavLink>
        <NavLink
          to='/waitlist'
          className={({ isActive }) =>
            `${navCls} ${isActive ? activeNav : inactiveNav}`.trim()
          }
        >
          <ClipboardList
            className='h-[18px] w-[18px] shrink-0'
            strokeWidth={1.75}
          />
          Waitlist
        </NavLink>
      </nav>

      <div className="space-y-4 border-t border-slate-200/90 px-3 py-4">
        {user?.email ? (
          <div>
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Signed in
            </p>
            <p
              className="mb-3 truncate px-3 text-xs font-medium text-slate-700"
              title={user.email}
            >
              {user.email}
            </p>
            <button
              type="button"
              onClick={() => signOutUser()}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-[13px] font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4 shrink-0 text-slate-500" strokeWidth={1.75} />
              Sign out
            </button>
          </div>
        ) : null}
        <FirebaseDataToggle />
      </div>
    </aside>
  );
}
