function WallpaperEmptyState({ title, description, action }) {
  return (
    <div className="rounded-[1.75rem] border border-zinc-200 bg-white/90 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-300">
        No results
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-200">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export default WallpaperEmptyState;
