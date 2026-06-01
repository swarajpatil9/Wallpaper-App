import { useParams } from "react-router-dom";
import WallpaperSummaryCard from "../../components/wallpaper/WallpaperSummaryCard";

function WallpaperDetailsPage() {
  const { wallpaperId } = useParams();

  return (
    <section className="grid gap-6 py-8 sm:py-12 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="glass-panel relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_28%)]" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">
            Wallpaper details
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-50 sm:text-4xl">
            Wallpaper {wallpaperId || "preview"}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
            This page is the new home for per-wallpaper metadata, preview media,
            download actions, related suggestions, and any account-aware save
            controls.
          </p>

          <div className="mt-8 rounded-[1.75rem] border border-zinc-800 bg-zinc-900 p-6">
            <div className="aspect-[16/10] rounded-[1.5rem] border border-dashed border-zinc-700 bg-gradient-to-br from-zinc-900 via-zinc-950 to-indigo-950/40" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 self-start">
        <WallpaperSummaryCard
          title="Resolution"
          value="4K"
          detail="Use this card for dimensions, format, and available download variants."
        />
        <WallpaperSummaryCard
          title="Collection"
          value="Featured"
          detail="This section can show the album, tags, or editorial grouping for the current wallpaper."
        />
        <WallpaperSummaryCard
          title="Saved state"
          value="Ready"
          detail="Hook this into authenticated actions such as favorites, downloads, or private boards."
        />
      </div>
    </section>
  );
}

export default WallpaperDetailsPage;
