import { HIBUDDY_BASE_URL } from "@constants/api";
import { delay, http, HttpResponse } from "msw";
import getProfileResponse from "../data/getProfileResponse.json";
import successfulResponse from "../data/successfulResponse.json";

export const userHandlers = [
  http.post(`${HIBUDDY_BASE_URL}/v1/auth/kakao/login`, async () => {
    await delay(2000);

    return new HttpResponse("OK", {
      status: 201,
      headers: {
        authorization: "Bearer FAKE_KAKAO_JWT",
      },
    });
  }),

  http.post(`${HIBUDDY_BASE_URL}/v1/auth/google/login`, async () => {
    await delay(2000);

    return new HttpResponse("OK", {
      status: 201,
      headers: {
        authorization: "Bearer FAKE_GOOGLE_JWT",
      },
    });
  }),

  http.post(`${HIBUDDY_BASE_URL}/v1/auth/reissue`, async () => {
    await delay(1000);

    return new HttpResponse("OK", {
      status: 200,
      headers: {
        authorization: "Bearer REISSUED_JWT",
      },
    });
  }),

  http.get(`${HIBUDDY_BASE_URL}/v1/users/me`, async () => {
    await delay(500);

    return HttpResponse.json(getProfileResponse);
  }),

  http.post(`${HIBUDDY_BASE_URL}/v1/auth/logout`, async () => {
    await delay(500);

    return HttpResponse.json(successfulResponse);
  }),

  http.delete(`${HIBUDDY_BASE_URL}/v1/users/me`, async () => {
    await delay(500);

    return HttpResponse.json(successfulResponse);
  }),

  http.patch(`${HIBUDDY_BASE_URL}/v1/users/me/nickname`, async () => {
    await delay(500);

    return HttpResponse.json(successfulResponse);
  }),
];
