import { http } from "@apis/axios";

export const issueLoginToken = async (authCode: string) =>
  await http.get(`/auth/kakao/login?code=${authCode}`);
