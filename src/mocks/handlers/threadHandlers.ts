import { HIBUDDY_BASE_URL } from "@constants/api";
import { http, HttpResponse } from "msw";
import popularThreadList from "../data/popularThreadList.json";
import successfulResponse from "../data/successfulResponse.json";
import failedResponse from "../data/failedResponse.json";
import postThreadResponse from "../data/postThreadResponse.json";
import threadData from "../data/threadData.json";
import threadList from "../data/threadList.json";
import threadCommentList from "../data/threadCommentList.json";

export const threadHandlers = [
  http.get(`${HIBUDDY_BASE_URL}/v1/thread/main/popular`, async () => {
    return HttpResponse.json(popularThreadList);
  }),

  http.post(`${HIBUDDY_BASE_URL}/v1/images/upload`, async ({ request }) => {
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
    return new HttpResponse(JSON.stringify(postThreadResponse), {
      headers: {
        location: "/v1/thread/posts/123",
      },
    });
  }),

  http.delete(`${HIBUDDY_BASE_URL}/v1/images/:imageId`, async () => {
    return HttpResponse.json(successfulResponse);
  }),

  http.get(`${HIBUDDY_BASE_URL}/v1/thread/posts/:postId`, async () => {
    return HttpResponse.json(threadData);
  }),

  http.patch(`${HIBUDDY_BASE_URL}/v1/thread/posts/:postId`, async () => {
    return HttpResponse.json(successfulResponse);
  }),

  http.delete(`${HIBUDDY_BASE_URL}/v1/thread/posts/:postId`, async () => {
    return HttpResponse.json(successfulResponse);
  }),

  http.post(`${HIBUDDY_BASE_URL}/v1/thread/posts/:postId/likes`, async () => {
    return HttpResponse.json(successfulResponse);
  }),

  http.delete(`${HIBUDDY_BASE_URL}/v1/thread/posts/:postId/likes`, async () => {
    return HttpResponse.json(successfulResponse);
  }),

  http.post(`${HIBUDDY_BASE_URL}/v1/thread/posts/:postId/scraps`, async () => {
    return HttpResponse.json(successfulResponse);
  }),

  http.delete(`${HIBUDDY_BASE_URL}/v1/thread/posts/:postId/scraps`, async () => {
    return HttpResponse.json(successfulResponse);
  }),

  http.get(`${HIBUDDY_BASE_URL}/v1/thread/posts`, async ({ request }) => {
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

  http.get(`${HIBUDDY_BASE_URL}/v1/thread/posts/:postId/comments`, async ({ request }) => {
    const url = new URL(request.url);

    const page = url.searchParams.get("page");

    if (!page || +page > 3) {
      return new HttpResponse(null, { status: 404 });
    }

    const data = threadCommentList;

    data.result.comments = threadCommentList.result.comments.map((thread) => {
      return {
        ...thread,
        commentId: +page * 10 + thread.commentId,
      };
    });

    data.result.last = +page === 2;
    data.result.first = +page === 0;
    data.result.number = +page;

    return HttpResponse.json(data);
  }),

  http.post(`${HIBUDDY_BASE_URL}/v1/thread/posts/:postId/comments`, async () => {
    return HttpResponse.json(successfulResponse);
  }),

  http.delete(`${HIBUDDY_BASE_URL}/v1/thread/posts/:postId/comments/:commentId`, async () => {
    return HttpResponse.json(successfulResponse);
  }),

  http.patch(`${HIBUDDY_BASE_URL}/v1/thread/posts/:postId/comments/:commentId`, async () => {
    return HttpResponse.json(successfulResponse);
  }),

  http.get(`${HIBUDDY_BASE_URL}/v1/thread/search`, async ({ request }) => {
    const url = new URL(request.url);

    const page = url.searchParams.get("page");
    const keyword = url.searchParams.get("keyword");

    if (!page || +page > 10 || !keyword) {
      return new HttpResponse(null, { status: 404 });
    }

    const data = threadList;

    data.result.posts = threadList.result.posts.map((thread) => {
      return {
        ...thread,
        postId: +page * 5 + thread.postId,
        title: keyword + thread.title,
      };
    });

    data.result.last = +page === 9;
    data.result.first = +page === 0;
    data.result.number = +page;

    return HttpResponse.json(data);
  }),
];
