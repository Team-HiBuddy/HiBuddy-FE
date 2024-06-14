import { HIBUDDY_BASE_URL } from "@constants/api";
import { http, HttpResponse } from "msw";
import profile from "../data/profile.json";
import successfulResponse from "../data/successfulResponse.json";
import failedResponse from "../data/failedResponse.json";
import onboardingCountries from "../data/onboardingCountries.json";
import onboardingMajors from "../data/onboardingMajors.json";
import threadList from "../data/threadList.json";

export const userHandlers = [
  http.patch(`${HIBUDDY_BASE_URL}/v1/users/me/onboarding`, async () => {
    return HttpResponse.json(successfulResponse);
  }),

  http.post(`${HIBUDDY_BASE_URL}/v1/auth/login/kakao`, async () => {
    return new HttpResponse("OK", {
      status: 201,
      headers: {
        authorization: "Bearer FAKE_KAKAO_JWT",
      },
    });
  }),

  http.post(`${HIBUDDY_BASE_URL}/v1/auth/login/google`, async () => {
    return new HttpResponse("OK", {
      status: 201,
      headers: {
        authorization: "Bearer FAKE_GOOGLE_JWT",
      },
    });
  }),

  http.post(`${HIBUDDY_BASE_URL}/v1/auth/reissue`, async () => {
    return new HttpResponse("OK", {
      status: 200,
      headers: {
        authorization: "Bearer REISSUED_JWT",
      },
    });
  }),

  http.get(`${HIBUDDY_BASE_URL}/v1/users/me`, async () => {
    return HttpResponse.json(profile);
  }),

  http.post(`${HIBUDDY_BASE_URL}/v1/auth/logout`, async () => {
    return HttpResponse.json(successfulResponse);
  }),

  http.delete(`${HIBUDDY_BASE_URL}/v1/users/me`, async () => {
    return HttpResponse.json(successfulResponse);
  }),

  http.patch(`${HIBUDDY_BASE_URL}/v1/users/me/nickname`, async () => {
    return HttpResponse.json(successfulResponse);
  }),

  http.patch(`${HIBUDDY_BASE_URL}/v1/users/me/profile`, async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return HttpResponse.json(failedResponse);
    }

    return HttpResponse.json(successfulResponse);
  }),

  http.get(`${HIBUDDY_BASE_URL}/v1/info/countries`, async () => {
    return HttpResponse.json(onboardingCountries);
  }),

  http.get(`${HIBUDDY_BASE_URL}/v1/info/majors`, async () => {
    return HttpResponse.json(onboardingMajors);
  }),

  http.get(`${HIBUDDY_BASE_URL}/v1/users/me/posts`, async ({ request }) => {
    const url = new URL(request.url);

    const page = url.searchParams.get("page");

    if (!page || +page > 10) {
      return new HttpResponse(null, { status: 404 });
    }

    const data = threadList;

    data.result.posts = threadList.result.posts.map((thread) => {
      return {
        ...thread,
        postId: +page * 5 + thread.postId,
      };
    });

    data.result.last = +page === 9;
    data.result.first = +page === 0;
    data.result.number = +page;

    return HttpResponse.json(data);
  }),

  http.get(`${HIBUDDY_BASE_URL}/v1/users/me/posts/scraps`, async ({ request }) => {
    const url = new URL(request.url);

    const page = url.searchParams.get("page");

    if (!page || +page > 10) {
      return new HttpResponse(null, { status: 404 });
    }

    const data = threadList;

    data.result.posts = threadList.result.posts.map((thread) => {
      return {
        ...thread,
        postId: +page * 5 + thread.postId,
        checkScrap: true,
      };
    });

    data.result.last = +page === 9;
    data.result.first = +page === 0;
    data.result.number = +page;

    return HttpResponse.json(data);
  }),
];
