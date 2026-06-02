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

  useEffect(() => {
    let isActive = true;

    const fetchWallpapers = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = normalizedQuery
          ? await wallpaperApi.searchWallpapers(normalizedQuery, 1, perPage)
          : await wallpaperApi.getWallpapers(1, perPage);

        if (!isActive) return;

        const photos = data?.photos ?? [];
        setAllWallpapers(photos);
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
  }, [normalizedQuery, perPage, requestKey]);

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
  };
}

export default useWallpapers;
