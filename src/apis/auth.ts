import { http } from "@apis/axios";

export const issueLoginToken = async (authCode: string) =>
  await http.get(`/auth/kakao/login?code=${authCode}`);

export const setAccessToken = (token: string) => {
  http.defaults.headers.common["authorization"] = token;
};

export const removeAccessToken = () => {
  delete http.defaults.headers.common["authorization"];
};
