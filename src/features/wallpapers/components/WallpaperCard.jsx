import { Link } from "react-router-dom";

function WallpaperCard({ wallpaper }) {
  const title =
    wallpaper.alt || wallpaper.photographer || `Wallpaper ${wallpaper.id}`;

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <Link to={`/wallpapers/${wallpaper.id}`}>
        <img
          src={wallpaper.src?.medium}
          alt={title}
          className="h-64 w-full object-cover"
        />
      </Link>

      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-zinc-900">
          {title}
        </h3>

        <p className="text-sm text-zinc-600">
          Photographer: {wallpaper.photographer || "Unknown"}
        </p>

        <button
          type="button"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Save
        </button>
      </div>
    </article>
  );
}

export default WallpaperCard;