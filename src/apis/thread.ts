import {
  GetPopularThreadsResponse,
  GetThreadResponse,
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

export const postThreadImages = async (images: FileList) => {
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

export const deleteThread = (postId: number) => {
  return http.delete<ResponseBody>(`/v1/thread/posts/${postId}`);
};

export const postOnboarding = (data: PostOnboardingRequest) => {
  return http.post<ResponseBody>("/v1/onboarding", data);
};

export const patchThread = (thread: PatchThreadRequest) => {
  return http.patch<ResponseBody>(`/v1/thread/posts/${thread.postId}`, {
    title: thread.title,
    content: thread.content,
    imageIds: thread.imageIds,
  });
};

export const getThread = (postId: number) => {
  return http.get<GetThreadResponse>(`v1/thread/posts/${postId}`);
};

export const likeThread = (postId: number) => {
  return http.post<ResponseBody>(`/v1/thread/posts/${postId}/likes`);
};

export const unlikeThread = (postId: number) => {
  return http.delete<ResponseBody>(`/v1/thread/posts/${postId}/likes`);
};
