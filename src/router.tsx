import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import MainPage from "@pages/MainPage";
import ThreadListPage from "@pages/ThreadListPage";
import Layout from "@pages/Layout";
import ThreadViewPage from "@pages/ThreadViewPage";
import KakaoCallbackPage from "@pages/KakaoCallbackPage";
import PostThreadPage from "@pages/PostThreadPage";

export const ROUTER_PATH = {
  MAIN: "/",
  LOGIN: "/login",
  ONBOARDING: "/onboarding",
  THREAD_LIST: "/threads",
  THREAD_VIEW: "/thread/:postId",
  KAKAO_CALLBACK: "/auth/kakao/callback",
  POST_THREAD: "/post",
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
