import { HIBUDDY_BASE_URL } from "@constants/api";
import { delay, http, HttpResponse } from "msw";
import failedResponse from "../data/failedResponse.json";
import postKoreanTestResponse from "../data/postKoreanTestResponse.json";

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
];
