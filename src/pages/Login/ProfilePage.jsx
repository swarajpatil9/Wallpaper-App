import { ClerkLoaded, ClerkLoading, UserProfile } from "@clerk/clerk-react";

function ProfileSkeleton() {
  return (
    <section className="grid gap-6 py-8 sm:py-12 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="glass-panel animate-pulse rounded-[2rem] p-8 sm:p-10">
        <div className="h-4 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-6 h-10 w-3/4 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-4 h-4 w-full rounded-full bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="glass-panel animate-pulse rounded-[2rem] p-8 sm:p-10">
        <div className="h-80 rounded-[1.5rem] bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </section>
  );
}

function ProfilePage() {
  return (
    <section className="grid gap-6 py-8 sm:py-12 lg:grid-cols-[0.82fr_1.18fr]">
      <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">
          Account center
        </p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-50 sm:text-4xl">
          Profile and security settings.
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-400">
          Manage your identity, sign-in methods, and personal account settings
          from a dedicated in-app surface that matches the rest of the product.
        </p>

        <div className="mt-8 space-y-4">
          {[
            "Review personal details and sign-in methods.",
            "Keep profile, security, and device controls in one place.",
            "Maintain the same indigo, amber, and zinc visual system used across auth routes.",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-sm leading-6 text-zinc-300"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <ClerkLoading>
        <ProfileSkeleton />
      </ClerkLoading>

      <ClerkLoaded>
        <div className="glass-panel rounded-[2rem] p-4 sm:p-6">
          <UserProfile routing="path" path="/profile" />
        </div>
      </ClerkLoaded>
    </section>
  );
}

export default ProfilePage;
