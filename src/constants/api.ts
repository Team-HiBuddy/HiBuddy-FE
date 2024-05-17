export const LOCAL_BASE_URL = "http://localhost:5173/hibuddy/v1";

export const HIBUDDY_BASE_URL = "https://hibuddy/v1";

const KAKAO_CLIENT_ID = "badeb291be382d61336b18b4b854874b";
const GOOGLE_CLIENT_ID = `754504914348-5vrksn2srattrm5kq4p9pquc765fn2bl.apps.googleusercontent.com`;

const KAKAO_REDIRECT_URI = "http://localhost:5173/login/oauth2/code/kakao";
const GOOGLE_REDIRECT_URI = "http://localhost:5173/login/oauth2/code/google";

const KAKAO_LOGIN_PARAMS = new URLSearchParams({
  response_type: "code",
  client_id: KAKAO_CLIENT_ID,
  redirect_uri: KAKAO_REDIRECT_URI,
});

const GOOGLE_LOGIN_PARAMS = new URLSearchParams({
  response_type: "code",
  client_id: GOOGLE_CLIENT_ID,
  redirect_uri: GOOGLE_REDIRECT_URI,
});

export const KAKAO_AUTHORIZATION_CODE_ISSUANCE_URL = `https://kauth.kakao.com/oauth/authorize?${KAKAO_LOGIN_PARAMS.toString()}`;

export const GOOGLE_AUTHORIZATION_CODE_ISSUANCE_URL = `https://accounts.google.com/o/oauth2/auth?${GOOGLE_LOGIN_PARAMS.toString()}`;
