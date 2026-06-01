import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <section className="grid min-h-[70vh] place-items-center py-10 sm:py-14">
          <div className="glass-panel relative w-full max-w-3xl overflow-hidden rounded-[2rem] p-8 sm:p-10">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="rounded-[1.75rem] border border-zinc-800 bg-zinc-900 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-700 text-xl text-white shadow-lg shadow-indigo-950/20">
                  L
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
                  Protected workspace
                </p>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-50">
                  Sign in to continue.
                </h1>
                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  Private collections, profile settings, and secure member
                  actions are only available after authentication.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-400">
                  Access required
                </p>
                <h2 className="mt-3 text-2xl font-bold text-zinc-50 sm:text-3xl">
                  Keep the experience polished even when access is restricted.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
                  Instead of bouncing people out of the route, the app keeps
                  them inside a premium lock screen with clear next actions and
                  responsive spacing.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    to="/sign-in"
                    className="rounded-full bg-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-2xl shadow-indigo-950/20 transition-all duration-300 hover:scale-[1.01] hover:bg-indigo-800"
                  >
                    Sign in to continue
                  </Link>
                  <Link
                    to="/sign-up"
                    className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-black shadow-sm transition-all duration-300 hover:scale-[1.01] hover:bg-amber-300 hover:shadow-md"
                  >
                    Create account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SignedOut>
    </>
  );
}

export default ProtectedRoute;
