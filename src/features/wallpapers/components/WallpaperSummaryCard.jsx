function WallpaperSummaryCard({ title, value, detail }) {
  return (
    <div className="glass-panel rounded-[1.5rem] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
        {title}
      </p>
      <p className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-50">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{detail}</p>
    </div>
  );
}

export default WallpaperSummaryCard;
