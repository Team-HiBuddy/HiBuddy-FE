import {
  DeleteThreadCommentRequest,
  GetPopularThreadsResponse,
  GetThreadCommentsResponse,
  GetThreadListResponse,
  GetThreadResponse,
  PatchThreadCommentRequest,
  PatchThreadRequest,
  PostThreadCommentRequest,
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

export const saveThread = (postId: number) => {
  return http.post<ResponseBody>(`/v1/thread/posts/${postId}/scraps`);
};

export const unsaveThread = (postId: number) => {
  return http.delete<ResponseBody>(`/v1/thread/posts/${postId}/scraps`);
};

export const getThreadList = (page: number) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "5",
    sort: "created_at.desc",
  });

  return http.get<GetThreadListResponse>(`/v1/thread/posts?${params.toString()}`);
};

export const getThreadComments = (postId: number, page: number) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "10",
    sort: "created_at.asc",
  });

  return http.get<GetThreadCommentsResponse>(
    `/v1/thread/posts/${postId}/comments?${params.toString()}`
  );
};

export const postThreadComment = (data: PostThreadCommentRequest) => {
  return http.post<ResponseBody>(`v1/thread/posts/${data.postId}/comments`, data.comment);
};

export const deleteThreadComment = (data: DeleteThreadCommentRequest) => {
  return http.delete<ResponseBody>(`v1/thread/posts/${data.postId}/comments/${data.commentId}`);
};

export const patchThreadComment = (data: PatchThreadCommentRequest) => {
  return http.patch<ResponseBody>(
    `v1/thread/posts/${data.postId}/comments/${data.commentId}`,
    data.comment
  );
};
