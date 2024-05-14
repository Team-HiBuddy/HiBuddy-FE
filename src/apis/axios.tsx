import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HIBUDDY_BASE_URL } from "@constants/api";
import { setAccessToken } from "./auth";

const axiosInstance = axios.create({
  baseURL: HIBUDDY_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export interface HttpClient extends AxiosInstance {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  delete<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
}

export const http: HttpClient = axiosInstance;

http.interceptors.response.use(
  (response) => {
    if (response.headers["authorization"]) {
      setAccessToken(response.headers["authorization"]);
    }

    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
