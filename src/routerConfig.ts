import { enableMocking } from "./main";
import { isLogin, isOnboarded } from "@apis/auth";
import { redirect } from "react-router-dom";

export const verifyingAuthLoader = async () => {
  await enableMocking();

  if (await isLogin()) {
    if (await isOnboarded()) {
      return null;
    }

    return redirect(ROUTER_PATH.ONBOARDING);
  }

  return redirect(ROUTER_PATH.LOGIN);
};

export const ROUTER_PATH = {
  MAIN: "/",
  LOGIN: "/login",
  ONBOARDING: "/onboarding",
  THREAD_LIST: "/threads",
  THREAD_VIEW: "/thread/:postId",
  OAUTH_CALLBACK: "/login/oauth2/code/:provider",
  POST_THREAD: "/thread/post",
  EDIT_THREAD: "/thread/:postId/edit",
  MY_PAGE: "/my",
  MY_THREAD_LIST: "/my/threads",
  SAVED_THREAD_LIST: "/my/saved-threads",
  KOREAN_TEST: "/korean-test",
  TEST_START: "/korean-test/start",
  RECORD: "/korean-test/record/:scriptId",
};
