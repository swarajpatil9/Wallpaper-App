import { Link, Navigate, useParams } from "react-router-dom";
import WallpaperErrorState from "../../features/wallpapers/components/WallpaperErrorState";
import WallpaperSkeletonGrid from "../../features/wallpapers/components/WallpaperSkeletonGrid";
import useDocumentMetadata from "../../features/wallpapers/hooks/useDocumentMetadata.js";
import useFavoriteWallpapers from "../../features/wallpapers/hooks/useFavoriteWallpapers.js";
import useWallpaperDetails from "../../features/wallpapers/hooks/useWallpaperDetails.js";
import WallpaperSummaryCard from "../../features/wallpapers/components/WallpaperSummaryCard";
import { parseWallpaperId } from "../../features/wallpapers/utils/slugify.js";
import {
  getWallpaperAltText,
  getWallpaperMetadata,
  getWallpaperPath,
  getWallpaperTitle,
} from "../../features/wallpapers/utils/wallpaperSeo.js";

function WallpaperDetailsPage() {
  const { wallpaperId } = useParams();
  const { isFavorite, toggleFavorite } = useFavoriteWallpapers();
  const photoId = parseWallpaperId(wallpaperId);
  const { wallpaper, loading, error, retry } = useWallpaperDetails(photoId);

  const metadata = wallpaper
    ? getWallpaperMetadata(wallpaper)
    : {
        title: "Wallpaper details | Wallscape",
        description:
          "Preview wallpaper dimensions, attribution, and direct download options from the detail view.",
      };

  useDocumentMetadata({
    title: metadata.title,
    description: metadata.description,
    image: metadata.image,
    pathname: wallpaper
      ? getWallpaperPath(wallpaper)
      : `/wallpapers/${wallpaperId}`,
    type: "article",
  });

  if (
    !loading &&
    wallpaper &&
    getWallpaperPath(wallpaper) !== `/wallpapers/${wallpaperId}`
  ) {
    return <Navigate to={getWallpaperPath(wallpaper)} replace />;
  }

  if (loading) {
    return (
      <section className="space-y-6 py-8 sm:py-12">
        <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
          <div className="space-y-4 animate-pulse">
            <div className="h-4 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-10 w-3/4 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-full rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="aspect-[16/10] rounded-[1.75rem] bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
        <WallpaperSkeletonGrid count={3} />
      </section>
    );
  }

  if (error || !wallpaper) {
    return (
      <section className="py-8 sm:py-12">
        <WallpaperErrorState
          title="Wallpaper details could not be loaded"
          message={error || "The requested wallpaper is not available anymore."}
          onRetry={retry}
        />
      </section>
    );
  }

  const downloadUrl =
    wallpaper.src?.original || wallpaper.src?.large2x || wallpaper.src?.large;
  const title = getWallpaperTitle(wallpaper);
  const favoriteActive = isFavorite(wallpaper.id);

  return (
    <section className="grid gap-6 py-8 sm:py-12 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="glass-panel relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_28%)]" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700 dark:text-amber-300">
            Wallpaper details
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7  text-zinc-600 dark:text-zinc-400">
            {metadata.description}
          </p>

          <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-zinc-300 dark:border-zinc-700 bg-zinc-900 p-3 sm:p-4">
            <img
              src={
                wallpaper.src?.large2x ||
                wallpaper.src?.large ||
                wallpaper.src?.medium
              }
              alt={getWallpaperAltText(wallpaper)}
              width={wallpaper.width}
              height={wallpaper.height}
              decoding="async"
              fetchPriority="high"
              className="aspect-[16/10] w-full rounded-[1.5rem] object-cover"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-300"
            >
              Download original
            </a>
            <Link
              to="/"
              className="rounded-full border border-zinc-300 dark:border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-100 transition hover:border-zinc-500 hover:text-white"
            >
              Back to gallery
            </Link>
            <button
              type="button"
              onClick={() => toggleFavorite(wallpaper)}
              aria-pressed={favoriteActive}
              className={[
                "rounded-full border px-5 py-3 text-sm font-semibold transition",
                favoriteActive
                  ? "border-rose-400 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:border-rose-500/70 dark:bg-rose-500/20 dark:text-rose-100"
                  : "border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800",
              ].join(" ")}
            >
              {favoriteActive ? "Remove from favorites" : "Add to favorites"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 self-start">
        <WallpaperSummaryCard
          title="Resolution"
          value={`${wallpaper.width} x ${wallpaper.height}`}
          detail="Large-format source dimensions from Pexels for desktop, tablet, and mobile wallpaper usage."
        />
        <WallpaperSummaryCard
          title="Photographer"
          value={wallpaper.photographer || "Unknown"}
          detail="Attribution matters for accessibility, trust, and cleaner metadata across search results and social previews."
        />
        <WallpaperSummaryCard
          title="Source"
          value="Pexels"
          detail="External source page is available for attribution, licensing context, and upstream discovery."
        />
      </div>
    </section>
  );
}

export default WallpaperDetailsPage;
