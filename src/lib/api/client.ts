import axios from "axios";
import type { AxiosResponse } from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access");
    } else if (error.response?.status === 500) {
      console.error("Server error");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
