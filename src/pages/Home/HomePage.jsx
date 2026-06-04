import Pagination from "../../features/wallpapers/components/Pagination";
import SearchBar from "../../features/wallpapers/components/SearchBar";
import SortDropdown from "../../features/wallpapers/components/SortDropdown";
import WallpaperGrid from "../../features/wallpapers/components/WallpaperGrid";
import { findDiscoveryEntry } from "../../features/wallpapers/constants/discoveryRoutes.js";
import useDocumentMetadata from "../../features/wallpapers/hooks/useDocumentMetadata.js";
import useWallpapers from "../../features/wallpapers/hooks/useWallpapers";
import { getListingMetadata } from "../../features/wallpapers/utils/wallpaperSeo.js";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

function HomePageContent({ categorySlug, discoveryEntry, tagSlug }) {
  const {
    wallpapers,
    loading,
    error,
    retry,
    search,
    setSearch,
    sort,
    setSort,
    totalItems,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    previousPage,
  } = useWallpapers({
    seedQuery: discoveryEntry?.query || "",
    perPage: 24,
  });

  const listingMetadata = getListingMetadata({
    collectionLabel: discoveryEntry?.label,
    collectionType: discoveryEntry?.collectionType,
    totalItems,
  });

  useDocumentMetadata({
    title: listingMetadata.title,
    description: listingMetadata.description,
    pathname: categorySlug
      ? `/discover/${categorySlug}`
      : tagSlug
        ? `/topics/${tagSlug}`
        : "/",
  });

  const pageHeading = discoveryEntry?.label
    ? `${discoveryEntry.label} wallpapers`
    : "Wallpaper gallery";

  const pageIntro = discoveryEntry?.label
    ? `SEO-ready collection page for ${discoveryEntry.label.toLowerCase()} wallpapers with clean previews, lazy media, and detail routes.`
    : "Curated HD and 4K wallpapers with search, fast previews, and download-focused detail pages.";

  return (
    <section className="space-y-8 px-6 py-8">
      <div className="rounded-[2rem] border border-zinc-200 bg-white/85 p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-600">
          Discover
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
          {pageHeading}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600 sm:text-base">
          {pageIntro}
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <SearchBar value={search} onChange={setSearch} />
          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      <div>
        <WallpaperGrid
          wallpapers={wallpapers}
          loading={loading}
          error={error}
          onRetry={retry}
          emptyTitle={
            search.trim()
              ? `No wallpapers found for “${search.trim()}”`
              : "No wallpapers found for this collection"
          }
          emptyDescription={
            search.trim()
              ? "Try a shorter keyword, switch the sort order, or clear the current search to surface more wallpaper results."
              : "This collection is currently empty. Try another discovery route or return to the curated homepage."
          }
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

function HomePage() {
  const { categorySlug, tagSlug } = useParams();
  const discoveryEntry = useMemo(() => {
    if (categorySlug) {
      const categoryEntry = findDiscoveryEntry("category", categorySlug);

      return {
        ...(categoryEntry || {
          slug: categorySlug,
          label: categorySlug.replace(/-/g, " "),
          query: categorySlug.replace(/-/g, " "),
        }),
        collectionType: "category",
      };
    }

    if (tagSlug) {
      const tagEntry = findDiscoveryEntry("tag", tagSlug);

      return {
        ...(tagEntry || {
          slug: tagSlug,
          label: tagSlug.replace(/-/g, " "),
          query: tagSlug.replace(/-/g, " "),
        }),
        collectionType: "tag",
      };
    }

    return null;
  }, [categorySlug, tagSlug]);

  const pageKey = discoveryEntry?.slug || "home";

  return (
    <HomePageContent
      key={pageKey}
      categorySlug={categorySlug}
      discoveryEntry={discoveryEntry}
      tagSlug={tagSlug}
    />
  );
}

export default HomePage;
