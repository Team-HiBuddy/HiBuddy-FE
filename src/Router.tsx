import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@pages/Layout";
import { lazy } from "react";
import { ROUTER_PATH, verifyingAuthLoader } from "./routerConfig";
import NotFoundPage from "@pages/NotFoundPage";
import TestResultPage from "@pages/TestResultPage";

const MainPage = lazy(() => import("./pages/MainPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const ThreadListPage = lazy(() => import("./pages/ThreadListPage"));
const ThreadViewPage = lazy(() => import("./pages/ThreadViewPage"));
const OAuthCallbackPage = lazy(() => import("./pages/OAuthCallbackPage"));
const PostThreadPage = lazy(() => import("./pages/PostThreadPage"));
const EditThreadPage = lazy(() => import("./pages/EditThreadPage"));
const MyPage = lazy(() => import("./pages/MyPage"));
const MyThreadListPage = lazy(() => import("./pages/MyThreadListPage"));
const SavedThreadListPage = lazy(() => import("./pages/SavedThreadListPage"));
const KoreanTestPage = lazy(() => import("./pages/KoreanTestPage"));
const TestStartPage = lazy(() => import("./pages/TestStartPage"));
const RecordPage = lazy(() => import("./pages/RecordPage"));

export const Router = createBrowserRouter([
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
          { path: ROUTER_PATH.MY_THREAD_LIST, element: <MyThreadListPage /> },
          { path: ROUTER_PATH.SAVED_THREAD_LIST, element: <SavedThreadListPage /> },
          { path: ROUTER_PATH.KOREAN_TEST, element: <KoreanTestPage /> },
          { path: ROUTER_PATH.TEST_START, element: <TestStartPage /> },
          { path: ROUTER_PATH.RECORD, element: <RecordPage /> },
          { path: ROUTER_PATH.TEST_RESULT, element: <TestResultPage /> },
        ],
      },
    ],
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
]);
