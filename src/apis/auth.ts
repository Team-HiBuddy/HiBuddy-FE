import { http } from "@apis/axios";

export const REISSUE_TOKEN_URL = "v1/auth/reissue";

export const issueLoginToken = async (provider: "kakao" | "google", authCode: string) => {
  return await http.post(`/v1/auth/${provider}/login?code=${authCode}`);
};

export const reissueToken = async () => {
  return await http.post(REISSUE_TOKEN_URL);
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

  await reissueToken();

  return Boolean(http.defaults.headers.common["authorization"]);
};
