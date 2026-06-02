export const WALLPAPER_CATEGORIES = [
  {
    slug: "nature",
    label: "Nature",
    query: "nature landscape wallpaper",
  },
  {
    slug: "minimal",
    label: "Minimal",
    query: "minimal wallpaper",
  },
  {
    slug: "cyberpunk",
    label: "Cyberpunk",
    query: "cyberpunk wallpaper",
  },
  {
    slug: "architecture",
    label: "Architecture",
    query: "architecture wallpaper",
  },
];

export const WALLPAPER_TAGS = [
  {
    slug: "4k",
    label: "4K",
    query: "4k wallpaper",
  },
  {
    slug: "mobile",
    label: "Mobile",
    query: "mobile wallpaper",
  },
  {
    slug: "desktop",
    label: "Desktop",
    query: "desktop wallpaper",
  },
  {
    slug: "amoled",
    label: "AMOLED",
    query: "amoled wallpaper",
  },
];

export function findDiscoveryEntry(collectionType, slug) {
  const source =
    collectionType === "tag" ? WALLPAPER_TAGS : WALLPAPER_CATEGORIES;

  return source.find((entry) => entry.slug === slug) ?? null;
}
