import { HIBUDDY_BASE_URL } from "@constants/api";
import { http } from "./axios";
import {
  GetMyThreadListResponse,
  GetProfileResponse,
  GetSavedThreadListResponse,
  PatchNickNameRequest,
  PatchProfileImageRequest,
} from "@models/user";
import { ResponseBody } from "@models/api";

export const getProfile = () => {
  return http.get<GetProfileResponse>(`${HIBUDDY_BASE_URL}/v1/users/me`);
};

export const patchNickname = (data: PatchNickNameRequest) => {
  return http.patch<ResponseBody>(`${HIBUDDY_BASE_URL}/v1/users/me/nickname`, data);
};

export const patchProfileImage = (data: PatchProfileImageRequest) => {
  const formData = new FormData();

  formData.append("file", data.image);

  return http.patch<ResponseBody>("/v1/users/me/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getCountries = () => {
  return http.get<string[]>(`${HIBUDDY_BASE_URL}/v1/info/countries`);
};

export const getMajors = () => {
  return http.get<string[]>(`${HIBUDDY_BASE_URL}/v1/info/majors`);
};

export const getMyThreadList = (page: number) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "5",
    sort: "created_at.desc",
  });

  return http.get<GetMyThreadListResponse>(`/v1/users/me/posts?${params.toString()}`);
};

export const getSavedThreadList = (page: number) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "5",
    sort: "created_at.desc",
  });

  return http.get<GetSavedThreadListResponse>(`/v1/users/me/posts/scraps?${params.toString()}`);
};
