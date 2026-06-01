import { useUser } from "@clerk/clerk-react";

function DashboardPage() {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return (
      <section className="grid min-h-[50vh] gap-6 py-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="glass-panel animate-pulse rounded-[2rem] p-8 sm:p-10">
          <div className="h-3 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-6 h-10 w-3/4 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-4 h-4 w-full rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-3 h-4 w-5/6 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="glass-panel animate-pulse rounded-[2rem] p-8 sm:p-10">
          <div className="h-6 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-6 space-y-4">
            <div className="h-20 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-20 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      </section>
    );
  }

  const firstName = user?.firstName || user?.username || "there";
  const email =
    user?.primaryEmailAddress?.emailAddress || "No primary email found";

  return (
    <section className="grid gap-6 py-8 sm:py-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="glass-panel relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.08),transparent_26%)]" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-500 dark:text-amber-300">
            Private dashboard
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            Welcome back, {firstName}.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Active sessions stay synchronized across navigation, profile
            settings, and protected areas without exposing a generic hosted auth
            interface.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["Account status", "Active"],
              ["Theme support", "Locked dark"],
              ["Access surface", "Custom routes"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-zinc-200 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
                  {label}
                </p>
                <p className="mt-3 text-lg font-bold text-zinc-950 dark:text-zinc-50">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-zinc-200 bg-white/90 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Primary email
            </p>
            <p className="mt-2 text-lg font-bold text-zinc-950 dark:text-zinc-50">
              {email}
            </p>
            <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              This surface is ready for saved wallpapers, download history, team
              features, or role-aware content.
            </p>
          </div>
        </div>
      </div>

      <div className="glass-panel space-y-4 rounded-[2rem] p-8 sm:p-10">
        {[
          "Use this page for saved wallpapers, private collections, or paid plans.",
          "Route-level protection is now paired with a deliberate lock-state UI instead of a blunt redirect.",
          "Profile and security settings live under a first-class account surface in the app.",
        ].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-zinc-200 bg-white/90 p-5 text-sm leading-6 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export default DashboardPage;
