import { http } from "@apis/axios";

export type OAuthProvider = "kakao" | "google";

export const LOCAL_STORAGE_KEY_OAUTH_PROVIDER = "provider";

export const REISSUE_TOKEN_URL = {
  KAKAO: "/v1/auth/kakao/reissue",
  GOOGLE: "/v1/auth/google/reissue",
};

export const setOAuthProvider = (provider: OAuthProvider) => {
  localStorage.setItem(LOCAL_STORAGE_KEY_OAUTH_PROVIDER, provider);
};

export const getOauthProvider = (): OAuthProvider | null => {
  try {
    const item = localStorage.getItem(LOCAL_STORAGE_KEY_OAUTH_PROVIDER);

    if (!item) {
      throw new Error("No login history.");
    }

    const provider = item as OAuthProvider;

    return provider;
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const issueLoginToken = async (authCode: string) => {
  const provider = getOauthProvider();

  if (provider) {
    return await http.post(`/v1/auth/${provider}/login?code=${authCode}`);
  }
};

export const reissueToken = async () => {
  try {
    const provider = getOauthProvider();

    if (provider === "kakao") {
      return await http.post(REISSUE_TOKEN_URL.KAKAO);
    }

    if (provider === "google") {
      return await http.post(REISSUE_TOKEN_URL.GOOGLE);
    }

    throw new Error("Unable to reissue token.");
  } catch (error) {
    console.error(error);
  }
};

export const setAccessToken = (token: string) => {
  http.defaults.headers.common["authorization"] = token;
};

export const removeAccessToken = () => {
  http.defaults.headers.common["authorization"] = null;

  localStorage.removeItem(LOCAL_STORAGE_KEY_OAUTH_PROVIDER);
};

export const isLogin = async () => {
  if (http.defaults.headers.common["authorization"]) {
    return true;
  }

  await reissueToken();

  return Boolean(http.defaults.headers.common["authorization"]);
};
