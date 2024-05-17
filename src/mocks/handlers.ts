import { HIBUDDY_BASE_URL } from "@constants/api";
import { delay, http, HttpResponse } from "msw";
import popularThreads from "./data/popularThreads.json";
import successfulResponse from "./data/successfulResponse.json";
import failedResponse from "./data/failedResponse.json";
import postThreadResponse from "./data/postThreadResponse.json";

export const handlers = [
  http.post(`${HIBUDDY_BASE_URL}/v1/auth/kakao/login`, async () => {
    await delay(3000);

    return new HttpResponse("OK", {
      status: 201,
      headers: {
        authorization: "Bearer FAKE_KAKAO_JWT",
      },
    });
  }),

  http.post(`${HIBUDDY_BASE_URL}/v1/auth/google/login`, async () => {
    await delay(3000);

    return new HttpResponse("OK", {
      status: 201,
      headers: {
        authorization: "Bearer FAKE_GOOGLE_JWT",
      },
    });
  }),

  http.get(`${HIBUDDY_BASE_URL}/v1/posts/ranking`, async () => {
    await delay(2000);

    return HttpResponse.json(popularThreads);
  }),

  http.post(`${HIBUDDY_BASE_URL}/v1/images/upload`, async ({ request }) => {
    await delay(3000);
    const data = successfulResponse;

    const formData = await request.formData();
    const files = formData.getAll("fileList");

    if (files.length < 1) {
      return HttpResponse.json(failedResponse);
    }

    const imageIds = Array.from(files).map((_, idx) => Date.now() + idx);

    data.result = {
      imageIds: imageIds,
    };

    return HttpResponse.json(data);
  }),

  http.post(`${HIBUDDY_BASE_URL}/v1/thread/posts`, async () => {
    await delay(1000);

    return new HttpResponse(JSON.stringify(postThreadResponse), {
      headers: {
        location: "/v1/thread/posts/123",
      },
    });
  }),

  http.delete(`${HIBUDDY_BASE_URL}/v1/images/:imageId/cancel`, async () => {
    await delay(1000);

    return HttpResponse.json(successfulResponse);
  }),

  http.post(`${HIBUDDY_BASE_URL}/v1/auth/kakao/reissue`, async () => {
    await delay(1000);

    return new HttpResponse("OK", {
      status: 200,
      headers: {
        authorization: "Bearer REISSUED_KAKAO_JWT",
      },
    });
  }),

  http.post(`${HIBUDDY_BASE_URL}/v1/auth/google/reissue`, async () => {
    await delay(1000);

    return new HttpResponse("OK", {
      status: 200,
      headers: {
        authorization: "Bearer REISSUED_GOOGLE_JWT",
      },
    });
  }),

  http.post(`${HIBUDDY_BASE_URL}/v1/onboarding`, async () => {
    await delay(1000);

    return HttpResponse.json(successfulResponse);
  }),
];
