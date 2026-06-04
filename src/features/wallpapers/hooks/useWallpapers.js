import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { wallpaperApi } from "../api/wallpaperApi.js";

function useWallpapers({ seedQuery = "", perPage = 24 } = {}) {
  const [allWallpapers, setAllWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestKey, setRequestKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState(seedQuery);
  const [sort, setSort] = useState("curated");
  const deferredSearch = useDeferredValue(search);

  const normalizedQuery = useMemo(() => {
    const trimmedSearch = deferredSearch.trim();

    if (trimmedSearch) {
      return trimmedSearch;
    }

    return seedQuery.trim();
  }, [deferredSearch, seedQuery]);

  const retry = useCallback(() => {
    setRequestKey((currentKey) => currentKey + 1);
  }, []);

  // Reset to page 1 whenever the search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [normalizedQuery]);

  useEffect(() => {
    let isActive = true;

    const fetchWallpapers = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = normalizedQuery
          ? await wallpaperApi.searchWallpapers(
              normalizedQuery,
              currentPage,
              perPage,
            )
          : await wallpaperApi.getWallpapers(currentPage, perPage);

        if (!isActive) return;

        const photos = data?.photos ?? [];
        const derivedTotalPages = data?.total_results
          ? Math.max(1, Math.ceil(data.total_results / perPage))
          : 1;

        setAllWallpapers(photos);
        setTotalPages(derivedTotalPages);
      } catch (err) {
        if (!isActive) return;

        const message =
          err?.response?.data?.error ||
          err?.message ||
          "Failed to fetch wallpapers.";

        setError(message);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchWallpapers();

    return () => {
      isActive = false;
    };
  }, [normalizedQuery, currentPage, perPage, requestKey]);

  const wallpapers = useMemo(() => {
    let nextWallpapers = [...allWallpapers];

    if (sort === "photographer-asc") {
      nextWallpapers.sort((a, b) =>
        (a.photographer || "").localeCompare(b.photographer || ""),
      );
    }

    if (sort === "photographer-desc") {
      nextWallpapers.sort((a, b) =>
        (b.photographer || "").localeCompare(a.photographer || ""),
      );
    }

    return nextWallpapers;
  }, [allWallpapers, sort]);

  const goToPage = useCallback(
    (page) => {
      setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    },
    [totalPages],
  );

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const previousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  return {
    wallpapers,
    loading,
    error,
    retry,
    search,
    setSearch,
    sort,
    setSort,
    totalItems: wallpapers.length,
    activeQuery: normalizedQuery,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    previousPage,
  };
}

export default useWallpapers;
