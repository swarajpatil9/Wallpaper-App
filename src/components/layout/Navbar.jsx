import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";
import UserMenu from "../common/UserMenu";

function Navbar() {
  const { pathname } = useLocation();
  const isAuthRoute =
    /^\/(sign-in|sign-up|forgot-password|verify-email)(\/|$)/.test(pathname);

  return (
    <header className="sticky top-0 z-30 h-[5.5rem] border-b border-zinc-200/80 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-indigo-200 bg-indigo-700 text-sm font-extrabold uppercase tracking-[0.24em] text-white shadow-2xl shadow-indigo-950/20 dark:border-zinc-700">
            <span className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-80" />
            <span className="absolute inset-x-1 bottom-1 h-4 rounded-full bg-amber-400/25 blur-md" />
            WA
          </div>
          <div>
            <NavLink
              to="/"
              className="text-lg font-extrabold tracking-tight text-zinc-950 dark:text-white"
            >
              Wallpaper App
            </NavLink>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Premium access, private collections, polished identity flows.
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-wrap items-center justify-end gap-3">
          <ThemeToggle />

          <SignedOut>
            {!isAuthRoute ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/sign-in"
                  className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-black shadow-sm transition-all duration-300 hover:scale-[1.01] hover:bg-amber-300 hover:shadow-md"
                >
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className="rounded-full bg-indigo-700 px-4 py-2 text-sm font-semibold text-white shadow-xl shadow-indigo-950/20 transition-all duration-300 hover:scale-[1.01] hover:bg-indigo-800"
                >
                  Create account
                </Link>
                <Link to="/categories">Categories</Link>
              </div>
            ) : null}
          </SignedOut>

          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
