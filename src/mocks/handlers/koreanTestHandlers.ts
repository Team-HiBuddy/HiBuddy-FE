import { HIBUDDY_BASE_URL } from "@constants/api";
import { delay, http, HttpResponse } from "msw";
import failedResponse from "../data/failedResponse.json";
import postKoreanTestResponse from "../data/postKoreanTestResponse.json";
import TestHistory from "../data/testHistory.json";

export const koreanTestHandlers = [
  http.post(`${HIBUDDY_BASE_URL}/v1/tests/start`, async ({ request }) => {
    await delay(1000);

    const formData = await request.formData();
    const audio = formData.get("audio");

    if (!audio) {
      return HttpResponse.json(failedResponse);
    }

    return HttpResponse.json(postKoreanTestResponse);
  }),

  http.get(`${HIBUDDY_BASE_URL}/v1/tests`, async ({ request }) => {
    await delay(1000);

    const url = new URL(request.url);

    const page = url.searchParams.get("page");

    if (!page || +page > 3) {
      return new HttpResponse(null, { status: 404 });
    }

    const data = TestHistory;

    data.result.test = TestHistory.result.test.map((test) => {
      return {
        ...test,
        testId: +page * 5 + test.testId,
      };
    });

    data.result.last = +page === 3;
    data.result.first = +page === 1;
    data.result.number = +page;

    return HttpResponse.json(data);
  }),
];
