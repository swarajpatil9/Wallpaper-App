import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import useFavourites from "../../features/favourites/hooks/useFavourites.js";
import useDownloadHistory from "../../features/wallpapers/hooks/useDownloadHistory.js";
import { getWallpaperPath, getWallpaperTitle } from "../../features/wallpapers/utils/wallpaperSeo.js";

function WallpaperThumb({ wallpaper, badge }) {
  return (
    <Link
      to={getWallpaperPath(wallpaper)}
      className="group relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <img
        src={wallpaper.src?.medium}
        alt={getWallpaperTitle(wallpaper)}
        loading="lazy"
        decoding="async"
        className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105"
      />
      {badge && (
        <span className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
          {badge}
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
        <p className="truncate text-xs font-medium text-white">
          {wallpaper.photographer || "Unknown"}
        </p>
      </div>
    </Link>
  );
}

function EmptySlot({ label }) {
  return (
    <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 text-xs text-zinc-400">
      {label}
    </div>
  );
}

function DashboardPage() {
  const { isLoaded, user } = useUser();
  const { favourites, removeFavourite } = useFavourites();
  const { history, clearHistory } = useDownloadHistory();

  if (!isLoaded) {
    return (
      <section className="space-y-6 py-12">
        <div className="glass-panel animate-pulse rounded-[2rem] p-8 sm:p-10">
          <div className="h-3 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-6 h-10 w-3/4 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-4 h-4 w-full rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </section>
    );
  }

  const firstName = user?.firstName || user?.username || "there";
  const email = user?.primaryEmailAddress?.emailAddress || "—";
  const avatarUrl = user?.imageUrl;
  const joinedAt = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <section className="space-y-8 py-8 sm:py-12">
      {/* ── User profile card ── */}
      <div className="glass-panel relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.08),transparent_26%)]" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={firstName}
              className="h-20 w-20 rounded-full border-4 border-white shadow-md dark:border-zinc-800"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600 text-3xl font-bold text-white shadow-md">
              {firstName[0].toUpperCase()}
            </div>
          )}

          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-500 dark:text-amber-300">
              Private dashboard
            </p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
              Welcome back, {firstName}.
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{email}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:text-center">
            {[
              ["Saved", favourites.length],
              ["Downloads", history.length],
              ["Joined", joinedAt || "—"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-zinc-200 bg-white/90 px-4 py-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  {label}
                </p>
                <p className="mt-1 text-xl font-bold text-zinc-950 dark:text-zinc-50">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Favourites ── */}
      <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-500 dark:text-amber-300">
              Saved
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-zinc-950 dark:text-zinc-50">
              Favourite wallpapers
            </h2>
          </div>
          <Link
            to="/"
            className="rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition hover:border-zinc-500"
          >
            Browse more
          </Link>
        </div>

        {favourites.length === 0 ? (
          <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
            No favourites yet — open any wallpaper and hit{" "}
            <span className="font-semibold text-rose-500">♡ Save</span>.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {favourites.map((w) => (
              <div key={w.id} className="relative">
                <WallpaperThumb wallpaper={w} />
                <button
                  type="button"
                  onClick={() => removeFavourite(w.id)}
                  title="Remove from favourites"
                  className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white backdrop-blur-sm transition hover:bg-rose-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Download history ── */}
      <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-500 dark:text-amber-300">
              Recent
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-zinc-950 dark:text-zinc-50">
              Download history
            </h2>
          </div>
          {history.length > 0 && (
            <button
              type="button"
              onClick={clearHistory}
              className="rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 transition hover:border-red-400 hover:text-red-500"
            >
              Clear all
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
            No downloads yet — your history will appear here after you download
            a wallpaper.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {history.map((w) => (
              <WallpaperThumb
                key={`${w.id}-${w.downloadedAt}`}
                wallpaper={w}
                badge={new Date(w.downloadedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default DashboardPage;
