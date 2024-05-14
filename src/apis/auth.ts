import { http } from "@apis/axios";

export const REISSUE_TOKEN_URL = "/auth/kakao/reissue";

export const issueLoginToken = async (authCode: string) =>
  await http.post(`/auth/kakao/login?code=${authCode}`);

export const reissueToken = async () => await http.post(REISSUE_TOKEN_URL);

export const setAccessToken = (token: string) => {
  http.defaults.headers.common["authorization"] = token;
};

export const removeAccessToken = () => {
  http.defaults.headers.common["authorization"] = null;
};

export const isLogin = () => Boolean(http.defaults.headers.common["authorization"]);
