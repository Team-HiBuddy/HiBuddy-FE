import {
  GetPopularThreadsResponse,
  PatchThreadRequest,
  PostThreadImagesResponse,
  PostThreadRequest,
  PostThreadResponse,
} from "models/thread";
import { http } from "./axios";
import { ResponseBody } from "@models/api";
import { PostOnboardingRequest } from "@models/user";

export const getPopularThreads = () => {
  return http.get<GetPopularThreadsResponse>("v1/posts/ranking");
};

export const postThreadImages = (images: FileList) => {
  const formData = new FormData();

  Array.from(images).forEach((image) => {
    formData.append("fileList", image);
  });

  return http.post<PostThreadImagesResponse>("/v1/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const postThread = (thread: PostThreadRequest) => {
  return http.post<PostThreadResponse>("/v1/thread/posts", thread);
};

export const cancelImageUpload = (imageId: number) => {
  return http.delete<ResponseBody>(`/v1/images/${imageId}/cancel`);
};

export const deletePost = (postId: number) => {
  return http.delete<ResponseBody>(`/v1/thread/posts/${postId}`);
};

export const postOnboarding = (data: PostOnboardingRequest) => {
  return http.post<ResponseBody>("/v1/onboarding", data);
};

export const patchThread = (postId: number, thread: PatchThreadRequest) => {
  return http.patch<ResponseBody>(`/v1/thread/posts/${postId}`, thread);
};
