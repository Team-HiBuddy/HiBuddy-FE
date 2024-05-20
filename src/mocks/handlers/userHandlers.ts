import { HIBUDDY_BASE_URL } from "@constants/api";
import { delay, http, HttpResponse } from "msw";
import getProfileResponse from "../data/getProfileResponse.json";

export const userHandlers = [
  http.get(`${HIBUDDY_BASE_URL}/v1/users/me`, async () => {
    await delay(500);

    return HttpResponse.json(getProfileResponse);
  }),
];
