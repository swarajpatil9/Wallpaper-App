const FAVORITE_STORAGE_KEYS = [
  "favorite-wallpapers",
  "favourite-wallpapers",
  "favorites",
  "favourites",
];

const PRIMARY_FAVORITE_KEY = FAVORITE_STORAGE_KEYS[0];
const FAVORITES_UPDATED_EVENT = "favorite-wallpapers:updated";

function normalizeFavoriteWallpaper(item, index = 0) {
  if (!item || typeof item !== "object") {
    return null;
  }

  const id = item.id || item.photoId || item.wallpaperId || `saved-${index}`;
  const primarySrc =
    item.src?.original ||
    item.src?.large2x ||
    item.src?.large ||
    item.src?.medium ||
    item.image ||
    item.imageUrl ||
    item.thumbnail ||
    null;

  return {
    id,
    alt: item.alt || item.title || `Wallpaper ${id}`,
    photographer: item.photographer || item.author || "Unknown",
    width: item.width || null,
    height: item.height || null,
    src: {
      medium: item.src?.medium || primarySrc,
      large: item.src?.large || primarySrc,
      large2x: item.src?.large2x || item.src?.large || primarySrc,
      original: item.src?.original || item.src?.large2x || primarySrc,
    },
  };
}

function parseStoredFavorites(value) {
  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map(normalizeFavoriteWallpaper).filter(Boolean);
  } catch {
    return [];
  }
}

function readFavoriteWallpapers() {
  if (typeof window === "undefined") {
    return [];
  }

  for (const key of FAVORITE_STORAGE_KEYS) {
    const rawValue = window.localStorage.getItem(key);

    if (!rawValue) {
      continue;
    }

    const parsedFavorites = parseStoredFavorites(rawValue);

    if (parsedFavorites.length) {
      return parsedFavorites;
    }
  }

  return [];
}

function broadcastFavoriteWallpapers(items) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(FAVORITES_UPDATED_EVENT, {
      detail: { items },
    }),
  );
}

function writeFavoriteWallpapers(items) {
  if (typeof window === "undefined") {
    return;
  }

  const normalizedItems = items.map(normalizeFavoriteWallpaper).filter(Boolean);

  window.localStorage.setItem(
    PRIMARY_FAVORITE_KEY,
    JSON.stringify(normalizedItems),
  );

  FAVORITE_STORAGE_KEYS.slice(1).forEach((legacyKey) => {
    window.localStorage.removeItem(legacyKey);
  });

  broadcastFavoriteWallpapers(normalizedItems);
}

function toggleFavoriteWallpaper(wallpaper) {
  const normalizedWallpaper = normalizeFavoriteWallpaper(wallpaper);

  if (!normalizedWallpaper) {
    return { items: readFavoriteWallpapers(), isFavorite: false };
  }

  const currentFavorites = readFavoriteWallpapers();
  const nextFavorites = [...currentFavorites];
  const existingIndex = nextFavorites.findIndex(
    (item) => String(item.id) === String(normalizedWallpaper.id),
  );

  if (existingIndex >= 0) {
    nextFavorites.splice(existingIndex, 1);
    writeFavoriteWallpapers(nextFavorites);
    return { items: nextFavorites, isFavorite: false };
  }

  nextFavorites.unshift(normalizedWallpaper);
  writeFavoriteWallpapers(nextFavorites);
  return { items: nextFavorites, isFavorite: true };
}

export {
  FAVORITES_UPDATED_EVENT,
  normalizeFavoriteWallpaper,
  readFavoriteWallpapers,
  toggleFavoriteWallpaper,
};
