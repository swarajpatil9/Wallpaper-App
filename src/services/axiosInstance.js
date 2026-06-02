import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.pexels.com/v1",
  headers: {
    Authorization: import.meta.env.VITE_PEXELS_API_KEY,
  },
});

export default axiosInstance;
