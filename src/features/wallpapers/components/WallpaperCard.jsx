import { Link } from "react-router-dom";
import useFavoriteWallpapers from "../hooks/useFavoriteWallpapers.js";
import {
  getWallpaperAltText,
  getWallpaperPath,
  getWallpaperTitle,
} from "../utils/wallpaperSeo.js";

function WallpaperCard({ wallpaper, priority = false }) {
  const { isFavorite, toggleFavorite } = useFavoriteWallpapers();
  const title = getWallpaperTitle(wallpaper);
  const wallpaperPath = getWallpaperPath(wallpaper);
  const favoriteActive = isFavorite(wallpaper.id);

  const handleFavoriteClick = () => {
    toggleFavorite(wallpaper);
  };

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/90">
      <Link to={wallpaperPath} aria-label={`Open ${title} details`}>
        <img
          src={wallpaper.src?.medium}
          alt={getWallpaperAltText(wallpaper)}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "low"}
          width={wallpaper.width || 800}
          height={wallpaper.height || 1000}
          className="aspect-[4/5] h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-zinc-900 dark:text-white">
          {title}
        </h3>

        <p className="text-sm text-zinc-600 dark:text-zinc-200">
          Photographer: {wallpaper.photographer || "Unknown"}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={wallpaperPath}
            className="inline-flex rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition dark:border-zinc-100 dark:bg-zinc-900 dark:text-white"
            style={{ color: "#ffffff" }}
          >
            View details
          </Link>
          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-pressed={favoriteActive}
            className={[
              "inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition",
              favoriteActive
                ? "border-rose-400 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:border-rose-500/70 dark:bg-rose-500/20 dark:text-rose-100"
                : "border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800",
            ].join(" ")}
          >
            {favoriteActive ? "Favorited" : "Add favorite"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default WallpaperCard;
