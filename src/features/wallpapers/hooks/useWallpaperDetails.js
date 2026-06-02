import { useCallback, useEffect, useState } from "react";
import { wallpaperApi } from "../api/wallpaperApi.js";

function useWallpaperDetails(wallpaperId) {
  const hasValidWallpaperId = Boolean(wallpaperId);
  const [wallpaper, setWallpaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestKey, setRequestKey] = useState(0);

  const retry = useCallback(() => {
    setRequestKey((currentKey) => currentKey + 1);
  }, []);

  useEffect(() => {
    if (!hasValidWallpaperId) {
      return;
    }

    let isActive = true;

    const fetchWallpaper = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await wallpaperApi.getWallpaperById(wallpaperId);

        if (!isActive) {
          return;
        }

        setWallpaper(data ?? null);
      } catch (err) {
        if (!isActive) {
          return;
        }

        const message =
          err?.response?.data?.error ||
          err?.message ||
          "We could not load this wallpaper right now.";

        setWallpaper(null);
        setError(message);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchWallpaper();

    return () => {
      isActive = false;
    };
  }, [hasValidWallpaperId, requestKey, wallpaperId]);

  return {
    wallpaper: hasValidWallpaperId ? wallpaper : null,
    loading: hasValidWallpaperId ? loading : false,
    error: hasValidWallpaperId ? error : "This wallpaper URL is invalid.",
    retry,
  };
}

export default useWallpaperDetails;
