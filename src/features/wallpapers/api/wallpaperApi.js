import axiosInstance from "../../../services/axiosInstance.js";
import { PEXELS_ENDPOINTS } from "../constants/pexelsEndpoints.js";

export const wallpaperApi = {
  async getWallpapers(page = 1, perPage = 20) {
    const response = await axiosInstance.get(PEXELS_ENDPOINTS.CURATED, {
      params: {
        page,
        per_page: perPage,
      },
    });

    return response.data;
  },
};