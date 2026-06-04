import { useUser } from "@clerk/clerk-react";
import { useCallback, useEffect, useState } from "react";

function getStorageKey(userId) {
  return `wallpaper-favourites-${userId}`;
}

function readFromStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function useFavourites() {
  const { user } = useUser();
  const userId = user?.id;

  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (!userId) return;
    setFavourites(readFromStorage(getStorageKey(userId)));
  }, [userId]);

  const persist = useCallback(
    (next) => {
      if (!userId) return;
      localStorage.setItem(getStorageKey(userId), JSON.stringify(next));
      setFavourites(next);
    },
    [userId],
  );

  const isFavourite = useCallback(
    (wallpaper) => favourites.some((f) => f.id === wallpaper?.id),
    [favourites],
  );

  const toggleFavourite = useCallback(
    (wallpaper) => {
      if (!wallpaper) return;
      const already = favourites.some((f) => f.id === wallpaper.id);
      const next = already
        ? favourites.filter((f) => f.id !== wallpaper.id)
        : [
            {
              id: wallpaper.id,
              alt: wallpaper.alt,
              photographer: wallpaper.photographer,
              src: {
                medium: wallpaper.src?.medium,
                large: wallpaper.src?.large,
              },
              width: wallpaper.width,
              height: wallpaper.height,
              savedAt: Date.now(),
            },
            ...favourites,
          ];
      persist(next);
    },
    [favourites, persist],
  );

  const removeFavourite = useCallback(
    (id) => persist(favourites.filter((f) => f.id !== id)),
    [favourites, persist],
  );

  return { favourites, isFavourite, toggleFavourite, removeFavourite };
}

export default useFavourites;
