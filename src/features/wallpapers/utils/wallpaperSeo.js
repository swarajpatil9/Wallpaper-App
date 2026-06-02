import { slugify } from "./slugify.js";

const SITE_NAME = "Wallscape";

export function getWallpaperTitle(wallpaper) {
  return (
    wallpaper?.alt ||
    wallpaper?.photographer ||
    (wallpaper?.id ? `Wallpaper ${wallpaper.id}` : "Wallpaper")
  );
}

export function getWallpaperAltText(wallpaper) {
  const title = getWallpaperTitle(wallpaper);
  const photographer = wallpaper?.photographer;

  if (
    photographer &&
    !title.toLowerCase().includes(photographer.toLowerCase())
  ) {
    return `${title} wallpaper by ${photographer}`;
  }

  return `${title} wallpaper`;
}

export function getWallpaperSlug(wallpaper) {
  return (
    slugify(getWallpaperTitle(wallpaper)) ||
    `wallpaper-${wallpaper?.id || "preview"}`
  );
}

export function getWallpaperPath(wallpaper) {
  return `/wallpapers/${wallpaper.id}-${getWallpaperSlug(wallpaper)}`;
}

export function getWallpaperDescription(wallpaper) {
  const title = getWallpaperTitle(wallpaper);
  const photographer = wallpaper?.photographer || "Pexels creator";
  const width = wallpaper?.width || "high";
  const height = wallpaper?.height || "resolution";

  return `Download ${title} in ${width}x${height} resolution. Photo by ${photographer}, optimized for wallpaper browsing and fast previews on ${SITE_NAME}.`;
}

export function getListingMetadata({
  collectionLabel,
  collectionType,
  totalItems,
}) {
  if (!collectionLabel) {
    return {
      title: `${SITE_NAME} | Curated HD and 4K Wallpapers`,
      description:
        "Browse curated HD and 4K wallpapers with fast search, lightweight image delivery, and detail pages optimized for sharing and discovery.",
    };
  }

  const collectionName = collectionLabel.trim();
  const collectionPrefix = collectionType === "tag" ? "Tag" : "Collection";
  const countFragment = totalItems
    ? ` Explore ${totalItems} wallpapers on this page.`
    : " Explore fresh wallpapers updated from Pexels.";

  return {
    title: `${collectionName} Wallpapers | ${SITE_NAME}`,
    description: `${collectionPrefix} page for ${collectionName.toLowerCase()} wallpapers with clean previews, lazy-loaded imagery, and download-ready detail pages.${countFragment}`,
  };
}

export function getWallpaperMetadata(wallpaper) {
  const title = `${getWallpaperTitle(wallpaper)} | ${SITE_NAME}`;

  return {
    title,
    description: getWallpaperDescription(wallpaper),
    image:
      wallpaper?.src?.large2x ||
      wallpaper?.src?.large ||
      wallpaper?.src?.medium,
  };
}

export { SITE_NAME };
