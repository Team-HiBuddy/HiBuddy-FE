import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HIBUDDY_BASE_URL, KAKAO_ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "constants/api";

const axiosInstance = axios.create({
  baseURL: HIBUDDY_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axios.interceptors.response.use(
  function (response) {
    const jwt = response.headers.getAuthorization;

    if (jwt) {
      localStorage.setItem(KAKAO_ACCESS_TOKEN_LOCAL_STORAGE_KEY, jwt.toString());
    }

    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export interface HttpClient extends AxiosInstance {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
}

export const http: HttpClient = axiosInstance;

http.interceptors.response.use((res) => res.data);
