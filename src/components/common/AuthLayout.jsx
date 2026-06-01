import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function AuthLayout({
  eyebrow,
  title,
  description,
  children,
  showForgotLink = false,
}) {
  return (
    <section className="relative flex min-h-full w-full items-center justify-center overflow-x-hidden px-4 py-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(234,179,8,0.12),transparent_24%),linear-gradient(180deg,#F8FAFC_0%,#EEF2FF_55%,#F8FAFC_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(67,56,202,0.24),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(245,179,1,0.16),transparent_26%),linear-gradient(180deg,#09090B_0%,#11111A_55%,#09090B_100%)]" />
      <div className="absolute left-[12%] top-[14%] h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-700/18" />
      <div className="absolute bottom-[10%] right-[10%] h-48 w-48 rounded-full bg-amber-300/18 blur-3xl dark:bg-amber-400/12" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative flex w-full max-w-[29rem] flex-col gap-3"
      >
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-zinc-300 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-800 shadow-sm backdrop-blur-xl dark:border-zinc-600 dark:bg-white/8 dark:text-zinc-100">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-indigo-700 text-xs font-extrabold tracking-[0.18em] text-white shadow-lg shadow-indigo-900/25">
              WA
            </span>
            Wallpaper App
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-2 rounded-2xl border border-zinc-300 bg-white/80 p-1 shadow-lg backdrop-blur-xl dark:border-zinc-600 dark:bg-zinc-900/80">
          <NavLink
            to="/sign-in"
            className={({ isActive }) =>
              [
                "rounded-2xl px-4 py-2.5 text-center text-sm font-semibold transition-all duration-300",
                isActive
                  ? "bg-indigo-700 text-white shadow-lg"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
              ].join(" ")
            }
          >
            Sign in
          </NavLink>
          <NavLink
            to="/sign-up"
            className={({ isActive }) =>
              [
                "rounded-2xl px-4 py-2.5 text-center text-sm font-semibold transition-all duration-300",
                isActive
                  ? "bg-indigo-700 text-white shadow-lg"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
              ].join(" ")
            }
          >
            Sign up
          </NavLink>
        </div>

        <div className="glass-panel w-full rounded-[1.75rem] p-5 sm:p-6">
          <div className="mb-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-500 dark:text-amber-300">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                {description}
              </p>
            ) : null}
          </div>
          {showForgotLink ? (
            <div className="mb-4 flex justify-center">
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-amber-500 transition-colors hover:text-amber-600 dark:text-amber-300 dark:hover:text-amber-200"
              >
                Forgot your password?
              </Link>
            </div>
          ) : null}
          {children}
        </div>
      </motion.div>
    </section>
  );
}

export default AuthLayout;
