import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.pexels.com/v1",
  headers: {
    Authorization: import.meta.env.VITE_PEXELS_API_KEY,
  },
  timeout: 12000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const apiMessage =
      error?.response?.data?.error || error?.response?.data?.message;

    let message = apiMessage || error?.message || "Request failed";

    if (status === 401) message = "Invalid Pexels API key.";
    if (status === 403) message = "Pexels access denied.";
    if (status === 404) message = "Requested resource not found.";
    if (status >= 500) message = "Pexels server error. Try again later.";

    return Promise.reject(new Error(message));
  },
);

export default axiosInstance;