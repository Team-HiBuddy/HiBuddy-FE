import { HIBUDDY_BASE_URL } from "@constants/api";
import { delay, http, HttpResponse } from "msw";
import popularThreads from "./data/popularThreads.json";

export const handlers = [
  http.get(`${HIBUDDY_BASE_URL}/auth/kakao/login`, async () => {
    await delay(3000);

    return new HttpResponse("OK", {
      status: 200,
      headers: {
        authorization:
          "30DKVAAsOX9ccZbtQycmvt5p3PEWVeLFpbQM1LYWDSscuqfUdo0_-dARI1QKPXSZAAABj2CxyI9Udd9ffL_GXA",
      },
    });
  }),

  http.get(`${HIBUDDY_BASE_URL}/posts/ranking`, async () => {
    await delay(2000);

    return HttpResponse.json(popularThreads);
  }),
];
