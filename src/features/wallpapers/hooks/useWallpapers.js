import { useEffect, useState } from "react";
import { wallpaperApi } from "../api/wallpaperApi.js";

function useWallpapers() {
  const [allWallpapers, setAllWallpapers] = useState([]);
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("curated");

  useEffect(() => {
    let isActive = true;

    const fetchWallpapers = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await wallpaperApi.getWallpapers(1, 20);

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
  }, []);

  useEffect(() => {
    let nextWallpapers = [...allWallpapers];

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      nextWallpapers = nextWallpapers.filter((wallpaper) => {
        const alt = wallpaper.alt?.toLowerCase() || "";
        const photographer = wallpaper.photographer?.toLowerCase() || "";
        return alt.includes(query) || photographer.includes(query);
      });
    }

    if (sort === "photographer-asc") {
      nextWallpapers.sort((a, b) =>
        (a.photographer || "").localeCompare(b.photographer || "")
      );
    }

    if (sort === "photographer-desc") {
      nextWallpapers.sort((a, b) =>
        (b.photographer || "").localeCompare(a.photographer || "")
      );
    }

    setWallpapers(nextWallpapers);
  }, [allWallpapers, search, sort]);

  return {
    wallpapers,
    loading,
    error,
    search,
    setSearch,
    sort,
    setSort,
  };
}

export default useWallpapers;