import axios, { isAxiosError } from "axios";
import type { AxiosInstance } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import type { ApiError } from "../types";

export const API_BASE_URL = "http://localhost:3000";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const getImageUrl = (path: string) => `${API_BASE_URL}${path}`;

export function getErrorMessage(err: unknown, fallback: string): string {
  if (isAxiosError<ApiError>(err)) {
    const message = err.response?.data?.message;
    return Array.isArray(message) ? message.join(", ") : message ?? fallback;
  }
  return fallback;
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError<ApiError>(error)) {
      const status = error.response?.status;
      const requestUrl = error.config?.url ?? "";
      const isAuthRequest = requestUrl.includes("/auth/login");

      if (status === 401 && !isAuthRequest) {
        localStorage.removeItem("token");
        if (window.location.pathname !== "/login") {
          toast.error("Session expired. Please log in again.");
          window.location.assign("/login");
        }
      }

      if (status === 429) {
        toast.error("Too many requests, try later.");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
