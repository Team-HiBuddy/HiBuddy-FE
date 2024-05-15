import App from "./App";
import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import MainPage from "@pages/MainPage";
import ThreadListPage from "@pages/ThreadListPage";
import Layout from "@pages/Layout";
import ThreadViewPage from "@pages/ThreadViewPage";
import KakaoCallbackPage from "@pages/KakaoCallbackPage";
import PostThreadPage from "@pages/PostThreadPage";
import { isLogin } from "@apis/auth";

export const ROUTER_PATH = {
  MAIN: "/",
  LOGIN: "/login",
  ONBOARDING: "/onboarding",
  THREAD_LIST: "/threads",
  THREAD_VIEW: "/thread/:postId",
  KAKAO_CALLBACK: "/auth/kakao/callback",
  POST_THREAD: "/post",
};

const enableMocking = async () => {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser.ts");

  return worker.start();
};

const verifyingAuthLoader = async () => {
  await enableMocking();

  if (await isLogin()) {
    return null;
  }

  return redirect(ROUTER_PATH.LOGIN);
};

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: ROUTER_PATH.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTER_PATH.ONBOARDING,
        element: <OnboardingPage />,
      },
      {
        path: ROUTER_PATH.KAKAO_CALLBACK,
        element: <KakaoCallbackPage />,
      },
      {
        element: <Layout />,
        loader: verifyingAuthLoader,
        children: [
          {
            path: ROUTER_PATH.MAIN,
            element: <MainPage />,
          },
          {
            path: ROUTER_PATH.THREAD_LIST,
            element: <ThreadListPage />,
          },
          {
            path: ROUTER_PATH.THREAD_VIEW,
            element: <ThreadViewPage />,
          },
          { path: ROUTER_PATH.POST_THREAD, element: <PostThreadPage /> },
        ],
      },
    ],
  },
]);
