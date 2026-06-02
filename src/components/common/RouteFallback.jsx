function RouteFallback() {
  return (
    <div className="grid min-h-[50vh] place-items-center py-12">
      <div className="glass-panel w-full max-w-3xl rounded-[2rem] p-8 sm:p-10">
        <div className="space-y-4 animate-pulse">
          <div className="h-4 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-10 w-3/4 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-full rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-64 rounded-[1.75rem] bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

export default RouteFallback;
