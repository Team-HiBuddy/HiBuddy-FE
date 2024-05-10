import { HIBUDDY_BASE_URL } from "@constants/api";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(`${HIBUDDY_BASE_URL}/auth/kakao/login`, async () => {
    return new HttpResponse("OK", {
      status: 200,
      headers: {
        authorization:
          "30DKVAAsOX9ccZbtQycmvt5p3PEWVeLFpbQM1LYWDSscuqfUdo0_-dARI1QKPXSZAAABj2CxyI9Udd9ffL_GXA",
      },
    });
  }),
];
