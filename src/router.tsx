import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import MainPage from "@pages/MainPage";
import ThreadListPage from "@pages/ThreadListPage";
import Layout from "@pages/Layout";
import ThreadViewPage from "@pages/ThreadViewPage";

export const ROUTER_PATH = {
  LOGIN: "/login",
  ONBOARDING: "/onboarding",
  MAIN: "/main",
  THREAD_LIST: "/threads",
  THREAD_VIEW: "/thread/:postId",
};

export const router = createBrowserRouter([
  {
    path: "/",
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
        ],
      },
    ],
  },
]);
