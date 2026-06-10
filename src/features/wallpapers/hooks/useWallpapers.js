import { useCallback, useEffect, useMemo, useState } from "react";
import { wallpaperApi } from "../api/wallpaperApi.js";
import useDebounce from "../../../hooks/useDebounce.js";

function useWallpapers({ seedQuery = "", perPage = 24 } = {}) {
  const [allWallpapers, setAllWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestKey, setRequestKey] = useState(0);

  const [search, setSearch] = useState(seedQuery);
  const [sort, setSort] = useState("curated");
  const debouncedSearch = useDebounce(search, 500);

  const normalizedQuery = useMemo(() => {
    const trimmedSearch = debouncedSearch.trim();

    if (trimmedSearch) {
      return trimmedSearch;
    }

    return seedQuery.trim();
  }, [debouncedSearch, seedQuery]);

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
    const nextWallpapers = [...allWallpapers];

    if (sort === "resolution-high") {
      nextWallpapers.sort((a, b) => {
        const aPixels = (a.width || 0) * (a.height || 0);
        const bPixels = (b.width || 0) * (b.height || 0);

        return bPixels - aPixels;
      });
    }

    if (sort === "resolution-low") {
      nextWallpapers.sort((a, b) => {
        const aPixels = (a.width || 0) * (a.height || 0);
        const bPixels = (b.width || 0) * (b.height || 0);

        return aPixels - bPixels;
      });
    }

    if (sort === "landscape") {
      nextWallpapers.sort((a, b) => {
        const aLandscape = (a.width || 0) - (a.height || 0);
        const bLandscape = (b.width || 0) - (b.height || 0);

        return bLandscape - aLandscape;
      });
    }

    if (sort === "portrait") {
      nextWallpapers.sort((a, b) => {
        const aPortrait = (a.height || 0) - (a.width || 0);
        const bPortrait = (b.height || 0) - (b.width || 0);

        return bPortrait - aPortrait;
      });
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
