# Wallscape

Wallscape is a modern wallpaper discovery app built with React + Vite. It uses the Pexels API for curated/searchable wallpapers, includes SEO-friendly routes, supports light/dark themes, and provides authenticated user flows with Clerk.

## Features

- Curated and search-based wallpaper discovery
- Category and tag routes for SEO-friendly listing pages
- Dedicated wallpaper details pages with metadata and download actions
- Favorite wallpapers support (gallery card + details + dashboard)
- User auth and profile management with Clerk
- Theme toggle with persisted light/dark preference
- Auto-generated `sitemap.xml` and `robots.txt` during production build

## Tech Stack

- React 19
- Vite 8
- React Router 7
- Tailwind CSS 4
- Axios
- Framer Motion
- Clerk

## Project Structure

```text
src/
	components/
		common/
		layout/
	features/
		wallpapers/
			api/
			components/
			constants/
			hooks/
			utils/
	pages/
		Home/
		Login/
		WallpaperDetails/
	services/
	utils/
scripts/
	generate-sitemap.mjs
```

## Prerequisites

- Node.js 20+ (recommended)
- npm 10+
- A Pexels API key
- A Clerk application (publishable key)

## Environment Variables

Create a `.env.local` file in the project root:

```bash
VITE_PEXELS_API_KEY=your_pexels_api_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_SITE_URL=https://your-domain.com
```

Notes:

- `VITE_PEXELS_API_KEY` is required for API calls.
- `VITE_CLERK_PUBLISHABLE_KEY` is required to boot auth.
- `VITE_SITE_URL` is used by sitemap/robots generation. If omitted, the script falls back to `https://example.com`.

## Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Lint the codebase:

```bash
npm run lint
```

## Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build app and generate sitemap/robots
- `npm run preview` - Preview built app
- `npm run lint` - Run ESLint checks

## Deployment (Vercel)

This repository is configured for Vercel SPA routing via `vercel.json` rewrite to `index.html`.

### Steps

1. Import the repository in Vercel.
2. Set the project environment variables:
   - `VITE_PEXELS_API_KEY`
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `VITE_SITE_URL` (your production URL)
3. Use default Vercel build settings (Vite is auto-detected):
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

## SEO Notes

- Dynamic metadata is set for listing and detail pages.
- `robots.txt` and `sitemap.xml` are generated from static routes + curated wallpaper detail routes.
- Auth/private routes are marked `noindex,nofollow` in runtime metadata.

## Favorites Behavior

- Favorites are stored in `localStorage` under `favorite-wallpapers`.
- Legacy keys are supported for backward compatibility reads.
- Favorites stay in sync across views via a custom browser event.

## Security and Keys

- Do not commit real API keys or secrets.
- Keep environment values in `.env.local` (local) and Vercel Project Environment Variables (production).

## License

Add your preferred license (for example MIT) in a `LICENSE` file.
