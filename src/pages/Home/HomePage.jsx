import Pagination from "../../features/wallpapers/components/Pagination";
import SearchBar from "../../features/wallpapers/components/SearchBar";
import SortDropdown from "../../features/wallpapers/components/SortDropdown";
import WallpaperGrid from "../../features/wallpapers/components/WallpaperGrid";
import usePagination from "../../features/wallpapers/hooks/usePagination";
import useWallpapers from "../../features/wallpapers/hooks/useWallpapers";

function HomePage() {
  const { wallpapers, loading, error, search, setSearch, sort, setSort } =
    useWallpapers();

  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    previousPage,
  } = usePagination(wallpapers, 8);

  return (
    <section className="px-6 py-8">
      <h1 className="text-2xl font-bold text-zinc-900">Wallpaper App</h1>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <SearchBar value={search} onChange={setSearch} />
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <div className="mt-6">
        <WallpaperGrid
          wallpapers={paginatedItems}
          loading={loading}
          error={error}
        />
      </div>

      {!loading && !error && wallpapers.length > 0 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onPrevious={previousPage}
          onNext={nextPage}
        />
      ) : null}
    </section>
  );
}

export default HomePage;
