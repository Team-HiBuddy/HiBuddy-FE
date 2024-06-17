import { http } from "@apis/axios";
import { getProfile } from "./user";
import { ResponseBody } from "@models/api";

export const REISSUE_TOKEN_URL = "v1/auth/reissue";

export const issueLoginToken = async (provider: "kakao" | "google", authCode: string) => {
  return await http.post<ResponseBody>(`/v1/auth/login/${provider}?code=${authCode}`);
};

export const reissueToken = async () => {
  return await http.post<ResponseBody>(REISSUE_TOKEN_URL);
};

export const logout = async () => {
  return await http.post<ResponseBody>("/v1/auth/logout");
};

export const deleteAccount = async () => {
  return await http.delete<ResponseBody>("/v1/users/me");
};

export const setAccessToken = (token: string) => {
  http.defaults.headers.common["authorization"] = token;
};

export const removeAccessToken = () => {
  http.defaults.headers.common["authorization"] = null;
};

export const isLogin = async () => {
  if (http.defaults.headers.common["authorization"]) {
    return true;
  }

  try {
    await reissueToken();
  } catch (error) {
    return false;
  }

  return Boolean(http.defaults.headers.common["authorization"]);
};

export const isOnboarded = async () => {
  const {
    result: { nickname, country, major },
  } = await getProfile();

  if ([nickname, country, major].some((value) => value === null || value === undefined)) {
    return false;
  }

  return true;
};
