import WallpaperCard from "./WallpaperCard";

function WallpaperGrid({ wallpapers, loading, error }) {
  if (loading) {
    return <p className="text-sm text-zinc-600">Loading wallpapers...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">Failed to load: {error}</p>;
  }

  if (!wallpapers.length) {
    return <p className="text-sm text-zinc-600">No wallpapers found.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {wallpapers.map((wallpaper) => (
        <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
      ))}
    </div>
  );
}

export default WallpaperGrid;
