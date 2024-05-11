import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HIBUDDY_BASE_URL, KAKAO_ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@constants/api";

const axiosInstance = axios.create({
  baseURL: HIBUDDY_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export interface HttpClient extends AxiosInstance {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
}

export const http: HttpClient = axiosInstance;

http.interceptors.response.use(
  (response) => {
    const jwt = response.headers.authorization;

    if (jwt) {
      localStorage.setItem(KAKAO_ACCESS_TOKEN_LOCAL_STORAGE_KEY, jwt.toString());
    }

    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
