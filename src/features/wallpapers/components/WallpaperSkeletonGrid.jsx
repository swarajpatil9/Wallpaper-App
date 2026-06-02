function WallpaperSkeletonGrid({ count = 8 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={`wallpaper-skeleton-${index}`}
          className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white/85 shadow-sm"
        >
          <div className="aspect-[4/5] animate-pulse bg-zinc-200" />
          <div className="space-y-3 p-4">
            <div className="h-5 animate-pulse rounded-full bg-zinc-200" />
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-zinc-200" />
            <div className="h-10 w-28 animate-pulse rounded-full bg-zinc-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default WallpaperSkeletonGrid;
