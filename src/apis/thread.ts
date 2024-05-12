import {
  GetPopularThreadsResponse,
  PostThreadImagesResponse,
  PostThreadRequest,
  PostThreadResponse,
} from "models/thread";
import { http } from "./axios";
import { ResponseBody } from "@models/api";

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

export const postThread = (thread: PostThreadRequest) => {
  return http.post<PostThreadResponse>("/thread/posts", thread);
};

export const deleteThreadImage = (imageId: number) => {
  return http.delete<ResponseBody>(`/image/delete/${imageId}`);
};
