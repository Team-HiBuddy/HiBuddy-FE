import { HIBUDDY_BASE_URL } from "@constants/api";
import { http } from "./axios";
import { GetProfileResponse } from "@models/user";

export const getProfile = () => {
  return http.get<GetProfileResponse>(`${HIBUDDY_BASE_URL}/v1/users/me`);
};
