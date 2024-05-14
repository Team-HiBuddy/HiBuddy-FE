export const LOCAL_BASE_URL = "http://localhost:8080/hibuddy/v1";

export const HIBUDDY_BASE_URL = "https://hibuddy/v1";

export const KAKAO_CLIENT_ID = "badeb291be382d61336b18b4b854874b";

export const KAKAO_REDIRECT_URI = "http://localhost:5173/auth/kakao/callback";

export const KAKAO_ACCESS_TOKEN_LOCAL_STORAGE_KEY = "kakaoAccessToken";

export const KAKAO_LOGIN_PARAMS = new URLSearchParams({
  response_type: "code",
  client_id: KAKAO_CLIENT_ID,
  redirect_uri: KAKAO_REDIRECT_URI,
});
