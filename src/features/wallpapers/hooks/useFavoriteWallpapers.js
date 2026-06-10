import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FAVORITES_UPDATED_EVENT,
  readFavoriteWallpapers,
  toggleFavoriteWallpaper,
} from "../utils/favoriteWallpapers.js";

function useFavoriteWallpapers() {
  const [favorites, setFavorites] = useState(readFavoriteWallpapers);

  useEffect(() => {
    const syncFromStorage = () => {
      setFavorites(readFavoriteWallpapers());
    };

    const syncFromCustomEvent = (event) => {
      const nextItems = event?.detail?.items;

      if (Array.isArray(nextItems)) {
        setFavorites(nextItems);
        return;
      }

      syncFromStorage();
    };

    window.addEventListener("storage", syncFromStorage);
    window.addEventListener(FAVORITES_UPDATED_EVENT, syncFromCustomEvent);

    return () => {
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener(FAVORITES_UPDATED_EVENT, syncFromCustomEvent);
    };
  }, []);

  const toggleFavorite = useCallback((wallpaper) => {
    const result = toggleFavoriteWallpaper(wallpaper);
    setFavorites(result.items);
    return result.isFavorite;
  }, []);

  const isFavorite = useCallback(
    (wallpaperId) =>
      favorites.some((item) => String(item.id) === String(wallpaperId)),
    [favorites],
  );

  return useMemo(
    () => ({
      favorites,
      favoriteIds: favorites.map((item) => String(item.id)),
      isFavorite,
      toggleFavorite,
    }),
    [favorites, isFavorite, toggleFavorite],
  );
}

export default useFavoriteWallpapers;
