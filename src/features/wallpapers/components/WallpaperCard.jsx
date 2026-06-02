import { Link } from "react-router-dom";
import {
  getWallpaperAltText,
  getWallpaperPath,
  getWallpaperTitle,
} from "../utils/wallpaperSeo.js";

function WallpaperCard({ wallpaper, priority = false }) {
  const title = getWallpaperTitle(wallpaper);
  const wallpaperPath = getWallpaperPath(wallpaper);

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
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
        <h3 className="line-clamp-2 text-lg font-semibold text-zinc-900">
          {title}
        </h3>

        <p className="text-sm text-zinc-600">
          Photographer: {wallpaper.photographer || "Unknown"}
        </p>

        <Link
          to={wallpaperPath}
          className="inline-flex rounded-full  bg-zinc-100 dark:bg-zinc-100 dark:bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          View details
        </Link>
      </div>
    </article>
  );
}

export default WallpaperCard;
