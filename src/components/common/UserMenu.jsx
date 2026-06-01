import { useClerk, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function UserMenu() {
  const { signOut } = useClerk();
  const { user } = useUser();

  const initials =
    user?.firstName?.[0] ||
    user?.username?.[0] ||
    user?.primaryEmailAddress?.emailAddress?.[0] ||
    "U";

  const email = user?.primaryEmailAddress?.emailAddress || "Authenticated";

  async function handleSignOut() {
    await signOut({ redirectUrl: "/sign-in" });
  }

  return (
    <div className="flex items-center gap-3 rounded-full border border-zinc-200 bg-white/90 px-3 py-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="inline-flex items-center gap-3">
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.fullName || "User avatar"}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/40"
          />
        ) : (
          <span className="grid h-10 w-10 place-items-center rounded-full bg-indigo-700 text-sm font-bold text-white">
            {initials.toUpperCase()}
          </span>
        )}
        <span className="hidden text-left sm:block">
          <span className="block text-sm font-semibold text-zinc-950 dark:text-zinc-100">
            {user?.firstName || user?.username || "Account"}
          </span>
          <span className="block text-xs text-zinc-600 dark:text-zinc-400">
            {email}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to="/dashboard"
          className="rounded-full bg-indigo-700 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.01] hover:bg-indigo-800"
        >
          Dashboard
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.01] hover:bg-amber-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserMenu;
