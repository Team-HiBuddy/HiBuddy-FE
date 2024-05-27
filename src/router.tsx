import App from "./App";
import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import MainPage from "@pages/MainPage";
import ThreadListPage from "@pages/ThreadListPage";
import Layout from "@pages/Layout";
import ThreadViewPage from "@pages/ThreadViewPage";
import OAuthCallbackPage from "@pages/OAuthCallbackPage";
import PostThreadPage from "@pages/PostThreadPage";
import { isLogin, isOnboarded } from "@apis/auth";
import { enableMocking } from "./main";
import EditThreadPage from "@pages/EditThreadPage";
import MyPage from "@pages/MyPage";

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
};

const verifyingAuthLoader = async () => {
  await enableMocking();

  if (await isLogin()) {
    if (await isOnboarded()) {
      return null;
    }

    return redirect(ROUTER_PATH.ONBOARDING);
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
        path: ROUTER_PATH.OAUTH_CALLBACK,
        element: <OAuthCallbackPage />,
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
          { path: ROUTER_PATH.EDIT_THREAD, element: <EditThreadPage /> },
          { path: ROUTER_PATH.MY_PAGE, element: <MyPage /> },
        ],
      },
    ],
  },
]);
