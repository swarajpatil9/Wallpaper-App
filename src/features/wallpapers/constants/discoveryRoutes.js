export const WALLPAPER_CATEGORIES = [
  { slug: "nature", label: "Nature", query: "nature landscape wallpaper" },
  { slug: "minimal", label: "Minimal", query: "minimal wallpaper" },
  { slug: "cyberpunk", label: "Cyberpunk", query: "cyberpunk wallpaper" },
  { slug: "architecture", label: "Architecture", query: "architecture wallpaper" },
  { slug: "abstract", label: "Abstract", query: "abstract wallpaper" },
  { slug: "anime", label: "Anime", query: "anime wallpaper" },
  { slug: "cars", label: "Cars", query: "car wallpaper" },
  { slug: "space", label: "Space", query: "space wallpaper" },
  { slug: "mountains", label: "Mountains", query: "mountain wallpaper" },
  { slug: "ocean", label: "Ocean", query: "ocean wallpaper" },
  { slug: "gaming", label: "Gaming", query: "gaming wallpaper" },
  { slug: "dark", label: "Dark", query: "dark aesthetic wallpaper" },
];

export const WALLPAPER_TAGS = [
  { slug: "4k", label: "4K", query: "4k wallpaper" },
  { slug: "mobile", label: "Mobile", query: "mobile wallpaper" },
  { slug: "desktop", label: "Desktop", query: "desktop wallpaper" },
  { slug: "amoled", label: "AMOLED", query: "amoled wallpaper" },
  { slug: "ultrawide", label: "Ultrawide", query: "ultrawide wallpaper" },
  { slug: "portrait", label: "Portrait", query: "portrait wallpaper" },
  { slug: "neon", label: "Neon", query: "neon wallpaper" },
  { slug: "hd", label: "HD", query: "hd wallpaper" },
];

export function findDiscoveryEntry(collectionType, slug) {
  const source =
    collectionType === "tag" ? WALLPAPER_TAGS : WALLPAPER_CATEGORIES;

  return source.find((entry) => entry.slug === slug) ?? null;
}