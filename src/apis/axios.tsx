import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { HIBUDDY_BASE_URL } from "@constants/api";
import { REISSUE_TOKEN_URL, reissueToken, removeAccessToken, setAccessToken } from "./auth";

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
  async (error: AxiosError) => {
    const { config, response } = error;

    if (
      config?.url &&
      response?.status === 401 &&
      !Object.values(REISSUE_TOKEN_URL).includes(config.url)
    ) {
      removeAccessToken();

      await reissueToken();

      return http.request(config);
    }

    return Promise.reject(error);
  }
);
