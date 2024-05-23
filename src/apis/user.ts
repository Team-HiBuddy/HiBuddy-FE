import { HIBUDDY_BASE_URL } from "@constants/api";
import { http } from "./axios";
import { GetProfileResponse, patchNickNameRequest } from "@models/user";
import { ResponseBody } from "@models/api";

export const getProfile = () => {
  return http.get<GetProfileResponse>(`${HIBUDDY_BASE_URL}/v1/users/me`);
};

export const patchNickname = (data: patchNickNameRequest) => {
  return http.patch<ResponseBody>(`${HIBUDDY_BASE_URL}/v1/users/me/nickname`, data);
};
