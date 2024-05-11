import { GetPopularThreadsResponse, PostThreadImagesResponse } from "models/thread";
import { http } from "./axios";

export const getPopularThreads = () => {
  return http.get<GetPopularThreadsResponse>("/posts/ranking");
};

export const postThreadImages = (images: FileList) => {
  const formData = new FormData();

  Array.from(images).forEach((image) => {
    formData.append("fileList", image);
  });

  return http.post<PostThreadImagesResponse>("/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
