import Pagination from "../../features/wallpapers/components/Pagination";
import SearchBar from "../../features/wallpapers/components/SearchBar";
import SortDropdown from "../../features/wallpapers/components/SortDropdown";
import WallpaperGrid from "../../features/wallpapers/components/WallpaperGrid";
import useDocumentMetadata from "../../features/wallpapers/hooks/useDocumentMetadata.js";
import usePagination from "../../features/wallpapers/hooks/usePagination";
import useWallpapers from "../../features/wallpapers/hooks/useWallpapers";
import { getListingMetadata } from "../../features/wallpapers/utils/wallpaperSeo.js";
import { useMemo } from "react";
import {
  findDiscoveryEntry,
  WALLPAPER_CATEGORIES,
  WALLPAPER_TAGS,
} from "../../features/wallpapers/constants/discoveryRoutes.js";
import { NavLink, useParams } from "react-router-dom";

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
  } = useWallpapers({
    seedQuery: discoveryEntry?.query || "",
    perPage: 850,
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

  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    previousPage,
  } = usePagination(wallpapers, 8);

  const pageHeading = discoveryEntry?.label
    ? `${discoveryEntry.label} wallpapers`
    : "Wallpaper gallery";

  const pageIntro = discoveryEntry?.label
    ? `SEO-ready collection page for ${discoveryEntry.label.toLowerCase()} wallpapers with clean previews, lazy media, and detail routes.`
    : "Curated HD and 4K wallpapers with search, fast previews, and download-focused detail pages.";

  return (
    <section className="space-y-8 px-6 py-8">
      <div className="rounded-[2rem] border border-zinc-200 bg-white/85 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-600 dark:text-amber-300">
          Discover
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
          {pageHeading}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600 dark:text-zinc-200 sm:text-base">
          {pageIntro}
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <SearchBar value={search} onChange={setSearch} />
          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-200">
            Categories
          </p>
          <div className="flex flex-wrap gap-2">
            {WALLPAPER_CATEGORIES.map((item) => (
              <NavLink
                key={item.slug}
                to={`/discover/${item.slug}`}
                className={({ isActive }) =>
                  [
                    "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                    isActive
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-200">
            Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {WALLPAPER_TAGS.map((item) => (
              <NavLink
                key={item.slug}
                to={`/topics/${item.slug}`}
                className={({ isActive }) =>
                  [
                    "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                    isActive
                      ? "bg-amber-500 text-black dark:bg-amber-300 dark:text-zinc-900"
                      : "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-500/15 dark:text-amber-200 dark:hover:bg-amber-500/25",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <div>
        <WallpaperGrid
          wallpapers={paginatedItems}
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
