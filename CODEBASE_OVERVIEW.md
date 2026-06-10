# Codebase Overview

This document is the quickest way to understand how the wallpaper app is structured, how requests move through the app, and which files matter most when making changes.

## What the app is

This is a Vite + React wallpaper gallery called Wallscape. It pulls curated wallpaper data from Pexels, lets users browse by search, category, and tag, and provides SEO-aware detail pages for each wallpaper.

The project also includes Clerk-based authentication for sign-in, sign-up, profile, and password recovery flows.

## Main stack

- React 19
- Vite 8
- React Router
- Clerk React SDK
- Tailwind CSS 4
- Axios
- Framer Motion

## High-level runtime flow

1. `src/main.jsx` mounts the app.
2. `ThemeProvider` wraps the app so dark/light state is available globally.
3. `src/Root.jsx` adds `ClerkProvider` and `BrowserRouter`.
4. `src/App.jsx` defines the route table and lazy-loads page components.
5. Pages compose feature hooks and UI components from `src/features/wallpapers`.

## Routing model

The app is route-driven rather than modal-driven.

Public routes:

- `/` for the main gallery
- `/discover/:categorySlug` for category views
- `/topics/:tagSlug` for tag views
- `/wallpapers/:wallpaperId`
- `/wallpapers/:wallpaperId-:wallpaperSlug`

Auth routes:

- `/sign-in/*`
- `/sign-up/*`
- `/forgot-password`
- `/verify-email/*`

Protected routes:

- `/dashboard`
- `/profile/*`

Route protection is handled by `src/components/common/ProtectedRoute.jsx`, and route fallback UI is handled by `RouteFallback.jsx`.

## Feature layout

### Wallpaper feature

The wallpaper feature is the core of the app and lives under `src/features/wallpapers`.

- `api/` contains the Pexels data access layer.
- `components/` contains gallery, search, pagination, skeleton, error, and empty-state UI.
- `hooks/` contains data-fetching and metadata hooks.
- `constants/` contains discovery route definitions and endpoint configuration.
- `utils/` contains slug helpers and SEO helpers.

### Pages

- `src/pages/Home/HomePage.jsx` drives the main gallery experience, discovery chips, search, sorting, and pagination.
- `src/pages/WallpaperDetails/WallpaperDetailsPage.jsx` resolves the wallpaper ID, fetches details, and renders download and metadata information.
- `src/pages/Login/` contains the Clerk-related auth screens and the custom forgot-password flow.

### Shared UI

- `src/components/common/` contains theme, auth, and generic route helpers.
- `src/components/layout/Navbar.jsx` is the top-level navigation.

## Data flow

### Gallery page

`HomePage.jsx` does most of the orchestration for browsing wallpapers.

- It reads the current route params.
- It resolves the active discovery entry from `discoveryRoutes.js`.
- It calls `useWallpapers()` with a seed query based on the current route.
- It uses `usePagination()` to slice the loaded result set into pages.
- It uses `useDocumentMetadata()` to keep title and description in sync with the active collection.

The rendered grid is handled by `WallpaperGrid.jsx`, which switches between loading, error, empty, and populated states.

### Detail page

`WallpaperDetailsPage.jsx` follows a similar pattern.

- It parses the wallpaper ID from the route.
- It fetches the full wallpaper payload through `useWallpaperDetails()`.
- It redirects to the canonical slugged path when the URL is incomplete.
- It updates metadata with `getWallpaperMetadata()` and `useDocumentMetadata()`.

## SEO and metadata

This app is explicitly built around search-friendly pages.

- `src/features/wallpapers/utils/wallpaperSeo.js` creates titles, descriptions, canonical paths, and image metadata.
- `src/features/wallpapers/hooks/useDocumentMetadata.js` updates document metadata on route change.
- `src/App.jsx` also toggles the robots meta tag so auth and private pages are not indexed.
- `index.html` ships with Open Graph and Twitter metadata for the landing page.
- `scripts/generate-sitemap.mjs` writes `public/sitemap.xml` and `public/robots.txt`.

## Authentication and identity

Clerk is wired at the root level in `src/Root.jsx`.

Important details:

- The app requires `VITE_CLERK_PUBLISHABLE_KEY` at startup.
- `getClerkAppearance(theme)` is used so the Clerk UI matches the app theme.
- Signed-out flows live under route-based pages instead of a popup flow.
- The app uses a protected route wrapper instead of scattering auth checks across pages.

## Environment variables

Expected variables:

- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_PEXELS_API_KEY`
- `VITE_SITE_URL`

Operational notes:

- `VITE_CLERK_PUBLISHABLE_KEY` is required by `src/Root.jsx`.
- `VITE_PEXELS_API_KEY` is used by the sitemap generator.
- `VITE_SITE_URL` is used to build absolute URLs for sitemap and robots output.

## Build and scripts

Defined in `package.json`:

- `npm run dev` starts Vite.
- `npm run build` runs the Vite production build and then regenerates sitemap and robots files.
- `npm run lint` runs ESLint.
- `npm run preview` serves the production build locally.

## Files worth knowing first

- `src/App.jsx` for route behavior and SEO indexing rules.
- `src/Root.jsx` for root providers and Clerk setup.
- `src/pages/Home/HomePage.jsx` for the main gallery experience.
- `src/pages/WallpaperDetails/WallpaperDetailsPage.jsx` for detail-page logic.
- `src/features/wallpapers/api/wallpaperApi.js` for API access.
- `src/features/wallpapers/hooks/useWallpapers.js` for gallery data loading.
- `src/features/wallpapers/hooks/useWallpaperDetails.js` for detail fetches.
- `src/features/wallpapers/utils/wallpaperSeo.js` for canonical path and metadata generation.
- `scripts/generate-sitemap.mjs` for search-engine-facing assets.

## Notable implementation choices

- The route tree is lazy-loaded to keep the initial bundle small.
- The app uses SEO-friendly wallpaper detail URLs with both ID-only and slugged variants.
- Empty, loading, and error states are first-class UI states in the gallery.
- The visual system is intentionally dark and high-contrast with amber and zinc accents.
- Clerk branding is disabled in the current configuration.

## Things to know before changing code

- Keep the slug generation logic and route definitions in sync. Detail pages depend on canonical path redirects.
- If you change wallpaper metadata, update both the page-level metadata hook and the SEO utility helpers.
- If you change discovery routes, update the sitemap generator and any UI chips that render categories or tags.
- If you change protected routes, make sure the robots meta behavior in `src/App.jsx` still matches the exposure you want.
- If you change the sitemap generator, remember that it writes to both `public/` and `dist/` when a build output directory exists.

## Current cleanup note

The repository had two empty source folders that were not used by the app and have been removed:

- `src/routes`
- `src/styles`

That cleanup does not change runtime behavior.
