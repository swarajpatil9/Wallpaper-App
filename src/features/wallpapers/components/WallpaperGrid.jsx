import WallpaperCard from "./WallpaperCard";
import WallpaperEmptyState from "./WallpaperEmptyState";
import WallpaperErrorState from "./WallpaperErrorState";
import WallpaperSkeletonGrid from "./WallpaperSkeletonGrid";

function WallpaperGrid({
  wallpapers,
  loading,
  error,
  onRetry,
  emptyTitle,
  emptyDescription,
}) {
  if (loading) {
    return <WallpaperSkeletonGrid />;
  }

  if (error) {
    return (
      <WallpaperErrorState
        title="Wallpapers could not be loaded"
        message={error}
        onRetry={onRetry}
      />
    );
  }

  if (!wallpapers.length) {
    return (
      <WallpaperEmptyState
        title={emptyTitle || "No wallpapers matched this view"}
        description={
          emptyDescription ||
          "Try a broader search term, switch collections, or clear the current filters to see more results."
        }
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {wallpapers.map((wallpaper, index) => (
        <WallpaperCard
          key={wallpaper.id}
          wallpaper={wallpaper}
          priority={index < 4}
        />
      ))}
    </div>
  );
}

export default WallpaperGrid;
