function WallpaperErrorState({
  title = "Something went wrong",
  message,
  onRetry,
}) {
  return (
    <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50/90 p-6 text-rose-900 shadow-sm dark:border-rose-700/60 dark:bg-rose-950/30 dark:text-rose-100">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-600 dark:text-rose-300">
        Load failed
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-rose-800/80 dark:text-rose-200/90">
        {message ||
          "Try reloading this request. If the problem persists, the Pexels API may be temporarily unavailable."}
      </p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
        >
          Retry request
        </button>
      ) : null}
    </div>
  );
}

export default WallpaperErrorState;
