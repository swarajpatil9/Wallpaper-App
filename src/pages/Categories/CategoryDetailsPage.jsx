import { useParams } from "react-router-dom";

import useWallpapers from "../../features/wallpapers/hooks/useWallpapers";
import WallpaperGrid from "../../features/wallpapers/components/WallpaperGrid";

function CategoryDetailsPage() {
  const { slug } = useParams();

  const { wallpapers, loading, error, retry } = useWallpapers({
    seedQuery: slug,
  });

  const pageTitle = slug?.charAt(0).toUpperCase() + slug?.slice(1);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">{pageTitle} Wallpapers</h1>

        <p>Loading wallpapers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">{pageTitle} Wallpapers</h1>

        <p className="text-red-500 mb-4">{error}</p>

        <button
          onClick={retry}
          className="
            px-4
            py-2
            rounded-lg
            border
          "
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{pageTitle} Wallpapers</h1>

        <p className="text-gray-500 mt-2">
          Browse {pageTitle} wallpapers from Pexels.
        </p>
      </div>

      <WallpaperGrid wallpapers={wallpapers} />
    </div>
  );
}

export default CategoryDetailsPage;
