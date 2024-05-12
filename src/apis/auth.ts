import { http } from "@apis/axios";
import { KAKAO_ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@constants/api";
import { AxiosResponse } from "axios";

export const issueLoginToken = async (authCode: string) =>
  await http.get(`/auth/kakao/login?code=${authCode}`);

export const getAccessToken = () => localStorage.getItem(KAKAO_ACCESS_TOKEN_LOCAL_STORAGE_KEY);

export const saveAccessToken = (response: AxiosResponse) => {
  const jwt = response.headers["Authorization"];

  if (!jwt) {
    console.error("cat't find JWT.");

    return;
  }

  localStorage.setItem(KAKAO_ACCESS_TOKEN_LOCAL_STORAGE_KEY, jwt.toString());
};
