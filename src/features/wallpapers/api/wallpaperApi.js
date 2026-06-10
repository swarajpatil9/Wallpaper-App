import axiosInstance from "../../../services/axiosInstance.js";
import { PEXELS_ENDPOINTS } from "../constants/pexelsEndpoints.js";

function normalizeError(error, fallbackMessage) {
  if (error instanceof Error && error.message) {
    return new Error(error.message);
  }

  const message =
    error?.response?.data?.error ||
    error?.response?.data?.message ||
    fallbackMessage;

  return new Error(message);
}

export const wallpaperApi = {
  async getWallpapers(page = 1, perPage = 20) {
    try {
      const response = await axiosInstance.get(PEXELS_ENDPOINTS.CURATED, {
        params: { page, per_page: perPage },
      });
      return response.data;
    } catch (error) {
      throw normalizeError(error, "Failed to fetch curated wallpapers");
    }
  },

  async searchWallpapers(query, page = 1, perPage = 20) {
    try {
      const response = await axiosInstance.get(PEXELS_ENDPOINTS.SEARCH, {
        params: { query, page, per_page: perPage },
      });
      return response.data;
    } catch (error) {
      throw normalizeError(error, "Failed to search wallpapers");
    }
  },

  async getWallpaperById(photoId) {
    try {
      const response = await axiosInstance.get(
        PEXELS_ENDPOINTS.PHOTO_DETAILS(photoId),
      );
      return response.data;
    } catch (error) {
      throw normalizeError(error, "Failed to fetch wallpaper details");
    }
  },
};