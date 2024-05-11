import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import MainPage from "@pages/MainPage";
import ThreadListPage from "@pages/ThreadListPage";
import Layout from "@pages/Layout";
import ThreadViewPage from "@pages/ThreadViewPage";
import PostThreadPage from "@pages/PostThreadPage";

export const ROUTER_PATH = {
  LOGIN: "/login",
  ONBOARDING: "/onboarding",
  MAIN: "/",
  THREAD_LIST: "/threads",
  THREAD_VIEW: "/thread/:postId",
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
