import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  WALLPAPER_CATEGORIES,
  WALLPAPER_TAGS,
} from "../src/features/wallpapers/constants/discoveryRoutes.js";
import { getWallpaperPath } from "../src/features/wallpapers/utils/wallpaperSeo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const siteUrl = (process.env.VITE_SITE_URL || "https://example.com").replace(
  /\/$/,
  "",
);
const apiKey = process.env.VITE_PEXELS_API_KEY;

function toAbsoluteUrl(pathname) {
  return `${siteUrl}${pathname}`;
}

function createUrlEntry(pathname, priority = "0.7", changefreq = "weekly") {
  return [
    "  <url>",
    `    <loc>${toAbsoluteUrl(pathname)}</loc>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

async function fileExists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function fetchCuratedWallpapers() {
  if (!apiKey) {
    return [];
  }

  const urls = new Map();

  for (const page of [1, 2, 3]) {
    const response = await fetch(
      `https://api.pexels.com/v1/curated?page=${page}&per_page=40`,
      {
        headers: {
          Authorization: apiKey,
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Sitemap generation failed with status ${response.status}`,
      );
    }

    const payload = await response.json();

    for (const photo of payload.photos ?? []) {
      urls.set(getWallpaperPath(photo), photo);
    }
  }

  return [...urls.keys()];
}

function buildSitemapXml(paths) {
  const urlEntries = paths.map((entry) =>
    createUrlEntry(entry.pathname, entry.priority, entry.changefreq),
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urlEntries,
    "</urlset>",
    "",
  ].join("\n");
}

function buildRobotsTxt() {
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /dashboard",
    "Disallow: /profile",
    "Disallow: /sign-in",
    "Disallow: /sign-up",
    "Disallow: /forgot-password",
    "Disallow: /verify-email",
    `Sitemap: ${toAbsoluteUrl("/sitemap.xml")}`,
    "",
  ].join("\n");
}

async function writeAsset(relativePath, content) {
  const publicPath = path.join(projectRoot, "public", relativePath);
  const distPath = path.join(projectRoot, "dist", relativePath);

  await mkdir(path.dirname(publicPath), { recursive: true });
  await writeFile(publicPath, content, "utf8");

  if (await fileExists(path.join(projectRoot, "dist"))) {
    await mkdir(path.dirname(distPath), { recursive: true });
    await writeFile(distPath, content, "utf8");
  }
}

async function main() {
  const staticPaths = [
    { pathname: "/", priority: "1.0", changefreq: "daily" },
    ...WALLPAPER_CATEGORIES.map((category) => ({
      pathname: `/discover/${category.slug}`,
      priority: "0.8",
      changefreq: "weekly",
    })),
    ...WALLPAPER_TAGS.map((tag) => ({
      pathname: `/topics/${tag.slug}`,
      priority: "0.8",
      changefreq: "weekly",
    })),
  ];

  const wallpaperPaths = await fetchCuratedWallpapers();
  const sitemapXml = buildSitemapXml([
    ...staticPaths,
    ...wallpaperPaths.map((pathname) => ({
      pathname,
      priority: "0.7",
      changefreq: "weekly",
    })),
  ]);

  await writeAsset("sitemap.xml", sitemapXml);
  await writeAsset("robots.txt", buildRobotsTxt());
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
