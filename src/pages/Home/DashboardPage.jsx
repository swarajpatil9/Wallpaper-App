import { useUser } from "@clerk/clerk-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import useFavoriteWallpapers from "../../features/wallpapers/hooks/useFavoriteWallpapers.js";
import {
  getWallpaperPath,
  getWallpaperTitle,
} from "../../features/wallpapers/utils/wallpaperSeo.js";

const STORAGE_KEYS = {
  downloads: ["downloaded-wallpapers", "downloads", "download-history"],
};

function readFirstStorageArray(keys) {
  if (typeof window === "undefined") {
    return [];
  }

  for (const key of keys) {
    const rawValue = window.localStorage.getItem(key);

    if (!rawValue) {
      continue;
    }

    try {
      const parsed = JSON.parse(rawValue);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      return [];
    }
  }

  return [];
}

function normalizeWallpaper(item, index) {
  if (!item || typeof item !== "object") {
    return null;
  }

  const id = item.id || item.photoId || item.wallpaperId || `saved-${index}`;
  const src =
    item.src?.medium ||
    item.src?.large ||
    item.image ||
    item.imageUrl ||
    item.thumbnail ||
    null;

  return {
    ...item,
    id,
    src: item.src || (src ? { medium: src, large: src } : undefined),
    photographer: item.photographer || item.author || "Unknown",
  };
}

function SavedWallpapersSection({ title, items, emptyMessage, renderAction }) {
  return (
    <section className="glass-panel rounded-[2rem] p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-2xl">
          {title}
        </h2>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
          {items.length} item{items.length === 1 ? "" : "s"}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-zinc-300 p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          {emptyMessage}
        </p>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((wallpaper, index) => {
            const title = getWallpaperTitle(wallpaper);
            const canOpenDetails = Boolean(wallpaper.id);

            return (
              <article
                key={`${wallpaper.id}-${index}`}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/90 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  {wallpaper.src?.medium ? (
                    <img
                      src={wallpaper.src.medium}
                      alt={title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                      Preview unavailable
                    </div>
                  )}
                </div>

                <div className="space-y-2 p-4">
                  <h3 className="line-clamp-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                    {wallpaper.photographer}
                  </p>
                  {canOpenDetails ? (
                    <Link
                      to={getWallpaperPath(wallpaper)}
                      className="inline-flex text-sm font-semibold text-amber-700 transition hover:text-amber-600 dark:text-amber-300 dark:hover:text-amber-200"
                    >
                      Open wallpaper
                    </Link>
                  ) : null}
                  {renderAction ? renderAction(wallpaper, index) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function DashboardPage() {
  const { isLoaded, user } = useUser();
  const { favorites: favoriteWallpapers, toggleFavorite } =
    useFavoriteWallpapers();

  const downloadedWallpapers = useMemo(() => {
    const fromMetadata =
      user?.publicMetadata?.downloadedWallpapers ||
      user?.unsafeMetadata?.downloadedWallpapers;

    const source = Array.isArray(fromMetadata)
      ? fromMetadata
      : readFirstStorageArray(STORAGE_KEYS.downloads);

    return source.map(normalizeWallpaper).filter(Boolean);
  }, [user]);

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
    <section className="space-y-6 py-8 sm:py-12">
      <div className="glass-panel relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.08),transparent_26%)]" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-500 dark:text-amber-300">
            Private dashboard
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            Welcome back, {firstName}.
          </h1>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Primary email", email],
              ["Favourite wallpapers", String(favoriteWallpapers.length)],
              ["Downloaded wallpapers", String(downloadedWallpapers.length)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-zinc-200 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                  {label}
                </p>
                <p className="mt-3 line-clamp-2 break-all text-sm font-bold text-zinc-950 dark:text-zinc-50 sm:text-base">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SavedWallpapersSection
        title="Favourite wallpapers"
        items={favoriteWallpapers}
        emptyMessage="You do not have any favourite wallpapers yet. Add some from the gallery and they will appear here."
        renderAction={(wallpaper) => (
          <button
            type="button"
            onClick={() => toggleFavorite(wallpaper)}
            className="inline-flex text-sm font-semibold text-rose-600 transition hover:text-rose-500 dark:text-rose-300 dark:hover:text-rose-200"
          >
            Remove favourite
          </button>
        )}
      />

      <SavedWallpapersSection
        title="Downloaded wallpapers"
        items={downloadedWallpapers}
        emptyMessage="Your downloaded wallpapers will appear here once you start downloading from wallpaper detail pages."
      />
    </section>
  );
}

export default DashboardPage;
