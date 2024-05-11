import { GetPopularThreadsResponse } from "models/thread";
import { http } from "./axios";

export const getPopularThreads = () => {
  return http.get<GetPopularThreadsResponse>("/posts/ranking");
};
